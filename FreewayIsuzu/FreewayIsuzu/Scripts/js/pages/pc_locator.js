var numOnlyCheck = /^\d+$/;
var emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var whitespace = / /g;
var specialChar = /[^0-9a-zA-Z]/;
var phoneNumber = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
var zipCode = /^\d{5}$|^\d{5}-\d{4}$/;
var locator_api = "/ajax/insert_truck_locator.php";

$(document).ready(function () {

    $("input[name='form_phone']").mask("999-999-9999");

    $("input[name='form_phone']").focus(function () {
        if ($(this).attr("value") == "999-999-9999") {
            //$(this).attr("value","");
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val("999-999-9999");
        }
    });

    $("#form_send").click(function () {
        var fname = $("#form_fname").val();
        var lname = $("#form_lname").val();
        var email = $("#form_email").val();
        var phone = $("input[name='form_phone']").val();
        var year = $("#form_year").val();
        var make = $("#form_make").val();
        var model = $("#form_model").val();
        var comments = $("#form_comments").val();

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

        if (phone == "" || phone == "999-999-9999" || phone == "Phone Number") {
            $("input[name='form_phone']").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">This field is required!</span>');
            if (check) {
                check = false;
                $("input[name='form_phone']").focus();
            }
        }

        if (year == "" || year == "Year") {
            $("#form_year").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">This field is required!</span>');
            if (check) {
                check = false;
                $("#form_year").focus();
            }
        }

        if (make == "" || make == "Make") {
            $("#form_make").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">This field is required!</span>');
            if (check) {
                check = false;
                $("#form_make").focus();
            }
        }

        if (model == "" || model == "Model") {
            $("#form_model").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">This field is required!</span>');
            if (check) {
                check = false;
                $("#form_model").focus();
            }
        }

        if (email != "") {
            if (validate(email, emailCheck)) {
                $("#form_email").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">Invalid email!</span>');
                if (check) {
                    check = false;
                    $("#form_email").focus();
                }
            }
        }

        if (year != "") {
            if (validate(year, numOnlyCheck)) {
                $("#form_year").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">Year field must be a number!</span>');
                if (check) {
                    check = false;
                    $("#form_year").focus();
                }
            }
        }

        if (check) {
            insert_locator(dealerId, fname, lname, "Email/Phone", email, phone, comments, year, make, model);

        }

    });
});

function validate(v, pattern) {
    return !pattern.test(v);
}

function redirect_home(url) {
    location.href = url;
}

$(function () {

});

function insert_locator(dealerId, ctmrFname, ctmrLname, ctmrPrefer, ctmrEmail, ctmrPhone, ctmrComment, ctmrYear, ctmrMake, ctmrModel) {
    //showAlert();
   // var dealerEmail = "quocmykhtn@gmail.com";
    var wkData = {
        "dealerId": dealerId,
        "firstname": ctmrFname,
        "lastname": ctmrLname,
        "contact_prefer": ctmrPrefer,
        "contact_type": 13,
        "email_address": ctmrEmail,
        "phone_number": ctmrPhone,
        "comment": ctmrComment,
        "ModelYear": ctmrYear,
        "Make": ctmrMake,
        "Model": ctmrModel,
        "IsSolded": false,
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
        url: insertTruckApi,
        data: wkData,
        dataType: "json",
        cache: false,
        success: function (data) {
            //hideAlert();
            return true;
        },
        error: function (request, status, thrown) {
        }
    });
    $(".submitLoadding").show();
    setTimeout(function () {
        $("#truck-locator").find("input[type='text']").val("");
        $("#truck-locator").find("textarea").val("");
        
        //ResetForms();
        $(".submitLoadingText").text("*Sucessfully!");
        setTimeout(function () {
            $(".submitLoadding").hide();
            $(".submitLoadingText").text("*Sending...!");
        }, 2000);

    }, 2000);
}
