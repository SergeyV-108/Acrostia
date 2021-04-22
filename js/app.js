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
let dataTargets = document.querySelectorAll('[data-target]');
let screenContents = document.querySelectorAll('.screen-content');
let screens = document.querySelectorAll('.page__screen');

// Функция для добавления обработчика событий
function addHandler(object, event, handler, useCapture) {
	if (object.addEventListener) {
		object.addEventListener(event, handler, useCapture ? useCapture : false);
	} else if (object.attachEvent) {
		object.attachEvent('on' + event, handler);
	} else alert("Add handler is not supported");
}
// Добавляем обработчики
/* Gecko */
//addHandler(window, 'DOMMouseScroll', wheel);
/* Opera */
//addHandler(window, 'mousewheel', wheel);
/* IE */
//addHandler(document, 'mousewheel', wheel);
let i = 0;
console.log(dataScrolls[i]);
console.log(dataScrolls[i + 1]);
console.log(dataScrolls[i + 2]);
console.log(dataScrolls[i + 3]);
console.log(dataScrolls[i + 4]);
/* for (; i < dataScrolls.length; i++) {
	dataScrolls[0].click();
} */

// Обработчик события
/* function wheel(event) {

	var delta; // Направление скролла
	// -1 - скролл вниз
	// 1  - скролл вверх
	event = event || window.event;
	// Chrome работают со свойством wheelDelta
	if (event.wheelDelta) {
		delta = event.wheelDelta / 120;

		let i = 0;
		//let dataScroll = dataScrolls[i];
		//while (i < dataScrolls.length) {

		//dataScrolls[i].click();

		if (delta < 0) {
			do {
				dataScrolls[i].click();
				i++;
			} while (i < dataScrolls.length); //{
				
				//dataScrolls[i+1].click();
				//dataScrolls[i+2].click();
				
			//}
			//alert(dataScroll);

			//i = i + 1;

			//dataScroll.classList.add('active');
			//console.log(dataScrolls[i]);

			//break;
			//dataScroll.click();

			//document.querySelector('[data-scroll]').click();
		} else {
			//while (i < dataScrolls.length) {
				dataScrolls[i--].click();
				//i--;
				if (i < 1) {
					i = 1
				}
			//}


			//dataScroll.classList.remove('active');
			//}

		}
	}
	// Запрещаем обработку события браузером по умолчанию
	

} */

document.addEventListener("DOMContentLoaded", function () {
	for (let screenContent of screenContents) {
		if (screenContent.offsetHeight > window.innerHeight || window.innerWidth < 730) {
			freeMode();
		} else {
			fadeMode();
		}
	}

	document.querySelector('[data-scroll]').click();
});

window.addEventListener('resize', function () {
	for (let screenContent of screenContents) {
		if (screenContent.offsetHeight > window.innerHeight || window.innerWidth < 730) {
			freeMode();
		} else {
			fadeMode();
		}
	}
});

/* window.addEventListener('wheel', function () {
	
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
				bodyLock.classList.remove('lock');

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
}

//свободный режим (скролл)
function freeMode() {

	for (let screen of screens) {
		screen.classList.add('free');
	}

	for (let screenContent of screenContents) {
		screenContent.classList.add('free');
	}

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
				bodyLock.classList.remove('lock');

				dataScroll.classList.add('active');
			}

			sectionId.scrollIntoView({
				behavior: 'smooth', // плавный скрол
			});
		}
		document.querySelector('[data-scroll]').click();
	}
}

// добавление/удаление класса "active" ссылкам меню header при скролле
window.addEventListener('scroll', addClassDataScroll);

function addClassDataScroll(params) {
	//console.log(pageYOffset);//текущий скролл
	for (let screenContent of screenContents) {
		const screenHeight = screenContent.offsetHeight; //высота screen
		const screenOffset = offset(screenContent).top; // позиция относительно верха
		//console.log(screenOffset);
		for (let dataTarget of dataTargets) {
			let dataTargetId = dataTarget.getAttribute("data-target");
			if (pageYOffset >= screenOffset && pageYOffset < (screenOffset + screenHeight)) {

				if (dataTarget.classList.contains('active')) {
					dataTarget.classList.remove('active');
				}

				if (screenContent.id == dataTargetId) {
					dataTarget.classList.add('active');
				}
			}
		}
	}
}

function offset(el) {
	const rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
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
