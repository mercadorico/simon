var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = true;
var level = 0;

$(".btn").click(function() {
  var userChosenColour = this.id; //assign id of chosen colored div to variable
  userClickedPattern.push(userChosenColour);  //store user input color to last index of array
  animatePress(userChosenColour);
  playSound(userChosenColour);

  if(!started) {
    checkAnswer(userClickedPattern.length - 1);
  }
  else {
    gameOver();
  }
});

$(document).keypress(function() {
  if (started) {
    started = false;
    nextSequence();
  }
  else {

  }

});

function playSound(name) {
  var colorAudio = new Audio("sounds/" + name + ".mp3");
  colorAudio.play();
}

function animatePress(currentColour) {
 $("." + currentColour).addClass("pressed");
 setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
 }, 100);
}

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {    //check every user input sequence
    if(userClickedPattern.length === level) {                             //if user inputs all sequence correct proceed to next level
      setTimeout(function() {
        nextSequence();                                                   //generate next color for the sequence in random and
        userClickedPattern = [];                                          //reset user input pattern
      }, 1000);
    }
    else {
      //Do Nothing
    }
  }
  else {
    gameOver();
  }
}

function gameOver() {
  var gameOverAudio = new Audio("sounds/wrong.mp3");                   //play game over audio
  gameOverAudio.play();

  $("body").addClass("game-over");                                    //animate background to indicate game over
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart");

  userClickedPattern = [];
  gamePattern = []; //reset game pattern array
  level = 0; //reset level
  started = true; //if any key is pressed restart game
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);                 //animate randomly generated color div
  var colorAudio = new Audio("sounds/" + randomChosenColour + ".mp3");
  colorAudio.play();

  $("h1").text("Level " + level);
  level++;
}
