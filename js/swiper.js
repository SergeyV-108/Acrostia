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
	autoplay: {
        	delay: 2000,
        	disableOnInteraction: false,
      	},

	autoHeight: true,
	
	autoplay: {
        	delay: 1500,
       		disableOnInteraction: false,
        },

});
