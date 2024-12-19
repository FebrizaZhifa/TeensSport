// Get all checkboxes with the name "Exercise"
const buttonSubmit = document.getElementById("submit");

// Create an array to hold the values of checked checkboxes
const checkedExercises = [];

// Function to get the token (example: from local storage or cookies)
const getToken = () => {
  // Example: Assuming token is stored in local storage
  return localStorage.getItem("authToken");
};

// Loop through all checked checkboxes and push their values to the array
buttonSubmit.addEventListener("click", async () => {
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
    name: nameValue,
    exercises: checkedExercises,
  };

  // Now `checkedExercises` contains the values of all selected exercises
  console.log(newRoutine);

  const token = getToken(); // Retrieve the token from the middleware or storage
  console.log(token);
  if (!token) {
    console.error("Token not found. Please log in again.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/workouts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newRoutine),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Server Response:", result);
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
});
