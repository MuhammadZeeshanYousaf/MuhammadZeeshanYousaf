// DOM Elements
const header = document.getElementById("header");
const menuBtn = document.querySelector(".menu-btn");
const navItems = document.querySelector(".nav-items");
const navLinks = document.querySelectorAll(".nav-link");
const scrollTopBtn = document.querySelector(".scroll-top-btn");
const projectsFilters = document.querySelector(".projects-filters");
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.getElementById("contactForm");
const typedTextElement = document.querySelector(".typed-text");

// Initialize AOS animation library
AOS.init({
  duration: 1000,
  once: true,
  mirror: false,
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Scroll to top button visibility
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

// Mobile menu toggle
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  navItems.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    navItems.classList.remove("active");
  });
});

// Scroll to top functionality
scrollTopBtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Projects filtering
if (projectsFilters) {
  projectsFilters.addEventListener("click", (e) => {
    if (e.target.classList.contains("filter-btn")) {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      e.target.classList.add("active");

      const filterValue = e.target.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "block";

          // Add a slight delay for a smoother filtering effect
          setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
          }, 100);
        } else {
          card.style.opacity = 0;
          card.style.transform = "translateY(20px)";

          // Hide after fade out animation
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    }
  });
}

// Typed text effect
if (typedTextElement) {
  const texts = [
    "Full Stack Web Developer",
    "Ruby on Rails Expert",
    "Node.js Developer",
    "React.js Developer",
    "Python Programmer",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typedTextElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typedTextElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typeSpeed = 1000; // Pause at end of typing
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length; // Move to next text
      typeSpeed = 500; // Pause before typing new text
    }

    setTimeout(typeText, typeSpeed);
  }

  // Start the typing effect
  setTimeout(typeText, 1000);
}

// Contact form submission
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    // This is where you would typically send the form data to a server
    // For this example, we'll just display an alert
    alert(`Thank you for your message, ${name}! I will get back to you soon.`);

    // Reset form
    contactForm.reset();
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Offset for fixed header
        behavior: "smooth",
      });
    }
  });
});

// Intersection Observer for scroll animations
const sections = document.querySelectorAll("section");
const sectionNavLinks = document.querySelectorAll(".nav-link");

const observerOptions = {
  root: null,
  rootMargin: "-20% 0px -80% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");

      // Update navigation active state
      sectionNavLinks.forEach((link) => {
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => {
  observer.observe(section);
});

// Add active class to nav-link based on current section
function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      sectionNavLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  // Update year in footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);
