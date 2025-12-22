// CARROSSEL

document.addEventListener("DOMContentLoaded", () => {
	const controls = document.querySelectorAll(".control");

	controls.forEach((control) => {
		control.addEventListener("click", (e) => {
			console.log("Evento de clique detectado.");

			// Recalcular os itens dinamicamente
			const items = document.querySelectorAll(".item");
			const maxItems = items.length;
			console.log("Itens encontrados:", items.length);

			let currentItem = Array.from(items).findIndex((item) =>
				item.classList.contains("current-item")
			);
			console.log("Índice do item atual:", currentItem);

			if (currentItem === -1) {
				console.warn("Nenhum item com a classe 'current-item' foi encontrado!");
				currentItem = 0; // Definir o primeiro item como padrão
			}

			const isLeft = e.target.closest(".arrow-left");
			console.log("Botão clicado:", isLeft ? "Esquerda" : "Direita");

			// Atualizar o índice do item atual
			if (isLeft) {
				currentItem -= 1;
			} else {
				currentItem += 1;
			}

			if (currentItem >= maxItems) {
				currentItem = 0;
			}

			if (currentItem < 0) {
				currentItem = maxItems - 1;
			}
			console.log("Novo índice do item atual:", currentItem);

			// Atualizar as classes e realizar a rolagem
			items.forEach((item) => item.classList.remove("current-item"));

			items[currentItem].classList.add("current-item");
			console.log("Classe 'current-item' adicionada ao item:", items[currentItem]);

			items[currentItem].scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
			console.log("scrollIntoView chamado para o item:", items[currentItem]);
		});
	});
});