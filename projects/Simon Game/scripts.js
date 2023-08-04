// Simon game scripts

////////////////
//    Init    //
////////////////

// Helpers
function rnd ( n ) {
    return Math.floor(Math.random() * n);
}

function addToSeq ( s ) {
    s.push(rnd(4));
}

//// Properties
// Constants
const buttons = ["green", "red", "yellow", "blue"];
const sounds  = [new Audio("./sounds/green.mp3"),new Audio("./sounds/red.mp3"),new Audio("./sounds/yellow.mp3"),new Audio("./sounds/blue.mp3"), new Audio("./sounds/wrong.mp3")];

// Variables
var sequence   = [rnd(4)];
var progress   = 0;
var isGameLost = true;

$("html").keydown(function(event) {
    console.log(sequence);
})


////////////////
//    Anim    //
////////////////

function playSequenceAnim() {
    playPressedAnim(sequence[sequence.length-1]);
}

function playPressedAnim ( index ) {
    console.log(index);
    // Anim
    $("#"+buttons[index]).addClass("pressed");
    setTimeout(function() {$("#"+buttons[index]).removeClass("pressed");}, 100);
    // Sound
    sounds[index].play();
}

function playLoseAnim() {
    // Sound
    sounds[4].play();
}

////////////////
//    Game    //
////////////////

function loseGame() {
    // Game is lost
    isGameLost = true;
    // Set messege
    $("#level-title").text("Game Over! Click here to restart.");
}

function startGame() {
    if ( isGameLost ) {
        // Reset game scene
        $("#level-title").text("Follow the Pattern!");
        isGameLost = false;
        progress = 0;
        sequence = [rnd(4)];
        // Play animation
        playSequenceAnim();
    }
}

////////////////
//    Input   //
////////////////

function pressButton ( index ) {
    // A button was pressed
    // 0 = green, 1 = red, 2 = yellow, 3 = blue

    // Check if game is playing
    if ( isGameLost ) return;

    // Play anim
    playPressedAnim(index);
    
    // Check if the pressed button was correct
    if ( index == sequence[progress] ) {
        //// Correct
        // Incriment progress
        progress++;
        // Check if sequence is complete
        if ( progress >= sequence.length ) {
            // add to sequence
            addToSeq(sequence);
            // and reset progress
            progress = 0;
            // Play next button animation
            setTimeout(playSequenceAnim, 500);
        }

    } else {
        //// Wrong
        // Play anim
        playLoseAnim();
        // Lost game
        setTimeout(loseGame, 100);
    }
}

function bodyClicked() {
    // check if game is lost
    if ( isGameLost ) {
        // Reset game
        startGame();
    }
}


//// Setup listeners
for (let i = 0; i < buttons.length; i++) {
    $("#"+buttons[i]).on("click", function() {pressButton(i)});
}

$("h1").on("click", startGame);