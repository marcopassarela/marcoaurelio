// Dados dos livros
const books = [
    {
        title: "Os Segredos da Mente Milionária",
        description: "Se as suas finanças andam na corda bamba, talvez esteja na hora de você refletir sobre o que T. Harv Eker chama de o seu modelo de dinheiro – um conjunto de crenças que cada um de nós alimenta desde a infância e que molda o nosso destino financeiro, quase sempre nos levando para uma situação difícil. A ideia é fazer o seu dinheiro trabalhar para você tanto quanto você trabalha para ele. Para isso, é necessário poupar e investir em vez de gastar. Enriquecer não diz respeito somente a ficar rico em termos financeiros, diz Eker. É mais do que isso: trata-se da pessoa que você se torna para alcançar esse objetivo.",
    },
    {
        title: "Quem Pensa Enriquece",
        description: "Quem Pensa Enriquece é o resultado de mais de duas décadas de estudo e análise minuciosa de indivíduos que alcançaram fortunas pessoais significativas. Napoleon Hill dedicou seu tempo ao estudo dos hábitos de 16 mil pessoas, incluindo 500 milionários e os homens mais ricos de sua época. A partir dessas pesquisas, ele identificou as 'leis' essenciais para a conquista do sucesso. Agora, esta obra influente está ainda mais acessível com o Guia de Estudos, que oferece insights adicionais, exercícios práticos e reflexões aprofundadas para ajudar você a aplicar os princípios em sua própria jornada. A obra afirma que o desejo, quando combinado com fé e persistência, tem o poder de levar um indivíduo a realizar feitos extraordinários, desde que ele consiga superar pensamentos negativos e manter um foco inabalável em seu objetivo. Descubra o segredo para o sucesso financeiro e pessoal com a edição especial do clássico atemporal: Quem Pensa Enriquece, agora acompanhado de um Guia de Estudos exclusivo.",
    },
    {
        title: "A lei do triunfo: 16 lições práticas para o sucesso",
        description: "16 lições práticas para o sucesso, um clássico atemporal em edição com nova capa.Financiado pelo Magnata do Aço, Andrew Carnegie, o jovem jornalista de 25 anos Napoleon Hill começou em 1908 a entrevistar homens de sucesso e a investigar suas carreiras. Tudo isso para detectar o que havia de especial neles e descobrir se existe o gene do sucesso. Ou talvez, uma lei que permita identificar em cada indivíduo o potencial para vencer na vida. Em duas décadas, ouviu mais de 16 mil pessoas, entre elas os 500 milionários mais importantes da época. Pesquisou a vida de grandes inventores e pioneiros, como Thomas Edison, Graham Bell, Henry Ford, Roosevelt, George Eastman e Rockefeller. O resultado foi A lei do triunfo: 16 lições práticas para o sucesso, que ensinou, pela primeira vez na história do mundo, o verdadeiro segredo para o sucesso pessoal.",
    },
    {
        title: "Pai Rico, pai Pobre",
        description: "A escola prepara as crianças para o mundo real? Essa é a primeira pergunta com a qual o leitor se depara neste livro. O recado é ousado e direto: boa formação e notas altas não bastam para assegurar o sucesso de alguém. O mundo mudou; a maioria dos jovens tem cartão de crédito, antes mesmo de concluir os estudos, e nunca teve aula sobre dinheiro, investimentos, juros etc. Ou seja, eles vão para a escola, mas continuam financeiramente improficientes, despreparados para enfrentar um mundo que valoriza mais as despesas do que a poupança. Para o autor, o conselho mais perigoso que se pode dar a um jovem nos dias de hoje é: “Vá para a escola, tire notas altas e depois procure um trabalho seguro.” O fato é que agora as regras são outras, e não existe mais emprego garantido para ninguém. Pai Rico, Pai Pobre demonstra que a questão não é ser empregado ou empregador, mas ter o controle do próprio destino ou delegá-lo a alguém. É essa a tese de Robert Kiyosaki neste livro substancial e visionário. Para ele, a formação proporcionada pelo sistema educacional não prepara os jovens para o mundo que encontrarão depois de formados.",
    },
    {
        title: "Mais esperto que o Diabo",
        description: "Neste livro, inédito no Brasil, você vai descobrir, após 75 anos de segredo, por meio dessa entrevista exclusiva que Napoleon Hill fez, quebrando o código secreto da mente do Diabo: Quem é o Diabo? Onde ele habita? Quais suas principais armas mentais? Quem são os alienados e de que forma eles ou elas se alienam? De que forma o Diabo influencia a nossa vida do dia a dia? Como a sua dominação influencia nossas atitudes? O que é o medo? Como nossos líderes religiosos e nossos professores são afetados pelo Diabo? Quais as armas que nós, seres humanos, possuímos para combater a dominação do Diabo? Qual a visão do Diabo sobre a energia sexual? Como buscar uma vida cheia de realizações, valorizando a felicidade e a liberdade? Essas perguntas e muitas outras são respondidas pelo próprio Diabo, que se autodenomina Sua Majestade, de acordo com Napoleon Hill. O seu propósito, escrito com suas próprias palavras, é ajudar o ser humano a descobrir o seu real potencial, desvendando as armadilhas mentais que os homens e as mulheres deste mundo criam para si mesmos, sabotando a sua própria liberdade e o seu próprio direito de viver uma vida cheia de desafios, alegria e liberdade. Escrito em 1938, após uma das maiores crises econômicas, e precedendo a Segunda Guerra Mundial, este livro não somente é uma fonte de inspiração e coragem, mas deve ser considerado um manual para todas aquelas pessoas que desejam.",
    },

    // Adicione mais livros aqui
];

// Seleciona todos os itens e o modal
const bookLinks = document.querySelectorAll('.options-books a');
const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const closeModal = document.querySelector('.close-btn');

// Função para abrir o modal com os dados correspondentes
const openModal = (index) => {
    modalTitle.textContent = books[index].title;
    modalDescription.textContent = books[index].description;
    modal.style.display = 'flex';
};

// Adiciona evento a cada link
bookLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Previne o comportamento padrão do link
        openModal(index);
    });
});

// Fecha o modal ao clicar no botão de fechar
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Seleciona todos os links com a classe 'requestLink'
const links = document.querySelectorAll('.requestLink');

links.forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = '/src/pages/404.html';
    });
});
