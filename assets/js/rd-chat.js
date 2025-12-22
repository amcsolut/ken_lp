/**
 * Funções do Chat da Rede Social
 */

document.addEventListener('DOMContentLoaded', function () {
    initializeChatFunctions();
});

function initializeChatFunctions() {
    const textarea = document.getElementById('textarea_mensagem');
    const form = document.getElementById('form_enviar_mensagem');

    if (textarea && form) {
        setupTextareaKeyEvents(textarea, form);
        setupAutoResize(textarea);
        setupFormSubmitHandler(textarea, form);
        setupMessageScrollObserver();
    }

    // Inicializa controle de item ativo das conversas
    setupChatItemActiveControl();
}

/**
 * Configura eventos de teclado do textarea
 * @param {HTMLTextAreaElement} textarea 
 * @param {HTMLFormElement} form 
 */
function setupTextareaKeyEvents(textarea, form) {
    textarea.addEventListener('keydown', function (e) {
        // Enter simples - envia mensagem
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            // Verifica se há texto para enviar
            const message = textarea.value.trim();
            if (message) {
                // Dispara o submit do formulário
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }
        }
        // Shift + Enter - quebra de linha (comportamento padrão)
        // Não precisa fazer nada, o comportamento padrão já adiciona quebra de linha
    });
}

/**
 * Configura auto-resize do textarea
 * @param {HTMLTextAreaElement} textarea 
 */
function setupAutoResize(textarea) {
    textarea.addEventListener('input', function () {
        autoResizeTextarea(this);
    });

    // Aplica o auto-resize inicial
    autoResizeTextarea(textarea);
}

/**
 * Auto-resize do textarea baseado no conteúdo
 * @param {HTMLTextAreaElement} textarea 
 */
function autoResizeTextarea(textarea) {
    // Reset da altura para calcular a nova
    textarea.style.height = 'auto';

    // Define a nova altura baseada no scrollHeight
    const newHeight = Math.min(textarea.scrollHeight, 100); // Máximo de 100px
    textarea.style.height = newHeight + 'px';
}

/**
 * Configura handler para reset do textarea após envio
 * @param {HTMLTextAreaElement} textarea 
 * @param {HTMLFormElement} form 
 */
function setupFormSubmitHandler(textarea, form) {
    // Monitora o sucesso do envio do formulário
    form.addEventListener('dmx:success', function () {
        resetTextareaSize(textarea);
    });

    // Fallback caso o evento dmx:success não funcione
    form.addEventListener('submit', function () {
        // Aguarda um pouco para garantir que o formulário foi processado
        setTimeout(function () {
            if (textarea.value.trim() === '') {
                resetTextareaSize(textarea);
            }
        }, 500);
    });
}

/**
 * Reseta o textarea para o tamanho original
 * @param {HTMLTextAreaElement} textarea 
 */
function resetTextareaSize(textarea) {
    // Reset para altura mínima
    textarea.style.height = 'auto';

    // Calcula altura inicial (1 linha)
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight) || 20;
    const padding = parseInt(window.getComputedStyle(textarea).paddingTop) +
        parseInt(window.getComputedStyle(textarea).paddingBottom);

    const minHeight = lineHeight + padding;
    textarea.style.height = minHeight + 'px';
}

/**
 * Configura observer para scroll automático das mensagens
 */
function setupMessageScrollObserver() {
    const messagesContainer = document.querySelector('.rd-chat-messages');
    if (!messagesContainer) return;

    // Observer para detectar novas mensagens
    const observer = new MutationObserver(function (mutations) {
        let hasNewMessages = false;

        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Verifica se foram adicionadas mensagens reais
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType === Node.ELEMENT_NODE &&
                        (node.classList.contains('rd-message') ||
                            node.querySelector('.rd-message'))) {
                        hasNewMessages = true;
                    }
                });
            }
        });

        if (hasNewMessages) {
            // Aguarda um momento para o DOM se atualizar completamente
            setTimeout(scrollToLastMessage, 100);
        }
    });

    // Observa mudanças no container de mensagens
    observer.observe(messagesContainer, {
        childList: true,
        subtree: true
    });

    // Scroll inicial para a última mensagem
    setTimeout(scrollToLastMessage, 300);
}

/**
 * Faz scroll para a última mensagem enviada
 */
function scrollToLastMessage() {
    const messagesContainer = document.querySelector('.rd-chat-messages');
    if (!messagesContainer) return;

    // Scroll suave para o final
    messagesContainer.scrollTo({
        top: messagesContainer.scrollHeight,
        behavior: 'smooth'
    });
}

/**
 * Formata texto com quebras de linha para HTML
 * @param {string} text 
 * @returns {string}
 */
function formatMessageText(text) {
    if (!text) return '';

    // Converte quebras de linha em <br>
    return text.replace(/\n/g, '<br>');
}

/**
 * Força scroll para última mensagem (função auxiliar para uso manual)
 */
