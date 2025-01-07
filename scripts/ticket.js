document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const ticketId = params.get('ticket_form_id');
  
    const infoElement = document.getElementById("ticket-info");
    if (ticketId) {
      infoElement.textContent = `Este é o ticket ID: ${ticketId}`;
    } else {
      infoElement.textContent = "Nenhum ticket ID foi fornecido.";
    }
  });
  