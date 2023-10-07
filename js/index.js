document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const resultsContainer = document.getElementById('results');
  
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const userData = await getUserData(username);
  
      // Display user information
      displayUserInfo(userData);
  
      // Fetch user repositories
      const userRepos = await getUserRepositories(username);
  
      // Display user repositories
      displayUserRepositories(userRepos);
    });
  
    async function getUserData(username) {
      const response = await fetch(`https://api.github.com/users/${username}`);
      return response.json();
    }
  
    async function getUserRepositories(username) {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      return response.json();
    }
  
    function displayUserInfo(userData) {
      resultsContainer.innerHTML = `
        <h2>${userData.login}</h2>
        <img src="${userData.avatar_url}" alt="User Avatar">
        <p><a href="${userData.html_url}" target="_blank">View Profile</a></p>
      `;
    }
  
    function displayUserRepositories(userRepos) {
      const repoList = userRepos.map(repo => `<li>${repo.name}</li>`).join('');
      resultsContainer.innerHTML += `
        <h3>Repositories:</h3>
        <ul>${repoList}</ul>
      `;
    }
  });
  