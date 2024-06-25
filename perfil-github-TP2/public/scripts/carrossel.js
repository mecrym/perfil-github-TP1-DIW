document.addEventListener("DOMContentLoaded", function() {
    fetch('img.json')
        .then(response => response.json())
        .then(data => {
            createCarousel(data.carrossel);
        })
        .catch(error => console.error('Erro ao buscar os dados do carrossel:', error));
});

function createCarousel(images) {
    const carouselInner = document.querySelector('.carousel-inner');
    let currentIndex = 0;

    images.forEach((image, index) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        
        const imgElement = document.createElement('img');
        imgElement.src = image.imagem;
        imgElement.alt = image.descricao;

        imgDiv.appendChild(imgElement);
        carouselInner.appendChild(imgDiv);
    });

    document.querySelector('.carousel-control-prev').addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });

    document.querySelector('.carousel-control-next').addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });

    function moveToSlide(index) {
        const totalSlides = images.length;
        if (index < 0) {
            index = totalSlides - 1;
        } else if (index >= totalSlides) {
            index = 0;
        }

        const currentSlide = document.querySelector('.carousel-item.active');
        const nextSlide = document.querySelector(`.carousel-item:nth-child(${index + 1})`);

        currentSlide.classList.remove('active');
        nextSlide.classList.add('active');

        currentIndex = index;
    }
}
