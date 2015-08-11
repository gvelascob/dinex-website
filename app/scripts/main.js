//Custom Theme JavaScript

    // Closes the sidebar menu
    $('#menu-close').click(function(e) {
        'use strict';
		e.preventDefault();
        $('#sidebar-wrapper').toggleClass('active');
    });

    // Opens the sidebar menu
    $('#menu-toggle').click(function(e) {
        'use strict';
		e.preventDefault();
        $('#sidebar-wrapper').toggleClass('active');
    });

    // Scrolls to the selected menu item on the page
    $(function() {
        'use strict';
		$('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') || location.hostname === this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

//handle animations

	$(window).scroll(function() {
    'use strict';
		$('.fadingInClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+600) {
				$(this).addClass('fadeIn');
			}
		});
	});

	$(window).scroll(function() {
    'use strict';
		$('.hatchClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+600) {
				$(this).addClass('hatch');
			}
		});
	});

	$(window).scroll(function() {
    'use strict';
		$('.slideRightClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+600) {
				$(this).addClass('slideRight');
			}
		});
	});

  $(window).scroll(function() {
    'use strict';
		$('.slideLeftClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+600) {
				$(this).addClass('slideLeft');
			}
		});
	});

	$(window).scroll(function() {
    'use strict';
		$('.pullUpClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+600) {
				$(this).addClass('pullUp');
			}
		});
	});

	$(window).scroll(function() {
    'use strict';
		$('.expandUpClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+600) {
				$(this).addClass('expandUp');
			}
		});
	});

	$(window).scroll(function() {
    'use strict';
		$('.floatingClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+600) {
				$(this).addClass('floating');
			}
		});
	});

  $(window).scroll(function() {
    'use strict';
		$('.pulseClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+600) {
				$(this).addClass('pulse');
			}
		});
	});

	$('#animatedElement').click(function() {
    'use strict';
		$(this).addClass('slideUp');
	});

function smoothBackgroundScroll(imgsrc) {
	function loadImageHeight(url, width) {
		var img = new Image();
		img.src = url;
		if (width) {
			img.width = width;
		}
		return img.height;
	}

	var dh, wh, ih, st, posy, backh, backw;
	if (!this._smoothBackgroundScroll) {
		var bcksize = $(document.body).css('background-size');
		var bmatch = /(\w+)\s*(\w+)/.exec(bcksize);
		if (!bmatch || bmatch.length < 3) {
			backh = loadImageHeight(imgsrc)
		} else {
			backh = parseInt(bmatch[2]);
			if (isNaN(backh)) {
				backw = parseInt(bmatch[1]);
				backh = loadImageHeight(imgsrc, parseInt(backw));
			}
		}
		this._smoothBackgroundScroll = {
			dh: $(document).height()
			, wh: $(window).height()
			, ih: backh
		}
	}
	dh = this._smoothBackgroundScroll.dh;
	wh = this._smoothBackgroundScroll.wh
	ih = this._smoothBackgroundScroll.ih;
	st = $(document).scrollTop();
	posy = (dh - ih) * st / (dh - wh);
	document.body.style.backgroundPosition = 'center ' + posy + 'px';
}

$(window).on('scroll', function() {
	smoothBackgroundScroll("../images/new/call-out.jpg");
});

$(window).on('scroll', function() {
	smoothBackgroundScroll("../images/new/santiago-nocturno.jpg");
}); 

$(window).on('scroll', function() {
	smoothBackgroundScroll("../images/new/portada.jpg");
}); 

$(window).on('scroll', function() {
	smoothBackgroundScroll("../images/new/portada-dinexpro.jpg");
}); 

$(window).on('scroll', function() {
	smoothBackgroundScroll("../images/new/portada-nosotros.jpg");
}); 

$(window).on('scroll', function() {
	smoothBackgroundScroll("../images/new/callout-dinexpro.jpg");
});
