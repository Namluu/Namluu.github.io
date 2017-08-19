$(function() {
	// Выбрать трансляцию
	$(document).on('click', '.eventsListUl[data-list="1"] li .moreCon .moreBut', function(e) {
		e.preventDefault();
		$('.eventsListUl li .nameCon .dopCon, .eventsListUl li .moreCon .moreBlock').slideUp(300);
		$('.eventsListUl li .moreCon .moreBut').slideDown(300);

		$(this).slideUp(300).next().slideDown(300).parent().parent().find('.nameCon .dopCon').slideDown(300);
	}).on('click', '.eventsListUl[data-list="2"] li .moreCon .moreBut[data-but="2"],.eventsListUl[data-list="2"] li .moreCon .moreBut[data-but="1"]', function(e) {
		e.preventDefault();
		$('.eventsListUl li .moreCon .moreBlock,.eventsListUl li .moreCon .moreBut[data-but="3"]').slideDown(300);
		$('.eventsListUl li .moreCon .moreBut[data-but="2"]').parent().slideUp(300);
	}).on('click', '.eventsListUl[data-list="2"] li .moreCon .moreBut[data-but="3"]', function(e) {
		e.preventDefault();
		$('.eventsListUl li .moreCon .moreBlock,.eventsListUl li .moreCon .moreBut[data-but="3"]').slideUp(300);
		$('.eventsListUl li .moreCon .moreBut[data-but="2"]').parent().slideDown(300);
	});

	// Код трансляции
	$(document).on('click', function(event) {
		if (!$(event.target).is(".eventsListUl li .moreCon .moreBlock .codeBut, .getCodeCon, .getCodeCon *")) {
			$('.eventsListUl li .moreCon .moreBlock .codeBut').removeClass('active').next().fadeOut(100);
		}
	}).on('click', '.eventsListUl li .moreCon .moreBlock .codeBut', function(e) {
		e.preventDefault();
		if ($(this).is('.active') == false) {
			$('.eventsListUl li .moreCon .moreBlock .codeBut').removeClass('active').next().fadeOut(100);
			$(this).addClass('active').next().fadeIn(300);
			getCode($(this).next());
		} else {
			$(this).removeClass('active').next().fadeOut(100);
		}
	}).on('click', '.getCodeCon .close', function(e) {
		$(this).parent().parent().parent().fadeOut(100).prev().removeClass('active');
	});

	// Сборка кода
	function getCode(_this) {
		var w = _this.find('[name="w"]').val(), h = _this.find('[name="h"]').val(), t = 0, a = 0, id = _this.find('.code').data('id');

		if (_this.find('[name="t"]').is(':checked')) {
			t = 1;
		}
		if (_this.find('[name="a"]').is(':checked')) {
			a = 1;
		}

		var code = '<iframe src="//sportstream365.com/viewer/frame/?game=' + id + '&header=' + t + '&autoplay=' + a + '&width=' + w + '&height=' + h + '" width="' + w + '" height="' + h + '" frameborder="0" scrolling="no"></iframe>';
		_this.find('.code').val(code);
	}

	$(document).on('keyup', '.getCodeCon .inputCon input', function(e) {
		getCode($(this).parent().parent().parent());
	}).on('change', '.getCodeCon input[type="checkbox"]', function(e) {
		getCode($(this).parent().parent().parent());
	});

	// Кастомные селекты
	$('.select').selectmenu();
});