var numOnlyCheck = /^\d+$/;
var emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var whitespace = / /g;
var specialChar = /[^0-9a-zA-Z]/;
var phoneNumber = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
var zipCode = /^\d{5}$|^\d{5}-\d{4}$/;


$(document).ready(function() {
	
	$("#form_date").datepicker({
		minDate : 0
	});
	$("input[name='form_phone']").mask("999-999-9999");
	
	$("input[name='form_phone']").focus(function(){
		if($(this).attr("value") == "999-999-9999"){
			//$(this).attr("value","");
		}
	}).blur(function(){
		if($(this).val() == ""){
			$(this).val("999-999-9999");
		}
	});

	$("#form_send").click(function() {
		var fname = $("#form_fname").val();
		var lname = $("#form_lname").val();
		var email = $("#form_email").val();
		var phone = $("input[name='form_phone']").val();
		var comments = $("#form_comments").val();

		var form_date = $("#form_date").val();
		var form_time = $("#form_time").val();
		var check = true;

		$(".help-inline").remove();
		if (fname == "" || fname == "First Name") {
			$("#form_fname").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">This field is required!</span>');
			if (check) {
				check = false;
				$("#form_fname").focus();
			}
		}

		if (lname == "" || lname == "Last Name") {
			$("#form_lname").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">This field is required!</span>');
			if (check) {
				check = false;
				$("#form_lname").focus();
			}
		}

		if (email == "" || email == "Email") {
			$("#form_email").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">This field is required!</span>');
			if (check) {
				check = false;
				$("#form_email").focus();
			}
		}

		if (phone == "" || phone == "Phone" || phone == "999-999-9999") {
			$("input[name='form_phone']").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">This field is required!</span>');
			if (check) {
				check = false;
				$("input[name='form_phone']").focus();
			}
		}

		if (form_date == "" || form_date == "Select a Date!") {
			$("#form_date").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">This field is required!</span>');
			if (check) {
				check = false;
				$("#form_date").focus();
			}
		}

		if (email != "" && email != "Email") {
			if (validate(email, emailCheck)) {
				$("#form_email").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">Invalid email!</span>');
				if (check) {
					check = false;
					$("#form_email").focus();
				}
			}
		}
		
		//date for browser mm/dd/yyyy		
		parsedate = form_date.split('/');
		if (parsedate[0] >= 13) {
			$("#form_date").parent().append('<span class="help-inline">Month(mm) is over 12, following by this format(mm/dd/yyyy)</span>');			
		} else if (parsedate[1] >= 32) {
			$("#form_date").parent().append('<span class="help-inline">Day(dd) is over 31, following by this format(mm/dd/yyyy)</span>');
		} else {
			//date in database yyyy/mm/dd
			form_date = [parsedate[2], parsedate[0], parsedate[1]].join('/');
		}

		if (check) {
		    insert_test_drive(dealerId, type = 2, fname, lname, "Email/Phone", email, phone, comments, null, form_date, form_time);

		}

	});
});

function validate(v, pattern) {
	return !pattern.test(v);
}

function redirect_home(url) {
	location.href = url;
}

$(function() {

});

function insert_test_drive(dealerId, ctmrType, ctmrFname, ctmrLname, ctmrPrefer, ctmrEmail, ctmrPhone, ctmrComment, vinnumber, ctmrDate, ctmrTime) {
    //var dealerEmail = "quocmykhtn@gmail.com";
    var wkData = {
        "dealerId": dealerId,
        "contact_type": ctmrType,
        "firstname": ctmrFname,
        "lastname": ctmrLname,
        "contact_prefer": ctmrPrefer,
        "email_address": ctmrEmail,
        "phone_number": ctmrPhone,
        "comment": ctmrComment,
        "vinnumber": vinnumber,
        "schedule_date": ctmrDate,
        "schedule_time": ctmrTime,
        
        "RegistDate": $.format.date(new Date(), "yyyy-MM-dd HH:mm:ss"),
        "DealerEmail": DealerEmail
    };
    // leo responsive
    var windowsize = $(window).width();
    if (windowsize <= 700) {
        $("#resSuccess").fadeIn();
        setTimeout(function () {
            $("#resSuccess").fadeOut();
            $("html, body").animate({ scrollTop: $('#wrapper').offset().top }, 100);
            $(".form-wrap").hide();
        }, 2000);
    }
    // end leo responsive
    $.ajax({
        type: "POST",
        url: insertTestDriveApi,
        data: wkData,
        cache: false,
        success: function (data) {
            return true;
        },
        error: function (request, status, thrown) {
        }
    });
    $(".submitLoadding").show();
    setTimeout(function () {
        $("#test-drive").find("input[type='text']").val("");
        $("#test-drive").find("textarea").val("");

        //ResetForms();
        $(".submitLoadingText").text("*Sucessfully!");
        setTimeout(function () {
            $(".submitLoadding").hide();
            $(".submitLoadingText").text("*Sending...!");
        }, 2000);

    }, 2000);
}