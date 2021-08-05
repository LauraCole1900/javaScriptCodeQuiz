// Global variables
var currentQuestionIndex = 0;
var timerId;
var time = 0;
var timerElement = document.getElementById("timer");
var startScreen = document.getElementById("start-screen");
var startBtn = document.getElementById("start");
var questionsElement = document.getElementById("questions");
var choicesElement = document.getElementById("choices");
var questionTitle = document.getElementById("question-title");
var feedbackElement = document.getElementById("feedback");
var scores = document.getElementById("scores-page");
var userScore;
var addInitials;
var userInitials = "";
var submitBtn;
var restartBtn;

// Questions
var questions = [
  {
    name: "question1",
    title: "What defines the initial, basic structure of a webpage?",
    choices: ["CSS", "JavaScript", "HTML", "C++"],
    answer: "HTML",
  },
  {
    name: "question2",
    title: "What does DOM stand for?",
    choices: ["Document Object Model", "Data Orientation Manager", "Danger Overload Method", "Dune Overthrown by Muad'Dib"],
    answer: "Document Object Model",
  },
  {
    name: "question3",
    title: "What is a variable name within a JavaScript object called?",
    choices: ["Function", "Key", "Method", "Limiter"],
    answer: "Key",
  },
  {
    name: "question4",
    title: "What does most of the styling on a webpage?",
    choices: ["HTML", "jQuery", "JavaScript", "CSS"],
    answer: "CSS",
  },
  {
    name: "question5",
    title: "What is a JavaScript method?",
    choices: ["A style of coding", "An approach to acting", "A function within an object", "A discrete bit of code that performs an action"],
    answer: "A function within an object",
  },
  {
    name: "question6",
    title: "What does it mean to 'call' a function?",
    choices: ["Use the word 'function'", "Define the action the function will take", "Give the function a name as part of its definition", "Activate the function by naming it outside of its definition"],
    answer: "Activate the function by naming it outside of its definition",
  },
  {
    name: "question7",
    title: "Which of the following all use curly brackets {} in JavaScript?",
    choices: ["Variables, arrays, functions", "If/else statements, variables, objects", "Arrays, if/else statements, objects", "Functions, objects, if/else statements"],
    answer: "Functions, objects, if/else statements",
  },
  {
    name: "question8",
    title: "Which of the following uses square brackets [] in JavaScript?",
    choices: ["Objects", "Arrays", "Functions", "Variables"],
    answer: "Arrays",
  },
  {
    name: "question9",
    title: "What is a 'child element'?",
    choices: ["An element that throws an error", "An element contained directly inside of its parent, with no other containing elements in between", "An element with the capacity to learn", "An element that breaks the code"],
    answer: "An element contained directly inside of its parent, with no other containing elements in between",
  },
  {
    name: "question10",
    title: "Which of the following are all examples of HTML tags?",
    choices: ["<p>, <div>, <main>, <header>", "<h1>, <ul>, <contain>, <hero>", "<img>, <start>, <switch>, <table>", "<engage>, <make-it-so>, <override>, <captain>"],
    answer: "<p>, <div>, <main>, <header>",
  }
];


// functions

// Starts the quiz
function startQuiz() {
  // Sets timer to 60 seconds
  time = 60;
  // Sets question index to 0
  currentQuestionIndex = 0;
  // Hides the landing page
  startScreen.setAttribute("style", "display: none");
  // Hides the scores page
  scores.setAttribute("style", "display: none");
  // Shows the first question
  questionsElement.setAttribute("style", "display: block");
  // Shows the timer
  timerElement.setAttribute("style", "display: inline-block");
  // Calls clockTick() and sets the timer interval to 1 second
  timerId = setInterval(function () {
    clockTick()
  }, 1000);
  // Sets the text of the timer to the time as time updates
  timerElement.textContent = time;
  getQuestion();
}

// Sets the timer to tick down
// Ends the quiz when time = 0
function clockTick() {
  time--;
  timerElement.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}


