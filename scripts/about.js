// Função para formatar o telefone com a máscara (XX) 9 XXXX-XXXX
function formatarTelefone(event) {
    let input = event.target;
    let telefone = input.value.replace(/\D/g, ''); // Remove tudo que não for número

    // Verifica se o número tem pelo menos 2 caracteres para formatar
    if (telefone.length <= 2) {
        telefone = telefone.replace(/^(\d{0,2})/, '($1');
    } else if (telefone.length <= 6) {
        telefone = telefone.replace(/^(\d{2})(\d{0,1})/, '($1) $2');
    } else if (telefone.length <= 10) {
        telefone = telefone.replace(/^(\d{2})(\d{1})(\d{0,4})/, '($1) $2 $3');
    } else {
        telefone = telefone.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4})/, '($1) $2 $3-$4');
    }

    // Atualiza o valor do campo com a formatação
    input.value = telefone;
}

// Função para limpar a formatação se o campo for vazio
function limparFormatoTelefone(event) {
    let input = event.target;
    let telefone = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    // Se o telefone estiver vazio, não aplica a máscara
    if (telefone.length === 0) {
        input.value = '';
    }
}

// Adiciona o evento para aplicar a formatação enquanto o usuário digita
document.getElementById('telefone').addEventListener('input', formatarTelefone);
// Adiciona o evento para remover a máscara ao apagar todos os caracteres
document.getElementById('telefone').addEventListener('blur', limparFormatoTelefone);
