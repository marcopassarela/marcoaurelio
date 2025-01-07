document.addEventListener("DOMContentLoaded", () => {
    // Lógica para exibir o ticket ID da URL
    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get('ticket_form_id');
    const infoElement = document.getElementById("ticket-info");
    
    if (ticketId) {
        infoElement.textContent = `Este é o ticket ID: ${ticketId}`;
    } else {
        infoElement.textContent = "Nenhum ticket ID foi fornecido.";
    }
});

// Redirecionamento para as páginas com base na opção selecionada
document.getElementById("redirectSelect").addEventListener("change", function() {
    var selectedValue = this.value;
    if (selectedValue) {
        window.location.href = selectedValue; // Redireciona para a URL da opção selecionada
    }
});