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
const pullQuizData = async(event) => {
    event.preventDefault();

    console.log('I can hear you');

    try {
        const response = await fetch(`/api/quiz/data/1`);
        console.log(response);

        if(!response.ok) {
            throw newError(`HTTP error. Status: ${response.status}`);
        }

        const quizData = await response.json();
        console.log(quizData, "quizData");


    } catch (error) {
        console.error('Error fetching question:', error);
    }
};

//Handler for the submitChoice answer on quiz-page


// document.querySelector('#submit-choice').addEventListener('click', submitChoice);
document.querySelector('#start-quiz').addEventListener('click', pullQuizData);
// document.querySelector('#next-question').addEventListener('click', nextQuestion);