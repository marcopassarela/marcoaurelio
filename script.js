window.onload = function() {
    window.scrollTo(0, 0);
};
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById("loading");
    const mainContent = document.getElementById("conteudo-principal");
    const loadingBar = document.querySelector(".loading-bar");
    const loadingPercentage = document.getElementById("loading-percentage");
    const loadingMusic = document.getElementById("loading-music");
    const backgroundVideo = document.getElementById("background-video");
    let percentage = 0;

    // Inicia o carregamento
    function startLoading() {
        backgroundVideo.play(); // Toca o vídeo ao iniciar o carregamento
        incrementPercentage(); // Inicia o incremento da porcentagem
    }

    function incrementPercentage() {
        if (percentage < 100) {
            percentage++;
            loadingBar.style.width = `${percentage}%`;
            loadingPercentage.textContent = `${percentage}%`;

            // Toca a música assim que o carregamento começa
            if (percentage === 1) {
                loadingMusic.play(); // Toca a música na primeira iteração
            }

            if (percentage === 30 || percentage === 65 || percentage == 88) {
                // Pausa em 30%, 65% e 88% por 1 segundo
                setTimeout(incrementPercentage, 1000);
            } else {
                // Carregamento mais lento
                setTimeout(incrementPercentage, 80);
            }
        } else {
            // Para a música e o vídeo quando o carregamento atingir 100%
            loadingMusic.pause(); // Para a música
            loadingMusic.currentTime = 0; // Reinicia a música para o início
            backgroundVideo.pause(); // Pausa o vídeo

            // Aplica o efeito de fade-out ao completar 100%
            loadingScreen.classList.add("fade-out");

            // Aguarda o tempo da transição para ocultar a tela de carregamento
            setTimeout(() => {
                loadingScreen.style.display = "none";
                mainContent.style.display = "block";
            }, 1000); // 1000ms corresponde ao tempo da transição CSS
        }
    }

    // Inicia o carregamento assim que a página é carregada
    startLoading();
});

