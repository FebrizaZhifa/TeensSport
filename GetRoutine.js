document.addEventListener("DOMContentLoaded", async () => {
    const getToken = () => {
      // Retrieve the token from local storage
      return localStorage.getItem("authToken");
    };
  
    const token = getToken();
    console.log("Token:", token);
  
    if (!token) {
      console.error("Token not found. Please log in again.");
      alert("Token not found. Please log in again.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/workouts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Server Response:", result);
  
      // Render the fetched routines as cards
      const routineContainer = document.getElementById("routine-container");
      routineContainer.innerHTML = ""; // Clear any existing content
  
      result.forEach((routine) => {
        // Create card element
        const card = document.createElement("div");
        card.classList.add("routine-card");
  
        // Add routine name
        const title = document.createElement("h3");
        title.textContent = routine.name;
        card.appendChild(title);
  
        // Add exercises
        const exerciseList = document.createElement("ul");
        routine.exercises.forEach((exercise) => {
          const listItem = document.createElement("li");
          listItem.textContent = exercise;
          exerciseList.appendChild(listItem);
        });
        card.appendChild(exerciseList);
  
        // Append card to the container
        routineContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching data from server:", error);
      alert("Error fetching data from server.");
    }
  });
  