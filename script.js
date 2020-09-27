// var questions = [] array of objects
// object name {
//   title: "question name",
//   choices: ["choice1", "choice2", "choice3", etc],
//   answer: "correct answer"
// }

// question[0].title returns string "question name"

// quiz question: what does DOM stand for

// .innerHTML.textContent = question[i].title
// id.addEventListener().innerHTML.textContent = question[i].choices[i]
// event delegation --> if what you click on is a button, then do action
// each question is its own page
// score and timer on each page


// global variables
var currentQuestionIndex = 0;
var timerId;
var time = 60;
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("timer");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var scoreEl = document.getElementById("score");
var questionTitle = document.getElementById("question-title");
var feedbackEl = document.getElementById("feedback");

// functions

startBtn.onclick = startQuiz();

function startQuiz() {
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("style", "display: none");
  timerId = setInterval(clockTick(), 1000);
  timerEl.textContent = time;
  getQuestion();
}

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    // end quiz here;
  }
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";
  currentQuestion.choices.forEach(function(choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = questionClick();
    choicesEl.appendChild(choiceBtn);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time-= 5;
    if (time <= 0) {
      time = 0;
    }
    timerEl.textContent = time;
    feedbackEl.textContent = "I'm sorry, Dave, that was incorrect.";
  } else {
    feedbackEl.textContent = "correct";
  } 
  setTimeout(function() {
    feedbackEl.setAttribute("style", "display: none");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    // quiz end function
  } else {
    getQuestion();
  }
}

function endQuiz() {
  // clear interval of timerId
  // change display to none ("style", "display: none")
  // show div for high scores
  // hide other divs
  // call saveHighScores()
}

function saveHighScores() {
  // target input field
  // user types initials, store in variable
  // store that variable in local storage
  // compare high scores
  // print scores to page in order highest to lowest
}