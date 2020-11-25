$(document).ready(function() {
	
	// scrolling filter order
	var w = document.documentElement.clientWidth;
	var	msb	= document.querySelectorAll('.board-filter-wrap')[0]
	if(!!msb) {
		var maxScrollLeftJq = $('.board-filter-wrap').get(0).scrollWidth - $('.board-filter-wrap').get(0).clientWidth
		var maxScrollLeft = msb.scrollWidth - msb.clientWidth;
		var sl;
		var sr;
	}

	$('#filter-button-right').click(function(e){
		scrollRight()
	});
	
	$('#filter-button-left').click(function(e){
		scrollLeft()
	});

	function scrollLeft() {
		msb.scrollLeft -= 15;
		//console.log('l'+msb.scrollLeft)
		sl = requestAnimationFrame(scrollLeft);
		if(msb.scrollLeft < 1) {
			cancelAnimationFrame(sl);
		}
	}
	function scrollRight() {
		msb.scrollLeft += 15;
		//console.log('r'+msb.scrollLeft)
		sr = requestAnimationFrame(scrollRight);
		if(msb.scrollLeft >= (maxScrollLeft - 29)) {
			cancelAnimationFrame(sr);
		}
	}

	// scroll filter active tab
	if(w<768) {
		if(!!msb) {
			var	msbe		= msb.querySelectorAll('.board-filter-item.-active')[0]
			if(msbe) {
				var	sw		= msbe.clientWidth,
					sv		= msbe.getBoundingClientRect()['x']
			} else {
				var sw		= 0,
					sv		= 0
			}
			msb.scrollLeft = sv - sw
		}
	}

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

	// slider headline
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
			dots: true,
			responsive: [
				{
				breakpoint: 1024,
				settings: {
					arrows: false,
					}
				}
			]		
		});
	}

	document.addEventListener('click', function(e){
		let rootsem = document.getElementById('sidebar');
		let rootsem2 = document.getElementById('menu-burger');
		// click outside sidebar
		if(!!rootsem || !!rootsem) {
			if(rootsem.contains(e.target) || rootsem2.contains(e.target)) {
			} else {
				$('body').removeClass('-sidebar-active');
			}
		}
	});	

	// function for deleting easy finance photo preview
	$(document).on('click','.easy-upload-remove', function(e){
		$(this).parent().find('img').removeAttr('src');
		$(this).parent().find('input[type=file]').val('');
		$(this).parent().removeClass('-active');
	});
	
	// datepicker range
	$('input[name="search-board-date"]').daterangepicker({
		buttonClasses: 'button',
		applyButtonClasses: 'button -primary',
		cancelButtonClasses: 'button',
		maxYear: parseInt(moment().format('YYYY'),10)
	});

	// datepicker easy finance
	$('#easy-date').daterangepicker({
		singleDatePicker: true,
		showDropdowns: true,
		autoApply: true,
		drops: 'down',
		maxYear: parseInt(moment().format('YYYY'),10),
		parentEl: $('.easy-datepicker'),
	});

	// datepicker profile
	$('input[name=user-birth]').daterangepicker({
		singleDatePicker: true,
		showDropdowns: true,
		autoApply: true,
		drops: 'down',
		maxYear: parseInt(moment().format('YYYY'),10),
		parentEl: $('.user-datepicker'),
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

// upload img preview
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$(input).parent().find('img').attr('src', e.target.result);
			$(input).parent().addClass('-active');
		};

		reader.readAsDataURL(input.files[0]);
	}
}

// manipulate select
function triggerEvent(el, eventName) {
	let event = document.createEvent('HTMLEvents')
	event.initEvent(eventName, true, false)
	el.dispatchEvent(event)
}

var p = document.querySelectorAll('.form-select');
if(!!p) {
	p.forEach(function(item, index){
		let select = item.querySelector('select');
		select.addEventListener('change', function(e) {
			if(e.target.value == 0) {
				item.classList.add('init');
			} else {
				item.classList.remove('init');
			}
		})
		triggerEvent(select, 'change')
	});
}

// check count character
function countChar(val) {
	var maxleng = val.getAttribute('data-max')
	var len = val.value.length;
	var hint = $(val).closest('.form-row').find('.form-hint')
	if (len >= maxleng) {
		val.value = val.value.substring(0, maxleng);
		hint.addClass('-error');
	} else {
		hint.text(len+'/'+maxleng);
		hint.removeClass('-error');
	}
}

