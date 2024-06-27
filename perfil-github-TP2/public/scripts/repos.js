document.addEventListener('DOMContentLoaded', async () => {
    const GITHUB_API_URL = 'https://api.github.com';
    const GITHUB_USERNAME = 'mecrym'; // Substitua pelo nome de usuário desejado
    const MY_TOKEN = ''; // Substitua pelo seu token do GitHub

    // Função para buscar dados da API do GitHub
    const fetchGitHubData = async (endpoint) => {
        try {
            const response = await fetch(`${GITHUB_API_URL}/${endpoint}`, {
                headers: {
                    Authorization: `Bearer ${MY_TOKEN}`
                }
            });
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Erro ao buscar dados do GitHub (${endpoint}): ${error.message}`);
            return null;
        }
    };

    // Função para carregar repositórios do GitHub
    const loadGitHubRepos = async () => {
        const repos = await fetchGitHubData(`users/${GITHUB_USERNAME}/repos`);
        if (!repos || repos.length === 0) {
            console.error(`Nenhum repositório encontrado para o usuário ${GITHUB_USERNAME}.`);
            return;
        }
        const reposSection = document.getElementById('repositorios-lista');
        reposSection.innerHTML = '';
        repos.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.classList.add('repositorio');
            repoDiv.innerHTML = `
                <div class="repo-card">
                    <h3 class="repo-name">${repo.name}</h3>
                    <div class="icones">
                        <div class="starfork">
                            <div class="star">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 576 512">
                                    <path fill="#4a6696" d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6z"/>
                                </svg>
                                <p>${repo.stargazers_count}</p>
                            </div>
                            <div class="fork">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512">
                                    <path fill="#4a6696" d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3V192c0 17.7 14.3 32 32 32H304c17.7 0 32-14.3 32-32V153.3C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V192c0 53-43 96-96 96H256v70.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V288H144c-53 0-96-43-96-96V153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm208 24a24 24 0 1 0 0-48 24 24 0 1 0 0 48zM248 432a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"/>
                                </svg>
                                <p>${repo.forks_count}</p>
                            </div>
                        </div>
                    </div>
                    <div class="repo-link">
                        <a class="icone" href="repo-template.html?repo=${repo.name}" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" height="12" width="10.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#10002b" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                        </a>
                        <a class="link" href="repo-template.html?repo=${repo.name}" target="_blank">Ver Detalhes</a>
                    </div>
                </div>
            `;
            reposSection.appendChild(repoDiv);
        });
    };

    await loadGitHubRepos();
});
