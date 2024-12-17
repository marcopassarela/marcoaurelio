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
            console.log("Versão atual:", currentVersion);

            let storedVersion = localStorage.getItem("siteVersion");

            // Se a versão armazenada for diferente da versão atual, exibe o modal
            if (storedVersion !== currentVersion) {
                showUpdateModal(currentVersion);
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
function showUpdateModal(version) {
    const modal = document.getElementById("modalupgrade");
    const versionDisplay = document.getElementById("current-version");
    versionDisplay.innerHTML = `Próxima versão: <strong>${version}</strong>`;

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
