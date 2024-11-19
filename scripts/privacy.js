// Quando o botão do hambúrguer for clicado
document.getElementById('hamburger-btn').addEventListener('click', function() {
    // Adiciona a classe 'show' ao menu mobile
    document.querySelector('.menu ul.mobile').classList.add('show');

    // Exibe o ícone de fechar (X)
    document.getElementById('close-btn').style.display = 'block';

    // Exibe o overlay
    document.getElementById('overlay').style.display = 'block';

    // Esconde o ícone do hambúrguer
    document.getElementById('hamburger-btn').style.display = 'none';
});

// Quando o botão de fechar (X) for clicado
document.getElementById('close-btn').addEventListener('click', function() {
    // Remove a classe 'show' do menu mobile (fechando o menu)
    document.querySelector('.menu ul.mobile').classList.remove('show');

    // Esconde o ícone de fechar (X)
    document.getElementById('close-btn').style.display = 'none';

    // Esconde o overlay
    document.getElementById('overlay').style.display = 'none';

    // Exibe o ícone do hambúrguer
    document.getElementById('hamburger-btn').style.display = 'block';
});

// Fechar o menu ao clicar fora dele
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.menu ul.mobile');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');

    // Verifica se o clique foi fora do menu e do botão de hambúrguer
    if (!menu.contains(event.target) && !hamburgerBtn.contains(event.target) && !closeBtn.contains(event.target)) {
        // Remove a classe 'show' do menu
        menu.classList.remove('show');

        // Esconde o ícone de fechar (X)
        closeBtn.style.display = 'none';

        // Esconde o overlay
        overlay.style.display = 'none';

        // Exibe o ícone do hambúrguer
        hamburgerBtn.style.display = 'block';
    }
});

// Fechar o menu automaticamente quando uma opção for clicada no menu mobile
const menuItems = document.querySelectorAll('.menu ul.mobile li a'); // Seleciona todos os links dentro do menu mobile

menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove a classe 'show' do menu (fechando o menu)
        document.querySelector('.menu ul.mobile').classList.remove('show');

        // Esconde o ícone de fechar (X)
        document.getElementById('close-btn').style.display = 'none';

        // Esconde o overlay
        document.getElementById('overlay').style.display = 'none';

        // Exibe o ícone do hambúrguer
        document.getElementById('hamburger-btn').style.display = 'block';
    });
});
