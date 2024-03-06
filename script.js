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
let score = 0;

let timer;
let timeLeft = 60;

function startTimer() {
  let startTime;

  function updateTimer(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsedMilliseconds = timestamp - startTime;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const remainingSeconds = Math.max(0, timeLeft - elapsedSeconds);

    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

    document.getElementById("timer").textContent = `Time Left: ${formattedTime}`;

    if (remainingSeconds === 0) {
      showResult();
    } else {
      requestAnimationFrame(updateTimer);
    }
  }

  requestAnimationFrame(updateTimer);
}

function padZero(value) {
  return value < 10 ? `0${value}` : value;
}

function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");

  const currentQuizData = quizData[currentQuestion];

  questionElement.textContent = currentQuizData.question;
  optionsElement.innerHTML = "";

  currentQuizData.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = "option";
    optionElement.textContent = option;

    optionElement.onclick = () => selectOption(index);

    optionsElement.appendChild(optionElement);
  });
}

function selectOption(index) {
  const options = document.querySelectorAll(".option");
  const errorMessageElement = document.getElementById("error-message");

  options.forEach((option, i) => {
    option.classList.remove("selected");

    if (i === index) {
      option.classList.add("selected");

      if (errorMessageElement) {
        errorMessageElement.textContent = "";
      }
    }
  });
}

function nextQuestion() {
  const selectedOption = document.querySelector(".option.selected");
  const errorMessageElement = document.getElementById("error-message");

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
    if (errorMessageElement) {
      errorMessageElement.textContent = "Please select an option";
    }
  }
}

function showResult() {
  const quizContainer = document.getElementById("quiz-container");

  quizContainer.innerHTML =
    `<h2 style="color: green; margin-bottom:50px">Test submitted Successfully</h2>` +
    `<h3 style="color: blue;">Your Score is ${score} out of ${quizData.length}</h3>`;
}

let videoElement;
let canvas;

function startCamera() {
  videoElement = document.getElementById('cameraFeed');
  canvas = document.getElementById('canvas');
  const constraints = { video: { facingMode: 'user' } };

  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      videoElement.srcObject = stream;
      videoElement.style.display = 'block';

      const context = canvas.getContext('2d');

      function drawFrame() {
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawFrame);
      }
      

      drawFrame();
    })
    .catch((error) => {
      console.error('Error accessing camera:', error);
    });
}

startTimer();
loadQuestion();
startCamera();
