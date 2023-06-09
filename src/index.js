import "./style.css";
import PubSub from "pubsub-js";
import "./inputHandler";
import "./dataHandler";
import "./outputHandler";

function createDOMCache() {
  const $headerAddTaskButton = document.querySelector(".add-task");
  const $cancelNewTaskButton = document.querySelector(
    ".addTaskPopup button[type=reset]"
  );
  const $submitNewTaskButton = document.querySelector(
    ".addTaskPopup button[type=submit]"
  );
  const $navAddProjectButton = document.querySelector(".add-project");
  const $cancelNewProjectButton = document.querySelector(
    ".addProjectPopup button[type=reset]"
  );
  const $submitNewProjectButton = document.querySelector(
    ".addProjectPopup button[type=submit]"
  );
  return {
    $headerAddTaskButton,
    $cancelNewTaskButton,
    $submitNewTaskButton,
    $navAddProjectButton,
    $cancelNewProjectButton,
    $submitNewProjectButton,
  };
}

const cachedDOM = createDOMCache();

function bindEventsForAddingTasks() {
  // Shows the Add Task Popup
  cachedDOM.$headerAddTaskButton.addEventListener("click", () => {
    const showAddTaskPopup = "showAddTaskPopup";
    PubSub.publish(showAddTaskPopup);
  });

  // Hides the Add Task Popup upon cancelling
  cachedDOM.$cancelNewTaskButton.addEventListener("click", () => {
    const hideAddTaskPopup = "hideAddTaskPopup";
    PubSub.publish(hideAddTaskPopup);
  });

  // Hides the Add Task Popup upon submitting
  cachedDOM.$submitNewTaskButton.addEventListener("click", () => {
    const hideAddTaskPopup = "hideAddTaskPopup";
    PubSub.publish(hideAddTaskPopup);
  });
}

function bindEventsForAddingProjects() {
  // Shows the Add Project Popup
  cachedDOM.$navAddProjectButton.addEventListener("click", () => {
    const showAddProjectPopup = "showAddProjectPopup";
    PubSub.publish(showAddProjectPopup);
  });

  // Hides the Add Project Popup upon cancelling
  cachedDOM.$cancelNewProjectButton.addEventListener("click", () => {
    const hideAddProjectPopup = "hideAddProjectPopup";
    PubSub.publish(hideAddProjectPopup);
  });

  // Hides the Add Project Popup upon submitting
  cachedDOM.$submitNewProjectButton.addEventListener("click", () => {
    const hideAddProjectPopup = "hideAddProjectPopup";
    PubSub.publish(hideAddProjectPopup);
  });
}

bindEventsForAddingTasks();
bindEventsForAddingProjects();
