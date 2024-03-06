const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Madrid", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars"
    },
    // Add more questions as needed
];



let currentQuestion = 0;
let score = 0;

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const currentQuizData = quizData[currentQuestion];

    questionElement.textContent = currentQuizData.question;
    optionsElement.innerHTML = '';

    currentQuizData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsElement.appendChild(optionElement);
    });
}

function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach((option, i) => {
        option.classList.remove('selected');
        if (i === index) {
            option.classList.add('selected');
        }
    });
}

// function nextQuestion() {
//     const selectedOption = document.querySelector('.option.selected');
//     if (selectedOption) {
//         const selectedAnswer = selectedOption.textContent;
//         const currentQuizData = quizData[currentQuestion];

//         if (selectedAnswer === currentQuizData.correctAnswer) {
//             score++;
//         }

//         currentQuestion++;

//         if (currentQuestion < quizData.length) {
//             loadQuestion();
//         } else {
//             showResult();
//         }
//     } else {
//         alert("Please select an option");
//     }
// }

// function showResult() {
//     const quizContainer = document.getElementById('quiz-container');
//     quizContainer.innerHTML = `<h2>Your Score: ${score} out of ${quizData.length}</h2>`;
// }

loadQuestion();