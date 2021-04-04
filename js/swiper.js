let swiper = new Swiper('.home-page__container', {

	pagination: {
		el: '.home-page__pagination',
		clickable: true,
	},

	navigation: {
		nextEl: '.home-page__button-next',
		prevEl: '.home-page__button-prev',
	},

	effect: 'fade',

	autoHeight: true,

});