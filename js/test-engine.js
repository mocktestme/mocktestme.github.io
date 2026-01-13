// Test Engine for Mock Tests
let currentQuestionIndex = 0
let userAnswers = {}
let testActive = false
let questions = []

function initializeTest(testQuestions, testName) {
  questions = testQuestions
  window.testName = testName

  setupEventListeners()
  renderQuestionNavigator()
}

function setupEventListeners() {
  const startBtn = document.getElementById("startBtn")
  const reviewBtn = document.getElementById("reviewBtn")
  const retakeBtn = document.getElementById("retakeBtn")

  if (startBtn) startBtn.addEventListener("click", startTest)
  if (reviewBtn) reviewBtn.addEventListener("click", reviewAnswers)
  if (retakeBtn) retakeBtn.addEventListener("click", retakeTest)
}

function startTest() {
  document.getElementById("testIntro").style.display = "none"
  document.getElementById("questionsContainer").style.display = "block"
  testActive = true

  renderQuestion(0)
}

function renderQuestion(index) {
  const question = questions[index]
  const container = document.getElementById("questionsContainer")

  const html = `
        <div class="question-container animate-fade-in">
            <div class="question-header">
                <span class="question-number">Question ${index + 1} of ${questions.length}</span>
                <span class="question-section">${question.section}</span>
            </div>
            
            <div class="question-text">
                <h3>${question.question}</h3>
            </div>
            
            <div class="options-container">
                ${question.options
                  .map(
                    (option, idx) => `
                    <label class="option-label">
                        <input type="radio" 
                               name="answer" 
                               value="${idx}"
                               ${userAnswers[question.id] === idx ? "checked" : ""}
                               onchange="selectAnswer(${question.id}, ${idx})">
                        <span class="option-text">${option.text}</span>
                    </label>
                `,
                  )
                  .join("")}
            </div>
            
            <div class="question-navigation">
                <button class="nav-btn ${index === 0 ? "disabled" : ""}" 
                        onclick="previousQuestion()" 
                        ${index === 0 ? "disabled" : ""}>← PREVIOUS</button>
                <button class="nav-btn primary" 
                        onclick="nextQuestion()">${index === questions.length - 1 ? "FINISH" : "NEXT →"}</button>
            </div>
        </div>
    `

  container.innerHTML = html
  currentQuestionIndex = index
  updateProgress()
}

function selectAnswer(questionId, optionIndex) {
  userAnswers[questionId] = optionIndex
  updateProgress()
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    renderQuestion(currentQuestionIndex + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  } else {
    submitTest()
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    renderQuestion(currentQuestionIndex - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

function submitTest() {
  document.getElementById("questionsContainer").style.display = "none"
  document.getElementById("resultsScreen").style.display = "block"
  displayResults()
}

function displayResults() {
  let correctCount = 0
  const detailsHtml = []

  questions.forEach((question) => {
    const userAnswerIndex = userAnswers[question.id]
    const isCorrect = question.options[userAnswerIndex]?.correct || false

    if (isCorrect) correctCount++

    detailsHtml.push(`
            <div class="result-item ${isCorrect ? "correct" : "incorrect"} animate-slide-up">
                <div class="result-header">
                    <span class="result-number">Q${question.id}</span>
                    <span class="result-status">${isCorrect ? "✓ CORRECT" : "✗ INCORRECT"}</span>
                </div>
                <p class="result-question">${question.question}</p>
                <p class="result-answer">Your answer: <strong>${question.options[userAnswerIndex]?.text || "Not answered"}</strong></p>
                ${!isCorrect ? `<p class="result-correct">Correct answer: <strong>${question.options.find((o) => o.correct).text}</strong></p>` : ""}
                <p class="result-explanation">${question.options[userAnswerIndex]?.reason || "No explanation available"}</p>
            </div>
        `)
  })

  const percentage = Math.round((correctCount / questions.length) * 100)

  document.getElementById("scoreValue").textContent = `${correctCount}/${questions.length}`
  document.getElementById("scorePercentage").textContent = `${percentage}%`
  document.getElementById("detailedResults").innerHTML = detailsHtml.join("")
}

function reviewAnswers() {
  document.getElementById("resultsScreen").style.display = "none"
  document.getElementById("questionsContainer").style.display = "block"
  renderQuestion(0)
}

function retakeTest() {
  currentQuestionIndex = 0
  userAnswers = {}
  document.getElementById("resultsScreen").style.display = "none"
  document.getElementById("testIntro").style.display = "block"
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function renderQuestionNavigator() {
  const nav = document.getElementById("questionNav")
  if (!nav) return

  const navHtml = questions
    .map(
      (q) => `
        <button class="nav-number ${userAnswers[q.id] !== undefined ? "answered" : ""}"
                onclick="jumpToQuestion(${q.id - 1})"
                title="Question ${q.id}">
            ${q.id}
        </button>
    `,
    )
    .join("")

  nav.innerHTML = navHtml
}

function jumpToQuestion(index) {
  renderQuestion(index)
  window.scrollTo({ top: 0, behavior: "smooth" })
}

function updateProgress() {
  const answeredCount = Object.keys(userAnswers).length
  const percentage = (answeredCount / questions.length) * 100

  const fillEl = document.getElementById("progressFill")
  const textEl = document.getElementById("progressText")

  if (fillEl) fillEl.style.width = percentage + "%"
  if (textEl) textEl.textContent = `${answeredCount} of ${questions.length} Complete`

  renderQuestionNavigator()
}

// CSS Animations
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0; 
            transform: translateY(20px);
        }
        to { 
            opacity: 1; 
            transform: translateY(0);
        }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.4s ease-out;
    }
    
    .animate-slide-up {
        animation: slideUp 0.5s ease-out;
    }
    
    .question-container {
        padding: 2rem;
        background: #F5F1E8;
        border: 3px solid #000;
        margin-bottom: 2rem;
    }
    
    .options-container {
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .option-label {
        display: flex;
        align-items: flex-start;
        padding: 1rem;
        border: 2px solid #ccc;
        cursor: pointer;
        transition: all 0.3s ease;
        background: #fff;
    }
    
    .option-label:hover {
        border-color: #0066CC;
        background: #f0f4ff;
    }
    
    .option-label input[type="radio"] {
        margin-right: 1rem;
        margin-top: 0.2rem;
        cursor: pointer;
    }
    
    .option-label input[type="radio"]:checked + .option-text {
        font-weight: bold;
        color: #0066CC;
    }
    
    .result-item {
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        border-left: 4px solid #ccc;
        background: #fff;
    }
    
    .result-item.correct {
        border-left-color: #28a745;
        background: #f0fff4;
    }
    
    .result-item.incorrect {
        border-left-color: #dc3545;
        background: #fff5f5;
    }
`
document.head.appendChild(style)
