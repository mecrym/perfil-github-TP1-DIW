document.addEventListener('DOMContentLoaded', async () => {
    const GITHUB_API_URL = 'https://api.github.com';
    const GITHUB_USERNAME = 'mecrym';
    const MY_TOKEN = 'hello'; // Token de autenticação GitHub
    const LOCAL_JSON_FILENAME = 'db.json';

    // Função para carregar dados do arquivo JSON local
    const fetchLocalJSONData = async (filename) => {
        try {
            const response = await fetch(`../${filename}`); // Caminho para db.json, assumindo que está um nível acima de scripts
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Erro ao buscar dados do JSON local (${filename}): ${error.message}`);
            return null;
        }
    };

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

    const loadGitHubProfile = async () => {
        const profile = await fetchGitHubData(`users/${GITHUB_USERNAME}`);
        if (!profile) {
            console.error(`Perfil do usuário ${GITHUB_USERNAME} não encontrado.`);
            return;
        }
        const profileSection = document.getElementById('perfil2');
        profileSection.innerHTML = `
            <img class="fotoperfil" src="${profile.avatar_url}" alt="${profile.name}">
            <h2 class="nome">${profile.name}</h2>
            <p class="descricao">${profile.bio || 'Sem descrição'}</p>
            <p class="seguidores"><strong>Seguidores:</strong> ${profile.followers}</p>
            <p class="localizacao"><strong>Localização:</strong> ${profile.location || 'Não informada'}</p>
            <p class="github"><strong>GitHub: </strong> <a class="linkperfil" href="${profile.html_url}" target="_blank">mecrym</a></p>
            <p class="linkedin"><strong>LinkedIn: </strong> <a class="linkperfil" href="https://www.linkedin.com/in/mecrym/" target="_blank">Maria Moreira</a></p>

        `;
    };

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
            repoDiv.classList.add('repo-card');
            repoDiv.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'Sem descrição'}</p>
                <a href="repo.html?name=${repo.name}" target="_blank">Acessar Detalhes</a>
            `;
            reposSection.appendChild(repoDiv);
        });
    };

    const loadGitHubFollowing = async () => {
        const following = await fetchGitHubData(`users/${GITHUB_USERNAME}/following`);
        if (!following || following.length === 0) {
            console.error(`Nenhum usuário seguido encontrado para o usuário ${GITHUB_USERNAME}.`);
            return;
        }
        const followingSection = document.getElementById('seguindo-lista');
        followingSection.innerHTML = '';
        following.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('following-card');
            userDiv.innerHTML = `
                <img class="fotoseguindo" src="${user.avatar_url}" alt="${user.login}">
                <a class="linkgithubseguindo" href="${user.html_url}" target="_blank">GitHub</a>
            `;
            followingSection.appendChild(userDiv);
        });
    };

    // Iniciar carregamento dos dados
    await loadGitHubProfile();
    await loadGitHubRepos();
    await loadGitHubFollowing();
    await loadLocalJSONData();
});
