import PubSub from "pubsub-js";

// Cache DOM Elements
function createDOMCache() {
  const $newTaskPopup = document.querySelector(".addTaskPopup");
  const $newProjectPopup = document.querySelector(".addProjectPopup");
  const $nav = document.querySelector(".nav");
  return { $newTaskPopup, $newProjectPopup, $nav };
}

const cachedDOM = createDOMCache();

function showAddTaskPopup() {
  cachedDOM.$newTaskPopup.classList.add("active");
}

function hideAddTaskPopup() {
  cachedDOM.$newTaskPopup.classList.remove("active");
}

function bindEventsForAddingTasks() {
  const showAddTaskPopupEvent = "showAddTaskPopup";
  const hideAddTaskPopupEvent = "hideAddTaskPopup";

  PubSub.subscribe(showAddTaskPopupEvent, showAddTaskPopup);

  PubSub.subscribe(hideAddTaskPopupEvent, hideAddTaskPopup);
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
    const removeProject = "removeProject";
    PubSub.publish(removeProject, button);
  });
}

function displayProject(project, projectIndex) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("project-wrapper");
  cachedDOM.$nav.appendChild(wrapper);

  const projectButton = document.createElement("button");
  projectButton.classList.add("nav-project");
  projectButton.textContent = project.projectName;
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
  const newProjectAdded = "newProjectAdded";

  PubSub.subscribe(showAddProjectPopupEvent, showAddProjectPopup);

  PubSub.subscribe(hideAddProjectPopupEvent, hideAddProjectPopup);

  PubSub.subscribe(newProjectAdded, displayCurrentProjects);
}

bindEventsForAddingTasks();
bindEventsForAddingProjects();
