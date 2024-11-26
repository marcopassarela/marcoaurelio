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

async function atualizarNoticias() {
    // Sua chave de API
    const apiKey = "d5HvrGBPzmeDvByXHfun9KiXbAzAGKlx";
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=technology&api-key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Filtra as notícias de tecnologia
        const noticias = data.response.docs;

        // Seleciona os elementos .box-noticias na página
        const noticiasElements = document.querySelectorAll('.box-noticias');

        // Preenche as caixas com as notícias
        noticias.forEach((noticia, index) => {
            if (noticiasElements[index]) {
                const noticiaElement = noticiasElements[index];

                // Atualiza a imagem (utiliza multimedia[0] se disponível)
                const imgElement = noticiaElement.querySelector('img');
                const imagem = noticia.multimedia && noticia.multimedia.length > 0
                    ? `https://www.nytimes.com/${noticia.multimedia[0].url}`
                    : '/img/img1.jpg'; // Fallback se não houver imagem
                imgElement.src = imagem;

                // Atualiza o conteúdo da notícia
                const pElement = noticiaElement.querySelector('p');
                pElement.innerHTML = `${noticia.abstract} <a href="${noticia.web_url}" class="link-noticia" target="_blank">Find out more...</a>`;

                // Atualiza a data de publicação
                const tempoElement = noticiaElement.querySelector('.tempo-noticia');
                tempoElement.setAttribute('data-time', noticia.pub_date);
            }
        });
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
    }
}

function atualizarTempo() {
    // Seleciona todos os elementos com a classe 'tempo-noticia'
    const elementos = document.querySelectorAll(".tempo-noticia");

    elementos.forEach(elemento => {
        const dataPublicacao = new Date(elemento.getAttribute("data-time"));
        const agora = new Date();
        
        const diff = agora - dataPublicacao; // Diferença em milissegundos
        
        const minutos = Math.floor(diff / (1000 * 60)); // Converte milissegundos para minutos
        const horas = Math.floor(minutos / 60); // Converte minutos para horas
        const dias = Math.floor(horas / 24); // Converte horas para dias

        let tempoTexto = "";

        // Verifica se já passou algum dia
        if (dias > 0) {
            tempoTexto = `Há ${dias} dia${dias > 1 ? "s" : ""}`;
        } 
        // Se não, verifica se já passou alguma hora
        else if (horas > 0) {
            tempoTexto = `Há ${horas} hora${horas > 1 ? "s" : ""}`;
        } 
        // Se não, verifica se passou algum minuto
        else if (minutos > 0) {
            tempoTexto = `Há ${minutos} minuto${minutos > 1 ? "s" : ""}`;
        } 
        // Caso contrário, é menos de um minuto
        else {
            tempoTexto = "Há menos de um minuto";
        }

        // Atualiza o conteúdo da página sem duplicação
        elemento.textContent = tempoTexto + " --- Por Marco Aurélio";
    });
}

// Atualiza o tempo imediatamente
atualizarTempo();

// Opcional: Atualiza o tempo a cada 30 segundos para manter a precisão
setInterval(atualizarTempo, 30000);

// Chama a função para carregar as notícias
atualizarNoticias();
