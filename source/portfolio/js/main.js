

$(document).ready(function() {
    $('.home-slider').flexslider({
        animation: "slide",
        directionNav: false,
        controlNav: false,
        direction: "vertical",
        slideshowSpeed: 2500,
        animationSpeed: 500,
        smoothHeight: false
    });
    $('.message-box-loader').css('display','none');
	$('.message-box').css('display','block');
	$.backstretch('/portfolio/images/header-bg.jpg');
    //$(".intro-section").backstretch("images/header-bg.jpg");
	
	$('#what').waypoint(function(direction){

		if($('.preload-image').length){$('.preload-image').remove();}
		
		$('.backstretch').remove();
	
		if (direction=='down'){
			$.backstretch('/portfolio/images/contact-bg.jpg');
		}else{
			$.backstretch('/portfolio/images/header-bg.jpg');
		}
	});
    /*============================================
	Project Preview
	==============================================*/
	$('.project-item').click(function(e){
		e.preventDefault();

		var elem = $(this),
			title = elem.find('.project-title').text(),
			link = elem.attr('href'),
			descr = elem.find('.project-description').html(),
			slidesHtml = '<ul class="slides">',

			slides = elem.data('images').split(',');

		for (var i = 0; i < slides.length; ++i) {
			slidesHtml = slidesHtml + '<li><img src='+slides[i]+' alt=""></li>';
		}
		
		slidesHtml = slidesHtml + '</ul>';
		

		$('#project-modal').on('show.bs.modal', function () {
			$(this).find('h1').text(title);
			$(this).find('.btn').attr('href',link);
			$(this).find('.project-descr').html(descr);
			$(this).find('.image-wrapper').addClass('flexslider').html(slidesHtml);
			
			setTimeout(function(){
				$('.image-wrapper.flexslider').flexslider({
					slideshowSpeed: 3000,
					animation: 'slide',
					controlNav: false,
					start: function(){
						$('#project-modal .image-wrapper')
						.addClass('done')
						.prev('.loader').fadeOut();
					}
				});
			},1000);
		}).modal();
	});
	$('#project-modal').on('hidden.bs.modal', function () {
		$(this).find('.loader').show();
		$(this).find('.image-wrapper')
			.removeClass('flexslider')
			.removeClass('done')
			.html('')
			.flexslider('destroy');
	});
});