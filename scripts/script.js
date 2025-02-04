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

// Função para abrir a janela modal
function showModal() {
    document.getElementById("cookieModal").style.display = "flex"; // Exibe a modal
}

// Função para fechar a janela modal
function closeModal() {
    document.getElementById("cookieModal").style.display = "none"; // Esconde a modal
}

// Fechar a modal se o usuário clicar fora dela
window.onclick = function(event) {
    if (event.target == document.getElementById("cookieModal")) {
        closeModal();
    }
}


// IDs dos elementos a serem observados
const elementsToObserve = ['#my', '#skills', '#about', '#contact', '#privacy', '#menu', '#menu-toggle', '#title'];

if (elementsToObserve.length) {
    const myObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting && !entry.target.classList.contains('myShow')) {
                entry.target.classList.add('myShow');
                myObserver.unobserve(entry.target); 
            }
        });
    }); 
    // Observa cada elemento do array
    elementsToObserve.forEach(id => {
        const element = document.querySelector(id);
        if (element) myObserver.observe(element);
    });
}

// Lógica de clique
document.getElementById('menu').addEventListener('click', function() {
    this.classList.add('clicked');
});


// Time de 5 segundos para exibir o popup!
window.addEventListener('load', () => {
    setTimeout(() => {
        const popup = document.querySelector('#popup');
        popup.classList.add('show');
    }, 4000); // Tempo de 4 segundos
});


// Função para verificar a versão do site
document.addEventListener("DOMContentLoaded", () => {
    const versionUrl = '/version.json'; 

    // Verificar a versão do site
    fetch(versionUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar a versão");
            }
            return response.json();
        })
        .then(data => {
            const currentVersion = data.version;
            const updateMessage = data.updateMessage || "Atualização disponível.";
            const importantNotes = data.importantNotes || "Verifique as melhorias.";

            console.log("Versão atual:", currentVersion);

            let storedVersion = localStorage.getItem("siteVersion");

            // Se a versão armazenada for diferente da versão atual, exibe o modal
            if (storedVersion !== currentVersion) {
                showUpdateModal(currentVersion, updateMessage, importantNotes);
            } else {
                console.log("A página está atualizada.");
            }
            localStorage.setItem("siteVersion", currentVersion);
        })
        .catch(error => {
            console.error("Erro:", error);
        });
});

// Função para exibir o modal de atualização
function showUpdateModal(version, updateMessage, importantNotes) {
    const modal = document.getElementById("modalupgrade");
    const versionDisplay = document.getElementById("current-version");
    const updateInfo = document.getElementById("update-info");
    const updateNotes = document.getElementById("update-notes");

    updateInfo.innerHTML = `Versão atual: <strong>${updateMessage}</strong>`;
    versionDisplay.innerHTML = `Próxima versão: <strong>${version}</strong>`;
    updateNotes.innerHTML = `<strong>Notas importantes:</strong> ${importantNotes}`;

    modal.style.display = "flex"; // Exibe o modal de forma imediata

    document.getElementById('update-btn').addEventListener('click', () => {
        modal.style.display = "none"; // Fecha o modal
        startLoadingAnimation(); // Inicia a animação de carregamento
    });
}

function startLoadingAnimation() {
    const loadingScreen = document.getElementById("loading-container");
    loadingScreen.style.display = "flex";

    const verifyingProgress = document.getElementById("verifying-progress");
    const downloadingProgress = document.getElementById("downloading-progress");
    const installingProgress = document.getElementById("installing-progress");
    const stepSuccess = document.getElementById("step-success");

    stepSuccess.style.display = "none"; // Esconde a etapa de sucesso inicialmente

    const simulateStep = (progressElement, callback) => {
        let progress = 0;

        const updateProgress = () => {
            // Atualiza o texto do progresso
            progressElement.innerText = `${progress}%`;

            // Adiciona pausas específicas
            if ([15, 27, 39, 68, 78].includes(progress)) {
                setTimeout(() => {
                    progress += 1;
                    updateProgress(); // Chama a função recursivamente
                }, 500); // Pausa de 500ms
            } else if (progress < 100) {
                progress += 1;
                setTimeout(updateProgress, 50); // Continua a animação
            } else {
                // Adiciona a classe de sucesso ao atingir 100%
                progressElement.classList.add('progress-success');
                if (callback) callback();
            }
        };

        updateProgress(); // Inicia a atualização do progresso
    };

    // Sequência de animação
    simulateStep(verifyingProgress, () => {
        console.log("Verificação concluída");
        simulateStep(downloadingProgress, () => {
            console.log("Download concluído");
            simulateStep(installingProgress, () => {
                console.log("Instalação concluída");
                stepSuccess.style.display = "block"; // Exibe a etapa de sucesso
                console.log("Atualização aplicada com sucesso!");

                setTimeout(() => {
                    location.reload(); // Recarrega a página após a animação de sucesso
                    console.log("Página recarregada");
                }, 2000); // Delay de 2 segundos antes de recarregar a página
            });
        });
    });
}

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

// Função para verificar se estamos em um dispositivo desktop
function isDesktop() {
    return window.innerWidth >= 768;
}

// Inicialização quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    if (isDesktop()) {
        // No desktop, o menu começa sempre visível
        menu.classList.add("active");
        menu.style.visibility = "visible";
        menu.style.opacity = "1";
    } else {
        // No mobile, o menu começa oculto
        menu.classList.remove("active");
        menu.style.visibility = "hidden";
        menu.style.opacity = "0";
    }
});

// Alternar o menu hamburguer
menuToggle.addEventListener('click', () => {
    if (isDesktop()) {
        // No desktop, o menu está sempre visível
        menu.style.visibility = "visible";
        menu.style.opacity = "1";
        menu.classList.add("active");
        menuToggle.classList.add('open');
    } else {
        // No mobile, alterna entre abrir e fechar o menu com animação
        if (menu.classList.contains("active")) {
            // Se o menu está ativo (aberto), fecha ele
            menu.style.visibility = "hidden";
            menu.style.opacity = "0";
            menu.classList.remove("active");
            menuToggle.classList.remove('open');
        } else {
            // Caso contrário, abre o menu
            menu.style.visibility = "visible";
            menu.style.opacity = "1";
            menu.classList.add("active");
            menuToggle.classList.add('open');
        }
    }
});

// Fechar o menu ao clicar em um link do menu no mobile
const menuLinks = document.querySelectorAll('#menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!isDesktop()) {
            menu.style.visibility = "hidden";
            menu.style.opacity = "0";
            menu.classList.remove("active");
            menuToggle.classList.remove('open');
        }
    });
});

// Atualizar o comportamento do menu quando redimensionar a janela
window.addEventListener('resize', function () {
    if (isDesktop()) {
        // No desktop, o menu está sempre visível
        menu.classList.add("active");
        menu.style.visibility = "visible";
        menu.style.opacity = "1";
    } else {
        // No mobile, o menu começa oculto
        menu.classList.remove("active");
        menu.style.visibility = "hidden";
        menu.style.opacity = "0";
    }
});