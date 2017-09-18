var numOnlyCheck = /^\d+$/;
var emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var whitespace = / /g;
var specialChar = /[^0-9a-zA-Z]/;
var phoneNumber = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
var zipCode = /^\d{5}$|^\d{5}-\d{4}$/;
var serviceNeededHtml = "";

$(document).ready(function () {
    serviceNeededHtml = $("#form_service_needed").html();
    $("#form_date").datepicker({
        minDate: 0
    });

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
        var mileage = $("#form_mileage").val();
        var serviceNeeded = $("#form_service_needed").val();

        var comments = $("#form_comments").val();

        var formDate = $("#form_date").val();
        var formTime = $("#form_time").val();
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

        if (formDate == "" || formDate == "Select a Date!") {
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

        if (mileage == "" || mileage == "Mileage") {
            $("#form_mileage").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">This field is required!</span>');
            if (check) {
                check = false;
                $("#form_mileage").focus();
            }
        }

        if (mileage != "" && mileage != "Mileage") {
            if (validate(mileage, numOnlyCheck)) {
                $("#form_mileage").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">Mileage field must be a number!</span>');
                if (check) {
                    check = false;
                    $("#form_mileage").focus();
                }
            }
        }

        if (year != "" && year != "Year") {
            if (validate(year, numOnlyCheck)) {
                $("#form_year").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">Year field must be a number!</span>');
                if (check) {
                    check = false;
                    $("#form_year").focus();
                }
            }
        }

        if (!serviceNeeded) {
            $("#form_service_needed").parent().append('<span class="help-inline" style="color:red;margin-bottom:0px;">This field is required!</span>');
            if (check) {
                check = false;
                $("#form_service_needed").focus();
            }
        }

        //date for browser mm/dd/yyyy		
        var parsedate = formDate.split('/');
        if (parsedate[0] >= 13) {
            $("#form_date").parent().append('<span class="help-inline">Month(mm) is over 12, following by this format(mm/dd/yyyy)</span>');
        } else if (parsedate[1] >= 32) {
            $("#form_date").parent().append('<span class="help-inline">Day(dd) is over 31, following by this format(mm/dd/yyyy)</span>');
        } else {
            //date in database yyyy/mm/dd
            formDate = [parsedate[2], parsedate[0], parsedate[1]].join('/');
        }

        if (check) {
            var tempServices = "";
            $.each(serviceNeeded, function(index, item) {
                tempServices += item;
                if (index != serviceNeeded.length - 1) {
                    tempServices += ", ";
                }
            });
            insert_contact_service(dealerId, type = 9, fname, lname, email, phone, formDate, formTime, year, make, model, mileage, tempServices, comments);

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

function insert_contact_service(dealerId, ctmrType, ctmrFname, ctmrLname, ctmrEmail, ctmrPhone, date, time, year, make, model, mileage, serviceType, ctmrComment) {
    //var dealerEmail = "quocmykhtn@gmail.com";
    var wkData = {
        "dealerId": dealerId,
        "contact_type": ctmrType,
        "firstname": ctmrFname,
        "lastname": ctmrLname,

        "email_address": ctmrEmail,
        "phone_number": ctmrPhone,
        "comment": ctmrComment,

        "RegistDate": $.format.date(new Date(), "yyyy-MM-dd HH:mm:ss"),
        "DealerEmail": DealerEmail,
        "schedule_date": date,
        "schedule_time": time,
        "ModelYear": year,
        "Make": make,
        "Model": model,
        "mileage": mileage,
        "ServiceType": serviceType,

    };

    // leo responsive
    var windowsize = $(window).width();
    if (windowsize <= 700) {
        $("#resSuccess").fadeIn();
        setTimeout(function () {
            $("#resSuccess").fadeOut();
            $("html, body").animate({ scrollTop: $('#wrapper').offset().top }, 100);
            
        }, 2000);
    }
    // end leo responsive

    $.ajax({
        type: "POST",
        url: insertAppointmentApi,
        data: wkData,
        dataType: "json",
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
        $("#form_service_needed").html(serviceNeededHtml);
        //ResetForms();
        $(".submitLoadingText").text("*Sucessfully!");
        setTimeout(function () {
            $(".submitLoadding").hide();
            $(".submitLoadingText").text("*Sending...!");
        }, 2000);

    }, 2000);
}
