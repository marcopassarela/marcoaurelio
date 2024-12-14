// Tempo inicial em segundos
let countdown = 10;

// Selecionar elementos
const timerElement = document.getElementById("timer");
const circleElement = document.getElementById("circle");

// Atualizar o temporizador e a animação do círculo
const interval = setInterval(() => {
    countdown--; // Decrementa o contador
    timerElement.textContent = countdown; // Atualiza o número exibido

    // Atualiza a animação do círculo (progresso em graus)
    const progress = (10 - countdown) * (360 / 10);
    circleElement.style.setProperty("--progress", `${progress}deg`);

    // Redirecionar ao final
    if (countdown <= 0) {
        clearInterval(interval); // Para o intervalo
        window.location.href = "https://www.marcoaurelio.vercel.app"; // Redireciona
    }
}, 1000); // Intervalo de 1 segundo