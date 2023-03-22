import PubSub from "pubsub-js";

// Cache DOM Elements
function createDOMCache() {
  const $newTaskPopup = document.querySelector(".addTaskPopup");
  const $newProjectPopup = document.querySelector(".addProjectPopup");
  const $nav = document.querySelector(".nav");
  const $taskList = document.querySelector(".task-list");
  const $currentProjectTitle = document.querySelector(".content > h1");
  return {
    $newTaskPopup,
    $newProjectPopup,
    $nav,
    $taskList,
    $currentProjectTitle,
  };
}

const cachedDOM = createDOMCache();

function showAddTaskPopup() {
  cachedDOM.$newTaskPopup.classList.add("active");
}

function hideAddTaskPopup() {
  cachedDOM.$newTaskPopup.classList.remove("active");
}

function clearCurrentTaskDisplay() {
  cachedDOM.$taskList.textContent = "";
}

function displayTask(currentTask, currentTaskIndex) {
  const taskWrapper = document.createElement("li");
  taskWrapper.classList.add("task-wrapper");
  cachedDOM.$taskList.appendChild(taskWrapper);

  const wrapperButton = document.createElement("div");
  wrapperButton.classList.add("task-details");
  wrapperButton.setAttribute("data-role", "details-button");
  taskWrapper.appendChild(wrapperButton);

  const leftSidebar = document.createElement("div");
  leftSidebar.classList.add("task-left-sidebar");
  wrapperButton.appendChild(leftSidebar);

  const checkButton = document.createElement("button");
  const checkMark = document.createElement("span");
  checkMark.classList.add("material-symbols-outlined");
  checkMark.textContent = "done";
  checkButton.appendChild(checkMark);
  leftSidebar.appendChild(checkButton);

  const title = document.createElement("h3");
  title.classList.add("task-title");
  title.textContent = currentTask.taskTitle;
  wrapperButton.appendChild(title);

  const rightSidebar = document.createElement("div");
  rightSidebar.classList.add("task-right-sidebar");
  wrapperButton.appendChild(rightSidebar);

  const dueDate = document.createElement("p");
  dueDate.textContent = currentTask.dueDate;
  rightSidebar.appendChild(dueDate);

  const removeTaskButton = document.createElement("button");
  removeTaskButton.classList.add("remove-task-button");
  removeTaskButton.id = `${currentTask.project}TaskID${currentTaskIndex}`;
  removeTaskButton.textContent = "x";
  rightSidebar.appendChild(removeTaskButton);
}

function displayProjectTasks(eventMessage, currentProject) {
  cachedDOM.$currentProjectTitle.textContent = currentProject.projectName;
  clearCurrentTaskDisplay();
  currentProject.taskListArray.forEach(displayTask);
}

function bindEventsForAddingTasks() {
  const showAddTaskPopupEvent = "showAddTaskPopup";
  const hideAddTaskPopupEvent = "hideAddTaskPopup";

  PubSub.subscribe(showAddTaskPopupEvent, showAddTaskPopup);

  PubSub.subscribe(hideAddTaskPopupEvent, hideAddTaskPopup);
}

function bindEventsForDisplayingCurrentTasks() {
  const displayProjectTasksEvent = "displayProjectTasksEvent";

  PubSub.subscribe(displayProjectTasksEvent, displayProjectTasks);
}

function showAddProjectPopup() {
  cachedDOM.$newProjectPopup.classList.add("active");
}

function hideAddProjectPopup() {
  cachedDOM.$newProjectPopup.classList.remove("active");
}

function removeInboxFromProjectArray(array) {
  const cloneArray = array.slice();
  cloneArray.shift();
  return cloneArray;
}

function clearCurrentProjectDisplay() {
  const listOfProjects = document.querySelectorAll(".nav .project-wrapper");
  const arrayOfProjects = Array.from(listOfProjects);
  arrayOfProjects.forEach((project) => {
    project.remove();
  });
}

function bindRemoveProjectButton(button) {
  button.addEventListener("click", () => {
    const removeProjectEvent = "removeProjectEvent";
    PubSub.publish(removeProjectEvent, button);
  });
}

function displayProject(project, projectIndex) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("project-wrapper");
  cachedDOM.$nav.appendChild(wrapper);

  const projectButton = document.createElement("button");
  projectButton.classList.add("nav-project");
  projectButton.textContent = project.projectName;
  projectButton.addEventListener("click", () => {
    displayProjectTasks("", project);
  });
  wrapper.appendChild(projectButton);

  const removeProjectButton = document.createElement("button");
  removeProjectButton.classList.add("remove-project");
  // Adds an ID to the remove button so it can be used to identify the project
  // to remove when button is clicked.
  removeProjectButton.id = `navProjectID${projectIndex + 1}`;
  bindRemoveProjectButton(removeProjectButton);
  removeProjectButton.textContent = "x";
  wrapper.appendChild(removeProjectButton);
}

function displayCurrentProjects(eventMessage, projectArray) {
  const arrayToDisplay = removeInboxFromProjectArray(projectArray);
  clearCurrentProjectDisplay();
  arrayToDisplay.forEach(displayProject);
}

function bindEventsForAddingProjects() {
  const showAddProjectPopupEvent = "showAddProjectPopup";
  const hideAddProjectPopupEvent = "hideAddProjectPopup";
  const displayProjectsEvent = "displayProjectsEvent";

  PubSub.subscribe(showAddProjectPopupEvent, showAddProjectPopup);

  PubSub.subscribe(hideAddProjectPopupEvent, hideAddProjectPopup);

  PubSub.subscribe(displayProjectsEvent, displayCurrentProjects);
}

bindEventsForAddingTasks();
bindEventsForAddingProjects();
bindEventsForDisplayingCurrentTasks();
