// The quiz data in JSON format
const quizData = [
    {
      "question": "1. Which one of these offers a model currently NOT supported by Snowflake?",
      "answer_choices": [
        "Bloom",
        "Anthropic",
        "OpenAI",
        "Voyage AI"
      ],
      "correct_answer": "Bloom"
    },
    {
      "question": "2. What does Streamlit do in the end-to-end RAG flow?",
      "answer_choices": [
        "Performs SQL functions",
        "Extracts Data",
        "Serves as the Chat UI and performs orchestration",
        "Performs hybrid retrieval"
      ],
      "correct_answer": "Serves as the Chat UI and performs orchestration"
    },
    {
      "question": "3. What can hybrid retrieval be performed against?",
      "answer_choices": [
        "Non-text data",
        "Documents",
        "Dynamic, real-time data",
        "Short, dense text"
      ],
      "correct_answer": "Documents"
    },
    {
      "question": "4. What is the first input from the client app to Cortex Analyst?",
      "answer_choices": [
        "Classification",
        "Database details",
        "SQL query",
        "Semantic YAML model"
      ],
      "correct_answer": "Semantic YAML model"
    },
    {
      "question": "5. Which of the following is NOT an example of a frontend UI?",
      "answer_choices": [
        "Slack",
        "Dashboard integration",
        "Streamlit",
        "Document (PDF, wiki, FAQs)"
      ],
      "correct_answer": "Document (PDF, wiki, FAQs)"
    },
    {
      "question": "6. Approximately what percent of data lives in unstructured documents?",
      "answer_choices": [
        "20%",
        "80%",
        "5%",
        "95%"
      ],
      "correct_answer": "80%"
    },
    {
      "question": "7. What hybrid search components does Cortex Search include?",
      "answer_choices": [
        "Semantic (vector) search and keyword search",
        "Thematic search and remote search",
        "Keyword search and query search",
        "Algorithmic search and semantic search"
      ],
      "correct_answer": "Semantic (vector) search and keyword search"
    },
    {
      "question": "8. What technology provides integrated AI observability on Snowflake?",
      "answer_choices": [
        "Streamlit",
        "Truera",
        "Datavolo",
        "Polaris"
      ],
      "correct_answer": "Truera"
    },
    {
      "question": "9. Which of the following is NOT a component of the data platform side of Snowflake?",
      "answer_choices": [
        "Agents",
        "Governed Data",
        "Retrieval and Analytics",
        "Processing Engine"
      ],
      "correct_answer": "Agents"
    },
    {
      "question": "10. What uses does Cortex Agents provide?",
      "answer_choices": [
        "Orchestration",
        "Monitoring and Iteration",
        "Reflection",
        "All of the above"
      ],
      "correct_answer": "All of the above"
    }
  ];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Get DOM elements
const startContainer = document.getElementById('start-container'); // ADDED THIS
const startButton = document.getElementById('start-btn');       // ADDED THIS
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');
const hiddenRestartButton = document.getElementById('hidden-restart-btn');

// Start the quiz with the new start button listener
document.addEventListener('DOMContentLoaded', () => {
    // Show the start screen and hide the quiz
    startContainer.classList.remove('hide');
    quizContainer.classList.add('hide');
    scoreContainer.classList.add('hide');
});

// Function to start the quiz
function startQuiz() {
    // MODIFIED THIS FUNCTION
    startContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    answered = false;
    scoreContainer.classList.add('hide');
    nextButton.classList.add('hide');
    displayQuestion();
}

// Function to display the current question
function displayQuestion() {
    resetState();
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;
        currentQuestion.answer_choices.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.classList.add('btn');
            button.dataset.answer = answer;
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    } else {
        showScore();
    }
}

// Function to reset the quiz state for the next question
function resetState() {
    answered = false;
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function to handle answer selection
function selectAnswer(e) {
    if (answered) return; // Prevent multiple clicks
    
    answered = true;
    const selectedButton = e.target;
    const selectedAnswer = selectedButton.dataset.answer;
    const correctAns = quizData[currentQuestionIndex].correct_answer;

    // Check if the selected answer is correct
    if (selectedAnswer === correctAns) {
        score++;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('incorrect');
        // Show the correct answer
        Array.from(answerButtonsElement.children).find(btn => btn.dataset.answer === correctAns).classList.add('correct');
    }

    // Disable all buttons after an answer is selected
    Array.from(answerButtonsElement.children).forEach(button => {
        button.removeEventListener('click', selectAnswer);
    });

    nextButton.classList.remove('hide');
}

// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

// Function to show the final score
function showScore() {
    quizContainer.classList.add('hide');
    scoreContainer.classList.remove('hide');
    finalScoreElement.innerText = score;
}

// Add event listeners for the new start button and existing restart buttons
startButton.addEventListener('click', startQuiz); // ADDED THIS LINE
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', startQuiz);
hiddenRestartButton.addEventListener('click', startQuiz);