//var more_info_api = "/ajax/insert_request_info.php";
var baseUrlTemp = "http://creditapp.vincontrol.com/credit-application/v2/";

var url = window.location.href.split("/");
var vinNumber = url[url.length - 1];
var dealerId = 37695;
var DealerEmail = "";
function getDealershipInfo(dealerId) {
    $.ajax({
        async: true,
        type: "POST",
        url: GetDealerInfoURL,
        data: {
            "dealershipId": dealerId
        },
        dataType: "json",
        cache: false,
        success: function (data) {
            DealerEmail = data[0].ContactEmail;

        }
    });
}

function centeredFancybox(formWidth, formHeight) {

    var width = $(window).width();
    var height = $(window).height();
    var left = width - formWidth;
    left = left / 2;
    var top = height - formHeight;
    top = top / 2;

    var scrollTop = $(window).scrollTop();
    $("#fancybox-wrap").css("left", left + "px");
    //$("#fancybox-wrap").css("top",top+"px");
}

function appendFancybox() {
    $('.more_info').fancybox({
        padding:0, margin:0,
        href: '#more-info',
        'onStart': function () {
            $("html, body").animate({
                scrollTop: $('#banner').offset().top
            }, 0);
        },
        'onComplete': function () {
            centeredFancybox(680, 420);
            $("#fancybox-outer").css("width", "100%");
        },
        'onClosed': function () {
            $("#fancybox-outer").css("width", "100%");
        }
    });
    //////////////////////////////////////////////////////

    $('.test_drive').fancybox({
        href: '#test-drive',
        'onStart': function () {
            $("html, body").animate({
                scrollTop: $('#banner').offset().top
            }, 0);
        },
        'onComplete': function () {
            centeredFancybox(680, 514);
            $("#fancybox-outer").css("width", "100%");
        },
        'onClosed': function () {
            $("#fancybox-outer").css("width", "100%");
        }
    });

    //////////////////////////////////////////////////////////////

    $('.make_offer').fancybox({
        href: '#make-offer',
        'onStart': function () {
            $("html, body").animate({
                scrollTop: $('#banner').offset().top
            }, 0);
        },
        'onComplete': function () {
            centeredFancybox(680, 476);
            $("#fancybox-outer").css("width", "100%");
        },
        'onClosed': function () {
            $("#fancybox-outer").css("width", "100%");
        }
    });

    $('.get_quote').fancybox({
        href: '#get-quote',
        'onStart': function () {
            $("html, body").animate({
                scrollTop: $('#banner').offset().top
            }, 0);
        },
        'onComplete': function () {
            centeredFancybox(680, 420);
            $("#fancybox-outer").css("width", "100%");
        },
        'onClosed': function () {
            $("#fancybox-outer").css("width", "100%");
        }
    });

    $('.share_friend').fancybox({
        href: '#share-friend',
        'onStart': function () {
            $("html, body").animate({
                scrollTop: $('#banner').offset().top
            }, 0);
        },
        'onComplete': function () {
            centeredFancybox(680, 588);
            $("#fancybox-outer").css("width", "100%");
        },
        'onClosed': function () {
            $("#fancybox-outer").css("width", "100%");
        }
    });

    $(".NCA_Credit").click(function () {
        var code = $.base64.encode(dealerId);
        url = baseUrlTemp + vinNumber + "/" + code;
        window.open(url, "", 'width=700,height=800,scrollbars=1');

        //url = "http://vinpage.com/credit-application/v2/"+vinNumber+"/"+code;
        //window.open(url, "", 'width=700,height=800');
    });

    $("#apply").click(function () {
        var code = $.base64.encode(dealerId);
        url = baseUrlTemp + code;
        window.open(url, "", 'width=700,height=800,scrollbars=1');

        //url = "http://vinpage.com/credit-application/v2/"+vinNumber+"/"+code;
        //window.open(url, "", 'width=700,height=800');
    });

}

