
var tttjs = {
    $settings: {
        idioma: ""
    },
    init: function(settings){
        tttjs.$settings = $.extend(tttjs.$settings, settings);

            $(window).scroll(function() {
            if ($(window).scrollTop()>80){
                $("nav.navbar-default").addClass("navbar-fixed-top");
				$("#cuerpo").addClass("scroll");
            }
            else {
                $("nav.navbar-default").removeClass("navbar-fixed-top");
				$("#cuerpo").removeClass("scroll");
            }
			//animaciones se ejecutan cuando se vean en el viewport.
			tttjs.checkAnimation(".animaL,.animaR");
	        });
	
	        //ejecutamos animaciones que ya se vean
	        tttjs.checkAnimation(".animaL,.animaR");
		
    },
	checkAnimation:function(ele){
		var $elem = $(ele);
		
		$elem.each(function(){
		
			// If the animation has already been started
			if ($(this).hasClass('animated')) return;

			if (tttjs.isElementInViewport($(this))) {
				
				// Start the animation
				if($(this).hasClass("animaL")){
					$(this).addClass('animated fadeInLeft');
				}else{
					$(this).addClass('animated fadeInRight');
				}
			}
		});
	},
	isElementInViewport:function(elem) {
		var $elem = $(elem);

		// Get the scroll position of the page.
		var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
		var viewportTop = $(scrollElem).scrollTop();
		var viewportBottom = viewportTop + $(window).height();

		// Get the position of the element on the page.
		var elemTop = Math.round( $elem.offset().top );
		var elemBottom = elemTop + $elem.height();

		return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
	}
	
};