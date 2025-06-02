document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("loggedInUser");

  if (!username) {
    window.location.href = "login.html";
    return;
  }

  const greeting = document.getElementById("greeting");
  if (greeting) {
    greeting.textContent = `Welcome, ${username}!`;
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }
});
