import "./style.css";

function createDOMCache() {
  const $headerAddTaskButton = document.querySelector(".add-task");
  const $cancelNewTaskButton = document.querySelector(
    ".addTaskPopup button[type=reset]"
  );
  const $submitNewTaskButton = document.querySelector(
    "addTaskPopup button[type=submit]"
  );
  return { $headerAddTaskButton, $cancelNewTaskButton, $submitNewTaskButton };
}

const cachedDOM = createDOMCache();

function bindEventsForAddingTasks() {}

console.log("Test");