function trimHtml(el) {
    var specialChar = /[^\s\-:\/\\_@\.0-9a-zA-Z]/;
    if (!el.hasClass("mask_phone") && !el.hasClass("email_form")) {
        var value = el.val();
        if (value) {
            value = value.replace(/<[^>]+>/g, '');
            el.val(value);
        }

        if (!validate(value, specialChar)) {
            el.parent().find("label").css("color", "red");
            setTimeout(function () {
                el.focus();
            }, 100);

            el.attr("title", "Only allow alphabet and numbers");
        } else {
            el.removeAttr("title");
            el.parent().find("label").css("color", "black");
        }
    }

}


$(document).ready(function () {
    //getDealershipInfo(dealerId);
    //trimHtml();
    //DealerEmail = "quocmykhtn@gmail.com";
    $("input[type='text']").on("focusout", function () {
        trimHtml($(this));
    });


    $("#offer_value").keypress(function (evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode != 40 && charCode != 37 && charCode != 38 && charCode != 39 && charCode != 46) {
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                return false;
            }
        }

        return true;

    });

    $(".mask_phone").mask("999-999-9999");
    $("#phone_more").focus(function () {
        if ($(this).attr("value") == "999-999-9999") {
            //$(this).attr("value","");
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val("999-999-9999");
        }
    });

    $("#phone_test").focus(function () {
        if ($(this).attr("value") == "999-999-9999") {
            //$(this).attr("value","");
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val("999-999-9999");
        }
    });

    $("#phone_offer").focus(function () {
        if ($(this).attr("value") == "999-999-9999") {
            //$(this).attr("value","");
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val("999-999-9999");
        }
    });

    $("#phone_quote").focus(function () {
        if ($(this).attr("value") == "999-999-9999") {
            //$(this).attr("value","");
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val("999-999-9999");
        }
    });

    $("#phone_share").focus(function () {
        if ($(this).attr("value") == "999-999-9999") {
            //$(this).attr("value","");
        }
    }).blur(function () {
        if ($(this).val() == "") {
            $(this).val("999-999-9999");
        }
    });

    //////////////////////////////////////
    appendFancybox();
    /* for centered fancybox */
    $("#fancybox-wrap").css("width", "600px");
    $("#fancybox-outer").css("width", "634px");
    $("#fancybox-content").css("width", "620px");
    $("#test-drive").css("width", "600px");
    $("#share-friend").css("width", "600px");
    $("#make-offer").css("width", "600px");
    $("#more-info").css("width", "600px");
    $("#get-quote").css("width", "600px");

    $(".control-group").css("width", "300px").css("float", "left");
    /* end for centered fancybox */
    $("#test-date").datepicker({
        minDate: 0
    });
    //var numOnlyCheck = /^\d+$/;
    var emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var specialChar = /[^@0-9a-zA-Z]/;
    var phoneNumber = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    $("#button-more-info").click(function () {
        var checkMoreInfo = true;
        $("span.help-inline").remove();

        if ($("#fname_more").val() == "" || $("#fname_more").val() == "First Name") {
            $("#fname_more").parent().children(".lb-info").css("color", "red");

            $("#fname_more").attr("title", "This field is required.");

            if (checkMoreInfo) {
                $("#fname_more").focus();
                checkMoreInfo = false;
            }
        } else {
            $("#fname_more").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#lname_more").val() == "" || $("#lname_more").val() == "Last Name") {
            $("#lname_more").parent().children(".lb-info").css("color", "red");

            $("#lname_more").attr("title", "This field is required.");

            if (checkMoreInfo) {
                $("#lname_more").focus();
                checkMoreInfo = false;
            }
        } else {
            $("#lname_more").parent().children(".lb-info").css("color", "#333");
        }

        if ($("#email_more").val() == "" || $("#email_more").val() == "Email Address") {
            $("#email_more").parent().children(".lb-info").css("color", "red");

            $("#email_more").attr("title", "This field is required.");

            if (checkMoreInfo) {
                $("#email_more").focus();
                checkMoreInfo = false;
            }
        } else {
            $("#email_more").parent().children(".lb-info").css("color", "#333");
        }

        if ($("#phone_more").val() == "" || $("#phone_more").val() == "999-999-9999") {
            $("#phone_more").parent().children(".lb-info").css("color", "red");

            $("#phone_more").attr("title", "This field is required.");

            if (checkMoreInfo) {
                $("#phone_more").focus();
                checkMoreInfo = false;
            }
        } else {
            $("#phone_more").parent().children(".lb-info").css("color", "#333");
        }

        if ($("#email_more").val() != "" && $("#email_more").val() != "Email Address") {
            if (validate($("#email_more").val(), emailCheck)) {
                $("#email_more").attr("title", "The email format is invalid.");
                $("#email_more").parent().find("label").css("color", "red");

                if (checkMoreInfo) {
                    $("#email_more").focus();
                    checkMoreInfo = false;
                }
            } else {
                $("#email_more").removeAttr("title");
                $("#email_more").parent().find("label").css("color", "black");
            }
        }




        if (!checkMoreInfo) {
            return false;
        }

        if ($("#more-email").attr('checked')) {
            contact_prefer = "Email";
        } else {
            contact_prefer = "Phone";
        }
        // type = 1 : request information
        if ($("#comment_more").val() == "Additional Comments") {
            $("#comment_more").val("");
        }
        insert_request_info(dealerId, type = 1, $("#fname_more").val(), $("#lname_more").val(), contact_prefer, $("#email_more").val(), $("#phone_more").val(), $("#comment_more").val(), vinNumber);
        $.fancybox.close();

    });

    $("#button-test-info").click(function () {
        var checkTestDrive = true;
        $("span.help-inline").remove();

        if ($("#fname_test").val() == "" || $("#fname_test").val() == "First Name") {
            $("#fname_test").parent().children(".lb-info").css("color", "red");

            $("#fname_test").attr("title", "This field is required.");

            if (checkTestDrive) {
                checkTestDrive = false;
                $("#fname_test").focus();
            }
        } else {
            $("#fname_test").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#lname_test").val() == "" || $("#lname_test").val() == "Last Name") {
            $("#lname_test").parent().children(".lb-info").css("color", "red");

            $("#lname_test").attr("title", "This field is required.");

            if (checkTestDrive) {
                checkTestDrive = false;
                $("#lname_test").focus();
            }
        } else {
            $("#lname_test").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#email_test").val() == "" || $("#email_test").val() == "Email Address") {
            $("#email_test").parent().children(".lb-info").css("color", "red");

            $("#email_test").attr("title", "This field is required.");

            if (checkTestDrive) {
                checkTestDrive = false;
                $("#email_test").focus();
            }
        } else {
            $("#email_test").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#phone_test").val() == "" || $("#phone_test").val() == "999-999-9999") {
            $("#phone_test").parent().children(".lb-info").css("color", "red");

            $("#phone_test").attr("title", "This field is required.");

            if (checkTestDrive) {
                checkTestDrive = false;
                $("#phone_test").focus();
            }
        } else {
            $("#phone_test").parent().children(".lb-info").css("color", "#333");
        }

        if ($("#input-prepend-date").children('input[name="date"]').val() == "" || $("#input-prepend-date").children('input[name="date"]').val() == "Date (Ex: mm/dd/yyyy)") {
            $("#input-prepend-date").children(".lb-info").css("color", "red");

            $("#input-prepend-date").attr("title", "This field is required.");

            if (checkTestDrive) {
                checkTestDrive = false;
                $("#input-prepend-date").children('input[name="date"]').focus();
            }
        } else {
            $("#input-prepend-date").children(".lb-info").css("color", "#333");
        }
        //date for browser mm/dd/yyyy
        var date = $("#input-prepend-date").children('input[name="date"]').val();
        parsedate = date.split('/');
        if (parsedate[0] >= 13) {
            $("#input-prepend-date").append('<span class="help-inline">Month(mm) is over 12, following by this format(mm/dd/yyyy)</span>');
        } else if (parsedate[1] >= 32) {
            $("#input-prepend-date").append('<span class="help-inline">Day(dd) is over 31, following by this format(mm/dd/yyyy)</span>');
        } else {
            //date in database yyyy/mm/dd
            date = [parsedate[2], parsedate[0], parsedate[1]].join('/');
        }

        if ($("#email_test").val() != "" && $("#email_test").val() != "Email Address") {
            if (validate($("#email_test").val(), emailCheck)) {
                $("#email_test").attr("title", "The email format is invalid.");
                $("#email_test").parent().find("label").css("color", "red");
                if (checkTestDrive) {
                    checkTestDrive = false;
                    $("#email_test").focus();
                }
            } else {
                $("#email_test").removeAttr("title");
                $("#email_test").parent().find("label").css("color", "black");
            }
        }

        if (!checkTestDrive) {
            return false;
        }

        if ($("#contact_email_test").attr('checked')) {
            contact_prefer = "Email";
        } else {
            contact_prefer = "Phone";
        }

        if ($("#comment_test").val() == "Additional Comments") {
            $("#comment_test").val("");
        }

        //type =2 : take a test drive
        insert_test_drive(dealerId, type = 2, $("#fname_test").val(), $("#lname_test").val(), contact_prefer, $("#email_test").val(), $("#phone_test").val(), $("#comment_test").val(), vinNumber, date, $("#time").val());
        $.fancybox.close();

    });

    $("#button-offer-info").click(function () {
        var checkOfferInfo = true;
        $("span.help-inline").remove();

        if ($("#fname_offer").val() == "" || $("#fname_offer").val() == "First Name") {
            $("#fname_offer").parent().children(".lb-info").css("color", "red");

            $("#fname_offer").attr("title", "This field is required.");

            if (checkOfferInfo) {
                checkOfferInfo = false;
                $("#fname_offer").focus();
            }
        } else {
            $("#fname_offer").parent().children(".lb-info").css("color", "#333");
        }

        if ($("#lname_offer").val() == "" || $("#lname_offer").val() == "Last Name") {
            $("#lname_offer").parent().children(".lb-info").css("color", "red");
            $("#lname_offer").attr("title", "This field is required.");

            if (checkOfferInfo) {
                checkOfferInfo = false;
                $("#lname_offer").focus();
            }
        } else {
            $("#lname_offer").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#email_offer").val() == "" || $("#email_offer").val() == "Email Address") {
            $("#email_offer").parent().children(".lb-info").css("color", "red");
            $("#email_offer").attr("title", "This field is required.");
            if (checkOfferInfo) {
                checkOfferInfo = false;
                $("#email_offer").focus();
            }
        } else {
            $("#email_offer").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#phone_offer").val() == "" || $("#phone_offer").val() == "999-999-9999") {
            $("#phone_offer").parent().children(".lb-info").css("color", "red");
            $("#phone_offer").attr("title", "This field is required.");
            if (checkOfferInfo) {
                checkOfferInfo = false;
                $("#phone_offer").focus();
            }
        } else {
            $("#phone_offer").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#offer_value").val() == "" || $("#offer_value").val() == "Offer Value") {
            $("#offer_value").parent().children(".lb-info").css("color", "red");
            $("#offer_value").attr("title", "This field is required.");
            if (checkOfferInfo) {
                checkOfferInfo = false;
                $("#offer_value").focus();
            }
        } else {
            $("#offer_value").parent().children(".lb-info").css("color", "#333");
        }

        if ($("#email_offer").val() != "" && $("#email_offer").val() != "Email Address") {
            if (validate($("#email_offer").val(), emailCheck)) {
                $("#email_offer").attr("title", "The email format is invalid.");
                $("#email_offer").parent().find("label").css("color", "red");
                if (checkOfferInfo) {
                    checkOfferInfo = false;
                    $("#email_offer").focus();
                }
            } else {
                $("#email_offer").attr("title");
                $("#email_offer").parent().find("label").css("color", "black");
            }

        }

        if (!checkOfferInfo) {
            return false;
        }

        if ($("#more-yes").attr('checked')) {
            contact_prefer = "Email";
        } else {
            contact_prefer = "Phone";
        }

        //type =3 : Make offer
        if ($("#comment_offer").val() == "Additional Comments") {
            $("#comment_offer").val("");
        }
        insert_make_offer(dealerId, type = 3, $("#fname_offer").val(), $("#lname_offer").val(), contact_prefer, $("#email_offer").val(), $("#phone_offer").val(), $("#comment_offer").val(), vinNumber, $("#offer_value").val());
        $.fancybox.close();

    });

    $("#button-share-info").click(function () {
        var checkShareFriend = true;
        $("span.help-inline").remove();
        if ($("#fname_share").val() == "" || $("#fname_share").val() == "First Name") {
            $("#fname_share").parent().children(".lb-info").css("color", "red");
            $("#fname_share").attr("title", "This field is required.");
            if (checkShareFriend) {
                $("#fname_share").focus();
                checkShareFriend = false;
            }
        } else {
            $("#fname_share").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#lname_share").val() == "" || $("#lname_share").val() == "Last Name") {
            $("#lname_share").parent().children(".lb-info").css("color", "red");
            $("#lname_share").attr("title", "This field is required.");
            if (checkShareFriend) {
                $("#lname_share").focus();
                checkShareFriend = false;
            }
        } else {
            $("#lname_share").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#email_share").val() == "" || $("#email_share").val() == "Email Address") {
            $("#email_share").parent().children(".lb-info").css("color", "red");
            $("#email_share").attr("title", "This field is required.");
            if (checkShareFriend) {
                $("#email_share").focus();
                checkShareFriend = false;
            }
        } else {
            $("#email_share").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#phone_share").val() == "" || $("#phone_share").val() == "999-999-9999") {
            $("#phone_share").parent().children(".lb-info").css("color", "red");
            $("#phone_share").attr("title", "This field is required.");
            if (checkShareFriend) {
                $("#phone_share").focus();
                checkShareFriend = false;
            }

        } else {
            $("#phone_share").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#friendname").val() == "" || $("#friendname").val() == "Name of Friend") {
            $("#friendname").parent().children(".lb-info").css("color", "red");
            $("#friendname").attr("title", "This field is required.");
            if (checkShareFriend) {
                $("#friendname").focus();
                checkShareFriend = false;
            }
        } else {
            $("#friendname").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#friend_email").val() == "" || $("#friend_email").val() == "Mail of Friend") {
            $("#friend_email").parent().children(".lb-info").css("color", "red");
            $("#friend_email").attr("title", "This field is required.");
            if (checkShareFriend) {
                $("#friend_email").focus();
                checkShareFriend = false;
            }
        } else {
            $("#friend_email").parent().children(".lb-info").css("color", "#333");
        }

        if ($("#email_share").val() != "" && $("#email_share").val() != "Email Address") {
            if (validate($("#email_share").val(), emailCheck)) {
                $("#email_share").attr("title", "The email format is invalid.");
                $("#email_share").parent().find("label").css("color", "red");
                if (checkShareFriend) {
                    $("#email_share").focus();
                    checkShareFriend = false;
                }
            } else {
                $("#email_share").removeAttr("title");
                $("#email_share").parent().find("label").css("color", "black");
            }
        }

        if ($("#friend_email").val() != "" && $("#friend_email").val() != "Mail of Friend") {
            if (validate($("#friend_email").val(), emailCheck)) {
                $("#friend_email").attr("title", "The email format is invalid.");
                $("#friend_email").parent().find("label").css("color", "red");
                if (checkShareFriend) {
                    $("#friend_email").focus();
                    checkShareFriend = false;
                }
            } else {
                $("#friend_email").removeAttr("title");
                $("#friend_email").parent().find("label").css("color", "black");
            }
        }


        if (!checkShareFriend) {
            return false;
        }

        if ($("#contact_email_share").attr('checked')) {
            contact_prefer = "Email";
        } else {
            contact_prefer = "Phone";
        }

        //type = 4 : Share information to Friends
        if ($("#comment_share").val() == "Additional Comments") {
            $("#comment_share").val("");
        }
        insert_share_friend(dealerId, type = 4, $("#fname_share").val(), $("#lname_share").val(), contact_prefer, $("#email_share").val(), $("#phone_share").val(), $("#comment_share").val(), vinNumber, $("#friendname").val(), $("#friend_email").val());
        $.fancybox.close();

    });

    $("#button-get-quote").click(function () {
        var checkGetQuote = true;
        $("span.help-inline").remove();
        if ($("#fname_quote").val() == "" || $("#fname_quote").val() == "First Name") {
            $("#fname_quote").parent().children(".lb-info").css("color", "red");
            $("#fname_quote").attr("title", "This field is required.");
            if (checkGetQuote) {
                checkGetQuote = false;
                $("#fname_quote").focus();
            }
        } else {
            $("#fname_quote").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#lname_quote").val() == "" || $("#lname_quote").val() == "Last Name") {
            $("#lname_quote").parent().children(".lb-info").css("color", "red");
            $("#lname_quote").attr("title", "This field is required.");
            if (checkGetQuote) {
                checkGetQuote = false;
                $("#lname_quote").focus();
            }
        } else {
            $("#lname_quote").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#email_quote").val() == "" || $("#email_quote").val() == "Email Address") {
            $("#email_quote").parent().children(".lb-info").css("color", "red");
            $("#email_quote").attr("title", "This field is required.");
            if (checkGetQuote) {
                checkGetQuote = false;
                $("#email_quote").focus();
            }
        } else {
            $("#email_quote").parent().children(".lb-info").css("color", "#333");
        }
        if ($("#phone_quote").val() == "" || $("#phone_quote").val() == "999-999-9999") {
            $("#phone_quote").parent().children(".lb-info").css("color", "red");
            $("#phone_quote").attr("title", "This field is required.");
            if (checkGetQuote) {
                checkGetQuote = false;
                $("#phone_quote").focus();
            }
        } else {
            $("#phone_quote").parent().children(".lb-info").css("color", "#333");
        }

        if ($("#email_quote").val() != "" && $("#email_quote").val() != "Email Address") {
            if (validate($("#email_quote").val(), emailCheck)) {
                $("#email_quote").attr("title", "The email format is invalid.");
                $("#email_quote").parent().find("label").css("color", "red");
                if (checkGetQuote) {
                    checkGetQuote = false;
                    $("#email_quote").focus();
                }
            } else {
                $("#email_quote").removeAttr("title");
                $("#email_quote").parent().find("label").css("color", "black");
            }
        }


        if (!checkGetQuote) {
            return false;
        }

        if ($("#more-email-quote").attr('checked')) {
            contact_prefer = "Email";
        } else {
            contact_prefer = "Phone";
        }
        // type = 6 : get a quote
        if ($("#comment_quote").val() == "Additional Comments") {
            $("#comment_quote").val("");
        }
        insert_quote_info(dealerId, type = 6, $("#fname_quote").val(), $("#lname_quote").val(), contact_prefer, $("#email_quote").val(), $("#phone_quote").val(), $("#comment_quote").val(), vinNumber);
        $.fancybox.close();

    });

    $("#dt-contact-submit").click(function () {
        var checkContact = true;
        $("span.page-help-inline").remove();
        if ($("#contact-fname").val() == "" || $("#contact-fname").val() == "First Name") {
            $("#contact-fname").focus();
            $("#contact-fname").parent().append('<span class="page-help-inline">This field is required!</span>');
        }
        if ($("#contact-lname").val() == "" || $("#contact-lname").val() == "Last Name") {
            $("#contact-lname").focus();
            $("#contact-lname").parent().append('<span class="page-help-inline">This field is required!</span>');
        }
        if ($("#contact-email").val() == "" || $("#contact-email").val() == "Email Address") {
            $("#contact-email").focus();
            $("#contact-email").parent().append('<span class="page-help-inline">This field is required!</span>');
        }
        if ($("#contact-phone").val() == "" || $("#contact-phone").val() == "999-999-9999") {
            $("#contact-phone").focus();
            $("#contact-phone").parent().append('<span class="page-help-inline">This field is required!</span>');

        }
        if (validate($("#contact-email").val(), emailCheck)) {
            $("#contact-email").attr("title", "Invalid email format!");
            $("#contact-email").parent().find("label").css("color", "red");
            return false;
        } else {
            $("#contact-email").removeAttr("title");
            $("#contact-email").parent().find("label").css("color", "black");
        }
        // type = 7 : contact form outside fancy

        insert_contact_us(dealerId, type = 7, $("#contact-fname").val(), $("#contact-lname").val(), $("#contact-email").val(), $("#contact-phone").val(), $("#dt-contact-textarea").val(), vinNumber);

    });
});

