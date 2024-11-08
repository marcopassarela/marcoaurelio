window.onload = function() {
    window.scrollTo(0, 0);
};
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading");
    const mainContent = document.getElementById("conteudo-principal");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingPercentage = document.getElementById("loading-percentage");
    let percentage = 0;

    function incrementPercentage() {
        if (percentage < 100) {
            percentage++;
            loadingBar.style.width = `${percentage}%`;
            loadingPercentage.textContent = `${percentage}%`;

            if (percentage === 25 || percentage === 33 || percentage === 54 || percentage == 88) {
                // Pausa em 25%, 65% e 88% por 1 segundo
                setTimeout(incrementPercentage, 1000);
            } else {
                // Carregamento mais lento
                setTimeout(incrementPercentage, 60);
            }
        } else {
            // Aplica o efeito de fade-out ao completar 100%
            loadingScreen.classList.add("fade-out");

            // Aguarda o tempo da transição para ocultar a tela de carregamento
            setTimeout(() => {
                loadingScreen.style.display = "none"; // Garante que a tela de carregamento seja removida
                mainContent.style.display = "block"; // Exibe o conteúdo principal
                document.body.style.overflow = "auto"; // Habilita a rolagem novamente
            }, 1000); // 1000ms corresponde ao tempo da transição CSS
        }
    }

    // Inicia o carregamento
    incrementPercentage();
});

// Selecione todos os cards
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        // Adiciona a classe flipped ao card clicado
        card.classList.add('flipped');
        // Remove a classe flipped após 7 segundos
        setTimeout(() => {
            card.classList.remove('flipped');
        }, 7000); // 7000ms = 7s
    });
});

document.addEventListener('click', function(event) {
    const cards = document.querySelectorAll('.card');
    const checkboxes = document.querySelectorAll('.toggle-card');
    
    let clickedInsideCard = false;
    for (let card of cards) {
        if (card.contains(event.target)) {
            clickedInsideCard = true;
            break;
        }
    }

    if (!clickedInsideCard) {
        checkboxes.forEach(checkbox => checkbox.checked = false);
    }
});

document.querySelectorAll('.toggle-card').forEach(checkbox => {
    checkbox.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});