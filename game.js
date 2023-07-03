
alert("press 'h' for instructions");

$(document).keypress(function(event) {
    if(event.key === 'h'){
        alert("One of the four color will blink randomly, try to press the buttons in the pattern, if the pattern you selected is wrong the game is ended, you start over again from the beginning");
    }
});



var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var usedClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level" + level);
        nextSequence()
        started = true;
    }
});

$(".btn").click(function() {
    
    var userChosenColor = $(this).attr("id")
    usedClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(usedClickedPattern.length - 1);
    
});

function checkAnswer(currentLevel) {
    
    if(gamePattern[currentLevel] === usedClickedPattern[currentLevel]) {

        console.log("Success");

        if(usedClickedPattern.length === gamePattern.length)
        {

            setTimeout(function() {
                nextSequence();
            }, 1000);   

        }

    }else{
        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
             $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function nextSequence() {

    usedClickedPattern = [];

    level++;
    $("#level-title").text("Level" + level);

    var randomNumber =  Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}



function playSound(name) {
    var audio = new Audio('sounds/'+ name + '.mp3');
    audio.play();
}


function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}



function startOver() {

    level = 0;

    gamePattern = [];

    started = false;

}


