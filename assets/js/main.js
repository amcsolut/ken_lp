(function ($) {
	"use strict";

	/*=============================================
		=    		 Preloader			      =
	=============================================*/
	function preloader() {
		$('#preloader').delay(0).fadeOut();
	};

	$(window).on('load', function () {
		preloader();
		mainSlider();
		aosAnimation();
		wowAnimation();
	});


	/*=============================================
		=          Data Background               =
	=============================================*/
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
	})


	/*=============================================
		=    		Mobile Menu			      =
	=============================================*/
	//SubMenu Dropdown Toggle
	if ($('.menu-area li.menu-item-has-children ul').length) {
		$('.menu-area .navigation li.menu-item-has-children').append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');
	}
	//Mobile Nav Hide Show
	if ($('.mobile-menu').length) {

		var mobileMenuContent = $('.menu-area .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);

		//Dropdown Button
		$('.mobile-menu li.menu-item-has-children .dropdown-btn').on('click', function () {
			$(this).toggleClass('open');
			$(this).prev('ul').slideToggle(500);
		});
		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function () {
			$('body').addClass('mobile-menu-visible');
		});

		//Menu Toggle Btn
		$('.menu-backdrop, .mobile-menu .close-btn').on('click', function () {
			$('body').removeClass('mobile-menu-visible');
		});
	}


	/*=============================================
		=     Menu sticky & Scroll to top      =
	=============================================*/
	$(window).on('scroll', function () {
		var scroll = $(window).scrollTop();
		if (scroll < 245) {
			$("#sticky-header").removeClass("sticky-menu");
			$('.scroll-to-target').removeClass('open');

		} else {
			$("#sticky-header").addClass("sticky-menu");
			$('.scroll-to-target').addClass('open');
		}
	});


	/*=============================================
		=    		 Scroll Up  	         =
	=============================================*/
	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function () {
			var target = $(this).attr('data-target');
			// animate
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 1000);

		});
	}


	/*=============================================
		=             Main Slider                =
	=============================================*/
	function mainSlider() {
		var BasicSlider = $('.slider-active');
		BasicSlider.on('init', function (e, slick) {
			var $firstAnimatingElements = $('.slider-item:first-child').find('[data-animation]');
			doAnimations($firstAnimatingElements);
		});
		BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
			var $animatingElements = $('.slider-item[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			doAnimations($animatingElements);
		});
		BasicSlider.slick({
			autoplay: true,
			autoplaySpeed: 5000,
			dots: false,
			fade: true,
			arrows: false,
			responsive: [
				{ breakpoint: 767, settings: { dots: false, arrows: false } }
			]
		});

		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function () {
				var $this = $(this);
				var $animationDelay = $this.data('delay');
				var $animationType = 'animated ' + $this.data('animation');
				$this.css({
					'animation-delay': $animationDelay,
					'-webkit-animation-delay': $animationDelay
				});
				$this.addClass($animationType).one(animationEndEvents, function () {
					$this.removeClass($animationType);
				});
			});
		}
	}


	/*=============================================
		=         Up Coming Movie Active        =
	=============================================*/
	$('.ucm-active').owlCarousel({
		loop: true,
		margin: 30,
		items: 4,
		autoplay: false,
		autoplayTimeout: 5000,
		autoplaySpeed: 1000,
		navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
		nav: true,
		dots: false,
		responsive: {
			0: {
				items: 1,
				nav: false,
			},
			575: {
				items: 2,
				nav: false,
			},
			768: {
				items: 2,
				nav: false,
			},
			992: {
				items: 3,
			},
			1200: {
				items: 4
			},
		}
	});
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		$(".ucm-active").trigger('refresh.owl.carousel');
	});


	/*=============================================
		=         Up Coming Movie Active        =
	=============================================*/
	$('.ucm-active-two').owlCarousel({
		loop: true,
		margin: 45,
		items: 5,
		autoplay: false,
		autoplayTimeout: 5000,
		autoplaySpeed: 1000,
		navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
		nav: true,
		dots: false,
		responsive: {
			0: {
				items: 1,
				nav: false,
				margin: 30,
			},
			575: {
				items: 2,
				nav: false,
				margin: 30,
			},
			768: {
				items: 2,
				nav: false,
				margin: 30,
			},
			992: {
				items: 3,
				margin: 30,
			},
			1200: {
				items: 5
			},
		}
	});
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		$(".ucm-active-two").trigger('refresh.owl.carousel');
	});


	/*=============================================
		=    		Brand Active		      =
	=============================================*/
	$('.brand-active').slick({
		dots: false,
		infinite: true,
		speed: 1000,
		autoplay: true,
		arrows: false,
		slidesToShow: 6,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					arrows: false,
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
				}
			},
		]
	});


	/*=============================================
		=         Gallery-active           =
	=============================================*/
	$('.gallery-active').slick({
		centerMode: true,
		centerPadding: '350px',
		slidesToShow: 1,
		prevArrow: '<span class="slick-prev"><i class="fas fa-caret-left"></i> previous</span>',
		nextArrow: '<span class="slick-next">Next <i class="fas fa-caret-right"></i></span>',
		appendArrows: ".slider-nav",
		responsive: [
			{
				breakpoint: 1800,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding: '220px',
					infinite: true,
				}
			},
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding: '180px',
					infinite: true,
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding: '160px',
					arrows: false,
					infinite: true,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					centerPadding: '60px',
					arrows: false,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding: '0px',
					arrows: false,
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerPadding: '0px',
					arrows: false,
				}
			},
		]
	});

	/*=============================================
		=    		Odometer Active  	       =
	=============================================*/
	$('.odometer').appear(function (e) {
		var odo = $(".odometer");
		odo.each(function () {
			var countNumber = $(this).attr("data-count");
			$(this).html(countNumber);
		});
	});


	/*=============================================
	=           Magnific Popup             =
=============================================*/

	// Função para inicializar o Magnific Popup
	function initializeMagnificPopup() {
		console.log("Inicializando Magnific Popup nos elementos .popup-video");

		// Remove inicializações anteriores
		$('.popup-video').off('click.magnificPopup');

		// Inicializa para vídeos
		$('.popup-video').magnificPopup({
			type: 'iframe'
		});
	}

	$(document).on('click', '.popup-video', function (e) {
		e.preventDefault(); // Impede o comportamento padrão

		$(this).magnificPopup({
			type: 'iframe',
			items: {
				src: $(this).attr('href')
			}
		}).magnificPopup('open');
	});

	// // Reativa para elementos dinâmicos quando o repetidor é atualizado
	// $('#repeat_aulas').on('dmx-on:updated', function () {
	// 	console.log("Repetidor de aulas atualizado. Reativando Magnific Popup.");
	// 	initializeMagnificPopup();
	// });

	// $('#repeat_aulas').on('dmx-on:updated', function () {
	// 	console.log("Repetidor atualizado.");
	// 	initializeMagnificPopup();
	// });

	// 	// Inicializa para os elementos existentes ao carregar a página
	// $(document).ready(function () {
	// 	console.log("Documento carregado. Chamando initializeMagnificPopup.");
	// 	initializeMagnificPopup();
	// });





	/*=============================================
		=    		Isotope	Active  	      =
	=============================================*/
	$('.tr-movie-active').imagesLoaded(function () {
		// init Isotope
		var $grid = $('.tr-movie-active').isotope({
			itemSelector: '.grid-item',
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-sizer',
			}
		});
		// filter items on button click
		$('.tr-movie-menu-active').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});

	});
	//for menu active class
	$('.tr-movie-menu-active button').on('click', function (event) {
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
		event.preventDefault();
	});


	/*=============================================
		=    		 Aos Active  	         =
	=============================================*/
	function aosAnimation() {
		AOS.init({
			duration: 1000,
			mirror: true,
			once: true,
			disable: 'mobile',
		});
	}


	/*=============================================
		=    		 Wow Active  	         =
	=============================================*/
	function wowAnimation() {
		var wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 0,
			mobile: false,
			live: true
		});
		wow.init();
	}


})(jQuery);


