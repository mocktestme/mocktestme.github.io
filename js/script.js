// Test Data
const testsData = {
  standardized: [
    { id: 1, name: "ACT", full: "American College Testing", category: "admissions", questions: 215, time: 180 },
    { id: 2, name: "SAT", full: "Scholastic Assessment Test", category: "admissions", questions: 154, time: 180 },
    {
      id: 3,
      name: "GED",
      full: "General Educational Development Test",
      category: "admissions",
      questions: 170,
      time: 225,
    },
    {
      id: 4,
      name: "GMAT",
      full: "Graduate Management Admission Test",
      category: "admissions",
      questions: 91,
      time: 187,
    },
    { id: 5, name: "GRE", full: "Graduate Record Examination", category: "admissions", questions: 170, time: 180 },
    { id: 6, name: "LSAT", full: "Law School Admission Test", category: "admissions", questions: 101, time: 180 },
  ],
  language: [
    { id: 7, name: "Duolingo", full: "Duolingo English Test", category: "language", questions: 40, time: 60 },
    {
      id: 8,
      name: "IELTS",
      full: "International English Language Testing System",
      category: "language",
      questions: 40,
      time: 180,
    },
    {
      id: 9,
      name: "TOEFL",
      full: "Test of English as a Foreign Language",
      category: "language",
      questions: 120,
      time: 195,
    },
    {
      id: 10,
      name: "TOEFL iBT",
      full: "Test of English as a Foreign Language Internet-Based Test",
      category: "language",
      questions: 120,
      time: 195,
    },
  ],
  medical: [
    {
      id: 11,
      name: "NCLEX",
      full: "National Council Licensure Examination",
      category: "medical",
      questions: 265,
      time: 360,
    },
    {
      id: 12,
      name: "NCLEX-RN",
      full: "National Council Licensure Examination for Registered Nurses",
      category: "medical",
      questions: 265,
      time: 360,
    },
    { id: 13, name: "OET", full: "Occupational English Test", category: "medical", questions: 150, time: 185 },
    {
      id: 14,
      name: "RBT",
      full: "Registered Behavior Technician Exam",
      category: "medical",
      questions: 170,
      time: 180,
    },
    { id: 15, name: "UCAT", full: "University Clinical Aptitude Test", category: "medical", questions: 220, time: 140 },
  ],
  professional: [
    {
      id: 16,
      name: "CAPM",
      full: "Certified Associate in Project Management",
      category: "professional",
      questions: 150,
      time: 180,
    },
    {
      id: 17,
      name: "CFA Level 1",
      full: "Chartered Financial Analyst Level 1",
      category: "professional",
      questions: 240,
      time: 360,
    },
    {
      id: 18,
      name: "CSCS",
      full: "Construction Skills Certification Scheme Test",
      category: "professional",
      questions: 50,
      time: 90,
    },
    {
      id: 19,
      name: "PMP",
      full: "Project Management Professional",
      category: "professional",
      questions: 200,
      time: 240,
    },
  ],
  school: [
    { id: 20, name: "11 Plus", full: "Eleven Plus Entrance Exam", category: "school", questions: 80, time: 60 },
    { id: 21, name: "SATS", full: "Standard Assessment Tests", category: "school", questions: 50, time: 45 },
    {
      id: 22,
      name: "Year 6 SATS",
      full: "Key Stage 2 Standard Assessment Tests",
      category: "school",
      questions: 50,
      time: 45,
    },
  ],
}

// Get all tests
const allTests = Object.values(testsData).flat()
const categories = ["Admissions Tests", "Language Tests", "Medical/Health", "Professional Certs", "School Exams"]
const categoryIcons = ["📚", "🌐", "🏥", "💼", "🎓"]
const badgeColors = ["badge-blue", "badge-red", "badge-green", "badge-yellow"]

