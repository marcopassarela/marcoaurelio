// Dados dos livros
const books = [
    {
        title: "Os Segredos da Mente Milionária",
        description: "Este livro de T. Harv Eker ensina como desenvolver a mentalidade de um milionário e mudar sua relação com o dinheiro.",
    },
    {
        title: "O Poder do Subconsciente",
        description: "Um guia para usar o poder do subconsciente para alcançar objetivos e superar desafios.",
    },
    {
        title: "Test",
        description: "Um guia para usar o poder do subconsciente para alcançar objetivos e superar desafios.",
    }
    // Adicione mais livros aqui
];

// Seleciona todos os itens e o modal
const bookElements = document.querySelectorAll('.options-books img');
const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const closeModal = document.querySelector('.close-btn');

// Adiciona evento a cada imagem
bookElements.forEach((img, index) => {
    img.addEventListener('click', () => {
        // Preenche o modal com os dados do livro correspondente
        modalTitle.textContent = books[index].title;
        modalDescription.textContent = books[index].description;

        // Exibe o modal
        modal.style.display = 'flex';
    });
});

// Fecha o modal ao clicar no botão de fechar
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
