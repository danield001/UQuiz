const startQuiz = async (event) => {
    event.preventDefault();

    let id = 1;

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



document.querySelector('#start-quiz').addEventListener('click', startQuiz);
document.querySelector('#next-question').addEventListener('click', nextQuestion);