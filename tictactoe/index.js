var score = {
  player: 0,
  computer: 0,
  tie: 0
};
var board = new Array(9);
var playerMark, computerMark;

$(document).ready(function() {
  newGame();

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

      if (checkVictory(index, playerMark) === false) {
        markSquare(computerMove(), computerMark);
        checkVictory(index, playerMark);
      }
    }
  });
  //----------------
});

// Function Declarations
//----------------------
function newGame() {
  $(".option").show();
  $(".square").text("");

  playerMark = "";
  computerMark = "";
  for (var i = 0; i < 9; i++) board[i] = "";
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

function checkVictory(index, mark) {
  //-------------------------------------------------
  // First attempt, easiest to conceptualize approach

  // Check horizontally
  for (var i = 0; i < 8; i += 3) {
    if (
      board[0 + i] !== "" &&
      board[0 + i] === board[1 + i] &&
      board[1 + i] === board[2 + i]
    ) {
      newGame();
      return true;
    }
  }
  // Check vertically
  for (var i = 0; i < 3; i++) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 3] &&
      board[i + 3] === board[i + 6]
    ) {
      newGame();
      return true;
    }
  }
  // Check diagonals
  if (board[0] !== "" && board[0] === board[4] && board[4] === board[8]) {
    newGame();
    return true;
  }
  if (board[2] !== "" && board[2] === board[4] && board[4] === board[6]) {
    newGame();
    return true;
  }

  return false;
  //-------------------------------------------------
}