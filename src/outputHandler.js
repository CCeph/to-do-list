import PubSub from "pubsub-js";

// Cache DOM Elements
function createDOMCache() {
  const $newTaskPopup = document.querySelector(".addTaskPopup");
  const $newProjectPopup = document.querySelector(".addProjectPopup");
  return { $newTaskPopup, $newProjectPopup };
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
  const listOfProjects = document.querySelectorAll(".nav .projectwrapper");
  const arrayOfProjects = Array.from(listOfProjects);
  arrayOfProjects.forEach((project) => {
    project.remove();
  });
}

function displayProject() {
  console.log("works");
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
