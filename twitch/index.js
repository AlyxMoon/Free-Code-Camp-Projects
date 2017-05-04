$(document).ready(function() {
  var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "AlyxDeLunar", "monstercat", "comster404", "brunofin"];
	channels.forEach(function(channel) {
		$.getJSON(createAPI(channel), function(data) {
      console.log(data)
			if(data.logo === null || data.status === 404) data.logo = "img/placeholder.png";

      var onlineStatus;
      var description;
      if(data.status !== null && data.status !== 404) {
        onlineStatus = 'online';
        description = data.status;
        // description = data.status.substr(0,30) + '...';
      }
      else if(data.status === null) {
        onlineStatus = 'offline';
        description = 'Channel is currently offline.';
      }
      else {
        onlineStatus = 'closed';
        description = 'Channel has been closed.'
      }

      $("#" + onlineStatus + "-list").append(
        $("<div class='row " + onlineStatus + "' />").append(
          $("<a href='" + data.url + "' target='_blank' />").append(
            $("<div class='col-xs-4 col-sm-2 row-icon'><img class='img' src='" + data.logo + "'></img></div>"),
            $("<div class='col-xs-8 col-sm-4 row-name'>" + data.name + "</div>"),
            $("<div class='col-xs-12 col-sm-6 row-status'>" + description + "</div>")
          )
        )
      );

		});
	});

	function createAPI(channel) {
		return 'https://wind-bow.gomix.me/twitch-api/channels/' + channel + '?callback=?';
	}

	$(".menu-option").click(function() {
    var option = $(this).data('list');

    if (option === 'all') {
      $('.list-group').css('display', 'initial');
    } else {
      $('.list-group').css('display', 'none');
      $('#' + option + '-list').css('display', 'initial');
    }
	});

});