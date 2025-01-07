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

const fileInput = document.getElementById('file-input');
const uploadedFiles = document.querySelector('.uploaded-files');
const fileLabel = document.querySelector('.file-label');

fileLabel.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  uploadedFiles.innerHTML = '';
  for (let i = 0; i < fileInput.files.length; i++) {
    const file = fileInput.files[i];
    const fileElement = document.createElement('div');
    fileElement.classList.add('file-item');

    const filePreview = document.createElement('div');
    filePreview.classList.add('file-preview');
    if (file.type.startsWith('image/')) {
      filePreview.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    } else {
      filePreview.textContent = '📄';
    }
    fileElement.appendChild(filePreview);

    const fileName = document.createElement('div');
    fileName.classList.add('file-name');
    fileName.textContent = file.name;
    fileElement.appendChild(fileName);

    uploadedFiles.appendChild(fileElement);
  }
});