// Códigos para Copyrig automático

// Obtém o ano atual
const anoAtual = new Date().getFullYear();

// Exibe o ano de copyright no elemento com id "copyright"
document.getElementById("copyright").textContent = `© ${anoAtual}`;







// //*=============================================
// 		=    		LEITOR PDF =
// =============================================*//

// Configuração do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Elementos DOM
const pdfCanvas = document.getElementById('pdfCanvas');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');
const pdfLink = document.getElementById('pdfLink');

// Variáveis para controle do PDF
let pdfDoc = null;
let pageNum = 1;
let pageRendering = false;
let pageNumPending = null;
let scale = 1.5;
const ctx = pdfCanvas.getContext('2d');

/**
 * Renderiza a página atual do PDF
 */
function renderPage(num) {
	pageRendering = true;

	// Busca a página
	pdfDoc.getPage(num).then(function (page) {
		const viewport = page.getViewport({ scale: scale });
		pdfCanvas.height = viewport.height;
		pdfCanvas.width = viewport.width;

		// Renderiza o PDF na canvas
		const renderContext = {
			canvasContext: ctx,
			viewport: viewport
		};

		const renderTask = page.render(renderContext);

		// Aguarda a renderização terminar
		renderTask.promise.then(function () {
			pageRendering = false;

			if (pageNumPending !== null) {
				// Nova página solicitada enquanto esta renderizava
				renderPage(pageNumPending);
				pageNumPending = null;
			}
		});
	});

	// Atualiza o número da página atual
	currentPageSpan.textContent = num;

	// Atualiza o estado dos botões de navegação
	updateNavigationButtons();
}

