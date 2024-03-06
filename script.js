const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Venus", "Jupiter"],
    correctAnswer: "Mars",
  },
  // Add more questions as needed
];

let currentQuestion = 0;
// this is the current question number, if i removed this I wont see questions on the page because the loadQuestion function will not be able to access the currentQuestion variable

let score = 0;

function loadQuestion() {
  // Get the HTML elements for the question and options
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  // Get the current question data from the quizData array based on the current question index
  const currentQuizData = quizData[currentQuestion];

  // Set the text content of the question element to the current question's text
  // currentQuizData.question is accessing the question property of the currentQuizData object.
  questionElement.textContent = currentQuizData.question;

  // Clear the HTML content of the options element
  optionsElement.innerHTML = "";
  // this is to clear the options from the previous question

  // Iterate through the options of the current question
  // The options are dynamically created for each question because the set of options varies for different questions. In a quiz application, questions may have different sets of possible answers, and this dynamic creation of options allows the app to adapt to those variations.

  currentQuizData.options.forEach((option, index) => {
    // Create a new <div> element for each option
    const optionElement = document.createElement("div");

    // Set the class name of the option element to 'option'
    optionElement.className = "option";

    // Set the text content of the option element to the current option's text
    optionElement.textContent = option;
    // here option is parameter of the forEach method, it is the current option in the iteration

    // Attach an 'onclick' event listener to the option element, calling the 'selectOption' function with the current index
    optionElement.onclick = () => selectOption(index);

    // Append the option element to the options container
    optionsElement.appendChild(optionElement);
    // it appends the all the options to the options container, as it is iterating through the options at the last it will display all the options
  });
}

function selectOption(index) {
  // index is the parameter of the selectOption function
  const options = document.querySelectorAll(".option");
  // it selects all the options
  options.forEach((option, i) => {
    // it iterates through all the options
    option.classList.remove("selected");
    // This line removes the 'selected' class from each option. This is done for all options to ensure that only the currently selected option will have the 'selected' class.

    // Exactly. When a user clicks on an option, the selectOption function is triggered, and within that function, the selected class is added to the clicked option.

    // classList is a property of the Element interface in the Document Object Model (DOM). It represents the classes of an HTML element and provides methods to manipulate them.

    // The classList property is useful for working with the classes of an HTML element, allowing you to easily add, remove, toggle, or check for the presence of specific classes.

    if (i === index) {
      option.classList.add("selected");
    }
  });
}

function nextQuestion() {
    const selectedOption = document.querySelector('.option.selected');
    if (selectedOption) {
        const selectedAnswer = selectedOption.textContent;
        const currentQuizData = quizData[currentQuestion];

        if (selectedAnswer === currentQuizData.correctAnswer) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    } else {
        alert("Please select an option");
    }
}

function showResult() {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `<h2>Your Score is ${score} out of ${quizData.length}</h2>`;
}

loadQuestion();
// this is to load the first question when the page is loaded
