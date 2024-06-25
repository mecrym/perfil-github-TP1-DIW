document.addEventListener("DOMContentLoaded", function() {
    fetch('img.json')
        .then(response => response.json())
        .then(data => {
            createCarousel(data.carrossel);
        })
        .catch(error => console.error('Erro ao buscar os dados do carrossel:', error));
});

function createCarousel(images) {
    const carouselContainer = document.querySelector('.carousel-container');

    const carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';

    images.forEach((image, index) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;

        const imgElement = document.createElement('img');
        imgElement.src = image.imagem;
        imgElement.alt = image.descricao;

        imgDiv.appendChild(imgElement);
        carouselInner.appendChild(imgDiv);
    });

    carouselContainer.appendChild(createArrow('prev', '&lsaquo;'));
    carouselContainer.appendChild(carouselInner);
    carouselContainer.appendChild(createArrow('next', '&rsaquo;'));

    addCarouselFunctionality();
}

function createArrow(direction, symbol) {
    const arrow = document.createElement('a');
    arrow.className = `carousel-control-${direction}`;
    arrow.innerHTML = symbol;
    arrow.href = '#';
    return arrow;
}

function addCarouselFunctionality() {
    let currentIndex = 0;

    const prevArrow = document.querySelector('.carousel-control-prev');
    const nextArrow = document.querySelector('.carousel-control-next');
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;

    function showItem(index) {
        items[currentIndex].classList.remove('active');
        items[index].classList.add('active');
        currentIndex = index;
    }

    prevArrow.addEventListener('click', (e) => {
        e.preventDefault();
        const newIndex = (currentIndex - 1 + totalItems) % totalItems;
        showItem(newIndex);
    });

    nextArrow.addEventListener('click', (e) => {
        e.preventDefault();
        const newIndex = (currentIndex + 1) % totalItems;
        showItem(newIndex);
    });
}
