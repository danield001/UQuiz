//Set variables to access sections
const quizHome = document.getElementById("quiz-home");
const quizQuestionSet = document.getElementById("quiz-question-set");
const gameOverScreen = document.getElementById("game-over-screen");

//set variables to access buttons including choices buttons
const startButton = document.getElementById("start-button");
const choices = document.querySelector("#choice-list");

//set original attributes of sections
gameOverScreen.setAttribute("style", "visibility: hidden;");
quizQuestionSet.setAttribute("style", "visibility: hidden;");
quizHome.setAttribute("style", "display: flex");

//Identify positions for question data in quizQuestionSet section
const choiceA = document.getElementById("choice-a");
const choiceB = document.getElementById("choice-b");
const choiceC = document.getElementById("choice-c");
const choiceD = document.getElementById("choice-d");
const questionBody = document.getElementById("question-body");
const questionCreator = document.getElementById("question-creator");
const answerTextEl = document.getElementById("check-answer");

//handler to dynamically render the pulled database information on the page. 
const getQuizData = async(event) => {
    event.preventDefault();

    console.log('I can hear you');

    try {
        const response = await fetch(`/api/quiz/data/${id}`);
        console.log(response);

        if(!response.ok) {
            throw newError(`HTTP error. Status: ${response.status}`);
        }

        const quizData = await response.json();
        console.log(quizData);
        const questions = quizData.questions;
        console.log(questions);
        return questions;

    } catch (error) {
        console.error('Error fetching question:', error);
    }
};

//current question array to link when rendering text
let currentQuestionIndex = 0;

//event listener to activate function on startBtn WORKS!
startButton.addEventListener("click", function (event) {
    event.preventDefault();
    startButton.disabled = true;
    quizHome.style.display = "none";
    quizQuestionSet.style.visibility = "visible";
    
    renderQuestion();
  });

//render questions dynamically 
const renderQuestion = (questions) => {
    const cardEl = document.createElement('div');
    const cardLabelEl = document.createElement('label');
    const cardInputEl = document.createElement('input');
    const cardSpanEl = document.createElement('span');

    cardEl.setAttribute('style', 'card-body');
    cardEl.setAttribute('style', 'box');
    cardLabelEl.setAttribute('style', 'radio');
    cardInputEl.setAttribute('type', 'radio');
    cardInputEl.setAttribute('name', 'answer');
    cardSpanEl.setAttribute('id', 'choice-a');
    // cardSpanEl.innerHTML = questions.id;
    // cardSpanEl.innerText = question;

    cardEl.appendChild(cardLabelEl);
    cardEl.appendChild(cardInputEl);
    cardEl.appendChild(cardSpanEl);
    quizQuestionSet.appendChild(cardEl);

    var currentQuestion = questions[currentQuestionIndex];
    questionBody.textContent = currentQuestion.question_body;
    choiceA.textContent = currentQuestion.choice_a;
    choiceB.textContent = currentQuestion.choice_b;
    choiceC.textContent = currentQuestion.choice_c;
    choiceD.textContent = currentQuestion.choice_d;

};

const buttonHandler = (questions) =>
        getQuizData().then((response) => response.forEach((questions) => renderQuestion(questions)));

// document.querySelector('#submit-choice').addEventListener('click', submitChoice);
document.querySelector('#start-button').addEventListener('click', getQuizData);

//Handler for the submitChoice answer on quiz-page



// document.querySelector('#next-question').addEventListener('click', nextQuestion);