console.log('script loaded')
const submitQuestion = async (event) => {
    event.preventDefault();

    const question_body = document.querySelector('#question').value;
    const choice_a = document.querySelector('#answer-a').value;
    const choice_b = document.querySelector('#answer-b').value;
    const choice_c = document.querySelector('#answer-c').value;
    const choice_d = document.querySelector('#answer-d').value;
    const category_id = document.querySelector('#category').value;
    //const answer_value = document.querySelector('#answer').value;


    if (question_body && choice_a && choice_b && choice_c && choice_d && category_id) {
        try {
            const response = await fetch('api/questions/questionSubmission', {
                method: 'POST',
                body: JSON.stringify({ question_body, choice_a, choice_b, choice_c, choice_d, category_id, answer }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                router.get('/', (req, res) => {
                    res.render('homepage')
                })
            } else {
                alert('Failed to Submit Question')
            }
        } catch (error) {
            console.error('Error during submission', error);
        }
    }
};

document.querySelector('#question-form').addEventListener('submit', submitQuestion);