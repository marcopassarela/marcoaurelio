<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitizando os dados de entrada
    $nome = htmlspecialchars(trim($_POST['nome']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $codigo = htmlspecialchars(trim($_POST['codigo']));
    $numero = htmlspecialchars(trim($_POST['numero']));
    $opcoes = htmlspecialchars(trim($_POST['opcoes']));
    $rede_social = htmlspecialchars(trim($_POST['rede_social']));
    $orcamento = htmlspecialchars(trim($_POST['input_orcamento']));
    $mensagem = htmlspecialchars(trim($_POST['mensagem']));

    // Validação do e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "E-mail inválido.";
        exit;
    }

    // Validação do telefone
    if (!preg_match("/^\(\d{2}\) \d{5}-\d{4}$/", $numero)) {
        echo "Telefone inválido. Use o formato (XX) XXXXX-XXXX.";
        exit;
    }

    // Enviando e-mail
    $para = "marcopassarela@hotmail.com"; // Substitua pelo seu e-mail
    $assunto = "Novo contato de $nome";
    $corpo = "
        Nome: $nome\n
        E-mail: $email\n
        Código do País: $codigo\n
        Telefone: $numero\n
        Assunto: $opcoes\n
        Rede Social: $rede_social\n
        Orçamento: $orcamento\n
        Mensagem:\n$mensagem
    ";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Enviando o e-mail
    if (mail($para, $assunto, $corpo, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem. Tente novamente mais tarde.";
    }
}
?>
