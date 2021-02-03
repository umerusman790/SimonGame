// lets start coding our simon game
let buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;


$(document).on("keydown", function() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").on("click", function() {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animate(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})









// function that are being used above as a handy stuff



function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game over, Press Any key to Start Again!");
    startOver();

  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}



function nextSequence() {
  userClickedPattern = [];
  let randomNum = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNum];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  level += 1;
  $("#level-title").text("Level" + " " + level);


}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animate(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}
