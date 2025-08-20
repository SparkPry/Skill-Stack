
// ====================  =====================================
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const hamburgerIcon = document.getElementById("hamburgerIcon");
const closeIcon = document.getElementById("closeIcon");

mobileMenuToggle.addEventListener("click", function () {
  const isOpen = !mobileMenu.classList.contains("hidden");

  mobileMenu.classList.toggle("hidden");
  hamburgerIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

// Close menu when a mobile link is clicked
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", function () {
    mobileMenu.classList.add("hidden");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
  });
});
// ==================================================
// Dark mode toggle functionality
const darkModeToggle = document.getElementById("darkModeToggle");
const html = document.documentElement;

// Check for saved theme preference or default to system preference
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

// Toggle dark mode
function toggleDarkMode() {
  const isDark = html.classList.contains("dark");

  if (isDark) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

// Event listeners
darkModeToggle.addEventListener("click", toggleDarkMode);

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  });

// Initialize theme on page load
initializeTheme();
//   ===================================================================================================

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll effect to navbar
//   window.addEventListener("scroll", function () {
//     const nav = document.querySelector("nav");
//     if (window.scrollY > 50) {
//       nav.classList.add("shadow-lg");
//     } else {
//       nav.classList.remove("shadow-lg");
//     }
//   });

// Testimonial carousel functionality
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".pagination-dot");

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.style.display = i === index ? "block" : "none";
  });

  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.remove("bg-gray-300");
      dot.classList.add("bg-blue-600");
    } else {
      dot.classList.remove("bg-blue-600");
      dot.classList.add("bg-gray-300");
    }
  });
}

// Auto-rotate testimonials every 5 seconds
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Add click handlers for pagination dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTestimonial = index;
    showTestimonial(currentTestimonial);
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in");
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".group, .bg-white").forEach((el) => {
  observer.observe(el);
});

// Add CSS animation classes
const style = document.createElement("style");
style.textContent = `
            @keyframes fadeIn {
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
                animation: fadeIn 0.6s ease-out forwards;
            }
            
            .group:hover .group-hover\\:scale-105 {
                transform: scale(1.05);
            }
            
            .transition-all {
                transition: all 0.3s ease;
            }
        `;
document.head.appendChild(style);

// Form validation and submission
function handleFormSubmission(event) {
  event.preventDefault();

  // Simple form validation
  const email = event.target.querySelector('input[type="email"]');
  if (email && !email.value.includes("@")) {
    alert("Please enter a valid email address");
    return;
  }

  // Simulate form submission
  alert("Thank you for your interest! We'll get back to you soon.");
}

// Add event listeners to forms
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", handleFormSubmission);
});
// ========================= animetion hero section========================================
// Initialize animations when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Typewriter effect for heading
  const lines = ["line1", "line2", "line3", "line4"];
  let currentLine = 0;

  function showNextLine() {
    if (currentLine < lines.length) {
      const element = document.getElementById(lines[currentLine]);
      element.style.display = "block";

      // Remove cursor from previous line
      if (currentLine > 0) {
        const prevElement = document.getElementById(lines[currentLine - 1]);
        prevElement.classList.add("no-cursor");
      }

      currentLine++;

      // Schedule next line
      if (currentLine < lines.length) {
        setTimeout(showNextLine, 1800); // Wait for typewriter + small delay
      } else {
        // Remove cursor from last line
        element.classList.add("no-cursor");
        // Start other animations after typewriter is complete
        startOtherAnimations();
      }
    }
  }

  function startOtherAnimations() {
    // Animate subtitle and buttons
    const subtitle = document.querySelector(".subtitle");
    const buttons = document.querySelector(".buttons");

    setTimeout(() => {
      subtitle.classList.add("animate-fade-in-up");
    }, 200);

    setTimeout(() => {
      buttons.classList.add("animate-fade-in-up");
    }, 400);
  }

  // Start typewriter effect
  setTimeout(showNextLine, 500);

  // Animate image
  const imageContainer = document.querySelector(".image-container");
  setTimeout(() => {
    imageContainer.classList.add("animate-fade-in-right");
  }, 1000);

  // Add floating particles animation
  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle, index) => {
    particle.style.animation = `float ${3 + index}s ease-in-out infinite`;
    particle.style.animationDelay = `${index * 0.5}s`;
  });
});

// Add mouse movement parallax effect
document.addEventListener("mousemove", function (e) {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  const particles = document.querySelectorAll(".particle");
  particles.forEach((particle, index) => {
    const speed = (index + 1) * 0.5;
    particle.style.transform = `translate(${mouseX * speed}px, ${
      mouseY * speed
    }px)`;
  });
});


// ==================== Fetch API for Hero Section=====================================
const params = new URLSearchParams(window.location.search);
const courseId = params.get("id");

