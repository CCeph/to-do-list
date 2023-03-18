function createDOMCache() {
  const $newTaskForm = document.querySelector(".addTaskPopup form");
  return { $newTaskForm };
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
  console.log(formAnswersObject);
}

cachedDOM.$newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getFormData(cachedDOM.$newTaskForm);
});
