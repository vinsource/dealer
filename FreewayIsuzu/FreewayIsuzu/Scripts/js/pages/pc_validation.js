var numOnlyCheck = /^\d+$/;
var emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var whitespace = / /g;
var specialChar = /[^0-9a-zA-Z]/;
var phoneNumber = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
var zipCode = /^\d{5}$|^\d{5}-\d{4}$/;
var ContactApi = "/Email/InsertCustomerInfo";
$(document).ready(function() {
	$("input[name='phone']").mask("999-999-9999");
	$("input[name='phone']").focus(function(){
		if($(this).attr("value") == "999-999-9999"){
			//$(this).attr("value","");
		}
	}).blur(function(){
		if($(this).val() == ""){
			$("input[name='phone']").val("999-999-9999");
		}
	});
	
	$("#send").click(function() {
		var fname = $("#fname").val();
		var lname = $("#lname").val();
		var email = $("#email").val();
		var phone = $("input[name='phone']").val();
		var comments = $("#comments").val();
		var check = true;

		$(".help-inline").remove();
		if (fname == "" || fname == "First Name") {
			$("#fname").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">First Name is required!</span>');
			if (check) {
				check = false;
				$("#fname").focus();
			}
		}

		if (lname == "" || lname == "Last Name") {
			$("#lname").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">Last Name is required!</span>');
			if (check) {
				check = false;
				$("#lname").focus();
			}
		}

		if (email == "" || email == "Email") {
			$("#email").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">Email is required!</span>');
			if (check) {
				check = false;
				$("#email").focus();
			}
		}

		if (phone == "" || phone == "Phone" || phone == "999-999-9999") {
			$("input[name='phone']").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">Phone number is required!</span>');
			if (check) {
				check = false;
				$("input[name='phone']").focus();
			}
		}

		if (email != "" && email != "Email") {
			if (validate(email, emailCheck)) {
				$("#email").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">Invalid email!</span>');
				if (check) {
					check = false;
					$("#email").focus();
				}
			}
		}

		if (check) {
			insert_contact_us(dealerId, 1, fname, lname, "Email/Phone", email, phone, comments, null);
		}

	});

});

function validate(v, pattern) {
	return !pattern.test(v);
}

$(function() {

});

function insert_contact_us(dealerId, ctmrType, ctmrFname, ctmrLname, ctmrPrefer, ctmrEmail, ctmrPhone, ctmrComment,ctmrAddress) {

    var wkData = {
        "dealerId": dealerId,
        "contact_type": ctmrType,
        "firstname": ctmrFname,
        "lastname": ctmrLname,
        "contact_prefer": ctmrPrefer,
        "email_address": ctmrEmail,
        "phone_number": ctmrPhone,
        "comment": ctmrComment,
        "address" : ctmrAddress, 
        //"vinnumber": vinnumber,
        //"ModelYear": 0,
        //"Make": globalData.Make,
        //"Model": globalData.Model,
        //"Trim": globalData.Trim,
        //"StockNumber": globalData.StockNumber,
        //"IsSolded": IsSolded,
        "RegistDate": $.format.date(new Date(), "yyyy-MM-dd HH:mm:ss"),
        "DealerEmail": DealerEmail
        //"DealerEmail": "quocmykhtn@gmail.com"
    };
    
    
    $.ajax({
        type: "POST",
        url: ContactApi,
        data: wkData,
        // dataType : "json",
        cache: false,
        success: function (data) {
            return true;
        },
        error: function (request, status, thrown) {
        }
    });

    $("#submitFormLoading").show();
    setTimeout(function() {
        ResetForms();
        $("#submitFormLoadingText").text("*Sucessfully!");
        setTimeout(function() {
            $("#submitFormLoading").hide();
            $("#submitFormLoadingText").text("*Sending...!");
        }, 2000);
            
    }, 2000);
    return false;
};
function ResetForms() {
    var listIinput = $("#tertiary-form").find("input[type='text']");
    $.each(listIinput, function (index, item) {
        $(item).val("");
    });

    //var listInquiry = $(".inputInquiry");
    //$.each(listInquiry, function (index, item) {
    //    $(item).val("");
    //});
    $("#comments").val("");
}
