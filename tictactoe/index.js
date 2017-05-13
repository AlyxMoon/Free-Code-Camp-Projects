var score = {
  player: 0,
  computer: 0,
  tie: 0
};
var board = new Array(9);
var playerMark, computerMark;

$(document).ready(function() {
  newGame(false);

  // Event Listeners
  //----------------
  $("#new-game").click(newGame);
  $("button.option").click(function() {
    selectMark($("#" + this.id).text());
    if (playerMark === "X") markSquare(computerMove(), computerMark);
  });

  $(".square").click(function() {
    var index = $(".square").index(this);
    if (playerMark !== "" && board[index] === "") {
      markSquare(index, playerMark);

      if (gameOver() === false) {
        markSquare(computerMove(), computerMark);
        gameOver();
      }
    }
  });
  //----------------
});

// Function Declarations
//----------------------
function newGame(isGameOver = true) {
  var time = isGameOver ? 200 : 0;

  window.setTimeout(function() {
    updateScoreBars();
    $(".option").show();
    $(".square").text("");

    playerMark = "";
    computerMark = "";
    for (var i = 0; i < 9; i++) board[i] = "";
  }, time);
}

function selectMark(mark) {
  $(".option").hide();
  playerMark = mark;
  if (playerMark === "X") computerMark = "O";
  else computerMark = "X";
}

function computerMove() {
  while (true) {
    var choice = Math.floor(Math.random() * 9);
    if (board[choice] === "") return choice;
  }
}

function markSquare(index, mark) {
  if (board[index] !== "") {
    return false;
  }
  board[index] = mark;
  $(".square").eq(index).text(mark);
  return true;
}

function gameOver() {
  var victoryCheck = checkVictory();

  if (victoryCheck === playerMark) {
    score.player += 1;
    newGame();
    return true;
  }
  if (victoryCheck === computerMark) {
    score.computer += 1;
    newGame();
    return true;
  }

  if (board.every(function(elem) {
    return elem;
  })) {
    score.tie += 1;
    newGame();
    return true;
  }

  return false;
}

function checkVictory() {
  //-------------------------------------------------
  // First attempt, easiest to conceptualize approach

  // Check horizontally
  for (var i = 0; i < 8; i += 3) {
    if (
      board[0 + i] !== "" &&
      board[0 + i] === board[1 + i] &&
      board[1 + i] === board[2 + i]
    ) {
      return board[0 + i];
    }
  }
  // Check vertically
  for (var i = 0; i < 3; i++) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 3] &&
      board[i + 3] === board[i + 6]
    ) {
      return board[i];
    }
  }
  // Check diagonals
  if (board[0] !== "" && board[0] === board[4] && board[4] === board[8]) {
    return board[0];
  }
  if (board[2] !== "" && board[2] === board[4] && board[4] === board[6]) {
    return board[2];
  }

  return false;
  //-------------------------------------------------
}

function updateScoreBars() {
  var maxScore = score.player + score.computer + score.tie;

  $('#score-player').text(score.player)
    .attr('aria-valuenow', score.player)
    .attr('aria-valuemax', maxScore)
    .css('width', (score.player / maxScore * 100) + '%')
  $('#score-computer').text(score.computer)
    .attr('aria-valuenow', score.computer)
    .attr('aria-valuemax', maxScore)
    .css('width', (score.computer / maxScore * 100) + '%')
  $('#score-tie').text(score.tie)
    .attr('aria-valuenow', score.tie)
    .attr('aria-valuemax', maxScore)
    .css('width', (score.tie / maxScore * 100) + '%')
}
