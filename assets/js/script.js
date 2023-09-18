// Handle on Main Sections
var container = document.querySelector(".container");
var welcomeScreen = document.getElementById("welcome");
var beginQuiz = document.getElementById("quiz");
var gameOver = document.getElementById("game-over")
var playAgain = document.getElementById("play-again");

// Handle on Buttons
var stButton = document.getElementById("begin");
var submitBtn = document.getElementById("submit");
var answerBt = document.getElementById("answer-buttons");
var restartBt = document.getElementById("restart");

// Handle on other elements
var timer = document.querySelector(".time");
var initialsInput = document.querySelector("#user-initials");
var scoreInfo = document.querySelector("#high-score");
var result = document.getElementById("result");
var questionEl = document.getElementById("question");
var finScore = document.getElementById("final-score");

// Initializing Variables used in various calculations
var answers = true;
var score = 0;
var qIndex = 0;
var secondsLeft = 60;

// Questions Object
 var questions = [{
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "&ltscript&gt", isCorrect: true},
            { text: "&ltjs&gt", isCorrect: false},
            { text: "&ltscripting&gt", isCorrect: false},
            { text: "&ltjavascript&gt", isCorrect: false}
        ]
    },
    {
        question: "What is the correct JS syntax to change the content of the HTML element: &ltp id='demo'&gt This is a demonstration. &lt/p&gt",
        answers: [
            { text: 'document.getElementByName("p").innerHTML = "Hello World.";', isCorrect: false},
            { text: 'document.getElementById("demo").innerHTML = "Hello World.";', isCorrect: true},
            { text: 'document.getElement("p").innerHTML = "Hello World.";', isCorrect: false},
            { text: '#demo.innerHTML = "Hello World.";', isCorrect: false}
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: 'msgBox("Hello World");', isCorrect: false},
            { text: 'alertBox("Hello World");', isCorrect: false},
            { text: 'alert("Hello World");', isCorrect: true},
            { text: 'msg("Hello World");', isCorrect: false}
        ]
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: [
            { text: 'if i = 5', isCorrect: false},
            { text: 'if (i == 5)', isCorrect: true},
            { text: 'if i = 5 then', isCorrect: false},
            { text: 'if i == 5 then', isCorrect: false}
        ]
    },
    {
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        answers: [
            { text: 'if i =! 5 then', isCorrect: false},
            { text: 'if i &lt&gt 5', isCorrect: false},
            { text: 'if (i &lt&gt 5)', isCorrect: false},
            { text: 'if (i != 5)', isCorrect: true}
        ]
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            { text: 'Both the &lthead&gt section and the &ltbody&gt section are correct', isCorrect: true},
            { text: 'The &lthead&gt section', isCorrect: false},
            { text: 'The &ltbody&gt section',  isCorrect: false},
            { text: 'Neither the &lthead&gt section nor the &ltbody&gt section are correct', isCorrect: false}
        ]
    }];

// Function to run quiz
function startQuiz() {
    welcomeScreen.classList.add("hide");
    beginQuiz.classList.remove("hide");
    timer.classList.remove("hide");
    showQuestion();
    startTimer();
};
// Event listener to start quiz
stButton.addEventListener("click", startQuiz);

// Function for displaying question
function showQuestion() {  
    reset();
    var currQuest = questions[qIndex];
    questionEl.innerHTML = currQuest.question;
    
    currQuest.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerBt.appendChild(button);

        // Event listener for correct answer
        button.addEventListener("click", function(){
        var ansButton = answer.isCorrect;
            if (ansButton === true) {
                result.innerHTML = "Correct";
                score ++;
            }
            else {
                result.innerHTML = "Wrong";
                secondsLeft = secondsLeft - 10;
            }
                   
        });
        // Event listener to remove correct/incorrect display on screen
        container.addEventListener("mousemove", function(){
            result.innerHTML = '';
        })
    }
    );
    
}

// Function to reset answer buttons with new verbiage
function reset() {
    while (answerBt.firstChild) {
        answerBt.removeChild(answerBt.firstChild);
    }
}

// Function to increase question index to move to next question/answer set
function nextQuestion() {
    qIndex++;
    if (qIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

// Event listener to advance to the next question
answerBt.addEventListener("click", () => {
    if (qIndex < questions.length) {
        nextQuestion();
    }
    }
)

// Function to calculate/show final score and input initials
function showScore() {
    
    var finalScore = Math.round((score/6)*100);
    beginQuiz.classList.add("hide");
    gameOver.classList.remove("hide");
    timer.classList.add("hide");

    finScore.innerHTML = "Your score is: " + finalScore;
    localStorage.setItem("high-score", finalScore);

    // Event listener to store user initials and move to the final display page
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();

        var ints = initialsInput.value;
        localStorage.setItem("user-initials", ints);
        gameOver.classList.add("hide");
        playAgain.classList.remove("hide");
        scoreInfo.innerHTML = localStorage.getItem("user-initials") + " - " + localStorage.getItem("high-score")

    });   
}

// Event listener to restart the entire process, taking user back to welcome page
restartBt.addEventListener("click", function() {
    playAgain.classList.add("hide");
    welcomeScreen.classList.remove("hide");   
    qIndex = 0;
    score = 0;
    secondsLeft = 60;
});

// Function for the timer
function startTimer() {
  // Sets interval in variable
  var timeInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = "Time: " + secondsLeft;

    if(secondsLeft === 0 || qIndex === questions.length) {
        clearInterval(timeInterval);
        reset();
        showScore();
    }
  }, 1000);
}
