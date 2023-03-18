import "./style.css";
import PubSub from "pubsub-js";
import "./outputHandler";
import "./inputHandler";

function createDOMCache() {
  const $headerAddTaskButton = document.querySelector(".add-task");
  const $cancelNewTaskButton = document.querySelector(
    ".addTaskPopup button[type=reset]"
  );
  const $submitNewTaskButton = document.querySelector(
    ".addTaskPopup button[type=submit]"
  );
  return { $headerAddTaskButton, $cancelNewTaskButton, $submitNewTaskButton };
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

bindEventsForAddingTasks();
