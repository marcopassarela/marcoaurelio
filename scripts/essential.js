// Função para criar um cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Função para ler um cookie
function getCookie(name) {
    const cookies = document.cookie ? document.cookie.split("; ") : [];
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

// Função para carregar Google Analytics
function loadGoogleAnalytics() {
    const gaScript = document.createElement("script");
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-C4L3SX788S";
    gaScript.async = true;
    document.head.appendChild(gaScript);

    gaScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-C4L3SX788S");
    };
}

// Função para carregar Google Tag Manager
function loadGoogleTagManager() {
    const gtmScript = document.createElement("script");
    gtmScript.src = "https://www.googletagmanager.com/gtm.js?id=GTM-TX48535W";
    gtmScript.async = true;
    document.head.appendChild(gtmScript);

    // Adicionar fallback no <noscript>
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TX48535W" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);
}

// Função para carregar scripts essenciais
function loadEssentialScripts() {
    console.log("Carregando scripts essenciais...");
    const essentialScript = document.createElement("script");
    essentialScript.src = "/scripts/essential.js"; // Atualize o caminho
    essentialScript.async = true;
    document.head.appendChild(essentialScript);
}

// Função para aplicar as preferências de cookies
function applyCookiePreferences() {
    const cookieChoice = getCookie("cookieChoice");

    switch (cookieChoice) {
        case "acceptAll":
            console.log("Carregar todos os cookies, incluindo de terceiros.");
            loadEssentialScripts();
            loadGoogleAnalytics();
            loadGoogleTagManager();
            break;
        case "acceptNecessary":
            console.log("Carregar apenas cookies necessários.");
            loadEssentialScripts();
            break;
        case "denyAll":
            console.log("Nenhum cookie será carregado.");
            // Não carregue nada além do essencial
            break;
        default:
            console.log("Nenhuma preferência de cookie definida.");
            break;
    }
}

// Mostrar popup apenas se o cookieChoice ainda não foi definido
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const cookieChoice = getCookie("cookieChoice");

    if (!cookieChoice && popup) {
        popup.style.display = "flex";
    } else {
        applyCookiePreferences();
    }
});

// Configurar os botões do popup
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");

    if (popup) {
        const acceptAll = document.getElementById("acceptAll");
        const acceptNecessary = document.getElementById("acceptNecessary");
        const denyAll = document.getElementById("denyAll");

        if (acceptAll) {
            acceptAll.addEventListener("click", () => {
                setCookie("cookieChoice", "acceptAll", 15);
                applyCookiePreferences();
                popup.style.display = "none";
            });
        }

        if (acceptNecessary) {
            acceptNecessary.addEventListener("click", () => {
                setCookie("cookieChoice", "acceptNecessary", 15);
                applyCookiePreferences();
                popup.style.display = "none";
            });
        }

        if (denyAll) {
            denyAll.addEventListener("click", () => {
                setCookie("cookieChoice", "denyAll", 15);
                applyCookiePreferences();
                popup.style.display = "none";
            });
        }
    }
});
