var dictionary = {"january":"Tháng một","february":"Tháng hai","march":"Tháng ba","april":"Tháng tư","may":"Tháng năm","june":"Tháng sáu","july":"Tháng bảy","august":"Tháng tám","september":"Tháng chín","october":"Tháng mười","november":"Tháng mười một","december":"Tháng mười hai","sunday":"Chủ nhật","monday":"Thứ hai","tuesday":"Thứ ba","wednesday":"Thứ tư","thursday":"Thứ năm","friday":"Thứ sáu ","saturday":"Thứ bảy","type_sport_empty":"Type Sport rỗng","passed":"đã phát","left":"bên trái","minutes":"phút.","select_broadcast":"Chọn trận đấu","broadcast":"Trận đấu","broadcast_is_completed":"Trận đấu hoàn thành","watch":"Xem","get_code":"Nhận mã số","insert_code":"Nhập mã số","size":"Kích thước","show_title":"Hiện tiêu đề","auto_play":"Tự động chạy","close":"Đóng"}
var liveFeed = {
	//url: '/LiveFeed/GetLeftMenuShort',
	//url: '/data.json',
	url: 'LiveFeed.json',
	lng: 'vi',
	listEvents: null,
	dataVideo: null,
	streamIds: [],
	eventsIds: [],
	sports: null,
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
		//console.log(liveFeed.url);
		$.ajax({
			type: 'GET',
			url:   liveFeed.url,
			data:  {sports: liveFeed.sports, lng: liveFeed.lng, partner: 24},
			cache: false,
			success: function(data) {
				//проверить на ошибки
				if (data.ErrorCode == 0) {
					liveFeed.dataVideo = data.Value;
					if (!liveFeed.dataVideo.length) {
						liveFeed.listEvents.html('<li class="clear system"><div class="line colM1"></div><h2>' + dictionary.type_sport_empty + '</h2></li>');
					} else {
						liveFeed.drawFeed();

					}
				} else {
					liveFeed.listEvents.html('<li class="clear system"><div class="line colM1"></div><h2>' + dictionary.type_sport_empty + '</h2></li>');
				}
			}
		});
	},
	drawFeed: function() {
		var opp1, opp2, sportId, gameId, streamId, sport, liga, time, start = null, videoItem = null,
			streamBlock = null, tmpStreamIds = this.streamIds.slice(0), tmpEventIds = this.eventsIds.slice(0),
			teamVS = '', innerHtml = '', currentGameId = 0, dataLength = liveFeed.dataVideo.length;
		liveFeed.dataVideo.sort(liveFeed.sortArr);
		//во временный массив заносим уже отрисованне стримы. потом будем их удалять
		for (var i = 0; i < dataLength; i++) {
			streamId = liveFeed.dataVideo[i].VI;
			if (typeof streamId == 'undefined') {
				continue;
			}

			sportId = liveFeed.dataVideo[i].SportId;
			opp1 = liveFeed.dataVideo[i].Opp1;
			opp2 = liveFeed.dataVideo[i].Opp2;
			sport = liveFeed.dataVideo[i].Sport;
			liga = liveFeed.dataVideo[i].Liga;
			gameId = liveFeed.dataVideo[i].FirstGameId;
			streamId = liveFeed.dataVideo[i].VI;
			start = new Date(liveFeed.dataVideo[i].Start);

			if (liveFeed.dataVideo[i].TimeDirection) {
				time = dictionary.passed + ' ' + liveFeed.dataVideo[i].Time + ' ' + dictionary.minutes;
			} else {
				time = dictionary.left + ' ' + liveFeed.dataVideo[i].Time + ' ' + dictionary.minutes;
			}
			if (opp1 != '' && opp2 != '') {
				teamVS = opp1 + " - " + opp2;
			} else {
				teamVS = liga;
			}
			//На случай если доступно сразу несколько потоков
			if (currentGameId != gameId) {
				//удаляем из временного массива игру, которая пришла, оставшиеся потом надо удалить из дерева
				tmpEventIds.splice($.inArray(gameId, tmpEventIds), 1);
				if ($.inArray(gameId, liveFeed.eventsIds) < 0) {
					innerHtml = '' +
					'<li class="clear" data-event="' + gameId + '">' +
						'<div class="line colM' + (Math.round(Math.random() * (7)) + 1).toString() + '"></div>' +
						'<div class="nameCon fl">' +
							'<div class="sport">' + sport + '</div>' +
							'<a href="view.php?game=' + gameId + '" class="name">' + teamVS + '</a>' +
							'<div class="liga">' + liga + '</div>' +
							'<div class="dopCon">' +
								'<div class="time">' + time + '</div>' +
								'<div class="dop clear">' +
									'<div class="date fl">' + liveFeed.days[start.getDay()] + ', ' + start.getDate() + ' ' +
									liveFeed.months[start.getMonth()] + ' ' + (start.getHours() < 10 ? '0' + start.getHours() : start.getHours()) + ':' +
									(start.getMinutes() < 10 ? '0' + start.getMinutes() : start.getMinutes()) + ' (GMT ' + (-start.getTimezoneOffset()/60 > 0 ? '+' : '') + -start.getTimezoneOffset()/60 + ')</div>' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="moreCon fr">' +
							'<a href="#" class="moreBut">' + dictionary.select_broadcast + '</a>' +
							'<div class="moreBlock">' +
								'<table>' +
									'<tbody id="game-' + gameId + '"></tbody>' +
								'</table>' +
							'</div>' +
						'</div>' +
					'</li>';
					//здесь мы выбираем в каое место вставлять новые события
					liveFeed.eventsIds.push(gameId);
					if (currentGameId == 0) {
						liveFeed.listEvents.prepend(innerHtml);
					} else {
						$('li[data-event="' + currentGameId + '"]').after(innerHtml);
					}
				} else {
					$('li[data-event="' + gameId + '"]').find('.time').html(time);
				}
				currentGameId = gameId;
				streamBlock = $('#game-' + currentGameId + '');
			}

			if ($.inArray(streamId, liveFeed.streamIds) >= 0) {
				//удаляем из временного массива стримов стрим, который пришёл. оставшиеся потом надо удалить из дерева
				tmpStreamIds.splice($.inArray(streamId, tmpStreamIds), 1);
				continue;
			}

			videoItem = '' +
			'<tr data-stream="' + streamId + '">' +
				'<td><span class="name">' + dictionary.broadcast + ' #' + streamId.toString() + '</span></td>' +
				'<td><a href="view.php?game=' + gameId + '" class="videoBut">' + dictionary.watch + '</a></td>' +
				'<td>' +
					'<div>' +
						'<a href="#" class="codeBut">' + dictionary.get_code + '</a>' +
						'<div class="getCodeCon clear">' +
							'<div class="fl">' +
								'<div class="colName">' + dictionary.insert_code + '</div>' +
								'<textarea class="code" data-id="' + gameId + '" readonly></textarea>' +
							'</div>' +
							'<div class="fl">' +
								'<div class="colName">' + dictionary.size + ', px</div>' +
								'<div class="inputCon clear">' +
									'<input class="fl" type="text" name="w" value="560"/>' +
									'<span class="fl">x</span>' +
									'<input class="fl" type="text" name="h" value="315"/>' +
								'</div>' +
								'<div class="clear">' +
									'<input type="checkbox" class="check" id="check01_' + gameId + '" name="t" checked/>' +
									'<label class="fl" for="check01_' + gameId + '">' + dictionary.show_title + '</label>' +
								'</div>' +
								'<div class="clear">' +
									'<input type="checkbox" class="check" id="check02_' + gameId + '" name="a"/>' +
									'<label class="fl" for="check02_' + gameId + '">' + dictionary.auto_play + '</label>' +
								'</div>' +
								'<div class="clear">' +
									'<span class="close fr">' + dictionary.close + '</span>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</td>' +
			'</tr>';
			liveFeed.streamIds.push(streamId);
			streamBlock.append(videoItem);
		}
		//удаляем стримы и игры, которые в новом фиде не приходили но в дереве есть, удаляем их id в онсновных массивах
		for (var s = 0; s < tmpStreamIds.length; s++) {
			liveFeed.streamIds.splice($.inArray(tmpStreamIds[s], liveFeed.streamIds), 1);
			liveFeed.listEvents.find('tr[data-stream="' + tmpStreamIds[s] + '"]').remove();
		}

		for (var e = 0; e < tmpEventIds.length; e++) {
			liveFeed.eventsIds.splice($.inArray(tmpEventIds[e], liveFeed.eventsIds), 1);
			liveFeed.listEvents.find('li[data-event="' + tmpEventIds[e] + '"]').remove();
		}

	},
	//сортировка пришедшего фида
	sortArr: function(x, y) {
		if (x.SportId != y.SportId) {
			return (parseInt (x.SportId) - parseInt (y.SportId));
		} else if (x.Liga != y.Liga) {
			return x.Liga - y.Liga;
		} else {
			return (parseInt (x.FirstGameId) - parseInt (y.FirstGameId));
		}
	},
	_init: function(){
		this.listEvents = $('#listEvents');
		this.sports  = $('input[name="typeAllow"]').val();
		liveFeed.listEvents.on('click', 'textarea.code', function() {
			$(this).select();
		});
		try {
			liveFeed.getFeed();
			setInterval(liveFeed.getFeed, 10000);
		} catch (e) {}
	}
};
