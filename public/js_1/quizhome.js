

//Set variable to access button
const submitCategoryButton = document.getElementById("submit-category");

//Root element for rendering response
const messageEl = document.getElementById("message-element");

const categoryChoice = document.getElementById("category-choice");

//Root element for rendering pre-made quizzes
const quizListEl = document.getElementById("quiz-list");

let dbQuizzes= [];

window.onload = async (event) => {
  event.preventDefault();

  const quizData = await getQuizList();

  renderQuizList(quizData);

}

const getQuizList = async () => {
  try {
    
    const response = await fetch(`/api/quiz/data`);

    if(!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
    }
    const quizData = await response.json();
    return quizData;
     

  } catch (error) {
      console.error('Error fetching all quizzes', error);
      return null;
  }
};
const renderQuizList = (quizData) => {
  // Clear dynamically made elements
  while (quizListEl.firstChild) {
    quizListEl.removeChild(quizListEl.firstChild);
  };

  const renderItem = (quiz) => {
    let quizButton = document.createElement('button');
    let link = document.createElement('a');
    quizButton.setAttribute('type', 'button');
    quizButton.setAttribute('class', 'button');
    quizButton.setAttribute('style', 'background-color: #D40000; color: #FFDF00');
    quizButton.setAttribute('class', 'is-responsive');
    link.setAttribute('href', `/quiz/${quiz.id}`);
    link.innerHTML = quiz.id;
    quizButton.classList.add('button', 'is-large', 'is-responsive');
    quizButton.innerHTML = `Quiz ${quiz.id} \n made by User ${quiz.user_id}.` ;    
    quizListEl.append(quizButton);
  }

  quizData.forEach(renderItem);
};


let categories = [];

let categoryQuestions = [];

const submitCategoryHandler = async (event) => {
    event.preventDefault();
    
    try { 
        fiveQuestionArray = await getCategoryData();

        console.log(fiveQuestionArray);



        // await createQuiz();

        // await displayMessage();

} catch (error) {
    console.error("error handling", error);
}
};


const getCategoryData = async () => {
    try {
      // const searchId = categorychoice.value;
      // console.log(searchId, "searchId");  
      console.log(categoryChoice, "categoryChoice");
      console.log(categoryChoice.value);
      const result = await categoryChoice.value;
      var id = categoryChoice.options[categoryChoice.selectedIndex].value;
      console.log(id, "id");

      // const dbCategories = ["Entertainment", "Current Affairs", "Sport", "Movies", "Politics", "Music", "History", "Geography"]
      // const index = dbCategories.indexOf(searchTerm);

      // if (index !== -1) {
      //   console.log(`The index of ${searchTerm} is: ${index}`);
      // } else {
      //   console.log(`${searchTerm} not found in the array`);
      // }

      // const id=(index+1)

      const response = await fetch(`/api/quiz/data/category/${id}`);  
  
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }
  
      const fiveQuestionArray = await response.json();
      console.log(fiveQuestionArray);
            return fiveQuestionArray;

  } catch (error) {
      console.error('Error fetching category', error);

  };
};

const comingSoon = (event) => {
  event.preventDefault();
  alert('Category search functionality coming soon! \n Enjoy our premade quizzes!');
}
document.querySelector('#submit-category').addEventListener('click', comingSoon);
