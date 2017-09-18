$(document).ready(function () {
	/* hide arrow */
	$("div.arrow-holder").hide();
	$(".hasMenu").mouseenter(function(){
		$(this).find(".caret").css("opacity","1");
	}).mouseleave(function(){
		$(this).find(".caret").css("opacity","0.3");
	});
	$(".hasMenu").click(function(){
		$(".menu-holder").hide();
		$(".arrow-holder").hide();
		var check = $(this).hasClass("Exist");
		$(".hasMenu").removeClass("Exist");
		$(".caret").css("border-top-color", "black");
		if(check){
			$(".caret").css("border-top-color", "black");
			$(this).children(".arrow-holder").css("display","none");
			
		}else{
			$(this).addClass("Exist");
			$(this).children(".menu-holder").show();
			$(this).children(".arrow-holder").show();
			$(this).find(".caret").css("border-top-color", "white");
			$(this).children(".arrow-holder").css("display","inline-block");
			
		}
	});
	
	Placeholders.init();
    //// leo responsive
	$("#resBackToTop").click(function () {
        $("html, body").animate({ scrollTop: $('#banner').offset().top }, 300);
	});
    $("#resTopMenus").click(function() {

    });


    $(function () {
        $("#resMenuHolder").animate({ 'width': 0 }, 100);
    });

    $(function () {
        $("#resTopMenus").click(function () {
            if (!$(this).hasClass("up")) {
                $("#resOverlay").show();
                $("#resMenuHolder").animate({ 'width': 240 }, 1, function () { });
                $(this).addClass("up");
            } else {
                $("#resMenuHolder").animate({ 'width': 0 }, 1, function () { });
                $(this).removeClass("up");
                $("#resOverlay").hide();
            }
            
        });
    });
    $(".resMenuHeader").click(function() {
        if ($(this).hasClass("up")) {
            $(this).removeClass("up");
            $(this).find(".resMenuExpand").html("+");
            $(this).parent().find(".resMenuLinks").slideUp();
        } else {
            $(".resMenuHeader.up").trigger("click");
            $(this).addClass("up");
            $(this).find(".resMenuExpand").html("-");
            $(this).parent().find(".resMenuLinks").slideDown();
        }
    });

    $(window).resize(function () {
        var windowsize = $(window).width();
        if (windowsize <= 700) {
            
        } else {
            $("#resTopMenus").removeClass("up").hide();
            $("#resOverlay").hide();
            $("#resMenuHolder").animate({ 'width': 0 }, 100, function () { });
            $("#resTopPhone").animate({ 'width': 'auto' }, 100, function () { });
        }
    });

    $(document).mouseup(function (e) {
        var isOverlay = $("#resOverlay");

        if (e.target.id == "resOverlay") {
            $("#topMenuBtn").trigger("click");
        }
    });

    ////// end leo responsive
});

$(function() {

});

$(document).mouseup(function(e) {
	var menu = $(".hasMenu");

	if (menu.has(e.target).length === 0) {
		$(".hasMenu").removeClass("Exist");
		$(".menu-holder").hide();
		$("div.arrow-holder").hide();
		$(this).find(".caret").css("border-top-color", "black");
	}
});

function CommaFormatted(amount) {
	amount = amount.toString().replace(/^0+/, '');
	amount += '';
	var x = amount.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function sliderImages(el, inter) {
	var count = 1;
	inter = setInterval(function() {

		$.each(el, function(index, a) {
			$(a).hide();
		});
		var item = el[count];
		$(item).show("slow");

		count++;
		if (count == el.length) {
			count = 0;
		}
	}, 6000);
}

function fadeImages(el, inter) {
	var count = 1;
	inter = setInterval(function() {

		$.each(el, function(index, a) {
			$(a).hide();
		});
		var item = el[count];
		$(item).fadeIn("slow");

		count++;
		if (count == el.length) {
			count = 0;
		}
	}, 10000);
}

//function insert_contact_us(dealerId, ctmr_type, ctmr_fname, ctmr_lname, ctmr_prefer, ctmr_email, ctmr_phone, ctmr_comment, vinnumber) {
//	showAlert();
//	var wk_data = {
//		"dealerId" : dealerId,
//		"contact_type" : ctmr_type,
//		"firstname" : ctmr_fname,
//		"lastname" : ctmr_lname,
//		"contact_prefer" : ctmr_prefer,
//		"email" : ctmr_email,
//		"phone" : ctmr_phone,
//		"comment" : ctmr_comment,
//		"vinnumber" : vinnumber
//	};

//	$.ajax({
//		type : "POST",
//		url : "/ajax/insert_contact_us.php",
//		data : wk_data,
//		dataType : "json",
//		cache : false,
//		success : function(data) {
//			hideAlert();
//			return true;
//		},
//		error : function(request, status, thrown) {
//		}
//	});
//}

function redirect_home(url) {
	location.href = url;
}

function showAlert() {
	$("#lb-sending").show();
	$("#lb-success").hide();
	$("#alert_success").fadeIn("slow");
	$("#wrapper").css("opacity", "0.3");
}

function hideAlert() {
	$("#lb-sending").hide();
	$("#lb-success").show();
	setTimeout(function() {
		$("#alert_success").fadeOut("slow");
		$("#wrapper").css("opacity", "1");
		location.reload();
	}, 2000);
}
