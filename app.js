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

const people = [
  {
      id: 1,
      name: "Next.js",
      image: "assets/next.svg"
  },
  {
      id: 2,
      name: "React.js",
      image: "assets/react.svg"
  },
  {
      id: 3,
      name: "Git",
      image: "assets/git.svg"
  },
  {
      id: 4,
      name: "Tailwind CSS",
      image: "assets/tailwind.svg"
  },
  {
      id: 5,
      name: "Figma",
      image: "assets/figma.svg"
  },
  {
      id: 6,
      name: "V0",
      image: "assets/v0.svg"
  }
];

// Skills data
const skills = [
  { name: "Desain UI/UX", percentage: 50 },
  { name: "Frontend Development", percentage: 85 },
  { name: "Desain Grafis", percentage: 60 },
  { name: "Backend Development", percentage: 68 }
];

// Function to render people
function renderPeople() {
  const peopleContainer = document.getElementById('people-container');
  
  people.forEach(person => {
      const personElement = document.createElement('div');
      personElement.className = 'person';
      
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.innerHTML = `
          <h4>${person.name}</h4>
      `;
      
      const img = document.createElement('img');
      img.src = person.image;
      img.alt = person.name;
      
      personElement.appendChild(tooltip);
      personElement.appendChild(img);
      
      peopleContainer.appendChild(personElement);
  });
}

