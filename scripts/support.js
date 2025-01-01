const links = document.querySelectorAll('.breadcrumb a');

        links.forEach(link => {
            link.addEventListener('click', function (e) {
                // Apenas previne o redirecionamento padrão se não for o link "Start"
                if (this.dataset.target !== 'start') {
                    e.preventDefault(); // Evita redirecionar para outras páginas (somente para demonstração)
                    const target = this.dataset.target;

                    if (target === 'request') {
                        updateBreadcrumb('Start > Enviar uma solicitação');
                        updateContent('Enviar uma Solicitação', 'Preencha o formulário para enviar uma solicitação.');
                    }
                }
            });
        });

        function updateBreadcrumb(text) {
            document.querySelector('.breadcrumb').innerHTML = text.split('>').map((item, index, arr) => {
                if (index < arr.length - 1) {
                    return `<a href="#">${item.trim()}</a> >`;
                } else {
                    return `<span>${item.trim()}</span>`;
                }
            }).join(' ');
        }

        function updateContent(title, text) {
            const content = document.getElementById('content');
            content.innerHTML = `<h1>${title}</h1><p>${text}</p>`;
        }


document.getElementById("redirectSelect").addEventListener("change", function () {
    const selectedValue = this.value;
    if (selectedValue) {
        // Redireciona para a página selecionada
        window.location.href = selectedValue;
    }
});