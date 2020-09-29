// question[0].title returns string "question name"

// .innerHTML.textContent = question[i].title
// id.addEventListener().innerHTML.textContent = question[i].choices[i]
// event delegation --> if what you click on is a button, then do action
// each question is its own page
// score and timer on each page


// global variables
var currentQuestionIndex = 0;
var timerId;
var time = 60;
var timerElement = document.getElementById("timer");
var questionsElement = document.getElementById("questions");
var choicesElement = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsElement = document.getElementById("initials");
var questionTitle = document.getElementById("question-title");
var startScreen = document.getElementById("start-screen");
var feedbackElement = document.getElementById("feedback");
var highScores = document.getElementById("high-scores");

// question objects
var question1 = {
  title: "What defines the initial, basic structure of a webpage?",
  choices: ["CSS", "JavaScript", "HTML", "C++"],
  answer: "HTML",
}

var question2 = {
  title: "What does DOM stand for?",
  choices: ["Document Object Model", "Data Orientation Manager", "Danger Overload Method", "Dune Overthrown by Muad'Dib"],
  answer: "Document Object Model",
}

var question3 = {
  title: "What is a variable name within a JavaScript object called?",
  choices: ["Function", "Key", "Method", "Limiter"],
  answer: "Key",
}

var question4 = {
  title: "What does most of the styling on a webpage?",
  choices: ["HTML", "jQuery", "JavaScript", "CSS"],
  answer: "CSS",
}

var question5 = {
  title: "What is a JavaScript method?",
  choices: ["A style of coding", "An approach to acting", "A function within an object", "A discrete bit of code that performs an action"],
  answer: "A function within an object",
}

var question6 = {
  title: "What does it mean to 'call' a function?",
  choices: ["Use the word 'function'", "Define the action the function will take", "Give the function a name as part of its definition", "Activate the function by naming it outside of its definition"],
  answer: "Activate the function by naming it outside of its definition",
}

var question7 = {
  title: "Which of the following all use curly brackets {} in JavaScript?",
  choices: ["Variables, arrays, functions", "If/else statements, variables, objects", "Arrays, if/else statements, objects", "Functions, objects, if/else statements"],
  answer: "Functions, objects, if/else statements",
}

var question8 = {
  title: "Which of the following uses square brackets [] in JavaScript?",
  choices: ["Objects", "Arrays", "Functions", "Variables"],
  answer: "Arrays",
}

var question9 = {
  title: "What is a 'child element'?",
  choices: ["An element that throws an error", "An element contained directly inside of its parent, with no other containing elements in between", "An element with the capacity to learn", "An element that breaks the code"],
  answer: "An element contained directly inside of its parent, with no other containing elements in between",
}

var question10 = {
  title: "Which of the following are all examples of HTML tags?",
  choices: ["<p>, <div>, <main>, <header>", "<h1>, <ul>, <contain>, <hero>", "<img>, <start>, <switch>, <table>", "<engage>, <make-it-so>, <override>, <captain>"],
  answer: "<p>, <div>, <main>, <header>",
}

// questions array
var questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];


// functions

// user clicks start button to call this function
// it needs to:
// hide the landing page
// set timer to 60 seconds?
// call clockTick()
// call getQuestion()
function startQuiz() {
  var startScreen = document.getElementById("start-screen");
  startScreen.setAttribute("style", "display: none");
  timerId = setInterval(function () {
    clockTick()
  }, 1000);
  timerElement.textContent = time;
  getQuestion();
}

// tick down every 1 seconds
// show updated time
function clockTick() {
  time--;
  timerElement.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

// show question
// show answer choices as clickable buttons
// advance to next question when user selects an answer
// call questionClick()
// when when currentQuestion = currentQuestionIndex.length OR timer reaches 0, endQuiz()
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestionIndex + 1 + ". " + currentQuestion.title;
  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.addEventListener("click", questionClick);
    choicesElement.appendChild(choiceBtn);
  });
}

// when user clicks on an answer choice
// compares choice to questions[currentQuestionIndex].answer
// if no match, subtract 5 sec from clock AND
// show "incorrect" feedback for 2 sec
// if yes match
// show "correct" feedback for 2 sec
// advance to next question
// if out of questions, end quiz, OTHERWISE
// call getQuestion()
function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 5;
    if (time <= 0) {
      time = 0;
      endQuiz();
    }
    timerElement.textContent = time;
    feedbackElement.textContent = "I'm sorry, Dave, I'm afraid that was incorrect.";
    feedbackElement.style.fontFamily = "'Questrial',sans-serif";
  } else {
    feedbackElement.textContent = "You have chosen ... wisely.";
    feedbackElement.style.fontFamily = "'Grenze Gotisch', cursive;";
  }
  setTimeout(function () {
    feedbackElement.setAttribute("style", "display: none");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

// stop the timer
// change display to none
// show div for high scores
// hide other divs
// call saveHighScores()
function endQuiz() {
  clearInterval(timerId);
  questionsElement.setAttribute("style", "display: none");
  var hScores = document.createElement("h2");
  hScores.textContent = "High Scores";
  highScores.appendChild(hScores);
}

// target input field
// user types initials, store in variable
// store that variable in local storage
// compare high scores
// print scores to page in order highest to lowest
function saveHighScores() {
  var playerInitials = "";

}


// start quiz
start.addEventListener("click", startQuiz);