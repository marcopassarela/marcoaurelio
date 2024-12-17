document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleContainer = document.getElementById('themeToggleContainer');
    const body = document.body;

    // Adicione a classe `light-theme` ao carregar a página
    body.classList.add('light-theme');

    themeToggleContainer.addEventListener('click', () => {
        // Alterna entre temas claro e escuro
        body.classList.toggle('light-theme');
        themeToggleContainer.classList.toggle('light-theme');

        // Alterar ícones
        if (body.classList.contains('light-theme')) {
            themeToggle.querySelector('.icon-sun').style.display = 'block';
            themeToggle.querySelector('.icon-moon').style.display = 'none';
        } else {
            themeToggle.querySelector('.icon-sun').style.display = 'none';
            themeToggle.querySelector('.icon-moon').style.display = 'block';
        }
    });
});


// Seleciona todos os links com a classe 'requestLink'
const links = document.querySelectorAll('.requestLink');

links.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do link
        window.location.href = '/src/pages/404.html'; // Redireciona para a página 404
    });
});


// Seleção dos elementos
const openModalBtn = document.getElementById('openModal');  // Botão para abrir o modal (exemplo)
const closeModalBtn = document.getElementById('closeModal');  // Botão de fechar o modal
const cancelModalBtn = document.getElementById('cancelModal');  // Botão "Cancelar"
const modal = document.getElementById('myModal');  // O modal em si

// Abrir o modal (adicionar o código que abre o modal aqui)
openModalBtn.addEventListener('click', function (e) {
  e.preventDefault(); // Prevenir comportamento padrão do link
  modal.style.display = 'flex'; // Exibir o modal
});

// Fechar o modal com o botão "X"
closeModalBtn.addEventListener('click', function () {
  modal.style.display = 'none'; // Esconder o modal
});

// Fechar o modal com o botão "Cancelar"
cancelModalBtn.addEventListener('click', function () {
  modal.style.display = 'none'; // Esconder o modal
});

// Fechar o modal clicando fora do conteúdo
window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none'; // Fechar o modal se clicar fora do conteúdo
  }
});
