document.addEventListener('DOMContentLoaded', () => {
    const GITHUB_API_URL = 'https://cors-anywhere.herokuapp.com/https://api.github.com'; // Usando CORS Anywhere como proxy
    const JSON_SERVER_URL = 'http://localhost:3000';
    const GITHUB_USERNAME = 'mecrym'; // Substitua pelo seu nome de usuário

    const fetchGitHubData = async (endpoint) => {
        try {
            const response = await fetch(`${GITHUB_API_URL}/${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error(`Erro ao buscar dados do GitHub (${endpoint}):`, error);
            throw error; // Rejeitar a promessa para que a falha seja propagada
        }
    };

    const fetchJSONServerData = async (endpoint) => {
        try {
            const response = await fetch(`${JSON_SERVER_URL}/${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error(`Erro ao buscar dados do JSON Server (${endpoint}):`, error);
            throw error; // Rejeitar a promessa para que a falha seja propagada
        }
    };

    const loadGitHubProfile = async () => {
        try {
            const profile = await fetchGitHubData(`users/${GITHUB_USERNAME}`);
            const profileSection = document.getElementById('perfil');
            profileSection.innerHTML = `
                <img src="${profile.avatar_url}" alt="${profile.name}">
                <h2>${profile.name}</h2>
                <p>${profile.bio}</p>
            `;
        } catch (error) {
            console.error('Erro ao carregar perfil do GitHub:', error);
        }
    };

    const loadGitHubRepos = async () => {
        try {
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
        } catch (error) {
            console.error('Erro ao carregar repositórios do GitHub:', error);
        }
    };

    const loadGitHubFollowing = async () => {
        try {
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
        } catch (error) {
            console.error('Erro ao carregar usuários seguidos do GitHub:', error);
        }
    };

    const loadJSONServerData = async () => {
        try {
            const carrosselItems = await fetchJSONServerData('carrossel');
            const carrosselInner = document.getElementById('carrossel-items');
            carrosselInner.innerHTML = ''; // Limpar conteúdo existente

            carrosselItems.forEach((item, index) => {
                const carouselItemDiv = document.createElement('div');
                carouselItemDiv.classList.add('carousel-item');
                if (index === 0) carouselItemDiv.classList.add('active');

                // Criar o iframe para carregar a imagem dinamicamente
                const iframe = document.createElement('iframe');
                iframe.classList.add('d-block', 'w-100');
                iframe.src = item.imagem;
                iframe.style.height = '300px'; // Ajustar conforme necessário

                carouselItemDiv.appendChild(iframe);

                // Adicionar a descrição e informações adicionais (opcional)
                const carouselCaptionDiv = document.createElement('div');
                carouselCaptionDiv.classList.add('carousel-caption', 'd-none', 'd-md-block');
                carouselCaptionDiv.innerHTML = `
                    <h5>${item.descricao}</h5>
                    <p>${item.infoAdicional}</p>
                `;
                carouselItemDiv.appendChild(carouselCaptionDiv);

                carrosselInner.appendChild(carouselItemDiv);
            });
        } catch (error) {
            console.error('Erro ao carregar dados do JSON Server:', error);
        }
    };

    // Carregar dados ao iniciar a página
    loadGitHubProfile();
    loadGitHubRepos();
    loadGitHubFollowing();
    loadJSONServerData();
});
