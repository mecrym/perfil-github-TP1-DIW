document.addEventListener('DOMContentLoaded', () => {
    const GITHUB_API_URL = 'https://api.github.com';
    const urlParams = new URLSearchParams(window.location.search);
    const repoName = urlParams.get('name');
    const GITHUB_USERNAME = 'mecrym'; // Substitua pelo seu nome de usuário
  
    const fetchGitHubData = async (endpoint) => {
      try {
        const response = await fetch(`${GITHUB_API_URL}/${endpoint}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Erro ao buscar dados do GitHub:', error);
      }
    };
  
    const loadRepoDetails = async () => {
      const repo = await fetchGitHubData(`repos/${GITHUB_USERNAME}/${repoName}`);
      if (repo) {
        const repoSection = document.getElementById('repositorio');
        const languages = await fetchGitHubData(`repos/${GITHUB_USERNAME}/${repoName}/languages`);
        const languagesList = Object.keys(languages).join(', ');
  
        repoSection.innerHTML = `
          <h2>${repo.name}</h2>
          <p>${repo.description}</p>
          <p>Data de Criação: ${new Date(repo.created_at).toLocaleDateString()}</p>
          <p>Linguagens Utilizadas: ${languagesList}</p>
          <p><a href="${repo.html_url}" target="_blank">Link de Acesso</a></p>
          <p>Favoritado: ${repo.stargazers_count} vezes</p>
          <p>Forks: ${repo.forks_count}</p>
        `;
      }
    };
  
    // Carregar dados ao iniciar a página
    loadRepoDetails();
  });
  