// Initialize Popular Tests
function initializePopularTests() {
  const grid = document.getElementById("popularTestsGrid")
  const popularTests = allTests.slice(0, 6)

  popularTests.forEach((test, index) => {
    const badge = badgeColors[index % badgeColors.length]
    const card = document.createElement("div")
    card.className = "test-card"
    card.innerHTML = `
            <h3>${test.name}</h3>
            <p>${test.full}</p>
            <span class="test-badge ${badge}">${test.category.toUpperCase()}</span>
            <p style="font-size: 0.8rem; color: var(--color-gray);">
                ${test.questions} Questions • ${test.time} mins
            </p>
        `
    card.addEventListener("click", () => handleTestClick(test))
    grid.appendChild(card)
  })
}

// Initialize Categories
function initializeCategories() {
  const container = document.getElementById("categoriesContainer")
  categories.forEach((category, index) => {
    const item = document.createElement("div")
    item.className = "category-item"
    item.innerHTML = `
            <div class="category-icon">${categoryIcons[index]}</div>
            <h3>${category}</h3>
            <p>Master your ${category.toLowerCase()}</p>
        `
    item.addEventListener("click", () => filterTestsByCategory(index))
    container.appendChild(item)
  })
}

// Initialize All Tests List
function initializeTestsList() {
  const list = document.getElementById("testsList")
  list.innerHTML = ""

  allTests.forEach((test) => {
    const item = document.createElement("div")
    item.className = "test-item"
    item.innerHTML = `
            <h4>${test.name}</h4>
            <p>${test.full}</p>
            <div class="test-meta">
                <span>📝 ${test.questions} Questions</span>
                <span>⏱️ ${test.time} minutes</span>
            </div>
        `
    item.addEventListener("click", () => handleTestClick(test))
    list.appendChild(item)
  })
}

// Handle Test Click
function handleTestClick(test) {
  alert(
    `Starting ${test.name} - ${test.full}\n\n${test.questions} Questions | ${test.time} minutes\n\nThis is a demo. Full tests coming soon!`,
  )
}

// Filter Tests by Category
function filterTestsByCategory(categoryIndex) {
  const categoryMap = ["admissions", "language", "medical", "professional", "school"]
  const selectedCategory = categoryMap[categoryIndex]
  const filtered = allTests.filter((test) => test.category === selectedCategory)

  const list = document.getElementById("testsList")
  list.innerHTML = ""

  filtered.forEach((test) => {
    const item = document.createElement("div")
    item.className = "test-item"
    item.innerHTML = `
            <h4>${test.name}</h4>
            <p>${test.full}</p>
            <div class="test-meta">
                <span>📝 ${test.questions} Questions</span>
                <span>⏱️ ${test.time} minutes</span>
            </div>
        `
    item.addEventListener("click", () => handleTestClick(test))
    list.appendChild(item)
  })
}

// Mobile Menu Toggle
function initializeMobileMenu() {
  const menuToggle = document.getElementById("menuToggle")
  const navLinks = document.querySelector(".nav-links")

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active")

    // Animate hamburger
    const spans = menuToggle.querySelectorAll("span")
    if (navLinks.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translateY(12px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translateY(-12px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })

  // Close menu when link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active")
      const spans = menuToggle.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    })
  })
}

// Filter Functionality
function initializeFilters() {
  const checkboxes = document.querySelectorAll(".filter-checkbox")

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.value === "all") {
        if (checkbox.checked) {
          checkboxes.forEach((cb) => {
            if (cb.value !== "all") cb.checked = false
          })
          initializeTestsList()
        }
      } else {
        document.querySelector('[value="all"]').checked = false
      }
    })
  })
}

// Smooth Scroll
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// CTA Button
function initializeCTAButtons() {
  document.getElementById("startBtn").addEventListener("click", () => {
    alert("Welcome to MockTestMe!\n\nSelect a test from the Popular Tests section to get started.")
  })

  document.querySelectorAll(".cta-button.secondary").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("popular-tests").scrollIntoView({ behavior: "smooth", block: "start" })
    })
  })
}

// Initialize Page
document.addEventListener("DOMContentLoaded", () => {
  initializePopularTests()
  initializeCategories()
  initializeTestsList()
  initializeMobileMenu()
  initializeFilters()
  initializeSmoothScroll()
  initializeCTAButtons()

  // Scroll Animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "slideInUp 0.6s ease-out forwards"
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section)
  })
})
