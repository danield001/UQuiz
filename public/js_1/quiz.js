//Set variables to access sections
const quizHome = document.getElementById("quiz-home");
const quizQuestionSet = document.getElementById("quiz-question-set");
const gameOverScreen = document.getElementById("game-over-screen");

//set variables to access buttons including choices buttons
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");

//set original attributes of sections
gameOverScreen.setAttribute("style", "visibility: hidden");
quizQuestionSet.setAttribute("style", "visibility: hidden");
quizHome.setAttribute("style", "display: block");

//Identify root element for rendering messages
const messageEl = document.getElementById("message-element");

//Identify positions for question data in quizQuestionSet section
const choiceA = document.getElementById("choice-a");
const choiceB = document.getElementById("choice-b");
const choiceC = document.getElementById("choice-c");
const choiceD = document.getElementById("choice-d");
const questionBody = document.getElementById("question-body");
const questionCreator = document.getElementById("question-creator");

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
    nextButton.style.visibility = "hidden";

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
    submitButton.style.visibility = 'visible';
    nextButton.style.visibility = 'hidden';

    while (messageEl.firstChild) {
        messageEl.removeChild(messageEl.firstChild);
    }

    $('input[type="radio"]').prop('checked', false);

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
    console.log(messageEl);
    submitButton.style.visibility = 'hidden';
    nextButton.style.visibility = 'visible';
    
    const guessEl = $('input:checked');
    const guess = guessEl.val();

    if(!$('input:checked')) {
        //Render message
        console.log('no input checked');
        const responseEl = $('<h2>');     
        responseEl.text("Please select a response to continue.");
        messageEl.append(responseEl);
    }

    if(guess === questions[currentQuestionIndex].answer) {
        score++;
        console.log(score);
        
        //Render message
        const responseEl = document.createElement("h2");     
        responseEl.textContent="CORRECT!";
        messageEl.append(responseEl);

        const myResponse = setTimeout(clearMessage, 5000); 
        let clearMessage = () => {
            messageEl.children().remove();
        };

    } else {
        submitButton.style.visibility = 'hidden';
        nextButton.style.visibility = 'visible';

        const answerTextEl = document.createElement("span");
        answerTextEl.setAttribute("id", "answer");
        answerTextEl.textContent = `The correct answer is: ${questions[currentQuestionIndex].answer}`;

        const responseEl = document.createElement("h2");
        responseEl.textContent = "WRONG!";

        responseEl.append(answerTextEl);
        messageEl.append(responseEl);

        const myResponse = setTimeout(clearMessage, 5000); 
        let clearMessage = () => {
            messageEl.children().remove();
        };

    }
}

const gameOver = () => {
    quizQuestionSet.style.display = "none";
    gameOverScreen.style.visibility = "visible";

    let finalScore = document.getElementById("final-score");
    finalScore.textContent = score;
}

// document.querySelector('#submit-choice').addEventListener('click', submitChoice);
document.querySelector('#start-button').addEventListener('click', startButtonHandler);

//Handler for the next button on quiz-page
document.querySelector('#next-button').addEventListener('click', nextButtonHandler);

//Handler for the submitChoice answer on quiz-page
document.querySelector('#submit-button').addEventListener('click', submitButtonHandler);