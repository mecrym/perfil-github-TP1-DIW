document.addEventListener('DOMContentLoaded', () => {
    const GITHUB_API_URL = 'https://api.github.com';
    const GITHUB_USERNAME = 'mecrym'; // Substitua pelo seu nome de usuário
  
    const fetchGitHubData = async (endpoint) => {
      try {
        const response = await fetch(`${GITHUB_API_URL}/${endpoint}`);
        return await response.json();
      } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
      }
    };
  
    const loadGitHubProfile = async () => {
      const profile = await fetchGitHubData(`users/${GITHUB_USERNAME}`);
      const profileSection = document.getElementById('perfil');
      profileSection.innerHTML = `
        <img src="${profile.avatar_url}" alt="${profile.name}">
        <h2>${profile.name}</h2>
        <p>${profile.bio}</p>
      `;
    };
  
    const loadGitHubRepos = async () => {
      const repos = await fetchGitHubData(`users/${GITHUB_USERNAME}/repos`);
      const reposSection = document.getElementById('repositorios-lista');
      reposSection.innerHTML = ''; // Limpar conteúdo existente
      repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.classList.add('repo-card');
        repoDiv.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
          <a href="repo.html?name=${repo.name}" target="_blank">Acessar Detalhes</a>
        `;
        reposSection.appendChild(repoDiv);
      });
    };
  
    const loadGitHubFollowing = async () => {
      const following = await fetchGitHubData(`users/${GITHUB_USERNAME}/following`);
      const followingSection = document.getElementById('seguindo-lista');
      followingSection.innerHTML = ''; // Limpar conteúdo existente
      following.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('following-card');
        userDiv.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}">
          <h3>${user.login}</h3>
          <a href="${user.html_url}" target="_blank">Ver Perfil</a>
        `;
        followingSection.appendChild(userDiv);
      });
    };
  
    // Carregar dados ao iniciar a página
    loadGitHubProfile();
    loadGitHubRepos();
    loadGitHubFollowing();
  });
  