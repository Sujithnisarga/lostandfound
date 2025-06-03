// js/report.js

document.addEventListener('DOMContentLoaded', () => {
  const reportForm = document.getElementById('reportForm');
  const reportMessage = document.getElementById('statusMsg');

  // Get the type (lost or found) from query params
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');

  // Set page heading based on type
  const heading = document.querySelector('h2');
  if (type === 'lost') heading.textContent = 'Report Lost Item';
  else if (type === 'found') heading.textContent = 'Report Found Item';
  else heading.textContent = 'Report Item';

  reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      alert('Please login first.');
      window.location.href = 'index.html';
      return;
    }

    const user = JSON.parse(loggedInUser);

    const item_name = document.getElementById('title').value.trim();

    const description = document.getElementById('description').value.trim();
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value.trim();

    if (!item_name || !date || !location) {
      reportMessage.textContent = 'Please fill in all required fields.';
      reportMessage.style.color = 'red';
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/items/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          item_name,
          description,
          date,
          location,
          type,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        reportMessage.textContent = data.message;
        reportMessage.style.color = 'green';
        reportForm.reset();
      } else {
        reportMessage.textContent = data.message || 'Failed to report item.';
        reportMessage.style.color = 'red';
      }
    } catch (error) {
      reportMessage.textContent = 'Error connecting to server.';
      reportMessage.style.color = 'red';
      console.error('Report error:', error);
    }
  });
});
