$(document).ready(function() {
	var el = $("#slider1").children("div");
	var inter = 0;
    setTimeout(function() {
        fadeImages(el, inter);
    }, 2000);
	//fadeImages(el, inter);
    
	$('.alert').alert();

	// initialize fancybox
	$('.fancybox').fancybox();

	// when main vehicle image is clicked, click first image in gallery.
	$('#mainImage').click(function() {
		$('img#gal_img0').click();
	});

	// when print button is clicked, print the above ad image.
	$('.print').click(function(event) {
		event.preventDefault();
		var img = $(this).prev('img').attr('src');
		var win = window.open('', 'Coupon', 'status=1');

		if (win) {
			win.document.writeln('<img src="' + img + '" alt="img">');
			win.document.close();
			win.focus();
			win.print();
		}
	});

	// initialize bootstrap carousel
	$('.carousel').carousel('cycle');

	// initialize carousel hover pause
	$('.carousel').hover(function() {
		$(this).carousel('pause');
	}, function() {
		$(this).carousel('cycle');
	});

	

	// Datepicker Call
	$(".datepicker").datepicker();

	$('.validate').submit(function(event) {
		//event.preventDefault();
		var form_submit = true;
		var form_id = this.id;
		$('input').each(function(index) {
			var $parent = $(this).closest('form').attr('id');
			// parent form element id
			var $input = $(this);
			// input element
			var $val = $input.val();
			// input value
			var $status = $input.parent();
			// input parent div
			var $id = $input.attr('id');
			// input id
			var $error = $('#error');
			// error message element

			if ($parent == form_id) {
				if (!$val || $val == '' || $val == ' ') {
					if ($input.hasClass('required')) {
						form_submit = false;
					}
				} else {
					if ($status.hasClass('error')) {
						form_submit = false;
					}
				}
			}

		});
		return form_submit;

	});

});

$(function() {

}); 