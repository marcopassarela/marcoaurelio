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
    
    const diff = agora - dataPublicacao; // Diferença em milissegundos

    const minutos = Math.floor(diff / (1000 * 60));
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    let tempoTexto = "";

    if (dias > 0) {
        tempoTexto = `Há ${dias} dia${dias > 1 ? "s" : ""}`;
    } else if (horas > 0) {
        tempoTexto = `Há ${horas} hora${horas > 1 ? "s" : ""}`;
    } else if (minutos > 0) {
        tempoTexto = `Há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
    } else {
        tempoTexto = "Há menos de um minuto";
    }

    // Atualiza o conteúdo da página sem duplicação
    elemento.textContent = tempoTexto + " --- Por Marco Aurélio";

    // Define a cor azul
    elemento.style.color = "blue";
}

// Atualiza o tempo imediatamente
atualizarTempo();

// Opcional: Atualiza o tempo a cada 30 segundos para manter a precisão
setInterval(atualizarTempo, 30000);

