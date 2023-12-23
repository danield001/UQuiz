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

//Handler for the submitChoice answer on quiz-page
const submitChoice = async (event) => {
    event.preventDefault();
//compare answer with the selected choice
//Make visible the answer
//disappear the submit button
//Make next question button appear/active
//post username_id to db for that question so it doesn't appear again.


};

document.querySelector('#submit-choice').addEventListener('click', submitChoice);
document.querySelector('#start-quiz').addEventListener('click', startQuiz);
document.querySelector('#next-question').addEventListener('click', nextQuestion);