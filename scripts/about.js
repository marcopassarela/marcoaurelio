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

async function buscarNoticias() {
    // URL da API SerpApi para Google News
    const url = 'https://serpapi.com/search.json?engine=google_news&gl=us&hl=en&topic_token=CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB';

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Dados da API:", data);

        // A resposta vem com um array de notícias dentro de 'news_results'
        const noticias = data.news_results;
        const noticiasElements = document.querySelectorAll('.box-noticias');

        noticias.forEach((noticia, index) => {
            if (noticiasElements[index]) {
                const noticiaElement = noticiasElements[index];

                // Obter URL da imagem
                let imagemUrl = noticia.image_url
                    ? noticia.image_url
                    : './img/fallback.jpg'; // Caminho do fallback

                console.log(`Imagem URL [${index}]:`, imagemUrl);

                // Atualizar a imagem
                const imgElement = noticiaElement.querySelector('img');
                imgElement.src = imagemUrl;

                // Configurar fallback no erro
                imgElement.onerror = () => {
                    imgElement.src = './img/fallback.jpg'; // Caminho do fallback
                    console.warn(`Imagem não encontrada. Aplicando fallback: ${imgElement.src}`);
                };

                // Atualizar conteúdo da notícia
                const pElement = noticiaElement.querySelector('p');
                pElement.innerHTML = `${noticia.title} <a href="${noticia.link}" target="_blank">Leia mais...</a>`;

                // Atualizar data de publicação
                const tempoElement = noticiaElement.querySelector('.tempo-noticia');
                tempoElement.textContent = new Date(noticia.published).toLocaleString('pt-BR');
            }
        });

        // Salvar a última atualização no localStorage
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
            buscarNoticias();
        }
    } else {
        buscarNoticias();
    }
}

verificarAtualizacao();
atualizarTempo();
buscarNoticias();


// Seleção dos elementos
const openModalBtn = document.getElementById('openModal');  // Botão para abrir o modal (exemplo)
const closeModalBtn = document.getElementById('closeModal');  // Botão de fechar o modal
const cancelModalBtn = document.getElementById('cancelModal');  // Botão "Cancelar"
const modal = document.getElementById('myModal');  // O modal em si

// Abrir o modal (adicionar o código que abre o modal aqui)
openModalBtn.addEventListener('click', function (e) {
  e.preventDefault(); // Prevenir comportamento padrão do link
  modal.style.display = 'flex'; // Exibir o modal
});

// Fechar o modal com o botão "X"
closeModalBtn.addEventListener('click', function () {
  modal.style.display = 'none'; // Esconder o modal
});

// Fechar o modal com o botão "Cancelar"
cancelModalBtn.addEventListener('click', function () {
  modal.style.display = 'none'; // Esconder o modal
});

// Fechar o modal clicando fora do conteúdo
window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none'; // Fechar o modal se clicar fora do conteúdo
  }
});
