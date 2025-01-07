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

const paises = [
    { sigla: "US", nome: "Estados Unidos" },
    { sigla: "CN", nome: "China" },
    { sigla: "DE", nome: "Alemanha" },
    { sigla: "BR", nome: "Brasil" },
    { sigla: "IN", nome: "Índia" },
    { sigla: "GB", nome: "Reino Unido" },
    { sigla: "JP", nome: "Japão" },
    { sigla: "FR", nome: "França" },
    { sigla: "RU", nome: "Rússia" },
    { sigla: "CA", nome: "Canadá" },
    { sigla: "AU", nome: "Austrália" },
    { sigla: "IT", nome: "Itália" },
    { sigla: "SA", nome: "Arábia Saudita" },
    { sigla: "AE", nome: "Emirados Árabes Unidos" },
    { sigla: "KR", nome: "Coreia do Sul" },
    { sigla: "AQ", nome: "Antártida" },
    { sigla: "AR", nome: "Argentina" },
];

const paisesSelect = document.getElementById("pais");
paises.forEach(pais => {
    const option = document.createElement("option");
    option.value = pais.nome;  // Valor será a nome do país
    option.textContent = pais.nome;  // Texto exibido será a nome
    paisesSelect.appendChild(option);
});


const estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

const estadosSelect = document.getElementById("estados");
estados.forEach(sigla => {
    const option = document.createElement("option");
    option.value = sigla;
    option.textContent = sigla; // Mostra apenas as siglas
    estadosSelect.appendChild(option);
});

