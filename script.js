const allQuestions = [
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Central Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Cascading Simple Sheets", correct: false },
      { text: "Cars SUVs Sailboats", correct: false },
    ],
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hypertext Markup Language", correct: true },
      { text: "Hyperloop Machine Language", correct: false },
      { text: "Helicopters Terminals Motorboats Lambos", correct: false },
      { text: "Hyper Trainer Markup Language", correct: false },
    ],
  },
  {
    question: "What year was JavaScript launched?",
    answers: [
      { text: "1996", correct: false },
      { text: "1995", correct: true },
      { text: "1994", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Netscape", correct: true },
      { text: "Microsoft", correct: false },
      { text: "Google", correct: false },
      { text: "Apple", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to link JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<script>", correct: true },
      { text: "<javascript>", correct: false },
      { text: "<link>", correct: false },
    ],
  },
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

const setupBox = document.getElementById("setup");
const questionCountInput = document.getElementById("question-count");
const startBtn = document.getElementById("start-btn");
const quizBox = document.getElementById("quiz-box");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

startBtn.addEventListener("click", () => {
  const numQuestions = parseInt(questionCountInput.value);

  if (
    isNaN(numQuestions) ||
    numQuestions < 1 ||
    numQuestions > allQuestions.length
  ) {
    alert(`Please enter a number between 1 and ${allQuestions.length}`);
    return;
  }

  selectedQuestions = shuffleArray(allQuestions).slice(0, numQuestions);
  setupBox.style.display = "none";
  quizBox.style.display = "block";
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
});

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function showQuestion() {
  resetState();
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
  });

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < selectedQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerText = `You scored ${score} out of ${selectedQuestions.length}!`;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "inline-block";
  nextButton.onclick = () => {
    location.reload(); // restart the whole quiz
  };
}