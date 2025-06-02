// js/search.js

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('searchForm');
  const searchResults = document.getElementById('searchResults');
  const searchMessage = document.getElementById('searchMessage');

  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = document.getElementById('searchQuery').value.trim();

    if (!query) {
      searchMessage.textContent = 'Please enter an item name to search.';
      searchMessage.style.color = 'red';
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/items/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (response.ok) {
        if (data.items.length === 0) {
          searchResults.innerHTML = '<p>No lost items found matching your search.</p>';
          searchMessage.textContent = '';
        } else {
          searchMessage.textContent = '';
          // Build results HTML
          let html = '<ul class="item-list">';
          data.items.forEach(item => {
            html += `
              <li>
                <strong>${item.item_name}</strong> - ${item.description || 'No description'}<br />
                Lost on: ${new Date(item.date).toLocaleDateString()} at ${item.location}<br />
                Reported by user ID: ${item.user_id}
              </li>
            `;
          });
          html += '</ul>';
          searchResults.innerHTML = html;
        }
      } else {
        searchMessage.textContent = data.message || 'Search failed.';
        searchMessage.style.color = 'red';
      }
    } catch (error) {
      searchMessage.textContent = 'Error connecting to server.';
      searchMessage.style.color = 'red';
      console.error('Search error:', error);
    }
  });
});
