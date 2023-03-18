import PubSub from "pubsub-js";

function createDOMCache() {
  const $newTaskForm = document.querySelector(".addTaskPopup form");
  return { $newTaskForm };
}

const cachedDOM = createDOMCache();

const projectArray = [];

// Object for every project
function createProject() {
  console.log("Create a project");
}

// Object for every task
function createTask() {
  console.log("Create a Task");
}

PubSub.subscribe(cachedDOM.$newTaskForm.id, createTask);
