document.addEventListener('DOMContentLoaded', function() {
    const codigoInput = document.getElementById('input-codigo');
    const numeroInput = document.getElementById('input-numero');

    // Formatação do código do país
    codigoInput.addEventListener('input', function(event) {
      let input = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
      let formattedInput = '+';

      if (input.length > 0) {
        formattedInput += input.substring(0, 4); // Código do país com até 4 dígitos
      }

      event.target.value = formattedInput; // Limita o tamanho máximo
    });

    // Formatação do número com DDD e número
    numeroInput.addEventListener('input', function(event) {
      let input = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
      let formattedInput = '';

      if (input.length > 0) {
        formattedInput = '(' + input.substring(0, 2); // Adiciona o DDD com parênteses
      }
      if (input.length > 2) {
        formattedInput += ') ' + input.substring(2, 7); // Primeiros 5 dígitos
      }
      if (input.length > 7) {
        formattedInput += '-' + input.substring(7, 11); // Últimos 4 dígitos
      }

      event.target.value = formattedInput.substring(0, 15); // Limita o tamanho máximo
    });

    // Deletando o conteúdo do campo de código
    codigoInput.addEventListener('input', function(event) {
      let input = event.target.value;

      // Se o valor for apenas o '+', apaga tudo
      if (input === '+') {
        event.target.value = '';
      }
    });

    // Formatação e exclusão no número de telefone
    numeroInput.addEventListener('input', function(event) {
      let input = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
      let formattedInput = '';

      if (input.length > 0) {
        formattedInput = '(' + input.substring(0, 2); // Adiciona o DDD com parênteses
      }
      if (input.length > 2) {
        formattedInput += ') ' + input.substring(2, 7); // Primeiros 5 dígitos
      }
      if (input.length > 7) {
        formattedInput += '-' + input.substring(7, 11); // Últimos 4 dígitos
      }

      event.target.value = formattedInput.substring(0, 15); // Limita o tamanho máximo
    });

  });

  document.getElementById("form-contato").addEventListener("submit", function(event){
    event.preventDefault(); // Impede o envio normal do formulário

    var formData = new FormData(this); // Captura os dados do formulário

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php/processa_formulario.php", true); // Define o método e o destino do envio

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Sucesso: Mostra mensagem de sucesso ou redireciona
            alert("Mensagem enviada com sucesso!");
        } else {
            // Erro: Mostra mensagem de erro
            alert("Ocorreu um erro ao enviar a mensagem.");
        }
    };

    xhr.send(formData); // Envia os dados do formulário
});
