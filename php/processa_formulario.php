<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Definindo variáveis e sanitizando os dados de entrada
    $nome = htmlspecialchars(trim($_POST['nome']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $telefone = htmlspecialchars(trim($_POST['telefone']));
    $opcoes = htmlspecialchars(trim($_POST['opcoes']));
    $mensagem = htmlspecialchars(trim($_POST['mensagem']));

    // Configurando o e-mail
    $para = "marcopassarela@hotmail.com"; // Substitua pelo seu e-mail
    $assunto = "Novo contato de $nome";
    $corpo = "
        Nome: $nome\n
        E-mail: $email\n
        Telefone: $telefone\n
        Assunto: $opcoes\n
        Mensagem:\n$mensagem
    ";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Enviando o e-mail
    if (mail($para, $assunto, $corpo, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem.";
    }
} else {
    echo "Método de requisição inválido.";
}
?>