$(function () {

});

function datepicker() {
    $(".datepicker").datepicker();
}

function redirect_home(url) {
    location.href = url;
}

function validate(v, pattern) {
    return !pattern.test(v);
}


function insert_request_info(dealerId, ctmrType, ctmrFname, ctmrLname, ctmrPrefer, ctmrEmail, ctmrPhone, ctmrComment, vinnumber) {

    var wk_data = {
        "dealerId": dealerId,
        "contact_type": ctmrType,
        "firstname": ctmrFname,
        "lastname": ctmrLname,
        "contact_prefer": ctmrPrefer,
        "email_address": ctmrEmail,
        "phone_number": ctmrPhone,
        "comment": ctmrComment,
        "vinnumber": vinnumber,
        "ModelYear": globalData.ModelYear,
        "Make": globalData.Make,
        "Model": globalData.Model,
        "Trim": globalData.Trim,
        "StockNumber": globalData.StockNumber,
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
            $("html, body").animate({ scrollTop: $('#formResponsive').offset().top }, 100);
            $(".form-wrap").hide();
        }, 2000);
    }
    // end leo responsive
    $.ajax({
        type: "POST",
        url: insertRequestInfoApi,
        data: wk_data,
        // dataType : "json",
        cache: false,
        success: function (data) {
            return true;
        },
        error: function (request, status, thrown) {
        }
    });
}

