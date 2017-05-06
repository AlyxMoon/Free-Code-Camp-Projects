var breakTime = 5;
var sessionTime = 25;
var sessionRemaining = sessionTime * 60;
var timerOn = false;
var status = "working";

$(document).ready(function() {

  updateClock();
  setInterval(timer, 1000);

  $("#break-minus").on("click", function() {
    breakTime = breakTime - 1;
    if (breakTime == 0) breakTime = 1;
  });
  $("#break-add").on("click", function() {
    breakTime = breakTime + 1;
  });

  $("#session-minus").on("click", function() {
    sessionTime = sessionTime - 1;
    if (sessionTime == 0) sessionTime = 1;
    if (!timerOn) {
      sessionRemaining = sessionTime * 60;
      updateClock();
    }
  });
  $("#session-add").on("click", function() {
    sessionTime = sessionTime + 1;
    if (!timerOn) {
      sessionRemaining = sessionTime * 60;
      updateClock();
    }
  });

  $("#clock").on("click", function() {
    timerOn = !timerOn;
    if (!timerOn) {
      $("#clock").css("border", "3px solid black");
    } else if (status == "working") {
      $("#clock").css("border", "3px solid #4CAE4C");
    } else if (status == "break") {
      $("#clock").css("border", "3px solid #269ABC");
    }
  });

  $("#reset").on("click", function() {
    timerOn = false;
    $("#clock").css("border", "3px solid black");
    status = "working";
    sessionRemaining = sessionTime * 60;
    updateClock();
  });

  $(".btn").on("click", function() {
    this.blur();

    $("#break-time").text(breakTime);
    $("#session-time").text(sessionTime);

    if (!timerOn) $("#status").text("stopped");
    else $("#status").text(status);
  });
});

function timer() {
  if (timerOn) {
    sessionRemaining = sessionRemaining - 1;
    if (sessionRemaining == 0) {
      if (status == "working") {
        sessionRemaining = breakTime * 60;
        status = "break";
        $("#clock").css("border", "3px solid blue");
      } else if (status == "break") {
        sessionRemaining = sessionTime * 60;
        status = "working";
        $("#clock").css("border", "3px solid green");
      }
      $("#status").text(status);
    }

    updateClock();
  }
}

function updateClock() {
  var hour = Math.floor(sessionRemaining / 3600);
  if (hour < 10) hour = "0" + hour;
  var min = Math.floor(sessionRemaining % 3600 / 60);
  if (min < 10) min = "0" + min;
  var sec = Math.floor(sessionRemaining % 3600 % 60);
  if (sec < 10) sec = "0" + sec;
  var timeDisplay = hour + ":" + min + ":" + sec;

  $("#session-remaining").text(timeDisplay);
}
