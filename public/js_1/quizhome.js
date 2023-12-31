//Set variable to access button
const submitCategoryButton = document.getElementById("submit-category");

//Root element for rendering response
const messageEl = document.getElementById("message-element");

const categorychoice = document.getElementById("category-choice");
//add event listener to sibmit category choice
const submitCategoryHandler = async () => {
    try { 
       
        await getCategoryData();
        await createQuiz();
        await displayMessage();

} catch (error) {
    console.error("error handling", error);
}
};

const getCategoryData = async (event) => {
    event.preventDefault();
  
    try {
      console.log("getCategoryData function begins");
      let category = categorychoice.value();
      console.log(category, "category");  // Corrected this line
  
      const response = await fetch(`/api/question/${category}`);  // Corrected the URL
  
      if (!response.ok) {
        throw new Error(`HTTP error. Status: ${response.status}`);
      }
  
      const categoryData = await response.json();
      console.log(categoryData, "categoryData");
      // Assuming categories is a global variable, you can update it like this
      categories = categoryData.categories;
  
    } catch (error) {
      console.error('Error fetching category', error);
    }
  };

document.querySelector('#submit-category').addEventListener('click', submitCategoryHandler);