function insert_quote_info(dealerId, ctmrType, ctmrFname, ctmrLname, ctmrPrefer, ctmrEmail, ctmrPhone, ctmrComment, vinnumber) {

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
        "ModelYear": globalData.ModelYear,
        "Make": globalData.Make,
        "Model": globalData.Model,
        "Trim": globalData.Trim,
        "StockNumber": globalData.StockNumber,
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
            $("html, body").animate({ scrollTop: $('#formResponsive').offset().top }, 100);
            $(".form-wrap").hide();
        }, 2000);
    }
    // end leo responsive
    $.ajax({
        type: "POST",
        url: insertGetQuoteApi,
        data: wkData,
        // dataType : "json",
        cache: false,
        success: function (data) {
            return true;
        },
        error: function (request, status, thrown) {
        }
    });
}

function insert_test_drive(dealerId, ctmrType, ctmrFname, ctmrLname, ctmrPrefer, ctmrEmail, ctmrPhone, ctmrComment, vinnumber, ctmrDate, ctmrTime) {
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
        "ModelYear": globalData.ModelYear,
        "Make": globalData.Make,
        "Model": globalData.Model,
        "Trim": globalData.Trim,
        "StockNumber": globalData.StockNumber,
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
            $("html, body").animate({ scrollTop: $('#formResponsive').offset().top }, 100);
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
}

