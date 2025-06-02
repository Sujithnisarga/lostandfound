// js/login.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const loginMessage = document.getElementById('loginMessage');

  if (!username || !password) {
    loginMessage.textContent = 'Please enter both username and password.';
    loginMessage.style.color = 'red';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save user info to localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(data.user));
      window.location.href = 'dashboard.html';
    } else {
      loginMessage.textContent = data.message || 'Login failed';
      loginMessage.style.color = 'red';
    }
  } catch (error) {
    loginMessage.textContent = 'Error connecting to server';
    loginMessage.style.color = 'red';
    console.error('Login error:', error);
  }
});
