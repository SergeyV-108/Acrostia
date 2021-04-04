//=============== Функционал бургер-меню header =================//
let menuBurger = document.querySelector('.burger-menu');
let menuList = document.querySelector('.menu-header__list');
let bodyLock = document.querySelector('body');

menuBurger.addEventListener("click", function (e) {
	menuBurger.classList.toggle('active');
	menuList.classList.toggle('active');
	bodyLock.classList.toggle('lock');//отмента скролла документа при открытом меню header
});
//===============================================================//
//================== Функционал меню header =====================//
let dataScrolls = document.querySelectorAll('[data-scroll]');
let screenContents = document.querySelectorAll('.screen-content');
let screens = document.querySelectorAll('.page__screen');

document.addEventListener("DOMContentLoaded", function () {
	for (let screenContent of screenContents) {
		if (screenContent.offsetHeight > window.innerHeight) {
			freeMode();
		} else {
			fadeMode();
		}
	}
});

window.addEventListener('resize', function () {
	for (let screenContent of screenContents) {
		if (screenContent.offsetHeight > window.innerHeight) {
			freeMode();
		} else {
			fadeMode();
		}
	}
});

/* window.addEventListener('wheel', function () {
	var elm = document.querySelector('#header');
	var ms = new MenuSpy(elm);
}); */

//режим смены экранов затуханием
function fadeMode() {

	for (let screen of screens) {
		screen.classList.remove('free');
	}

	for (let screenContent of screenContents) {
		screenContent.classList.remove('free');
	}

	for (let dataScroll of dataScrolls) {
		let dataScrollId = dataScroll.getAttribute("data-scroll");
		let sectionId = document.querySelector(dataScrollId);

		dataScroll.addEventListener('click', changeContent);

		function changeContent(event) {
			event.preventDefault();

			if (!dataScroll.classList.contains('active')) {
				for (let dataScroll of dataScrolls) {
					dataScroll.classList.remove('active');
				}

				menuBurger.classList.remove('active');
				menuList.classList.remove('active');
				dataScroll.classList.add('active');
			}

			let screensContent = document.querySelectorAll('.screen-content');

			for (let screenContent of screensContent) {
				if (screenContent.classList.contains('active')) {
					screenContent.classList.remove('active');
				}
				if (screenContent.id == sectionId.id) {
					screenContent.classList.add('active');
				}
			}
		}
	}

	document.querySelector('[data-scroll]').click();
}
//свободный режим (скрол)

function freeMode() {

	for (let screen of screens) {
		screen.classList.add('free');
	}

	for (let screenContent of screenContents) {
		screenContent.classList.add('free');
	}

	//============= Функционал меню header при скролле ==============//
	/* var elm = document.querySelector('#header');
	var ms = new MenuSpy(elm); */
	//===============================================================// 


	for (let dataScroll of dataScrolls) {
		let dataScrollId = dataScroll.getAttribute("data-scroll");
		let sectionId = document.querySelector(dataScrollId);

		dataScroll.addEventListener('click', scrollContent);

		function scrollContent(event) {
			event.preventDefault();

			if (!dataScroll.classList.contains('active')) {
				for (let dataScroll of dataScrolls) {
					dataScroll.classList.remove('active');
				}

				menuBurger.classList.remove('active');
				menuList.classList.remove('active');

				dataScroll.classList.add('active');
			}

			sectionId.scrollIntoView({
				behavior: 'smooth', // плавный скрол
			});
		}
		document.querySelector('[data-scroll]').click();
	}
}
//===============================================================//
//================= Функционал меню Portfolio ===================//
let menuBtns = document.querySelectorAll('.menu-portfolio__btn');
let cardsPortfolio = document.querySelectorAll(".card-portfolio");

for (let menuBtn of menuBtns) {

	menuBtn.addEventListener("click", function () {
		//================= кнопки =====================//
		for (let menuBtn of menuBtns) {
			menuBtn.classList.remove('active');
		}
		this.classList.add('active');

		//================= карточки =====================//
		let cardId = menuBtn.getAttribute("data-card");
		let currentCards = document.querySelectorAll(cardId);

		for (let cardPortfolio of cardsPortfolio) {
			cardPortfolio.classList.remove('active');

			for (let currentCard of currentCards) {
				currentCard.classList.add('active');
			}
		}
	});
}

//Вешается active на первый из menu-portfolio__btn
document.querySelector('.menu-portfolio__btn').click();
//===============================================================//
