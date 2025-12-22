// CARROSSEL

document.addEventListener("DOMContentLoaded", () => {
	const controls = document.querySelectorAll(".control");
	let isScrolling = false; // Flag para controlar a rolagem

	controls.forEach((control) => {
		control.addEventListener("click", (e) => {
			if (isScrolling) return; // Impede múltiplos cliques durante a rolagem

			isScrolling = true; // Define a flag para indicar que está rolando

			// Selecionar o contêiner da galeria
			const galleryWrapper = document.querySelector(".gallery-wrapper");

			// Definir a quantidade de pixels para rolar por clique
			const scrollAmount = 2000; // Ajuste conforme necessário

			// Verificar qual seta foi clicada
			const isLeft = e.target.closest(".arrow-left");

			// Rolar a galeria
			galleryWrapper.scrollBy({
				left: isLeft ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});

			// Esperar até a rolagem terminar antes de permitir outro clique
			setTimeout(() => {
				isScrolling = false; // Permitir novos cliques
			}, 200); // Tempo aproximado da rolagem suave (ajuste conforme necessário)
		});
	});
});
