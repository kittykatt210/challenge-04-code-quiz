// Get a handle on all html tags, objects, classes, and identifiers
var welcomeScreen = document.getElementById('welcome');
var timer = document.querySelector('.time');
var stButton = document.getElementById('begin');
var submitBtn = document.getElementById('submit');
var initialsInput = document.querySelector('#user-initials');
var beginQuiz = document.getElementById('quiz');
var scoreInfo = document.querySelector('#high-score');
var result = document.getElementById('result');
var gameOver = document.getElementById('game-over')
var questionEl = document.getElementById("question");
var answerBt = document.getElementById("answer-buttons");
var finScore = document.getElementById("final-score");
var playAgain = document.getElementById("play-again");
var restartBt = document.getElementById("restart");

var answers = true;
var score = 0;
var qIndex = 0;

// Create questions object
//  -- Contains the question and answers with correct answer identified
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

// Function for quiz
function startQuiz() {
    welcomeScreen.classList.add("hide");
    beginQuiz.classList.remove("hide");
    timer.classList.remove("hide");
    showQuestion();
    startTimer();
};

stButton.addEventListener("click", startQuiz);

// Function for displaying question
//  -- Display correct/incorrect
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
    }
    );
}

function reset() {
    while (answerBt.firstChild) {
        answerBt.removeChild(answerBt.firstChild);
    }
}

function nextQuestion() {
    qIndex++;
    if (qIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

answerBt.addEventListener("click", () => {
    if (qIndex < questions.length) {
        nextQuestion();
    }
    }
)

// Storing score and initials in local storage
function showScore() {
    
    var finalScore = Math.round((score/6)*100);
    beginQuiz.classList.add("hide");
    gameOver.classList.remove("hide");
    timer.classList.add("hide");

    finScore.innerHTML = "Your score is: " + finalScore;
    localStorage.setItem('high-score', finalScore);

    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();

        var ints = initialsInput.value;
        localStorage.setItem('user-initials', ints);
        gameOver.classList.add("hide");
        playAgain.classList.remove("hide");
        scoreInfo.innerHTML = localStorage.getItem('user-initials') + " - " + localStorage.getItem('high-score')

    });   
}

restartBt.addEventListener("click", function() {
    playAgain.classList.add("hide");
    welcomeScreen.classList.remove("hide");
    
    qIndex = 0;
    score = 0;
    secondsLeft = 60;
});

// Creating the timer for the quiz
var secondsLeft = 30;

function startTimer() {
  // Sets interval in variable
  var timeInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = 'Time: ' + secondsLeft;

    if(secondsLeft === 0 || qIndex === questions.length) {
        clearInterval(timeInterval);
        // alert("GAME OVER");
        reset();
        showScore();
    }
  }, 1000);
}


// Create game over tag
// High score with initials input




// Create a try again button/clear high score button



