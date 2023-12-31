

//Set variable to access button
const submitCategoryButton = document.getElementById("submit-category");

//Root element for rendering response
const messageEl = document.getElementById("message-element");

const categorychoice = document.getElementById("category-choice");

let categories = [];

let categoryQuestions = [];

const submitCategoryHandler = async (event) => {
    event.preventDefault();
    
    try { 
       
        await getCategoryData();

        console.log(categoryQuestions);



        // await createQuiz();

        // await displayMessage();

} catch (error) {
    console.error("error handling", error);
}
};

const getCategoryData = async () => {
  
    try {
      const searchTerm = categorychoice.value;
      console.log(searchTerm, "searchTerm");  

      const dbCategories = ["Entertainment", "Current Affairs", "Sport", "Movies", "Politics", "Music", "History", "Geography"]
      const index = dbCategories.indexOf(searchTerm);

      if (index !== -1) {
        console.log(`The index of ${searchTerm} is: ${index}`);
      } else {
        console.log(`${searchTerm} not found in the array`);
      }

      const id=(index+1)

      const response = await fetch(`/api/quiz/data/category/${id}`);  
  
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }
  
      const array = await response.json();

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap array[i] and array[j]
            [array[i], array[j]] = [array[j], array[i]];
        }
      };
      const  questions = await shuffleArray(array);
      //This section is not working prob because it is not a defined array? 
      const filteredQuestions = questions
      .filter(question => question.dataValues.category_id === id) 
      .slice(0, 5)
      .map(question => ({
        id: question.dataValues.id,
        category_id: question.dataValues.category_id,
        question_body: question.dataValues.question_body,
        created_by_user_id: question.dataValues.created_by_user_id,
  }));

console.log(filteredQuestions);
return filteredQuestions;
  
    } catch (error) {
      console.error('Error fetching category', error);
      return;
    }
  };

document.querySelector('#submit-category').addEventListener('click', submitCategoryHandler);
