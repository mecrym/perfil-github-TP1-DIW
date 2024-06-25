document.addEventListener('DOMContentLoaded', async () => {
    const GITHUB_API_URL = 'https://api.github.com';
    const JSON_SERVER_URL = 'http://localhost:3000';
    const GITHUB_USERNAME = 'mecrym';
    const MY_TOKEN = 'hello'; // Token de autenticação GitHub

    // Verificar limite de requisições
    fetch('https://api.github.com/rate_limit', {
        headers: {
            Authorization: `Bearer ${MY_TOKEN}`
        }
    })
    .then(response => response.json())
    .then(data => console.log('Rate limit data:', data))
    .catch(error => console.error('Erro ao verificar limite de requisições:', error.message));

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

    const fetchJSONServerData = async (endpoint) => {
        try {   
            const response = await fetch(`${JSON_SERVER_URL}/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Erro ao buscar dados do JSON Server (${endpoint}): ${error.message}`);
            return null;
        }
    };

    const loadGitHubProfile = async () => {
        const profile = await fetchGitHubData(`users/${GITHUB_USERNAME}`);
        if (!profile) {
            console.error(`Perfil do usuário ${GITHUB_USERNAME} não encontrado.`);
            return;
        }
        const profileSection = document.getElementById('perfil');
        profileSection.innerHTML = `
            <img class="fotoperfil" src="${profile.avatar_url}" alt="${profile.name}">
            <h2 class="nome">${profile.name}</h2>
            <p class="descricao">${profile.bio || 'Sem descrição'}</p>
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
                <img src="${user.avatar_url}" alt="${user.login}">
                <h3>${user.login}</h3>
                <a href="${user.html_url}" target="_blank">Ver Perfil</a>
            `;
            followingSection.appendChild(userDiv);
        });
    };

    const loadJSONServerData = async () => {
        const carrosselItems = await fetchJSONServerData('carrossel');
        if (!carrosselItems || carrosselItems.length === 0) {
            console.error('Nenhum item de carrossel encontrado no JSON Server.');
            return;
        }
        const carrosselInner = document.getElementById('carrossel-items');
        carrosselInner.innerHTML = '';
        carrosselItems.forEach((item, index) => {
            const carouselItemDiv = document.createElement('div');
            carouselItemDiv.classList.add('carousel-item');
            if (index === 0) carouselItemDiv.classList.add('active');

            const iframe = document.createElement('iframe');
            iframe.classList.add('d-block', 'w-100');
            iframe.src = item.imagem;
            iframe.style.height = '300px';

            carouselItemDiv.appendChild(iframe);

            const carouselCaptionDiv = document.createElement('div');
            carouselCaptionDiv.classList.add('carousel-caption', 'd-none', 'd-md-block');
            carouselCaptionDiv.innerHTML = `
                <h5>${item.descricao}</h5>
                <p>${item.infoAdicional || 'Sem informações adicionais'}</p>
            `;
            carouselItemDiv.appendChild(carouselCaptionDiv);

            carrosselInner.appendChild(carouselItemDiv);
        });
    };

    // Iniciar carregamento dos dados
    await loadGitHubProfile();
    await loadGitHubRepos();
    await loadGitHubFollowing();
    await loadJSONServerData();
});
