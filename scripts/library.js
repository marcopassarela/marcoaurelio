const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let currentIndex = 0;
const totalItems = document.querySelectorAll('.carousel-item').length;
const itemsPerSlide = 1; // Número de itens que aparecem de cada vez
const itemWidth = 100 / itemsPerSlide; // Calcula a largura de cada item como uma fração de 100%

// Função que atualiza a posição do carrossel
function updateCarousel() {
    track.style.transition = 'transform 0.6s ease-in-out'; // Adiciona transição suave
    track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
}

// Função para avançar automaticamente
function autoAdvance() {
    if (currentIndex < totalItems / itemsPerSlide - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Quando chega no final, volta para o início
    }
    updateCarousel();
}

// Inicia o loop automático a cada 3 segundos
setInterval(autoAdvance, 6000);

// Avança para o próximo conjunto de itens (quando o botão "next" for clicado)
nextButton.addEventListener('click', () => {
    if (currentIndex < totalItems / itemsPerSlide - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Quando chega no final, volta para o início
    }
    updateCarousel();
});

// Volta para o conjunto anterior de itens (quando o botão "prev" for clicado)
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalItems / itemsPerSlide - 1; // Quando está no início, volta para o final
    }
    updateCarousel();
});

// Função para garantir que o carrossel reinicie no começo corretamente
function resetCarousel() {
    if (currentIndex >= totalItems / itemsPerSlide) {
        currentIndex = 0;
        updateCarousel();
    }
}

// Chama a função para ajustar o carrossel ao carregar
window.addEventListener('load', resetCarousel);
