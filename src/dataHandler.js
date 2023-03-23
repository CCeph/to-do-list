import PubSub from "pubsub-js";

function createDOMCache() {
  const $newTaskForm = document.querySelector(".addTaskPopup form");
  const $newProjectForm = document.querySelector(".addProjectPopup form");
  const $navInboxButton = document.querySelector(".nav > .inbox");
  return { $newTaskForm, $newProjectForm, $navInboxButton };
}

const cachedDOM = createDOMCache();

const projectArray = [];

// Object for every project
function createProject(projectName) {
  const taskListArray = [];
  return { projectName, taskListArray };
}

function createUserProject(formID, project) {
  const newProject = createProject(project.projectTitle);
  projectArray.push(newProject);

  // Announces a new project. Output handler listens to this.
  const displayProjectsEvent = "displayProjectsEvent";
  PubSub.publish(displayProjectsEvent, projectArray);
}

const inbox = createProject("Inbox");
projectArray.push(inbox);

// Object for every task
function createTask(formID, formAnswers) {
  if (formAnswers.project === "") {
    inbox.taskListArray.push(formAnswers);

    const displayProjectTasksEvent = "displayProjectTasksEvent";
    PubSub.publish(displayProjectTasksEvent, inbox);
    return;
  }
  const projectMatch = projectArray.find(
    (project) => project.projectName === formAnswers.project
  );
  if (projectMatch === undefined) {
    const newProject = createProject(`${formAnswers.project}`);
    newProject.taskListArray.push(formAnswers);
    projectArray.push(newProject);
    const displayProjectTasksEvent = "displayProjectTasksEvent";
    PubSub.publish(displayProjectTasksEvent, newProject);
    const displayProjectsEvent = "displayProjectsEvent";
    PubSub.publish(displayProjectsEvent, projectArray);
  } else {
    projectMatch.taskListArray.push(formAnswers);
    const displayProjectTasksEvent = "displayProjectTasksEvent";
    PubSub.publish(displayProjectTasksEvent, projectMatch);
  }
}

function removeProject(eventMessage, removeProjectButton) {
  const indexToRemove = removeProjectButton.id.slice(-1);
  projectArray.splice(indexToRemove, 1);
  const displayProjectsEvent = "displayProjectsEvent";
  PubSub.publish(displayProjectsEvent, projectArray);
}

function removeTask(eventMessage, taskToRemove) {}

PubSub.subscribe(cachedDOM.$newTaskForm.id, createTask);

PubSub.subscribe(cachedDOM.$newProjectForm.id, createUserProject);

const removeProjectEvent = "removeProjectEvent";

PubSub.subscribe(removeProjectEvent, removeProject);

const removeTaskEvent = "removeTaskEvent";
PubSub.subscribe(removeTaskEvent, removeTask);

function bindEventsForTaskDisplays() {
  cachedDOM.$navInboxButton.addEventListener("click", () => {
    const displayProjectTasksEvent = "displayProjectTasksEvent";
    PubSub.publish(displayProjectTasksEvent, projectArray[0]);
  });
}

bindEventsForTaskDisplays();
