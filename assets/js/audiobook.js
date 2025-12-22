// Variáveis globais para os elementos do player
let mainPlayer = null;
let audioElement = null;
let titleElement = null;
let chapterElement = null;
let currentChapter = null;

// Inicializa o player quando o documento carregar
document.addEventListener('DOMContentLoaded', function () {
    mainPlayer = document.getElementById('main-player');
    audioElement = mainPlayer.querySelector('audio');
    titleElement = mainPlayer.querySelector('.audio-title');
    chapterElement = mainPlayer.querySelector('.audio-chapter');
});

// Função para tocar o capítulo selecionado
function playChapter(element) {
    // Remove destaque do capítulo anterior
    if (currentChapter) {
        currentChapter.classList.remove('active');
    }

    // Adiciona destaque ao capítulo atual
    currentChapter = element;
    currentChapter.classList.add('active');

    // Obtém os dados do capítulo
    const title = element.getAttribute('data-title');
    const chapter = element.getAttribute('data-chapter');
    const audioSrc = element.getAttribute('data-audio');

    // Atualiza as informações do player
    titleElement.textContent = title;
    chapterElement.textContent = chapter;
    audioElement.src = audioSrc;

    // Mostra o player se estiver oculto
    mainPlayer.style.display = 'block';

    // Inicia a reprodução
    audioElement.play();
}

// Função para formatar o tempo
function formatTime(decimal) {
    const number = Math.floor(decimal);
    const minutes = number % 100; // Últimos dois dígitos
    const hours = Math.floor(number / 100); // Dígitos restantes

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedHours = hours.toString();

    return `${formattedHours}:${formattedMinutes}`;
}

// Função para atualizar o valor na div
function updateTime(decimal) {
    const formatted = formatTime(decimal); // Formata o número
    document.getElementById('formatted-time').textContent = formatted; // Atualiza a div
}