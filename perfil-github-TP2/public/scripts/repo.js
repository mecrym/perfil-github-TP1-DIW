document.addEventListener('DOMContentLoaded', () => {
  const carrosselData = {
      "carrossel": [
          {
              "id": 1,
              "imagem": "https://github-readme-stats.vercel.app/api?username=mecrym&theme=midnight-purple&show_icons=true&hide_border=true&count_private=true",
              "descricao": "Estatísticas do GitHub de mecrym",
              "infoAdicional": "Preencha aqui com as informações desejadas"
          },
          {
              "id": 2,
              "imagem": "https://github-readme-streak-stats.herokuapp.com/?user=mecrym&theme=midnight-purple&hide_border=true",
              "descricao": "Contribuições de mecrym",
              "infoAdicional": "Preencha aqui com as informações desejadas"
          },
          {
              "id": 3,
              "imagem": "https://github-readme-stats.vercel.app/api/top-langs/?username=mecrym&theme=midnight-purple&show_icons=true&hide_border=true&layout=compact",
              "descricao": "Linguagens mais utilizadas por mecrym",
              "infoAdicional": "Preencha aqui com as informações desejadas"
          }
      ]
  };

  const carouselImagesContainer = document.querySelector('.carousel-images');

  carrosselData.carrossel.forEach(item => {
      const imgElement = document.createElement('img');
      imgElement.src = item.imagem;
      imgElement.alt = item.descricao;
      imgElement.classList.add('carousel-image');
      carouselImagesContainer.appendChild(imgElement);
  });

  // Função para ajustar o carrossel
  initCarousel();
});

function initCarousel() {
  const carouselContainer = document.querySelector('.carousel-container');
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const carouselImages = document.querySelectorAll('.carousel-image');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  let currentIndex = 0;

  // Ajustar o tamanho das imagens
  carouselImages.forEach(img => {
      img.style.width = '70%';
  });

  // Funções para mover o carrossel
  function showImage(index) {
      const translateX = -index * carouselWrapper.clientWidth;
      carouselWrapper.style.transform = `translateX(${translateX}px)`;
  }

  leftArrow.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselImages.length - 1;
      showImage(currentIndex);
  });

  rightArrow.addEventListener('click', () => {
      currentIndex = (currentIndex < carouselImages.length - 1) ? currentIndex + 1 : 0;
      showImage(currentIndex);
  });

  // Tornar o carrossel responsivo
  window.addEventListener('resize', () => {
      showImage(currentIndex);
  });

  // Mostrar a primeira imagem inicialmente
  showImage(currentIndex);
}
