// Função para toggle dos comentários
function toggleComentarios(postId) {


    const comentariosDiv = document.getElementById('comentarios_' + postId);
    const botaoComentario = document.getElementById('bt_comentario_' + postId);

    if (!comentariosDiv) {
        console.error('Div de comentários não encontrada:', 'comentarios_' + postId);
        return;
    }

    if (!botaoComentario) {
        console.error('Botão de comentário não encontrado:', 'bt_comentario_' + postId);
        return;
    }

    // Verifica se está visível
    const isVisible = comentariosDiv.style.display !== 'none';



    if (isVisible) {
        // ESCONDER
        comentariosDiv.style.display = 'none';
        comentariosDiv.classList.remove('show');
        botaoComentario.classList.remove('active');

        // Volta ícone outline
        const icon = botaoComentario.querySelector('i');
        if (icon) {
            icon.className = 'far fa-comment';
        }


    } else {
        // MOSTRAR
        comentariosDiv.style.display = 'block';

        // Pequeno delay para animação
        setTimeout(() => {
            comentariosDiv.classList.add('show');
        }, 10);

        botaoComentario.classList.add('active');

        // Muda para ícone preenchido
        const icon = botaoComentario.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-comment';
        }

        // Foca no input de comentário
        setTimeout(() => {
            const input = document.getElementById('inp_comentario_' + postId);
            if (input) {
                input.focus();
            }
        }, 300);

    }
}

// Função para fechar todos os comentários (opcional)
function fecharTodosComentarios() {
    const todosBotoes = document.querySelectorAll('[id^="bt_comentario_"]');
    todosBotoes.forEach(botao => {
        const postId = botao.id.replace('bt_comentario_', '');
        const comentariosDiv = document.getElementById('comentarios_' + postId);

        if (comentariosDiv && comentariosDiv.style.display !== 'none') {
            toggleComentarios(postId);
        }
    });
}





// Função específica para toggle dos comentários de TÓPICOS
function toggleComentariosTopico(topicoId) {


    const comentariosDiv = document.getElementById('comentarios_topico_' + topicoId);
    const botaoComentario = document.getElementById('bt_comentario_topico_' + topicoId);

    if (!comentariosDiv) {
        console.error('Div de comentários de tópico não encontrada:', 'comentarios_topico_' + topicoId);
        return;
    }

    if (!botaoComentario) {
        console.error('Botão de comentário de tópico não encontrado:', 'bt_comentario_topico_' + topicoId);
        return;
    }

    // Verifica se está visível
    const isVisible = comentariosDiv.style.display !== 'none';


    if (isVisible) {
        // ESCONDER
        comentariosDiv.style.display = 'none';
        comentariosDiv.classList.remove('show');
        botaoComentario.classList.remove('active');

        // Volta ícone outline
        const icon = botaoComentario.querySelector('i');
        if (icon) {
            icon.className = 'far fa-comment';
        }

    } else {
        // MOSTRAR
        comentariosDiv.style.display = 'block';

        // Pequeno delay para animação
        setTimeout(() => {
            comentariosDiv.classList.add('show');
        }, 10);

        botaoComentario.classList.add('active');

        // Muda para ícone preenchido
        const icon = botaoComentario.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-comment';
        }

        // Foca no input de comentário
        setTimeout(() => {
            const input = document.getElementById('inp_comentario_topico_' + topicoId);
            if (input) {
                input.focus();
            }
        }, 300);

    }
}

// Função para fechar todos os comentários de tópicos (opcional)
function fecharTodosComentariosTopicos() {
    const todosBotoes = document.querySelectorAll('[id^="bt_comentario_topico_"]');
    todosBotoes.forEach(botao => {
        const topicoId = botao.id.replace('bt_comentario_topico_', '');
        const comentariosDiv = document.getElementById('comentarios_topico_' + topicoId);

        if (comentariosDiv && comentariosDiv.style.display !== 'none') {
            toggleComentariosTopico(topicoId);
        }
    });
}




// Função para Sugestões de conexão

function connectCard(button) {
    // Encontra o elemento pai mais próximo com a classe 'rd-card-rede'
    const card = button.closest('.rd-card-rede');
    if (card) {
        card.classList.add('connected'); // Adiciona a classe para mudar a cor
    }
}


function connectCard1(button) {
    // Encontra o elemento pai mais próximo com a classe 'rd-card-rede'
    const card = button.closest('.rd-card-sugestao');
    if (card) {
        card.classList.add('connected'); // Adiciona a classe para mudar a cor
    }
}





// Função específica para toggle dos comentários de POSTS DE EMPRESA
function toggleComentariosEmpresa(postEmpresaId) {


    const comentariosDiv = document.getElementById('comentarios_empresa_' + postEmpresaId);
    const botaoComentario = document.getElementById('bt_comentario_empresa_' + postEmpresaId);

    if (!comentariosDiv) {
        console.error('Div de comentários de empresa não encontrada:', 'comentarios_empresa_' + postEmpresaId);
        return;
    }

    if (!botaoComentario) {
        console.error('Botão de comentário de empresa não encontrado:', 'bt_comentario_empresa_' + postEmpresaId);
        return;
    }

    // Verifica se está visível
    const isVisible = comentariosDiv.style.display !== 'none';


    if (isVisible) {
        // ESCONDER
        comentariosDiv.style.display = 'none';
        comentariosDiv.classList.remove('show');
        botaoComentario.classList.remove('active');

        // Volta ícone outline
        const icon = botaoComentario.querySelector('i');
        if (icon) {
            icon.className = 'far fa-comment';
        }
    } else {
        // MOSTRAR
        comentariosDiv.style.display = 'block';

        // Pequeno delay para animação
        setTimeout(() => {
            comentariosDiv.classList.add('show');
        }, 10);

        botaoComentario.classList.add('active');

        // Muda para ícone preenchido
        const icon = botaoComentario.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-comment';
        }

        // Foca no input de comentário
        setTimeout(() => {
            const input = document.getElementById('inp_mensagem_empresa_' + postEmpresaId);
            if (input) {
                input.focus();
            }
        }, 300);
    }
}

// Função para fechar todos os comentários de empresa (opcional)
function fecharTodosComentariosEmpresa() {
    const todosBotoes = document.querySelectorAll('[id^="bt_comentario_empresa_"]');
    todosBotoes.forEach(botao => {
        const postEmpresaId = botao.id.replace('bt_comentario_empresa_', '');
        const comentariosDiv = document.getElementById('comentarios_empresa_' + postEmpresaId);

        if (comentariosDiv && comentariosDiv.style.display !== 'none') {
            toggleComentariosEmpresa(postEmpresaId);
        }
    });
}
