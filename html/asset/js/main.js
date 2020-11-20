$(document).ready(function() {

	// modal login
	$('#menu-register').on('click', function (e) {
		$('#modal-welcome').modal('hide')
		$('#modal-register').modal('show')
	})
	$('#menu-login').on('click', function (e) {
		$('#modal-welcome').modal('hide')
		$('#modal-login').modal('show')
	})

	// search solario
	$('#menu-search-solario').click(function(e){
		e.preventDefault();
		$('#form-search-solario').toggleClass('-active');
		var hass = $('#form-search-solario').hasClass('-active');
		if(hass){
			$('input[name=search-solario]').focus();
		}
	});
	
	// search easysolar
	$('#menu-search-easysolar').click(function(e){
		e.preventDefault();
		$('#form-search-easysolar').toggleClass('-active');
		var hase = $('#form-search-easysolar').hasClass('-active');
		if(hase){
			$('input[name=search-easysolar]').focus();
		}
	});

	// close search
	$(".header").clickOff(function() {
		$('#form-search-solario').removeClass('-active');
	});
	$(".header").clickOff(function() {
		$('#form-search-easysolar').removeClass('-active');
	});

	// menu sidebar
	$('#menu-burger').click(function(e){
		e.preventDefault();
		$('body').toggleClass('-sidebar-active');
	});

	// slider
	if($('.showcase-slider').length>0 && $('.showcase-slider').children().length>1 ) {
		$('.showcase-slider').slick({
			prevArrow: '<button type="button" class="button showcase-arrow -left" role="button"><i class="fa fa-long-arrow-left" aria-hidden="true"></i></button>',
			nextArrow: '<button type="button" class="button showcase-arrow -right" role="button"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></button>',
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 6000,
			arrows: true,
			fade: true,
			zIndex: 9,
			pauseOnFocus: true,
			responsive: [
				{
				breakpoint: 1024,
				settings: {
					arrows: false,
					dots: true
					}
				}
			]		
		});
	}

	document.addEventListener('click', function(e){
		let rootsem = document.getElementById('sidebar');
		let rootsem2 = document.getElementById('menu-burger');
		if(!!rootsem || !!rootsem) {
			if(rootsem.contains(e.target) || rootsem2.contains(e.target)) {
			} else {
				// console.log('close')
				$('body').removeClass('-sidebar-active');
			}
		}
	});	
	
});

$.fn.clickOff = function(callback, selfDestroy) {
    var clicked = false;
    var parent = this;
    var destroy = selfDestroy || true;

    parent.click(function() {
        clicked = true;
    });

    $(document).click(function(event) {
        if (!clicked && parent.is(':visible')) {
            if(callback) callback.call(parent, event)
        }
        if (destroy) {
            //parent.clickOff = function() {};
            //parent.off("click");
            //$(document).off("click");
            parent.off("clickOff");
        }
        clicked = false;
    });
};
