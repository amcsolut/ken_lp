document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('emoji-button');
    const inputField = document.getElementById('post-input');

    // Inicializar o Emoji Picker
    const picker = new EmojiButton();

    // Mostrar o picker ao clicar no botão
    button.addEventListener('click', () => {
      picker.togglePicker(button);
    });

    // Inserir emoji no campo de texto
    picker.on('emoji', emoji => {
      inputField.value += emoji;
    });
  });