// Function to render skills
function renderSkills() {
  const skillsGrid = document.getElementById('skills-grid');
  
  skills.forEach(skill => {
      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item';
      
      const skillHeader = document.createElement('div');
      skillHeader.className = 'skill-header';
      
      const skillName = document.createElement('span');
      skillName.className = 'skill-name';
      skillName.textContent = skill.name;
      
      const skillPercentage = document.createElement('span');
      skillPercentage.className = 'skill-percentage';
      skillPercentage.textContent = `${skill.percentage}%`;
      
      skillHeader.appendChild(skillName);
      skillHeader.appendChild(skillPercentage);
      
      const progressContainer = document.createElement('div');
      progressContainer.className = 'progress-container';
      
      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      progressBar.style.transform = `translateX(-${100 - skill.percentage}%)`;
      
      progressContainer.appendChild(progressBar);
      
      skillItem.appendChild(skillHeader);
      skillItem.appendChild(progressContainer);
      
      skillsGrid.appendChild(skillItem);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  renderPeople();
  renderSkills();
});

// Projects carousel
document.addEventListener('DOMContentLoaded', () => {
  // Configuration and data
  const categories = ["All", "Landing Page", "E-commerce", "Company Profile Website"];
  const data = [
    {
      category: "Landing Page",
      title: "Website untuk Jasa Konsultan Bisnis",
      src: "/assets/Frame 2.jpg",
      link: "https://undagicorp.com",
    },
    {
      category: "E-commerce",
      title: "Website untuk Butik berbasis Toko Online",
      src: "/assets/Frame 3.jpg",
      link: "https://sanydressline.my.id",
    },
    {
      category: "Landing Page",
      title: "Website untuk Jasa Publikasi Artikel Ilmiah",
      src: "/assets/Frame 1.jpg",
      link: "https://publinesia.com",
    },
  ];

  // DOM Elements
  const carousel = document.getElementById('carousel');
  const carouselItems = document.getElementById('carousel-items');
  const dropdownBtn = document.getElementById('dropdown-btn');
  const dropdownMenu = document.getElementById('dropdown-menu');
  const selectedCategorySpan = document.getElementById('selected-category');
  const categoryTabs = document.querySelector('.category-tabs');
  const scrollLeftBtn = document.getElementById('scroll-left');
  const scrollRightBtn = document.getElementById('scroll-right');
  const chevronIcon = document.querySelector('.icon-chevron-down');

  let selectedCategory = 'All';
  let isInfinite = false; // Changed to always be false

  // Add these new variables at the top of your carousel code
  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;

  // Initialize the UI
  initializeCategories();
  updateCarousel();

  // Event Listeners
  dropdownBtn.addEventListener('click', toggleDropdown);
  scrollLeftBtn.addEventListener('click', scrollLeft);
  scrollRightBtn.addEventListener('click', scrollRight);
  carouselItems.addEventListener('scroll', handleScroll);

  // Add these new event listeners after initializing the UI
  carouselItems.addEventListener('wheel', handleWheel, { passive: false });
  carouselItems.addEventListener('touchstart', handleTouchStart, { passive: false });
  carouselItems.addEventListener('touchmove', handleTouchMove, { passive: false });
  carouselItems.addEventListener('touchend', handleTouchEnd);

  // Functions
  function toggleDropdown() {
    const isOpen = !dropdownMenu.classList.contains('hidden');
    if (isOpen) {
      dropdownMenu.classList.add('hidden');
      chevronIcon.classList.remove('rotated');
    } else {
      dropdownMenu.classList.remove('hidden');
      chevronIcon.classList.add('rotated');
    }
  }

  function initializeCategories() {
    // Mobile dropdown menu
    categories.forEach(category => {
      const button = document.createElement('button');
      button.className = `dropdown-item${selectedCategory === category ? ' active' : ''}`;
      button.textContent = category;
      button.addEventListener('click', () => selectCategory(category, true));
      dropdownMenu.appendChild(button);
    });

    // Desktop category tabs
    categories.forEach(category => {
      const button = document.createElement('button');
      button.className = `category-tab${selectedCategory === category ? ' active' : ''}`;
      button.textContent = category;
      button.addEventListener('click', () => selectCategory(category, false));
      categoryTabs.appendChild(button);
    });
  }

  function selectCategory(category, fromDropdown) {
    selectedCategory = category;
    
    // Update UI to reflect selected category
    if (fromDropdown) {
      selectedCategorySpan.textContent = category;
      dropdownMenu.classList.add('hidden');
      chevronIcon.classList.remove('rotated');
    }

    // Update active states
    document.querySelectorAll('.dropdown-item').forEach(item => {
      item.classList.toggle('active', item.textContent === category);
    });
    
    document.querySelectorAll('.category-tab').forEach(tab => {
      tab.classList.toggle('active', tab.textContent === category);
    });

    // Reset scroll position before updating carousel
    carouselItems.scrollLeft = 0;
    updateCarousel();
  }

  // In your updateCarousel function, replace it with:
  function updateCarousel() {
    carouselItems.innerHTML = '';
    
    const filteredData = selectedCategory === 'All' 
        ? data 
        : data.filter(card => card.category === selectedCategory);

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.transform = 'translateX(0)';
    wrapper.style.transition = 'transform 0.3s ease';
    
    // Track current position
    let currentPosition = 0;
    const totalItems = filteredData.length;
    
    filteredData.forEach((cardData) => {
        const card = createCardElement(cardData);
        wrapper.appendChild(card);
    });

    carouselItems.appendChild(wrapper);
    checkScrollability();
  }

  function createCardElement(cardData, index) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="card-gradient"></div>
      <div class="card-content">
        <p class="card-category">${cardData.category}</p>
        <p class="card-title">${cardData.title}</p>
      </div>
      <img 
        src="${cardData.src}" 
        alt="${cardData.title}" 
        class="card-image" 
        loading="lazy"
      />
      <div class="card-link">
        <a href="${cardData.link}" target="_blank" rel="noopener noreferrer">View Project</a>
      </div>
    `;

    return card;
  }

  function handleScroll() {
    checkScrollability();
    
    if (!isInfinite || isResetting) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselItems;
    const cardWidth = isMobile() ? 230 : 320;
    const gap = 16;

    // Reset to start
    if (scrollLeft + clientWidth >= scrollWidth - cardWidth) {
      isResetting = true;
      setTimeout(() => {
        carouselItems.style.scrollBehavior = 'auto';
        carouselItems.scrollLeft = cardWidth + gap;
        
        setTimeout(() => {
          carouselItems.style.scrollBehavior = 'smooth';
          isResetting = false;
        }, 50);
      }, 50);
    }

    // Reset to end
    if (scrollLeft <= cardWidth) {
      isResetting = true;
      setTimeout(() => {
        carouselItems.style.scrollBehavior = 'auto';
        carouselItems.scrollLeft = scrollWidth - (2 * cardWidth + 2 * gap);
        
        setTimeout(() => {
          carouselItems.style.scrollBehavior = 'smooth';
          isResetting = false;
        }, 50);
      }, 50);
    }
  }

  // Update checkScrollability function
  function checkScrollability() {
    const maxScroll = carouselItems.scrollWidth - carouselItems.clientWidth;
    
    
    const currentTransform = wrapper.style.transform;
    const currentValue = parseInt(currentTransform.replace(/[^\d-]/g, '')) || 0;
    const containerWidth = carouselItems.clientWidth;
    const scrollWidth = wrapper.scrollWidth;
    
    // Enable/disable left button
    if (currentValue >= 0) {
        scrollLeftBtn.classList.add('disabled');
    } else {
        scrollLeftBtn.classList.remove('disabled');
    }
    
    // Enable/disable right button
    if (currentValue <= -(scrollWidth - containerWidth)) {
        scrollRightBtn.classList.add('disabled');
    } else {
        scrollRightBtn.classList.remove('disabled');
    }
  }

  // Update the scroll functions
  function scrollLeft() {
    if (scrollLeftBtn.classList.contains('disabled')) return;
    
    const wrapper = carouselItems.firstElementChild;
    const currentTransform = wrapper.style.transform;
    const currentValue = parseInt(currentTransform.replace(/[^\d-]/g, '')) || 0;
    
    const cardWidth = isMobile() ? 230 : 320;
    const containerWidth = carouselItems.clientWidth;
    const scrollWidth = wrapper.scrollWidth;
    
    // Use cardWidth for consistent scrolling
    const newValue = Math.min(0, currentValue + cardWidth);
    
    // Add smooth transition
    wrapper.style.transition = 'transform 0.3s ease';
    wrapper.style.transform = `translateX(${newValue}px)`;
    
    // Update scroll buttons state
    checkScrollability();
  }

  function scrollRight() {
    if (scrollRightBtn.classList.contains('disabled')) return;
    
    const wrapper = carouselItems.firstElementChild;
    const currentTransform = wrapper.style.transform;
    const currentValue = parseInt(currentTransform.replace(/[^\d-]/g, '')) || 0;
    
    const cardWidth = isMobile() ? 230 : 320;
    const containerWidth = carouselItems.clientWidth;
    const scrollWidth = wrapper.scrollWidth;
    const maxScroll = -(scrollWidth - containerWidth);
    
    // Use cardWidth for consistent scrolling
    const newValue = Math.max(maxScroll, currentValue - cardWidth);
    
    // Add smooth transition
    wrapper.style.transition = 'transform 0.3s ease';
    wrapper.style.transform = `translateX(${newValue}px)`;
    checkScrollability();
  }

  function isMobile() {
    return window.innerWidth < 768;
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    checkScrollability();
  });

  // Add these new functions
  function handleWheel(e) {
    e.preventDefault();
    const wrapper = carouselItems.firstElementChild;
    if (!wrapper) return;

    const currentTransform = wrapper.style.transform;
    const currentValue = parseInt(currentTransform.replace(/[^\d-]/g, '')) || 0;
    const containerWidth = carouselItems.clientWidth;
    const scrollWidth = wrapper.scrollWidth;
    const maxScroll = -(scrollWidth - containerWidth);

    // Use deltaX for horizontal scrolling instead of deltaY
    // If deltaX is 0, fall back to deltaY for trackpad gestures
    const delta = e.deltaX || e.deltaY;
    const scrollAmount = delta > 0 ? -100 : 100;
    const newValue = Math.max(maxScroll, Math.min(0, currentValue + scrollAmount));
    
    wrapper.style.transform = `translateX(${newValue}px)`;
    checkScrollability();
  }

  function handleTouchStart(e) {
    e.preventDefault();
    touchStartX = e.touches[0].clientX;
    isDragging = true;
    const wrapper = carouselItems.firstElementChild;
    wrapper.style.transition = 'none';
  }

  function handleTouchMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    touchEndX = e.touches[0].clientX;
    const wrapper = carouselItems.firstElementChild;
    const currentTransform = wrapper.style.transform;
    const currentValue = parseInt(currentTransform.replace(/[^\d-]/g, '')) || 0;
    const containerWidth = carouselItems.clientWidth;
    const scrollWidth = wrapper.scrollWidth;
    const maxScroll = -(scrollWidth - containerWidth);
    
    const diff = touchEndX - touchStartX;
    const newValue = Math.max(maxScroll, Math.min(0, currentValue + diff));
    
    wrapper.style.transform = `translateX(${newValue}px)`;
    touchStartX = touchEndX;
  }

  function handleTouchEnd() {
    isDragging = false;
    const wrapper = carouselItems.firstElementChild;
    wrapper.style.transition = 'transform 0.3s ease';
    checkScrollability();
  }
});

// Add this to your existing script.js file

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel');
  const carouselItems = document.getElementById('carousel-items');
  const scrollLeftBtn = document.getElementById('scroll-left');
  const scrollRightBtn = document.getElementById('scroll-right');

  // Function to update button states
  const updateButtonStates = () => {
    scrollLeftBtn.disabled = carouselItems.scrollLeft <= 0;
    scrollRightBtn.disabled = 
      carouselItems.scrollLeft >= carouselItems.scrollWidth - carouselItems.clientWidth;
  };

  // Add scroll event listener to update button states
  carouselItems.addEventListener('scroll', updateButtonStates);

  // Scroll left button click handler
  scrollLeftBtn.addEventListener('click', () => {
    carouselItems.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  });

  // Scroll right button click handler
  scrollRightBtn.addEventListener('click', () => {
    carouselItems.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  });

  // Initial button state
  updateButtonStates();
});

// Testimonials carousel
document.addEventListener("DOMContentLoaded", function() {
  // Testimonial data
  const testimonials = [
      {
          name: "Hasbi Kosasih",
          designation: "CEO Undagi",
          quote: "Arya sangat profesional dalam mengerjakan website perusahaan kami. Hasilnya melebihi ekspektasi dan mampu menyelesaikan proyek tepat waktu.",
          src: "/assets/undagi.PNG"
      },
      {
          name: "Sany", 
          designation: "Pemilik Toko Online",
          quote: "Pelayanan yang sangat baik dan komunikatif. Website toko online saya jadi lebih modern dan mudah digunakan oleh customer.",
          src: "/assets/sany.png"
      },
      {
          name: "Angga Irawan",
          designation: "Founder Publinesia", 
          quote: "Sangat puas dengan hasil website  yang dibuat. Desainnya elegan dan sesuai dengan kebutuhan saya.",
          src: "/assets/angga.jpg"
      }
  ];

  // DOM elements
  const imagesContainer = document.querySelector('.testimonial-images');
  const nameElement = document.querySelector('.testimonial-name');
  const designationElement = document.querySelector('.testimonial-designation');
  const quoteElement = document.querySelector('.testimonial-quote');
  const prevButtons = document.querySelectorAll('.prev-button');
  const nextButtons = document.querySelectorAll('.next-button');
  
  let activeIndex = 0;
  
  // Initialize testimonials
  function initTestimonials() {
      // Create image elements
      testimonials.forEach((testimonial, index) => {
          const imageDiv = document.createElement('div');
          imageDiv.className = 'testimonial-image';
          imageDiv.style.setProperty('--random-rotate', `${Math.floor(Math.random() * 21) - 10}deg`);
          imageDiv.style.setProperty('--z-index', `${testimonials.length + 2 - index}`);
          
          const img = document.createElement('img');
          img.src = testimonial.src;
          img.alt = testimonial.name;
          img.draggable = false;
          
          imageDiv.appendChild(img);
          imagesContainer.appendChild(imageDiv);
      });
      
      updateTestimonial(0);
  }
  
  // Update displayed testimonial
  function updateTestimonial(index) {
      // Update active class for images
      const imageElements = document.querySelectorAll('.testimonial-image');
      imageElements.forEach((image, i) => {
          if (i === index) {
              image.classList.add('image-active');
              image.classList.remove('image-inactive');
              // Apply animation for active image
              image.animate([
                  { transform: 'translateY(0)' },
                  { transform: 'translateY(-80px)' },
                  { transform: 'translateY(0)' }
              ], {
                  duration: 800,
                  easing: 'ease-in-out'
              });
          } else {
              image.classList.remove('image-active');
              image.classList.add('image-inactive');
              image.style.setProperty('--random-rotate', `${Math.floor(Math.random() * 21) - 10}deg`);
          }
      });
      
      // Animate content transition
      const textContainer = document.querySelector('.testimonial-text');
      textContainer.classList.add('fade-out');
      
      setTimeout(() => {
          // Update content
          nameElement.textContent = testimonials[index].name;
          designationElement.textContent = testimonials[index].designation;
          
          // Clear previous quote animation
          quoteElement.innerHTML = '';
          
          // Add new quote with word-by-word animation
          const words = testimonials[index].quote.split(' ');
          words.forEach((word, i) => {
              const span = document.createElement('span');
              span.textContent = word + ' ';
              span.style.transition = 'all 0.2s ease-in-out';
              span.style.transitionDelay = `${i * 0.02}s`;
              quoteElement.appendChild(span);
          });
          
          textContainer.classList.remove('fade-out');
          
          // Animate words appearing
          setTimeout(() => {
              const wordSpans = quoteElement.querySelectorAll('span');
              wordSpans.forEach((span, i) => {
                  setTimeout(() => {
                      span.style.opacity = 1;
                      span.style.filter = 'blur(0px)';
                      span.style.transform = 'translateY(0)';
                  }, i * 20);
              });
          }, 100);
          
      }, 200);
  }
  
  // Navigation handlers
  function goToNext() {
      activeIndex = (activeIndex + 1) % testimonials.length;
      updateTestimonial(activeIndex);
  }
  
  function goToPrev() {
      activeIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
      updateTestimonial(activeIndex);
  }
  
  // Add event listeners
  nextButtons.forEach(button => {
      button.addEventListener('click', goToNext);
  });
  
  prevButtons.forEach(button => {
      button.addEventListener('click', goToPrev);
  });
  
  // Initialize
  initTestimonials();
});
// Contact form
const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const formData = new FormData(contactForm)
  // Handle form submission here
  console.log({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
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