async function fetchCourseDetailsPages() {
  try {
    const res = await fetch(`https://course-api.istad.co/api/v1/courses/${courseId}`);
    const data = await res.json();

    // Check if data exists and has the expected structure
    if (!data) {
      throw new Error("No data received from API");
    }

    // Handle single course object (not an array)
    // Based on the API endpoint pattern, this likely returns a single course object
    const course = data.content || data; // Fallback in case the structure is different
    
    // Create display for single course
    const CourseDetails = `
      <!-- Hero Section -->
      <section class="bg-[#40a0d9] text-white py-12 md:py-16 lg:py-20 mt-7">
        <div class="container mx-auto px-9 p-5 mt-12 bg-gray-200 dark:bg-gray-900 rounded-3xl">
          <div class="flex flex-col lg:flex-row items-center justify-between">
            <!-- Course Info -->
            <div class="lg:w-2/3 mb-8 lg:mb-0">
              <h1 class="text-4xl lg:text-5xl font-bold mb-4 p-2 text-gray-900 dark:text-white">
                ${course.title || 'Course Title'}
              </h1>
              <p class="text-md mb-6 p-2 opacity-90 text-gray-800 dark:text-gray-300">
                ${course.description || 'Course Description'}
              </p>
              <div class="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 mb-6">
                <div class=" px-9 flex justify-center items-center text-xl bg-yellow-600 hover:bg-amber-500 rounded-lg p-2 text-gray-900 dark:text-gray-300">
                    ${course.categoryName || 'Category'}
                </div>
                
              <!-- Rating and Stats -->  
              </div>
              

              <div class="flex items-center space-x-6 text-lg p-2">
                <div class="flex items-center">
                  <i class="fas fa-play-circle mr-2 "></i>
                  <span class="text-gray-700 dark:text-gray-500">130 lessons</span>
                </div>
              </div>
              
            </div>

            <!-- Pricing Card -->
            <div class="max-w-sm mx-auto  rounded-xl shadow-md overflow-hidden border-gray-200 p-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 dark:border-0">
              <!-- Media Placeholder with Play Icon -->
              <div class="flex justify-center mb-4">
                <div class="relative w-full">
                  <img
                    src="${course.thumbnail}"
                    alt=""
                    class="w-full h-48  rounded-lg shadow-md"
                    onerror="this.src='https://via.placeholder.com/400x200'"
                  />&nbsp; <br>
                  ${course.slug}
                  <div class=" p-5 mt-3 flex items-center justify-center">
                   <button
                  onclick="openPaymentModal('Premium Plan', '$${course.discount || course.price || '0'}')"
                  class=" px-9 bg-blue-400 p-3  border-gray-600 text-gray-900 dark:text-gray-300 font-semibold py-2 rounded-md hover:bg-[#40a0d9] dark:hover:bg-gray-900 transition duration-300"
                >
                  Enroll Now
                </button>&nbsp;&nbsp;
                  <span class="text-gray-700 text-2xl dark:text-white">$${course.discount || '0'}</span>&nbsp;
                <span class="text-gray-400 line-through text-md">$${course.price || '0'}</span>
                  </div>
                </div>
              </div>             
            </div>
          </div>
        </div>
      </section>
    `;

    // Set the innerHTML
    const heroElement = document.getElementById("HeroCourseDetails");
    if (heroElement) {
      heroElement.innerHTML = CourseDetails;
    } else {
      console.error("Element with ID 'HeroCourseDetails' not found");
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    
    // Display error message to user
    const heroElement = document.getElementById("HeroCourseDetails");
    if (heroElement) {
      heroElement.innerHTML = `
        <div class="text-center py-12">
          <h2 class="text-2xl font-bold text-red-600 mb-4">Error Loading Course</h2>
          <p class="text-gray-600">Unable to load course details. Please try again later.</p>
        </div>
      `;
    }
  }
}

// Call function only if courseId exists
if (courseId) {
  fetchCourseDetailsPages();
} else {
  console.error("No course ID provided in URL parameters");
}
// ==================== Fetch API for Related Course=====================================

const url = "https://course-api.istad.co/api/v1";

async function fetchCourses() {
  try {
    const res = await fetch(`${url}/courses?page=0&size=4`);
    const data = await res.json();

    // data.content contains the course list
    const cardDisplay = data.content.map((pro) => {
      return `
       <div class="bg-white rounded-2xl shadow-lg w-full p-5 dark:bg-gray-800 dark:text-gray-200 transition-all duration-300 hover:scale-105 group" onClick="location.href='courseDetail.html?id=${pro.id}'"
>
        <div class="flex justify-center mb-4">
          <img src="${pro.thumbnail}" alt ${pro.title} class="rounded-xl w-full max-w-xs object-contain" />
        </div>
        <h2 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 dark:text-white">${pro.title}</h2>
        <p class="text-gray-600 text-md mb-4 line-clamp-2 dark:text-gray-300">${pro.description}</p>
        <div class="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <div class="flex items-center space-x-1">
           <span class="bg-yellow-600 text-yellow-100 rounded-xl px-2 py-1 text-sm font-semibold shadow-[0_0_8px_rgba(255,223,93,0.7)]">
  ${pro.categoryName}
</span>

          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-bold"> <img src="../imgs/ISTAD.png" alt=""> </div>
            <span class="text-gray-700 font-medium  dark:text-white">ISTAD</span>
             <div class="flex items-center text-gray-500">
             <span class="text-gray-700 text-2xl p-1 font-bold dark:text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$${pro.discount}</span>
           <span class="text-gray-500 text-md line-through dark:text-gray-300"> $${pro.price}</span>
           </div>
        </div>
      </div>
    </div>
      `;
    });

    document.getElementById("relatedCourses").innerHTML = cardDisplay.join("");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call function
fetchCourses();