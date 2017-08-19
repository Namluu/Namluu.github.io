var dictionary = {"january":"Tháng một","february":"Tháng hai","march":"Tháng ba","april":"Tháng tư","may":"Tháng năm","june":"Tháng sáu","july":"Tháng bảy","august":"Tháng tám","september":"Tháng chín","october":"Tháng mười","november":"Tháng mười một","december":"Tháng mười hai","sunday":"Chủ nhật","monday":"Thứ hai","tuesday":"Thứ ba","wednesday":"Thứ tư","thursday":"Thứ năm","friday":"Thứ sáu ","saturday":"Thứ bảy","type_sport_empty":"Type Sport rỗng","passed":"đã phát","left":"bên trái","minutes":"phút.","select_broadcast":"Chọn trận đấu","broadcast":"Trận đấu","broadcast_is_completed":"Trận đấu hoàn thành","watch":"Xem","get_code":"Nhận mã số","insert_code":"Nhập mã số","size":"Kích thước","show_title":"Hiện tiêu đề","auto_play":"Tự động chạy","close":"Đóng"}
var viewer = {
	url: 'getgame.php',
	lng: 'vi',
	game: null,
	dataVideo: null,
	videoBlock: null,
	months: [
		dictionary.january,
		dictionary.february,
		dictionary.march,
		dictionary.april,
		dictionary.may,
		dictionary.june,
		dictionary.july,
		dictionary.august,
		dictionary.september,
		dictionary.october,
		dictionary.november,
		dictionary.december
	],
	days: [
		dictionary.sunday,
		dictionary.monday,
		dictionary.tuesday,
		dictionary.wednesday,
		dictionary.thursday,
		dictionary.friday,
		dictionary.saturday
	],
	getFeed: function(){
		$.ajax({
			type: 'GET',
			url:   viewer.url,
			data:  {lng: viewer.lng, id: viewer.game, partner: 24},
			dataType: 'json',
			cache: false,
			success: function(data) {
				//проверить на ошибки
				if (data.Success == true) {
					viewer.dataVideo = data.Value;
					viewer.drawVideo();
				} else {
					viewer.videoBlock.html('<li class="clear system"><div class="line colM1"></div><h2>' + dictionary.broadcast_is_completed + '</h2></li>')
				}
			}
		});
	},
	drawVideo: function() {
		var streamId, liga, opp1, opp2, sport, start, minutes, seconds, time, startTime, teamVS;

		streamId = viewer.dataVideo.VI;
		if (typeof streamId == 'undefined') {
			return;
		}

		liga = viewer.dataVideo.ChampRus;
		opp1 = viewer.dataVideo.Opp1;
		opp2 = viewer.dataVideo.Opp2;
		sport = viewer.dataVideo.SportName;
		start = new Date(viewer.dataVideo.Start * 1000);

		minutes = parseInt(viewer.dataVideo.Scores.TimeSec / 60);
		seconds = viewer.dataVideo.Scores.TimeSec % 60;

		if(String(minutes).length != 2) minutes = "0" + minutes;
		if(String(seconds).length != 2) seconds = "0" + seconds;
		time = minutes + ":" + seconds;

		if (viewer.dataVideo.Scores.TimeDirection) {
			time = dictionary.passed + ' ' + time;
		} else {
			time = dictionary.left + ' ' + time;
		}
		if (opp1 != '' && opp2 != '') {
			teamVS = opp1 + ' - ' + opp2;
		} else {
			teamVS = liga;
		}

		startTime = viewer.days[start.getDay()] + ', ' + start.getDate() + ' ' +
		viewer.months[start.getMonth()] + ' ' + (start.getHours() < 10 ? '0' + start.getHours() : start.getHours()) + ':' +
		(start.getMinutes() < 10 ? '0' + start.getMinutes() : start.getMinutes()) + ' (GMT ' + (-start.getTimezoneOffset()/60 > 0 ? '+' : '') + -start.getTimezoneOffset()/60 + ')';

		viewer.videoBlock.find('#sport').html(sport);
		viewer.videoBlock.find('#teamVS').html(teamVS);
		viewer.videoBlock.find('#liga').html(time + ' ' + startTime);
		viewer.videoBlock.find('#streamId').html(dictionary.broadcast + ' #' + streamId);
		viewer.videoBlock.find('#playVideo').attr('href', '/viewer?game=' + viewer.game + '');
		viewer.videoBlock.find('#textareaCode').attr('data-id', viewer.game);
		//viewer.createPlayer(streamId, teamVS);
	},
	createPlayer: function(streamId, teamVS){
		var params = {
			menu: "false",
			wmode: "window",
			allowFullScreen: true
		};
		var attributes = {
			id: "BridgeMovie"
		};
		var flashvars = {
			userID: 0,
			refid: 36,
			videoID: encodeURIComponent(streamId),
			matchName: teamVS
		};
		swfobject.embedSWF("http://sportstream365.com/swf/VideoPlayer.swf?x=" + Math.random(), "video-player", 560, 315, "9.0.0", "swf/expressInstall.swf", flashvars, params, attributes);
	},
	_init: function(){
		this.game = $('input[name="gameId"]').val();
		this.videoBlock = $('#videoBlock');
		viewer.videoBlock.on('click', 'textarea.code', function() {
			$(this).select();
		});
		try {
			this.getFeed();
			//setInterval(viewer.getFeed, 10000);
		} catch (e) {}
	}
};

