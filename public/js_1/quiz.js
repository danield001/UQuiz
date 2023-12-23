const startQuiz = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch(`/api/question/${id}`);
        const question = await response.json();

        console.log(question);
    } catch (error) {
        console.error('Error Initialising Quiz');
    }
};

const nextQuestion = async (event) => {
    event.preventDefault();

    let id = 1; // Initialize id

    try {
        const response = await fetch(`/api/question/${id}`); // Assuming your endpoint is '/api/question/:id'
        const question = await response.json();

        console.log(question); // Do something with the question, e.g., display it on the UI

        id++; // Increment id for the next question
    } catch (error) {
        console.error('Error fetching question:', error);
    }
};

//handler to dynamically render the pulled database information on the page. 
const questionEl = document.getElementById('questions');

const getQuizData = async(event) => {
    event.preventDefault();

    console.log('I can hear you');

    try {
        const response = await fetch(`/api/quiz/data/1`);
        console.log(response);

        if(!response.ok) {
            throw newError(`HTTP error. Status: ${response.status}`);
        }

        const quizData = await response.json();

        const questions = quizData.questions;
        console.log(questions);
        return questions;

    } catch (error) {
        console.error('Error fetching question:', error);
    }
};

const renderQuestion = (questions) => {
    const cardEl = document.createElement('div');
    const cardLabelEl = document.createElement('label');
    const cardInputEl = document.createElement('input');
    const cardSpanEl = document.createElement('span');

    cardEl.classList('card-body', 'box');
    cardLabelEl.classList.add('radio');
    cardInputEl.setAttribute('type', 'radio');
    cardInputEl.setAttribute('name', 'answer');
    cardSpanEl.setAttribute('id', 'choice-a');
    cardSpanEl.innerHTML = questions.id;
    cardSpanEl.innerText = question;

    cardEl.appendChild(cardLabelEl);
    cardEl.appendChild(cardInputEl);
    cardEl.appendChild(cardSpanEl);
    questionEl.appendChild(cardEl);
};

const buttonHandler = () =>
        getQuizData().then((response) => response.forEach((question) => renderQuestion(question)));

// document.querySelector('#submit-choice').addEventListener('click', submitChoice);
document.querySelector('#start-quiz').addEventListener('click', getQuizData);

//Handler for the submitChoice answer on quiz-page



// document.querySelector('#next-question').addEventListener('click', nextQuestion);