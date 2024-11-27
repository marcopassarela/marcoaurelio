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

// Função para aplicar as preferências de cookies
function applyCookiePreferences() {
    const cookieChoice = getCookie("cookieChoice");

    if (cookieChoice === "acceptAll") {
        console.log("Aceitar todos os cookies. Carregando scripts adicionais.");
        loadAdditionalScripts(); // Função para carregar scripts adicionais
    } else if (cookieChoice === "acceptNecessary") {
        console.log("Carregar apenas cookies essenciais.");
        // Aqui só carregamos o essencial
    } else if (cookieChoice === "denyAll") {
        console.log("Nenhum cookie será carregado.");
        // Nenhum script adicional será carregado
    }
}

// Função para carregar scripts adicionais
function loadAdditionalScripts() {
    // Exemplo: Google Analytics
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

    // Exemplo: Outros scripts podem ser adicionados aqui
}

// Exibe o popup apenas se o cookie ainda não existir
document.addEventListener("DOMContentLoaded", () => {
    const cookieChoice = getCookie("cookieChoice");
    const popup = document.getElementById("popup");

    if (!cookieChoice) {
        popup.style.display = "flex"; // Mostra o popup
    } else {
        applyCookiePreferences(); // Aplica as preferências se o cookie já existir
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
