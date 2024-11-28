// Função para criar um cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Função para ler um cookie
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) {
            return value;
        }
    }
    return null;
}

// Função para carregar Google Analytics (se necessário)
function loadGoogleAnalytics() {
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
}

// Função para carregar Google Tag Manager (se necessário)
function loadGoogleTagManager() {
    const gtmScript = document.createElement("script");
    gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=GTM-TX48535W";
    gtmScript.async = true;
    document.head.appendChild(gtmScript);

    // Adicionar o iframe do GTM (fallback para usuários com noscript)
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TX48535W" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);
}

// Função para carregar scripts essenciais
function loadEssentialScripts() {
    // Aqui você pode adicionar scripts essenciais para o funcionamento do site, como navegação e formulários.
    console.log("Carregando scripts essenciais...");
    // Exemplo de script essencial:
    const essentialScript = document.createElement("script");
    essentialScript.src = "/js/essential.js"; // Substitua com o caminho do seu script essencial
    document.head.appendChild(essentialScript);
}

// Função para aplicar a escolha de cookies
function applyCookiePreferences() {
    const cookieChoice = getCookie("cookieChoice");

    if (cookieChoice === "acceptAll") {
        console.log("Carregar todos os cookies, incluindo de terceiros.");
        loadEssentialScripts(); // Sempre carrega scripts essenciais
        loadGoogleAnalytics();  // Carrega Google Analytics
        loadGoogleTagManager(); // Carrega Google Tag Manager
    } else if (cookieChoice === "acceptNecessary") {
        console.log("Carregar apenas cookies necessários.");
        loadEssentialScripts(); // Carrega apenas scripts essenciais (sem rastreamento)
    } else if (cookieChoice === "denyAll") {
        console.log("Nenhum cookie será carregado.");
        // Não carrega nenhum script adicional, apenas os essenciais.
    }
}

// Mostrar popup apenas se o cookieChoice ainda não foi definido
document.addEventListener("DOMContentLoaded", () => {
    const cookieChoice = getCookie("cookieChoice");
    if (!cookieChoice) {
        document.getElementById("popup").style.display = "flex";
    } else {
        applyCookiePreferences();
    }
});

// Configurar os botões do popup
document.getElementById("acceptAll").addEventListener("click", () => {
    setCookie("cookieChoice", "acceptAll", 15); // Aceitar todos os cookies por 15 dias
    applyCookiePreferences();
    document.getElementById("popup").style.display = "none";
});

document.getElementById("acceptNecessary").addEventListener("click", () => {
    setCookie("cookieChoice", "acceptNecessary", 15); // Aceitar apenas os necessários
    applyCookiePreferences();
    document.getElementById("popup").style.display = "none";
});

document.getElementById("denyAll").addEventListener("click", () => {
    setCookie("cookieChoice", "denyAll", 15); // Negar todos os cookies
    applyCookiePreferences();
    document.getElementById("popup").style.display = "none";
});
