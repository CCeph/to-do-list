import PubSub from "pubsub-js";

function createDOMCache() {
  const $newTaskForm = document.querySelector(".addTaskPopup form");
  const $newProjectForm = document.querySelector(".addProjectPopup form");
  return { $newTaskForm, $newProjectForm };
}

const cachedDOM = createDOMCache();

function getFormData(form) {
  // Puts all input elements of the form in an array.
  const formAnswersArray = Array.from(
    document.querySelectorAll(`#${form.id} input`)
  );
  const formAnswersObject = formAnswersArray.reduce(
    (accumulatedInputs, input) => ({
      ...accumulatedInputs,
      [input.id]: input.value,
    }),
    {}
  );
  PubSub.publish(form.id, formAnswersObject);
}

cachedDOM.$newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getFormData(cachedDOM.$newTaskForm);
});

cachedDOM.$newProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getFormData(cachedDOM.$newProjectForm);
});
