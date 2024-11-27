// Função para corrigir o scroll ao topo
window.addEventListener("load", () => {
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

// Função para criar um cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Define a data de expiração
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/"; // Configura o cookie
    console.log(`Cookie set: ${name}=${value}`);
}

// Função para ler um cookie
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) {
            console.log(`Cookie read: ${key}=${value}`);
            return value;
        }
    }
    console.log(`Cookie not found: ${name}`);
    return null;
}

// Função para aplicar as preferências de cookies
function applyCookiePreferences() {
    const cookieChoice = getCookie("cookieChoice");
    console.log(`Cookie choice: ${cookieChoice}`);

    // Se o usuário aceitou todos os cookies
    if (cookieChoice === "acceptAll") {
        loadEssentialScripts();  // Carregar apenas os essenciais
        loadOptionalCookies();  // Carregar cookies opcionais (Google Analytics, etc.)
    } 
    // Se o usuário aceitou apenas os cookies necessários
    else if (cookieChoice === "acceptNecessary") {
        loadEssentialScripts();  // Carregar apenas os essenciais
    }
}

// Função para carregar scripts essenciais (necessários)
function loadEssentialScripts() {
    console.log("Carregando scripts essenciais...");
    // Carregar scripts essenciais aqui, sem rastreamento
}

// Função para carregar Google Analytics e outros cookies opcionais
function loadOptionalCookies() {
    console.log("Carregando cookies opcionais (Analytics e GTM)...");
    // Carregar Google Analytics
    const gaScript = document.createElement("script");
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-C4L3SX788S";
    gaScript.async = true;
    document.head.appendChild(gaScript);

    gaScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-C4L3SX788S");
    };

    // Carregar Google Tag Manager
    const gtmScript = document.createElement("script");
    gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=GTM-TX48535W";
    gtmScript.async = true;
    document.head.appendChild(gtmScript);
}

// Mostrar popup se o usuário ainda não escolheu ou se negou todos os cookies
document.addEventListener("DOMContentLoaded", () => {
    const cookieChoice = getCookie("cookieChoice");
    console.log(`cookieChoice on page load: ${cookieChoice}`);

    if (!cookieChoice || cookieChoice === "denyAll") {
        // Mostrar o popup apenas se não houver escolha ou se o usuário negou todos os cookies
        document.getElementById("popup").style.display = "flex"; 
    } else {
        // Aplicar as preferências do usuário
        applyCookiePreferences();
    }
});

// Configurar os botões de aceitação de cookies
document.getElementById("acceptAll").addEventListener("click", () => {
    setCookie("cookieChoice", "acceptAll", 15); // Salvar escolha de aceitar todos os cookies por 15 dias
    applyCookiePreferences(); // Aplicar preferências imediatamente
    document.getElementById("popup").style.display = "none"; // Fechar o popup
});

document.getElementById("acceptNecessary").addEventListener("click", () => {
    setCookie("cookieChoice", "acceptNecessary", 15); // Salvar escolha de aceitar apenas os necessários por 15 dias
    applyCookiePreferences(); // Aplicar preferências imediatamente
    document.getElementById("popup").style.display = "none"; // Fechar o popup
});

document.getElementById("denyAll").addEventListener("click", () => {
    setCookie("cookieChoice", "denyAll", 15); // Salvar escolha de negar todos os cookies por 15 dias
    applyCookiePreferences(); // Aplicar preferências imediatamente
    document.getElementById("popup").style.display = "none"; // Fechar o popup
});

});
