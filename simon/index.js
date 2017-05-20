$(document).ready(function() {

	// Variable declarations
	var on = false;
	var strict = false;
	var active = false;
	var waitInterval = 1000;
	var sequence = [];
	var playerIndex;
	var buttonLightID = {
		0: "green-light",
		1: "red-light",
		2: "yellow-light",
		3: "blue-light"
	};
	var buttonSounds = {
		0: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
		1: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
		2: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
		3: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
	};

	// Event handlers
	$(".switch").click(function() {
		changeOnStatus();
	});

	$("#start").click(function() {
		resetGame();
	});

	$("#strict").click(function() {
		if (on) changeStrict();
	});

	$(".game-button").click(function() {
		if (active) {
			lightUp(this.id);
			if (sequence[playerIndex] != $(this).attr("id")) {
				if (strict) {
					alert("Sorry, you lost. Try again!");
					resetGame();
				} else {
					alert("Wrong button, try again!");
					animateSequence();
				}
			} else {
				playerIndex++;

				if (playerIndex === 20) {
					victory();
				} else if (playerIndex >= sequence.length) {
					addToSequence();
					animateSequence();
				}
			}
		}
	});

	// Function definitions
  function changeOnStatus() {
		on = !on;
		$("#switch-lever").toggleClass("lever-off");

		if (!on) {
			$(".score-display").text("");
			active = false;
			playerIndex = 0;
			strict = false;
      sequence = []
			$("#strict-led").removeClass("led-on");
		} else {
			$(".score-display").text("- -");
		}
	}

	function changeStrict() {
		strict = !strict;
		$("#strict-led").toggleClass("led-on");
	}

	function addToSequence() {
		playerIndex = 0;
		active = false;
		$(".score-display").text(sequence.length);
		sequence.push(Math.floor(Math.random() * 4));
	}

	function animateSequence() {
		active = false;
		var intervalHandler;
		var i = 0;
		intervalHandler = setInterval(function() {
			lightUp(sequence[i]);
			i++;
			if (i >= sequence.length) {
				clearInterval(intervalHandler);
				active = true;
			}
		}, waitInterval);
	}
	function lightUp(id) {
		$("#" + id).addClass(buttonLightID[id]);
		buttonSounds[id].play();
		window.setTimeout(function() {
			$("#" + id).removeClass(buttonLightID[id]);
		}, waitInterval / 2);
	}

	function resetGame() {
		active = false;
		sequence = [];
		playerIndex = 0;
		addToSequence();
		animateSequence();
	}

	function victory() {
		alert("You win!");
		alert("Sorry, the princess is in another castle, you'll have to try again.");
		resetGame();
	}
});
