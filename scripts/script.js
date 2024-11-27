// Função para corrigir o scroll ao topo
window.addEventListener("load", () => {
    // Corrige o scroll ao topo assim que a página carrega
    window.scrollTo(0, 0); // Ajuste o scroll ao topo

    const loadingScreen = document.getElementById("loading");
    const mainContent = document.getElementById("conteudo-principal");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingPercentage = document.getElementById("loading-percentage");
    let percentage = 0;

    // Verifica se o carregamento já foi exibido nesta sessão
    const hasLoadedInSession = sessionStorage.getItem("hasLoaded");

    if (hasLoadedInSession) {
        // Se já foi exibido na sessão, pula a animação de carregamento
        loadingScreen.style.display = "none";
        mainContent.style.display = "block";
        document.body.style.overflow = "auto";
    } else {
        // Caso contrário, executa o carregamento
        function incrementPercentage() {
            if (percentage < 100) {
                percentage++;
                loadingBar.style.width = `${percentage}%`;
                loadingPercentage.textContent = `${percentage}%`;

                if (percentage === 25 || percentage === 33 || percentage === 54 || percentage === 88) {
                    // Pausa em porcentagens específicas
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
                    loadingScreen.style.display = "none"; // Remove a tela de carregamento
                    mainContent.style.display = "block"; // Exibe o conteúdo principal
                    document.body.style.overflow = "auto"; // Habilita a rolagem novamente

                    // Salva no Session Storage que o carregamento foi exibido
                    sessionStorage.setItem("hasLoaded", "true");
                }, 1000); // 1000ms corresponde ao tempo da transição CSS
            }
        }

        // Inicia o carregamento
        incrementPercentage();
    }

    // Seleciona todos os cards uma única vez
    const cards = document.querySelectorAll('.card');

    // Manipulação dos cards
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

    // Evento para verificar cliques fora dos cards
    document.addEventListener('click', function(event) {
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

    // Impede o fechamento dos checkboxes ao clicar neles
    document.querySelectorAll('.toggle-card').forEach(checkbox => {
        checkbox.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });

    // Seleciona todos os links com a classe 'requestLink'
    const links = document.querySelectorAll('.requestLink');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            window.location.href = 'src/pages/404.html';  
        });
    });
});
