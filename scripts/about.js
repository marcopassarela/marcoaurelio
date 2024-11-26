document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleContainer = document.getElementById('themeToggleContainer');
    const body = document.body;

    // Adicione a classe `light-theme` ao carregar a página
    body.classList.add('light-theme');

    themeToggleContainer.addEventListener('click', () => {
        // Alterna entre temas claro e escuro
        body.classList.toggle('light-theme');
        themeToggleContainer.classList.toggle('light-theme');

        // Alterar ícones
        if (body.classList.contains('light-theme')) {
            themeToggle.querySelector('.icon-sun').style.display = 'block';
            themeToggle.querySelector('.icon-moon').style.display = 'none';
        } else {
            themeToggle.querySelector('.icon-sun').style.display = 'none';
            themeToggle.querySelector('.icon-moon').style.display = 'block';
        }
    });
});


// Seleciona todos os links com a classe 'requestLink'
const links = document.querySelectorAll('.requestLink');

links.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do link
        window.location.href = '/src/pages/404.html'; // Redireciona para a página 404
    });
});

async function buscarNoticiasIBGE() {
    const url = '://servicodados.ibge.gov.br/api/v3/noticias/';

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Dados da API:", data);

        const noticias = data.items;
        const noticiasElements = document.querySelectorAll('.box-noticias');

        noticias.forEach((noticia, index) => {
            if (noticiasElements[index]) {
                const noticiaElement = noticiasElements[index];

                // Obter URL da imagem
                let imagemUrl = noticia.imagens && noticia.imagens.image_intro
                    ? noticia.imagens.image_intro
                    : './img/fallback.jpg'; // Atualize o caminho aqui, se necessário

                if (imagemUrl.startsWith('images/')) {
                    imagemUrl = `https://www.ibge.gov.br/${imagemUrl}`;
                }

                console.log(`Imagem URL [${index}]:`, imagemUrl);

                // Atualizar a imagem
                const imgElement = noticiaElement.querySelector('img');
                imgElement.src = imagemUrl;

                // Configurar fallback no erro
                imgElement.onerror = () => {
                    imgElement.src = './img/fallback.jpg'; // Atualize conforme o caminho correto
                    console.warn(`Imagem não encontrada. Aplicando fallback: ${imgElement.src}`);
                };

                // Atualizar conteúdo da notícia
                const pElement = noticiaElement.querySelector('p');
                pElement.innerHTML = `${noticia.introducao} <a href="${noticia.link}" target="_blank">Leia mais...</a>`;

                // Atualizar data de publicação
                const tempoElement = noticiaElement.querySelector('.tempo-noticia');
                tempoElement.textContent = new Date(noticia.data_publicacao).toLocaleString('pt-BR');
            }
        });

        localStorage.setItem("ultimaAtualizacao", new Date().toISOString());
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
    }
}


function atualizarTempo() {
    const elementos = document.querySelectorAll(".tempo-noticia");

    elementos.forEach(elemento => {
        const dataPublicacao = new Date(elemento.getAttribute("data-time"));
        const agora = new Date();
        const diff = agora - dataPublicacao;
        
        const minutos = Math.floor(diff / (1000 * 60));
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);

        let tempoTexto = "";

        if (dias > 0) {
            tempoTexto = `Há ${dias} dia${dias > 1 ? "s" : ""}`;
        } else if (horas > 0) {
            tempoTexto = `Há ${horas} hora${horas > 1 ? "s" : ""}`;
        } else if (minutos > 0) {
            tempoTexto = `Há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
        } else {
            tempoTexto = "Há menos de um minuto";
        }

        elemento.textContent = tempoTexto + " --- Por Marco Aurélio";
    });
}

function verificarAtualizacao() {
    const ultimaAtualizacao = localStorage.getItem("ultimaAtualizacao");
    if (ultimaAtualizacao) {
        const agora = new Date();
        const ultimaData = new Date(ultimaAtualizacao);
        const diffHoras = (agora - ultimaData) / (1000 * 60 * 60);

        if (diffHoras >= 24) {
            buscarNoticiasIBGE();
        }
    } else {
        buscarNoticiasIBGE();
    }
}

verificarAtualizacao();
atualizarTempo();
buscarNoticiasIBGE();

