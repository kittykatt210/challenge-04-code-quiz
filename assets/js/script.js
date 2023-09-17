// Get a handle on all html tags, objects, classes, and identifiers
// console.log everything to ensure it works
var welcomeScreen = document.querySelector('.welcome');
var timer = document.querySelector('.time');
var stButton = document.getElementById('begin');

// Create questions object
//  -- Contains the question and correct answer
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
var questionEl = document.getElementById("question");
var answerBt = document.getElementById("answer-buttons");
var answers = true;

var score = 0;
var qIndex = 0;

// Function for quiz

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
                alert("You are Correct!");
                score ++;
            }
            else {
                alert("You are Incorrect!");
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
})

function showScore() {
    var finalScore = Math.round((score/6)*100);

    alert("Your final score is " + finalScore + "%.");
}


showQuestion();

// Save score to local storage
//  -- Calculate score
// Create a timer -- 10 seconds per question
//  -- Remove 5 seconds for incorrect answers

// Create game over tag
// High score with initials input




// Create a try again button/clear high score button



