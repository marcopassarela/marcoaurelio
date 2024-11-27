// Função para criar um cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
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

// Função para aplicar as preferências de cookies
function applyCookiePreferences() {
    const cookieChoice = getCookie("cookieChoice");

    switch (cookieChoice) {
        case "acceptAll":
            console.log("Aceitar todos os cookies. Carregando scripts adicionais.");
            loadAdditionalScripts();
            break;
        case "acceptNecessary":
            console.log("Carregar apenas cookies essenciais.");
            break;
        case "denyAll":
            console.log("Nenhum cookie será carregado.");
            break;
        default:
            console.log("Nenhuma ação de cookie configurada.");
    }
}

// Função para carregar scripts adicionais
function loadAdditionalScripts() {
    if (!document.getElementById("ga-script")) {
        const gaScript = document.createElement("script");
        gaScript.id = "ga-script";
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
}

// Evento de inicialização do DOM
document.addEventListener("DOMContentLoaded", () => {
    const cookieChoice = getCookie("cookieChoice");
    const popup = document.getElementById("popup");

    if (!cookieChoice) {
        console.log("Aguardando consentimento de cookies.");
        popup.style.display = "flex"; // Exibe o popup
    } else {
        applyCookiePreferences(); // Aplica as preferências do cookie
    }
});

// Configuração dos botões do popup
document.getElementById("acceptAll").addEventListener("click", () => {
    setCookie("cookieChoice", "acceptAll", 15);
    applyCookiePreferences();
    document.getElementById("popup").style.display = "none";
});

document.getElementById("acceptNecessary").addEventListener("click", () => {
    setCookie("cookieChoice", "acceptNecessary", 15);
    applyCookiePreferences();
    document.getElementById("popup").style.display = "none";
});

document.getElementById("denyAll").addEventListener("click", () => {
    setCookie("cookieChoice", "denyAll", 15);
    applyCookiePreferences();
    document.getElementById("popup").style.display = "none";
});
