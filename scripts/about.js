function aplicarMascara(input) {
    // Remove todos os caracteres que não são dígitos
    let numero = input.value.replace(/\D/g, '');

    // Aplica a máscara
    if (numero.length > 2) {
        numero = `(${numero.slice(0, 2)}) ${numero.slice(2)}`;
    }
    if (numero.length > 9) {
        numero = `${numero.slice(0, 9)}-${numero.slice(9)}`;
    }
    if (numero.length > 8) {
        numero = `${numero.slice(0, 8)} ${numero.slice(8)}`;
    }

    input.value = numero;
}

// Adiciona os eventos para aplicar a formatação enquanto o usuário digita
document.getElementById('telefone').addEventListener('input', formatarTelefone);
// Adiciona o evento para remover a máscara ao perder o foco
document.getElementById('telefone').addEventListener('blur', limparFormatoTelefone);

function validarTexto(input) {
    input.value = input.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
}

