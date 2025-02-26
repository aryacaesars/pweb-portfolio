// Navbar scroll effect
const navbar = document.querySelector(".navbar")
const mobileMenu = document.querySelector(".mobile-menu")
const mobileMenuButton = document.querySelector(".mobile-menu-button")
const closeMenuButton = document.querySelector(".close-menu")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.add("active")
  document.body.style.overflow = "hidden"
})

closeMenuButton.addEventListener("click", () => {
  mobileMenu.classList.remove("active")
  document.body.style.overflow = ""
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".mobile-menu-links a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    document.body.style.overflow = ""
  })
})

// Projects carousel
const projectData = [
  {
    category: "ai",
    title: "You can do more with AI.",
    image: "/pp.jpg",
    link: "https://undagicorp.com",
  },
  {
    category: "productivity",
    title: "Enhance your productivity.",
    image: "/pp.jpg",
    link: "https://example.com/projects/productivity",
  },
  {
    category: "product",
    title: "Launching the new Apple Vision Pro.",
    image: "/pp.jpg",
    link: "https://example.com/projects/apple-vision-pro",
  },
  // Add more projects as needed
]

const carouselTrack = document.querySelector(".carousel-track")
const categoryButtons = document.querySelectorAll(".category-button")
let currentCategory = "all"

function createProjectCard(project) {
  const card = document.createElement("div")
  card.className = "project-card"
  card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-overlay">
            <div class="project-category">${project.category}</div>
            <h3 class="project-title">${project.title}</h3>
        </div>
    `
  card.addEventListener("click", () => {
    window.open(project.link, "_blank")
  })
  return card
}

function filterProjects(category) {
  const filteredProjects =
    category === "all" ? projectData : projectData.filter((project) => project.category === category)

  carouselTrack.innerHTML = ""
  filteredProjects.forEach((project) => {
    carouselTrack.appendChild(createProjectCard(project))
  })
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")
    currentCategory = button.dataset.category
    filterProjects(currentCategory)
  })
})

// Initialize projects
filterProjects("all")

// Testimonials carousel
const testimonials = [
  {
    name: "Sarah Johnson",
    position: "UI/UX Designer",
    quote:
      "Working with this team has been an incredible experience. Their attention to detail and creative solutions exceeded all expectations.",
    image: "/pp.jpg",
  },
  {
    name: "Michael Chen",
    position: "Software Engineer",
    quote:
      "The quality of work and professionalism shown throughout the project was outstanding. I highly recommend their services.",
    image: "/pp.jpg",
  },
  {
    name: "Emma Davis",
    position: "Product Manager",
    quote:
      "They delivered exactly what we needed, on time and within budget. The results have helped transform our business.",
    image: "/pp.jpg",
  },
]

const testimonialCards = document.querySelector(".testimonial-cards")
let currentTestimonial = 0

function createTestimonialCard(testimonial) {
  return `
        <div class="testimonial-card">
            <div class="testimonial-image">
                <img src="${testimonial.image}" alt="${testimonial.name}">
            </div>
            <div class="testimonial-content">
                <p class="testimonial-quote">${testimonial.quote}</p>
                <div class="testimonial-author">${testimonial.name}</div>
                <div class="testimonial-position">${testimonial.position}</div>
            </div>
        </div>
    `
}

function updateTestimonials() {
  testimonialCards.style.transform = `translateX(-${currentTestimonial * 100}%)`
}

document.querySelector(".testimonial-button.prev").addEventListener("click", () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length
  updateTestimonials()
})

document.querySelector(".testimonial-button.next").addEventListener("click", () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length
  updateTestimonials()
})

// Initialize testimonials
testimonialCards.innerHTML = testimonials.map(createTestimonialCard).join("")

// Contact form
const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const formData = new FormData(contactForm)
  // Handle form submission here
  console.log({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })
  contactForm.reset()
  alert("Thank you for your message! I will get back to you soon.")
})

// Animate skills progress bars on scroll
const skillBars = document.querySelectorAll(".progress")

function animateSkillBars() {
  skillBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      bar.style.width = bar.parentElement.previousElementSibling.lastElementChild.textContent
    }
  })
}

window.addEventListener("scroll", animateSkillBars)
animateSkillBars() // Initial check