function insert_make_offer(dealerId, ctmr_type, ctmr_fname, ctmr_lname, ctmr_prefer, ctmr_email, ctmr_phone, ctmr_comment, vinnumber, ctmr_offer) {
    var wk_data = {
        "dealerId": dealerId,
        "contact_type": ctmr_type,
        "firstname": ctmr_fname,
        "lastname": ctmr_lname,
        "contact_prefer": ctmr_prefer,
        "email_address": ctmr_email,
        "phone_number": ctmr_phone,
        "comment": ctmr_comment,
        "vinnumber": vinnumber,
        "offer_value": ctmr_offer,
        "ModelYear": globalData.ModelYear,
        "Make": globalData.Make,
        "Model": globalData.Model,
        "Trim": globalData.Trim,
        "StockNumber": globalData.StockNumber,
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
            $("html, body").animate({ scrollTop: $('#formResponsive').offset().top }, 100);
            $(".form-wrap").hide();
        }, 2000);
    }
    // end leo responsive
    $.ajax({
        type: "POST",
        url: insertMakeOfferApi,
        data: wk_data,
        cache: false,
        success: function (data) {
            return true;
        },
        error: function (request, status, thrown) {
        }
    });
}

function insert_share_friend(dealerId, ctmr_type, ctmr_fname, ctmr_lname, ctmr_prefer, ctmr_email, ctmr_phone, ctmr_comment, vinnumber, ctmr_friendname, ctmr_friendemail) {
    var wk_data = {
        "dealerId": dealerId,
        "contact_type": ctmr_type,
        "firstname": ctmr_fname,
        "lastname": ctmr_lname,
        "contact_prefer": ctmr_prefer,
        "email_address": ctmr_email,
        "phone_number": ctmr_phone,
        "comment": ctmr_comment,
        "vinnumber": vinnumber,
        "friendemail": ctmr_friendemail,
        "friendname": ctmr_friendname,
        "ModelYear": globalData.ModelYear,
        "Make": globalData.Make,
        "Model": globalData.Model,
        "Trim": globalData.Trim,
        "StockNumber": globalData.StockNumber,
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
            $("html, body").animate({ scrollTop: $('#formResponsive').offset().top }, 100);
            $(".form-wrap").hide();
        }, 2000);
    }
    // end leo responsive
    $.ajax({
        type: "POST",
        url: insertShareFriendsApi,
        data: wk_data,
        dataType: "json",
        cache: false,
        success: function (data) {
            return true;
        },
        error: function (request, status, thrown) {
        }
    });
}

