import PubSub from "pubsub-js";

// Cache DOM Elements
function createDOMCache() {
  const $newTaskPopup = document.querySelector(".addTaskPopup");
  return { $newTaskPopup };
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

bindEventsForAddingTasks();
