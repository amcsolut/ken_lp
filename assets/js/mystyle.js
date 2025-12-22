// Seleciona o elemento da dropdown
const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Adiciona listeners para mostrar o dropdown
dropdown.addEventListener('mouseenter', () => {
  dropdownMenu.classList.add('show');
});

dropdownMenu.addEventListener('mouseenter', () => {
  dropdownMenu.classList.add('show');
});

// Adiciona listeners para esconder o dropdown
dropdown.addEventListener('mouseleave', () => {
  dropdownMenu.classList.remove('show');
});

dropdownMenu.addEventListener('mouseleave', () => {
  dropdownMenu.classList.remove('show');
});
