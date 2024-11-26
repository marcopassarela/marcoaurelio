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

function atualizarTempo() {
    const elemento = document.getElementById("tempo-noticia");
    const dataPublicacao = new Date(elemento.getAttribute("data-time"));
    const agora = new Date();

    // Calcula a diferença em milissegundos
    const diferenca = agora - dataPublicacao;

    // Se a diferença for muito grande (por exemplo, mais de 1 dia), defina como a hora atual
    if (diferenca < 1000 * 60) {  // Se for menor que 1 minuto
        elemento.textContent = "Há menos de 1 minuto --- Marco Aurélio";
    } else {
        // Calcula os minutos, horas, e dias
        const minutosAtras = Math.floor(diferenca / (1000 * 60)); // em minutos
        const horasAtras = Math.floor(diferenca / (1000 * 60 * 60)); // em horas
        const diasAtras = Math.floor(diferenca / (1000 * 60 * 60 * 24)); // em dias

        let tempoTexto = '';

        // Verifica se passou menos de 1 hora
        if (minutosAtras < 60) {
            tempoTexto = minutosAtras + " minuto" + (minutosAtras === 1 ? '' : 's');
        } 
        // Verifica se passou menos de 24 horas
        else if (horasAtras < 24) {
            tempoTexto = horasAtras + " hora" + (horasAtras === 1 ? '' : 's');
        } 
        // Se passou mais de 1 dia
        else {
            tempoTexto = diasAtras + " dia" + (diasAtras === 1 ? '' : 's');
        }

        // Atualiza o conteúdo do span com o tempo calculado
        elemento.textContent = "Há " + tempoTexto + " — Por Marco Aurélio";
    }
}

// Chama a função ao carregar a página
window.onload = atualizarTempo;
