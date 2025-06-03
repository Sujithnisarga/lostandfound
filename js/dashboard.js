document.addEventListener("DOMContentLoaded", () => {
  const userString = localStorage.getItem("loggedInUser");

  if (!userString) {
    window.location.href = "index.html";
    return;
  }

  const user = JSON.parse(userString); // Parse the JSON string to an object

  const greeting = document.getElementById("greeting");
  if (greeting && user.username) {
    greeting.textContent = `Welcome!`;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }
});

