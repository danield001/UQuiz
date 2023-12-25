//Set variables to access sections
const quizHome = document.getElementById("quiz-home");
const quizQuestionSet = document.getElementById("quiz-question-set");
const gameOverScreen = document.getElementById("game-over-screen");

//set variables to access buttons including choices buttons
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");

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

const radioValA = document.getElementById("radio-value-a");
const radioValB = document.getElementById("radio-value-b");
const radioValC = document.getElementById("radio-value-c");
const radioValD = document.getElementById("radio-value-d");

let questions = [];
//handler to dynamically render the pulled database information on the page. 
const getQuizData = async(event) => {
    if(event) {
        event.preventDefault();
    }

    console.log('I can hear you');

    try {
        const response = await fetch(`/api/quiz/data/1`);

        if(!response.ok) {
            throw new Error(`HTTP error. Status: ${response.status}`);
        }

        const quizData = await response.json();
        questions = quizData.questions;        

    } catch (error) {
        console.error('Error fetching question:', error);
    }
};



//current question array to link when rendering text
let currentQuestionIndex = 0;

const startButtonHandler = async (event) => {
    event.preventDefault();

    startButton.disabled = true;
    quizHome.style.display = "none";
    quizQuestionSet.style.visibility = "visible";

    try {
        await getQuizData();
        if(!questions) {
            console.log("no questions", questions);
        } else {
            console.log(questions);
        }
        
        questions.forEach(renderQuestion);

    } catch(error) {
        console.error('Error fetching question:', error);
    }
};
    

//render questions dynamically 
const renderQuestion = () => {

    var currentQuestion = questions[currentQuestionIndex];
    questionBody.textContent = currentQuestion.question_body;
    choiceA.textContent = currentQuestion.choice_a;
    choiceB.textContent = currentQuestion.choice_b;
    choiceC.textContent = currentQuestion.choice_c;
    choiceD.textContent = currentQuestion.choice_d;

    radioValA.setAttribute("value", `${currentQuestion.choice_a}`);
    radioValB.setAttribute("value", `${currentQuestion.choice_b}`);
    radioValC.setAttribute("value", `${currentQuestion.choice_c}`);
    radioValD.setAttribute("value", `${currentQuestion.choice_d}`);
};

const nextButtonHandler = (event) => {
    event.preventDefault();

    currentQuestionIndex ++;

    if(currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        currentQuestionIndex = 0;
        nextButton.disabled = true;
        quizHome.style.display = "none";
        quizQuestionSet.style.display = "none";
        gameOverScreen.style.visibility = "visible";
    }
}

//create variable to hold score
let score = 0;

//add event listener to submit choice
const submitButtonHandler = (event) => {

    event.preventDefault();

    const guess = event.target.checked



}

// document.querySelector('#submit-choice').addEventListener('click', submitChoice);
document.querySelector('#start-button').addEventListener('click', startButtonHandler);

//Handler for the next button on quiz-page
document.querySelector('#next-button').addEventListener('click', nextButtonHandler);

//Handler for the submitChoice answer on quiz-page
document.querySelector('#submit-button').addEventListener('click', submitButtonHandler);