function insert_job_inquirement(dealerId, ctmr_type, ctmr_fname, ctmr_lname, ctmr_address, ctmr_city, ctmr_state, ctmr_postal, ctmr_email, ctmr_phone, ctmr_comment, ctmr_job, CL_filename, CV_filename) {
    var wk_data = {
        "dealerId": dealerId,
        "contact_type": ctmr_type,
        "firstname": ctmr_fname,
        "lastname": ctmr_lname,
        "address": ctmr_address,
        "city": ctmr_city,
        "state": ctmr_state,
        "postal": ctmr_postal,
        "email": ctmr_email,
        "phone": ctmr_phone,
        "comment": ctmr_comment,
        "jobTitle": ctmr_job,
        "CL_filename": CL_filename,
        "CV_filename": CV_filename
    };

    $.ajax({
        type: "POST",
        url: "/ajax/insert_job_inquirement.php",
        data: wk_data,
        dataType: "json",
        cache: false,
        success: function (data) {
            var pathname = window.location.pathname;
            var pathname_array = pathname.split("/");
            url = "/employment/thankyou/" + pathname_array[3];
            setTimeout("redirect_home(\'" + url + "\')", 1000);
        },
        error: function (request, status, thrown) {
        }
    });
}

function insert_value_trade(dealerId, ctmr_fname, ctmr_lname, ctmr_prefer, ctmr_email, ctmr_phone, ctmr_comment, ctmr_year, ctmr_make, ctmr_model, ctmr_mileage, ctmr_condition, ctmr_options) {
    
    var wk_data = {

        "dealerId": dealerId,
        "contact_type": ctmr_type,
        "firstname": ctmr_fname,
        "lastname": ctmr_lname,
        "contact_prefer": ctmr_prefer,
        "email_address": ctmr_email,
        "phone_number": ctmr_phone,
        "comment": ctmr_comment,
        "vinnumber": vinnumber,
        
        "ModelYear": ctmr_year,
        "Make": ctmr_make,
        "Model": ctmr_model,
        
        "IsSolded": false,
        "RegistDate": $.format.date(new Date(), "yyyy-MM-dd HH:mm:ss"),
        "DealerEmail": DealerEmail,

        
        "mileage": ctmr_mileage,
        "condition": ctmr_condition,
        "options": ctmr_options
    };
    // leo responsive
    var windowsize = $(window).width();
    if (windowsize <= 700) {
        $("#resSuccess").fadeIn();
        setTimeout(function () {
            $("#resSuccess").fadeOut();
            $("html, body").animate({ scrollTop: $('#formResponsive').offset().top }, 100);
            $(".form-wrap").hide();
        }, 2000);
    }
    // end leo responsive
    $.ajax({
        type: "POST",
        url: insertValueTradeApi,
        data: wk_data,
        dataType: "json",
        cache: false,
        success: function (data) {
    
            return true;
        },
        error: function (request, status, thrown) {
        }
    });
}
