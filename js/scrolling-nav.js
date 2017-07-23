//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {

    /*$(".navbar").hover(function() {
        !$(".navbar").hasClass("top-nav-collapse") && $(".navbar-fixed-top").addClass("top-nav-collapse hovered");
    }, function() {
        $(".navbar").hasClass("hovered") && $(".navbar-fixed-top").removeClass("top-nav-collapse hovered");
    });*/

    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    // back to top
    $("#back-top").hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#back-top').fadeIn();
        } else {
            $('#back-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('#back-top a').click(function (e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });

    /*============================================
    Scrolling Animations
    ==============================================*/
    $('.scrollimation').waypoint(function(){
        $(this).toggleClass('in');
    },{offset:'90%'});
});
