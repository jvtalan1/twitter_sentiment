$(document).ready(Execute);

var list = 0;

function Execute() {
	for (var i = 1; i <= 10; i++) {
		var tweet = '<div class="tweet" id="tweet'+ i +'"><div class="profile"><div class="profile_image"><img src="" class="profile_image" onerror="imageError(this)"></div></div><div class="tweet_details"><div class="name"><a href="#" class="name"></a></div><div class="screen_name"></div><div class="created_at"></div><div class="text"></div></div><div class="icon-holder"><img src="" class="emoticon"></div></div>';
		$('div.stream').append(tweet);
	}
	$('#previous-btn').attr('disabled', 'disabled');
	displayTweet(list);
	textContent();
}

function displayTweet(index) {
	var i = 0;
	$('.tweet').each(function() {
		$(this).children('div').children('div.name').children('a.name').html(data[index + i].user.name);
		$(this).children('div').children('div.screen_name').html('@' + data[index + i].user.screen_name);
		$(this).children('div').children('div.created_at').html(parseTwitterDate(data[index + i].created_at));
		$(this).children('div').children('div.text').html(data[index + i].text);
		$(this).children('div').children('div').children('img.profile_image').attr('src', data[index + i].user.profile_image_url);
		i++;
	});
	var from = index + 1;
	var to = index + 10;
	$('#header').html('Tweets (' + from + '-' + to + ')');
	
}

function textContent() {

	var text = [];
	var i = 0;
	var total = 0;
	var counter = 0;
	var mood;
	var word;
	var meter = 0;
	var id = 1;
	
	$('.tweet').each(function() {
		text.push($(this).children('div').children('div.text').html().toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(" "));
	});

	for (var a in text) {
		total = 0;
		counter = 0;
		for (var b in text[a]) {
			word = text[a][b];
			for (mood in corpus) {
				if (mood == word) {
					total = total + corpus[mood];
					counter++;
				}
			}
			if (counter == 0) {
				meter = 0;
			} else {
				meter = total/counter;
			}
		}
	var getIcon = displayMood(meter);
	$('#tweet' + id).children('div').children('img').attr('src', getIcon);
	id++;
	}
}

function displayMood(mood) {
	var icon;
	if (mood < 0) {
		icon = 'items/sad.png';
	} else if (mood == 0) {
		icon = 'items/neutral.png';
	} else if (mood > 0 ) {
		icon = 'items/happy.png';
	}
	return icon;
}

function showMood() {
	$(".icon-holder").css("display", "block");
	$('#HideMood-btn').removeClass('active');
	$('#ShowMood-btn').addClass('active');
}

function hideMood() {
	$(".icon-holder").css("display", "none");
	$('#HideMood-btn').addClass('active');
	$('#ShowMood-btn').removeClass('active');
}

function parseTwitterDate(date) {
    var system_date = new Date(Date.parse(date));
    var user_date = new Date();
    var diff = Math.floor((user_date - system_date) / 1000);
    if (diff <= 1) {return "just now";}
    if (diff < 20) {return diff + " seconds ago";}
    if (diff < 40) {return "half a minute ago";}
    if (diff < 60) {return "less than a minute ago";}
    if (diff <= 90) {return "one minute ago";}
    if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
    if (diff <= 5400) {return "1 hour ago";}
    if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
    if (diff <= 129600) {return "1 day ago";}
    if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
    if (diff <= 777600) {return "1 week ago";}
    return "on " + system_date;
}

function next() {
	list = list + 10;
	displayTweet(list);
	textContent();
	$('#previous-btn').removeAttr('disabled');
    $('body').animate({scrollTop: 0}, 'slow');
}

function previous() {
	list = list - 10;
	displayTweet(list);
	textContent();
	$('body').animate({scrollTop: 0}, 'slow');
	if (list == 0) {
		$('#previous-btn').attr('disabled', 'disabled');
	}
}

function imageError(element) {
	$(element).attr('src', 'items/default.jpg');
	return true;
}