/**
 * Atualiza o estado dos botões de navegação
 */
function updateNavigationButtons() {
	prevPageButton.disabled = pageNum <= 1;
	nextPageButton.disabled = pageNum >= pdfDoc.numPages;

	// Também podemos ajustar a opacidade para feedback visual
	prevPageButton.style.opacity = pageNum <= 1 ? "0.5" : "1";
	nextPageButton.style.opacity = pageNum >= pdfDoc.numPages ? "0.5" : "1";
}

/**
 * Troca para a página anterior caso já não esteja na primeira
 */
function goPrevPage() {
	if (pageNum <= 1) {
		return;
	}
	pageNum--;
	queueRenderPage(pageNum);
}

/**
 * Troca para a próxima página caso já não esteja na última
 */
function goNextPage() {
	if (pageNum >= pdfDoc.numPages) {
		return;
	}
	pageNum++;
	queueRenderPage(pageNum);
}

/**
 * Coloca a renderização da página na fila
 */
function queueRenderPage(num) {
	if (pageRendering) {
		pageNumPending = num;
	} else {
		renderPage(num);
	}
}

/**
 * Carrega o PDF a partir da URL
 */
function loadPdf(url) {
	// Reseta valores
	pageNum = 1;

	// Carrega o documento
	const loadingTask = pdfjsLib.getDocument(url);
	loadingTask.promise.then(function (pdf) {
		pdfDoc = pdf;
		totalPagesSpan.textContent = pdf.numPages;

		// Renderiza a primeira página
		renderPage(pageNum);
	}).catch(function (error) {
		console.error('Erro ao carregar o PDF:', error);
		// alert('Erro ao carregar o PDF. Verifique o console para detalhes.');
	});
}

// Event listeners
prevPageButton.addEventListener('click', goPrevPage);
nextPageButton.addEventListener('click', goNextPage);

// Navegação com teclado
document.addEventListener('keydown', function (e) {
	if (pdfDoc) {
		if (e.key === 'ArrowLeft') {
			goPrevPage();
		} else if (e.key === 'ArrowRight') {
			goNextPage();
		}
	}
});

// Observador de mudanças no link do PDF
const observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.type === 'attributes' && mutation.attributeName === 'href') {
			const pdfUrl = pdfLink.href;
			loadPdf(pdfUrl);
		}
	});
});

// Inicia o observador no link do PDF
observer.observe(pdfLink, {
	attributes: true // Observa mudanças nos atributos
});

// Carrega o PDF automaticamente quando a página carrega (opcional)
document.addEventListener('DOMContentLoaded', function () {
	// Carrega o PDF inicialmente
	const pdfUrl = pdfLink.href;
	loadPdf(pdfUrl);
});

// Ajuste de escala para responsividade
window.addEventListener('resize', function () {
	if (pdfDoc) {
		renderPage(pageNum);
	}
});
