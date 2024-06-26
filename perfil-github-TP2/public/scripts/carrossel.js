document.addEventListener('DOMContentLoaded', async () => {
    const carouselContainer = document.getElementById('carousel-inner');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const dbPath = 'http://localhost:3000/carrossel'; // URL para acessar o JSON servido pelo json-server

    // Função para buscar dados do JSON local
    const fetchLocalJSONData = async (path) => {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Erro ao buscar dados do JSON local (${path}): ${error.message}`);
            return null;
        }
    };

    // Carregar imagens do carrossel
    const loadCarouselImages = async () => {
        const data = await fetchLocalJSONData(dbPath);
        if (!data || !Array.isArray(data)) {
            console.error('Nenhuma imagem encontrada no carrossel.');
            return;
        }

        data.forEach((item) => {
            const imgDiv = document.createElement('div');
            imgDiv.classList.add('carousel-item');
            imgDiv.innerHTML = `<img src="${item.imagem}" alt="${item.descricao}" />`;
            carouselContainer.appendChild(imgDiv);
        });

        updateCarousel();
    };

    let currentIndex = 0;

    const updateCarousel = () => {
        const items = document.querySelectorAll('.carousel-item');
        const offset = -currentIndex * 100;  // Calcula a posição de deslocamento
        carouselContainer.style.transform = `translateX(${offset}%)`;
    };

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? carouselContainer.children.length - 1 : currentIndex - 1;
        updateCarousel();
    });
    
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === carouselContainer.children.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    await loadCarouselImages();
});
