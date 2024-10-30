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

            if (percentage === 30 || percentage === 65) {
                // Pausa em 30% e 65% por 1 segundo
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
                loadingScreen.style.display = "none";
                mainContent.style.display = "block";
            }, 1000); // 1000ms corresponde ao tempo da transição CSS
        }
    }

    // Inicia o carregamento
    incrementPercentage();
});
