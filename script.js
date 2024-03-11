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
];

let currentQuestion = 0;
let score = 0;

let timer; //
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

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
      seconds
    )}`;

    document.getElementById(
      "timer"
    ).textContent = `Time Left: ${formattedTime}`;

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

  updateQuestionIndicators();
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

// Add these functions to your script.js file

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
    updateQuestionIndicators();

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      disableNextButton();
    }
  } else {
    if (errorMessageElement) {
      errorMessageElement.textContent = "Please select an option";
    }
  }
}

function updateQuestionIndicators() {
  const quizProgress = document.getElementById("quiz-progress");
  quizProgress.innerHTML = ""; // Clear existing indicators

  quizData.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.className = "question-indicator";
    indicator.textContent = index + 1; // Display question number

    if (index < currentQuestion) {
      indicator.classList.add("attempted");
    }
    quizProgress.appendChild(indicator);

    // if (index < quizData.length - 1) {
    //   const spacing = document.createElement("div");
    //   spacing.className = "indicator-spacing";
    //   quizProgress.appendChild(spacing);
    // }
  });
}

function submitQuiz() {
  Swal.fire({
    title: "Are you sure you want to submit the test?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, submit it!",
    cancelButtonText: "No, cancel",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      showResult();
      stopCamera();
    }
  });
}

function showResult() {
  const quizContainer = document.getElementById("quiz-container");

  quizContainer.innerHTML =
    `<h2 style="color: green; margin-bottom:50px; margin-top:50px">Test submitted Successfully 🎉</h2>` +
    `<h3 style="color: blue;">Your Score is ${score} out of ${quizData.length}</h3>`;
  quizContainer.style.height = "50vh";
  quizContainer.style.width = "30rem";
}



let video = document.getElementById("videoElement");
let mediaStream;

// Promises are used in asynchronous programming to handle operations that may take some time to complete, such as fetching data from a server, reading a file, or, in this case, accessing user media through the getUserMedia function. Promises provide a way to work with asynchronous code in a more organized and readable manner.


// Asynchronous Nature of getUserMedia: The getUserMedia function is an asynchronous operation. It requests access to the user's camera, and this operation may take some time to complete. During this time, the rest of the JavaScript code can continue to execute.

// Non-Blocking Code Execution: Using promises allows you to write non-blocking code. The code structure with then and catch ensures that the program can continue executing other tasks while waiting for the getUserMedia operation to complete. This is important for providing a smooth user experience, especially in web applications.

if (navigator.mediaDevices.getUserMedia) {
  // The code you provided checks if the getUserMedia method is supported in the user's browser. If supported, it tries to access the user's camera using the navigator.mediaDevices.getUserMedia API.
  // This line checks if the getUserMedia method is available in the navigator.mediaDevices object. This method is commonly used for accessing user media devices, such as a camera or microphone.
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (stream) {
      // If getUserMedia is supported, the code calls it with the argument { video: true } to request access to the user's camera. The promise returned by getUserMedia is then handled using the .then method.
      video.srcObject = stream;
      mediaStream = stream; // Store the media stream
      // If the camera access is successful, the obtained video stream is assigned to the srcObject property of the HTML video element (video). This property is used to set or retrieve the media stream associated with the video element. Additionally, the mediaStream variable is assigned the reference to the obtained stream, allowing you to later manipulate or stop the stream.
      
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
} else {
  console.log("getUserMedia not supported on your browser!");
}

// In programming, synchronous operations follow a sequential order, while asynchronous operations allow the program to continue with other tasks while waiting for certain operations to complete.

function stopCamera() {
  if (mediaStream) {
    const tracks = mediaStream.getTracks();
    tracks.forEach((track) => track.stop());
  }
}

startTimer();
loadQuestion();
startCamera();
