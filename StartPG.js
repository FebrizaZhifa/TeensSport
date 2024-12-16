// Get all checkboxes with the name "Exercise"

const buttonSubmit = document.getElementById("submit");

// Create an array to hold the values of checked checkboxes
const checkedExercises = [];

// Loop through all checked checkboxes and push their values to the array
buttonSubmit.addEventListener("click", () => {
  // Get all checked checkboxes inside the event listener
  const checkboxes = document.querySelectorAll(
    'input[name="Exercise"]:checked'
  );

  const exerciseInput = document.getElementById("exercise-name");
  const nameValue = exerciseInput.value;

  // Clear the checkedExercises array to store the new selections
  checkedExercises.length = 0;

  // Loop through all checked checkboxes and push their values to the array
  checkboxes.forEach((checkbox) => {
    checkedExercises.push(checkbox.value);
  });

  const newRoutine = {
    nama: nameValue,
    exercises: checkedExercises,
  };

  // Now `checkedExercises` contains the values of all selected exercises
  console.log(newRoutine);
});