// Sets question information
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  // Sets the question text to the correct number + question text
  titleEl.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.title}`;
  // Sets the 'choices' element to an empty string so it can be filled by the current question's choices
  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach(function (choice, i) {
    // Creates a button element for each choice
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    // Sets text of choice to value attribute so it can be compared to correct answer
    choiceBtn.setAttribute("value", choice);
    // Sets the text of each button to the given choice
    choiceBtn.textContent = `${i + 1}. ${choice}`;
    // Appends the button to the HTML
    choicesElement.appendChild(choiceBtn);
    // Adds click listener to each button
    choiceBtn.addEventListener("click", questionClick);
  });
}


// Handles click on answer button
function questionClick() {
  // Compares selected button value to correct answer
  if (this.value !== questions[currentQuestionIndex].answer) {
    // If they don't match, deduct 5 seconds
    time -= 5;
    // If that reduces time to 0 or less, set timer to 0 and end quiz
    if (time <= 0) {
      time = 0;
      endQuiz();
    }
    // Sets timer text to current time
    timerElement.textContent = time;
    // Shows feedback element for incorrect answer
    feedbackElement.setAttribute("style", "display: block");
    feedbackElement.textContent = "I'm sorry, Dave, I'm afraid that was incorrect.";
    feedbackElement.style.fontFamily = "'Questrial',sans-serif";
  } else {
    // If selected button value matches correct answer, shows feedback element for correct answer
    feedbackElement.setAttribute("style", "display: block");
    feedbackElement.textContent = "You have chosen ... wisely.";
    feedbackElement.style.fontFamily = "'Grenze Gotisch', cursive;";
  }
  // Sets feedback element to show for 2 seconds
  setTimeout(function () {
    feedbackElement.setAttribute("style", "display: none");
  }, 2000);
  // Advances to next question index
  currentQuestionIndex++;
  // Checks if quiz has reached the end of the questions array
  if (currentQuestionIndex === questions.length) {
    // If so, ends quiz
    endQuiz();
  } else {
    // If not, calls next question
    getQuestion();
  }
}


// Ends quiz
function endQuiz() {
  // Stops the timer
  clearInterval(timerId);
  // Hides questions element
  questionsElement.setAttribute("style", "display: none");
  // Shows scores element
  scores.setAttribute("style", "display: block");

  addUser();
}

// Creates user info input form
function addUser() {
  // Creates elements
  userScore = document.createElement("p");
  addInitials = document.createElement("p");
  userInitials = document.createElement("input");
  submitBtn = document.createElement("button");
  // Sets text and attributes of elements
  userScore.textContent = `Congratulations! You have scored ${time}!`;
  addInitials.textContent = "Add your initials here:";
  userInitials.setAttribute("name", "initials");
  userInitials.setAttribute("placeholder", "Type initials here");
  submitBtn.textContent = "Submit";
  submitBtn.setAttribute("class", "choice");
  submitBtn.setAttribute("id", "submit");
  // Appends elements
  scores.appendChild(userScore);
  scores.appendChild(addInitials);
  scores.appendChild(userInitials);
  scores.appendChild(submitBtn);
  // Adds event listener to submit button
  submitBtn.addEventListener("click", enterInit);
}


// Handles input & submit of initials and score
function enterInit() {
  // Checks whether user has entered initials
  if (userInitials.value.length < 2) {
    // If not, prompts user to add initials
    addInitials.textContent = "Please add your initials!";
  } else {
    // If so, saves the score
    saveScore();
  }
}

// Saves scores in local storage
function saveScore() {
  var scoresArr = [];
  // Creates object of user initials & score
  var playerInfo = {
    playerInit: userInitials.value,
    score: time
  }
  // Gets existing scores from local storage
  var scoresData = localStorage.getItem("playerInfo");
  // Parses existing scores into an array
  scoresArr = [JSON.parse(scoresData)];
  // Checks whether there are existing scores
  if (scoresArr[0] !== null) {
    // If so, adds new score to array
    scoresArr = [...scoresArr[0], playerInfo];
    // Sorts array by scores, descending
    var sortScores = scoresArr.sort((a, b) => (a.score < b.score) ? 1 : -1)
    // Sets sorted user information in local storage
    localStorage.setItem("playerInfo", JSON.stringify(sortScores));
  } else {
    // If not, sets user information in local storage
    localStorage.setItem("playerInfo", JSON.stringify([playerInfo]));
  }
  // Hides user info input form
  userScore.setAttribute("style", "display: none");
  addInitials.setAttribute("style", "display: none");
  userInitials.setAttribute("style", "display: none");
  submitBtn.setAttribute("style", "display: none");

  displayScores();
}


// Renders initials and scores from local storage to the page
function displayScores() {
  // Targets divs with class "score"
  var scoresParent = document.getElementById("scores-page");
  var scoresChild = document.getElementsByClassName("score");
  // Checks whether divs with class "score" exist
  if (scoresChild.length > 0) {
    // If yes, deletes them
    scoresParent.removeChild(scoresChild);
  }
  // Gets scores array from local storage
  var playerData = localStorage.getItem("playerInfo");
  // Parses scores data
  var playerInfo = JSON.parse(playerData);
  // For each score item
  playerInfo.forEach((info, index) => {
    // Creates div in which to render information
    var userInfo = document.createElement("div");
    // Sets class of "score"
    userInfo.setAttribute("class", "score");
    // Sets text content to player data
    userInfo.textContent = (`${index + 1}. ${info.playerInit}, ${info.score}`);
    // Appends div to page
    scores.appendChild(userInfo);
  })

  restart();
}


// Creates "Try Again" button and creates click listener with action startQuiz() on it
function restart() {
  restartBtn = document.createElement("button");
  restartBtn.textContent = "Try again?";
  restartBtn.setAttribute("class", "choice");
  restartBtn.setAttribute("id", "restart");
  scores.appendChild(restartBtn);
  restartBtn.addEventListener("click", function () {
    restartBtn.setAttribute("style", "display: none");
    startQuiz();
  });
}


// Hides timer
timerElement.setAttribute("style", "display: none");

// Hides scores
scores.setAttribute("style", "display: none");

// Adds click listener to start button and sets startQuiz() as its action
start.addEventListener("click", startQuiz);