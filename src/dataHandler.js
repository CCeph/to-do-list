import PubSub from "pubsub-js";

function createDOMCache() {
  const $newTaskForm = document.querySelector(".addTaskPopup form");
  return { $newTaskForm };
}

const cachedDOM = createDOMCache();

const projectArray = [];

// Object for every project
function createProject(projectName) {
  const taskListArray = [];
  return { projectName, taskListArray };
}

const inbox = createProject("inbox");
projectArray.push(inbox);

// Object for every task
function createTask(formID, formAnswers) {
  if (formAnswers.project === "") {
    inbox.taskListArray.push(formAnswers);
    return;
  }
  const projectMatch = projectArray.find(
    (project) => project.projectName === formAnswers.project
  );
  if (projectMatch === undefined) {
    const newProject = createProject(`${formAnswers.project}`);
    newProject.taskListArray.push(formAnswers);
    projectArray.push(newProject);
  } else {
    projectMatch.taskListArray.push(formAnswers);
  }
}

const subscribeToNewTask = PubSub.subscribe(
  cachedDOM.$newTaskForm.id,
  createTask
);
