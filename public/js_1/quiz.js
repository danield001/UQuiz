//Set variables to access sections
const quizHome = document.getElementById("quiz-home");
const quizQuestionSet = document.getElementById("quiz-question-set");
const gameOverScreen = document.getElementById("game-over-screen");
const scoreboardScreen = document.getElementById("scoreboard-screen");

//set variables to access buttons including choices buttons
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");
const returnHomeButton = document.getElementById("return-home");

//set original attributes of sections
gameOverScreen.setAttribute("style", "visibility: hidden");
quizQuestionSet.setAttribute("style", "visibility: hidden");
quizHome.setAttribute("style", "display: block");
scoreboardScreen.setAttribute("style", "visibility: hidden");

//Identify root element for rendering messages
const messageEl = document.getElementById("message-element");

//Identify root element for rendering table rows for score data
const scoreBoardEl = document.getElementById("score-board-element");

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
        // Get the current path from window.location.pathname
        const path = window.location.pathname;

        // Extract the id from the path (assuming the last segment is the id)
        const id = path.split('/').pop();

        const response = await fetch(`/api/quiz/data/${id}`);

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
        console.error('Error fetching quiz question:', error);
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

        gameOver();
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

        let clearMessage = () => {
            if (messageEl instanceof Element) {
              // If messageEl is a regular DOM element
              messageEl.innerHTML = '';
            } else if (messageEl instanceof jQuery) {
              // If messageEl is a jQuery object
              messageEl.empty();
            } else {
              console.error('Unsupported messageEl type:', messageEl);
            }
          };
        const myResponse = setTimeout(clearMessage, 5000); 

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

        let clearMessage = () => {
            if (messageEl instanceof Element) {
              // If messageEl is a regular DOM element
              messageEl.innerHTML = '';
            } else if (messageEl instanceof jQuery) {
              // If messageEl is a jQuery object
              messageEl.empty();
            } else {
              console.error('Unsupported messageEl type:', messageEl);
            }
          };

        const myResponse = setTimeout(clearMessage, 5000); 
    }
}

const gameOver = () => {
    quizQuestionSet.style.display = "none";
    gameOverScreen.style.visibility = "visible";

    let finalScore = document.getElementById("final-score");
    console.log(finalScore);
    finalScore.textContent = score;
}

let highScores = [];
let users = [];

const saveScoreButtonHandler = async (event) => {
    event.preventDefault();

    try {
        await saveScore();
        await getQuizScoreData();

        if(!scores) {
            console.log("no scores", scores);
        } else {
            console.log(scores);
        }

        highScores = scoreData.score;  
        users = scoreData.user_id.username;   

        scores.forEach(renderScore);
    
    } catch(error) {
    console.error('Error fetching quiz question:', error);
    };

    gameOverScreen.style.display = "none";
    scoreboardScreen.style.visibility = "visible";
}


const saveScore = async () => {
    // Get the current path from window.location.pathname
    const path = window.location.pathname;

    // Extract the id from the path (assuming the last segment is the id)
    const id = path.split('/').pop();
    const quiz_id = id;
    console.log(id)

    if ( quiz_id && score) {
        try {
            const response = await fetch(`/api/score`, {
            method: 'POST',
            body: JSON.stringify({ quiz_id, score }),
            headers: {
                'Content-Type': 'application/json',
            },
            });
        
            if (response.ok) {
            // document.location.replace('/quiz');
            // alert('Score saved');
            // } else {
            alert('Failed to save score');
            }
       } catch(error) {
        console.error('Error saving score:', error);
        alert('An error occurred while saving the score.');
       }

    } else {
        alert('Quiz ID and score must be provided.');
    }
}



const getQuizScoreData = async() => {
    
        try {
            // Get the current path from window.location.pathname
            const path = window.location.pathname;
    
            // Extract the id from the path (assuming the last segment is the id)
            const id = path.split('/').pop();
            
            const response = await fetch(`/api/score/quiz/${id}`);
    
            if(!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            }
    
            const scores = await response.json();

    
        } catch (error) {
            console.error('Error fetching question:', error);
        }
};

//render scores dynamically 
const renderScore = () => {

    const scoreRowEl = document.createElement("tr");
    const usernameEl = document.createElement("td");
    const highScoreEl = document.createElement("td");

    usernameEl.textContent=`username, ${username}`;
    highScoreEl.textContent=`highScore, ${highScore}`;

    usernameEl.append(highScoreEl);
    scoreRowEl.append(usernameEl);
    scoreBoardEl.append(scoreRowEl);

    var currentQuestion = questions[currentQuestionIndex];
    questionBody.textContent = currentQuestion.question_body;
    choiceA.textContent = currentQuestion.choice_a;
};


// document.querySelector('#submit-choice').addEventListener('click', submitChoice);
document.querySelector('#start-button').addEventListener('click', startButtonHandler);

//Handler for the next button on quiz-page
document.querySelector('#next-button').addEventListener('click', nextButtonHandler);

//Handler for the submitChoice answer on quiz-page
document.querySelector('#submit-button').addEventListener('click', submitButtonHandler);

//Handler for the saveScore button on quiz-page
document.querySelector('#save-score').addEventListener('click', saveScoreButtonHandler);