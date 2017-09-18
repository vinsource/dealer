
$(document).ready(function () {
    $("#reGetMore").click(function() {
        $(".form-wrap").hide();
        $("#more-info").show();
        $("html, body").animate({ scrollTop: $('#more-info').offset().top }, 500);
    });

    $(".resSrGetQuote").click(function() {
        $(".form-wrap").hide();
        $("#more-info").show();
        $("html, body").animate({ scrollTop: $('#more-info').offset().top }, 500);
    });

    $("#reGetQuote").click(function () {
        $(".form-wrap").hide();
        $("#get-quote").show();
        $("html, body").animate({ scrollTop: $('#get-quote').offset().top }, 500);
    });

    $("#reTestDrive").click(function () {
        $(".form-wrap").hide();
        $("#test-drive").show();
        $("html, body").animate({ scrollTop: $('#test-drive').offset().top }, 500);
    });

    $("#reMakeOffer").click(function () {
        $(".form-wrap").hide();
        $("#make-offer").show();
        $("html, body").animate({ scrollTop: $('#make-offer').offset().top }, 500);
    });

    $("#reShareFriend").click(function () {
        $(".form-wrap").hide();
        $("#share-friend").show();
        $("html, body").animate({ scrollTop: $('#share-friend').offset().top }, 500);
    });
});