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
			if (imagePos < topOfWindow+500) {
				$(this).addClass('fadeIn');
			}
		});
	});

	$(window).scroll(function() {
    'use strict';
		$('.hatchClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+500) {
				$(this).addClass('hatch');
			}
		});
	});

	$(window).scroll(function() {
    'use strict';
		$('.slideRightClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+500) {
				$(this).addClass('slideRight');
			}
		});
	});

  $(window).scroll(function() {
    'use strict';
		$('.slideLeftClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+500) {
				$(this).addClass('slideLeft');
			}
		});
	});

	$(window).scroll(function() {
    'use strict';
		$('.pullUpClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+500) {
				$(this).addClass('pullUp');
			}
		});
	});

	$(window).scroll(function() {
    'use strict';
		$('.expandUpClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+500) {
				$(this).addClass('expandUp');
			}
		});
	});

	$(window).scroll(function() {
    'use strict';
		$('.floatingClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+500) {
				$(this).addClass('floating');
			}
		});
	});

  $(window).scroll(function() {
    'use strict';
		$('.pulseClass').each(function(){
		var imagePos = $(this).offset().top;

		var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+500) {
				$(this).addClass('pulse');
			}
		});
	});

	$('#animatedElement').click(function() {
    'use strict';
		$(this).addClass('slideUp');
	});