function forceScrollToBottom() {
    scrollToLastMessage();
}

/**
 * Configura controle de item ativo nas conversas
 */
function setupChatItemActiveControl() {
    // Observer para detectar quando novos itens de chat são adicionados
    const chatContainer = document.querySelector('#repeat_salas');
    if (!chatContainer) return;

    // Aplica eventos aos itens existentes
    applyChatItemEvents();

    // Observer para novos itens adicionados dinamicamente
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                setTimeout(applyChatItemEvents, 100);
            }
        });
    });

    observer.observe(chatContainer, {
        childList: true,
        subtree: true
    });
}

/**
 * Aplica eventos de clique aos itens de chat
 */
function applyChatItemEvents() {
    const chatItems = document.querySelectorAll('.rd-chat-item');

    chatItems.forEach(function (item) {
        // Remove listener existente se houver
        item.removeEventListener('click', handleChatItemClick);

        // Adiciona novo listener
        item.addEventListener('click', handleChatItemClick);
    });
}

/**
 * Handler para clique em item de chat
 * @param {Event} event 
 */
function handleChatItemClick(event) {
    const clickedItem = event.currentTarget;

    // Remove classe active de todos os itens
    document.querySelectorAll('.rd-chat-item').forEach(function (item) {
        item.classList.remove('active');
    });

    // Adiciona classe active ao item clicado
    clickedItem.classList.add('active');
}

/**
 * Define item ativo manualmente (função auxiliar)
 * @param {string} itemId - ID do item para tornar ativo
 */
function setChatItemActive(itemId) {
    // Remove active de todos
    document.querySelectorAll('.rd-chat-item').forEach(function (item) {
        item.classList.remove('active');
    });

    // Procura item pelo ID e torna ativo
    const targetItem = document.querySelector(`[data-id="${itemId}"] .rd-chat-item, .rd-chat-item[data-id="${itemId}"]`);
    if (targetItem) {
        targetItem.classList.add('active');
    }
}



//
// UPLOAD DE IMAGEMS CHAT
//


// Função para criar miniatura ao selecionar imagem
document.getElementById('rd-fileInput').addEventListener('change', function (event) {
    const container = document.getElementById('rd-thumbnailContainer');
    container.innerHTML = ''; // Limpa miniaturas anteriores
    const files = event.target.files;

    if (files.length) {
        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Cria um wrapper para a miniatura
                const thumbnailWrapper = document.createElement('div');
                thumbnailWrapper.style.position = 'relative';
                thumbnailWrapper.style.display = 'inline-block';
                thumbnailWrapper.style.marginRight = '10px';

                // Cria a miniatura
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '35px';
                img.style.height = '35px';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '5px';
                img.style.border = '1px solid #ddd';
                img.style.display = 'block';

                // Cria o botão de reset
                const resetButton = document.createElement('button');
                resetButton.innerHTML = '×';
                resetButton.style.position = 'absolute';
                resetButton.style.top = '-5px';
                resetButton.style.right = '-5px';
                resetButton.style.border = 'none';
                resetButton.style.background = 'red';
                resetButton.style.color = 'white';
                resetButton.style.borderRadius = '50%';
                resetButton.style.width = '18px';
                resetButton.style.height = '18px';
                resetButton.style.cursor = 'pointer';
                resetButton.style.fontSize = '12px';
                resetButton.style.display = 'flex';
                resetButton.style.alignItems = 'center';
                resetButton.style.justifyContent = 'center';
                resetButton.style.lineHeight = '1';
                resetButton.style.padding = '0';
                resetButton.style.boxShadow = '0 1px 3px rgba(0,0,0,0.3)';

                resetButton.addEventListener('click', () => {
                    container.innerHTML = ''; // Remove a miniatura
                    document.getElementById('rd-fileInput').value = ''; // Reseta o input
                });

                // Adiciona a imagem e o botão ao wrapper
                thumbnailWrapper.appendChild(img);
                thumbnailWrapper.appendChild(resetButton);

                // Adiciona o wrapper ao container
                container.appendChild(thumbnailWrapper);
            };
            reader.readAsDataURL(file);
        });
    }
});

// Função para limpar miniaturas
function clearThumbnails() {
    const container = document.getElementById('rd-thumbnailContainer');
    container.innerHTML = ''; // Limpa o contêiner
    document.getElementById('rd-fileInput').value = ''; // Reseta o campo de arquivo
    console.log('Miniaturas resetadas.');
}

// Intercepta o reset do formulário
const form = document.getElementById('form_enviar_mensagem');
const originalReset = form.reset;

form.reset = function () {
    // Chama o reset original
    originalReset.call(this);
    // Limpa as miniaturas
    clearThumbnails();
};

// Também monitora o evento reset
form.addEventListener('reset', function () {
    setTimeout(clearThumbnails, 10); // Pequeno delay para garantir que o reset foi aplicado
});