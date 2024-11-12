function aplicarMascara(input) {
    // Remove todos os caracteres que não são dígitos
    let numero = input.value.replace(/\D/g, '');

    // Aplica a máscara
    if (numero.length > 2) {
        numero = `(${numero.slice(0, 2)}) ${numero.slice(2)}`;
    }
    if (numero.length > 8) {
        numero = `${numero.slice(0, 8)} ${numero.slice(8)}`;
    }
    if (numero.length > 13) {
        numero = `${numero.slice(0, 13)}-${numero.slice(13)}`;
    }

    input.value = numero;
}

// Função para remover a máscara ao perder o foco
function limparFormatoTelefone(input) {
    input.value = input.value.replace(/\D/g, ''); // Remove a formatação ao sair do campo
}

// Verifica se o elemento com ID 'telefone' existe antes de adicionar os eventos
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function() {
        aplicarMascara(telefoneInput);
    });
    telefoneInput.addEventListener('blur', function() {
        limparFormatoTelefone(telefoneInput);
    });
}

// Função para validar o texto, permitindo apenas letras e caracteres acentuados
function validarTexto(input) {
    input.value = input.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
}
