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
 let currentSlide = 0;
        const container = document.querySelector(".testimonial-container");
        const slides = document.querySelectorAll(".testimonial-slide");
        const dots = document.querySelectorAll(".pagination-dot");

        let totalSlides = slides.length;

        // Clone first slide and append
        const firstClone = slides[0].cloneNode(true);
        container.appendChild(firstClone);
        totalSlides++;

        function showSlide(index) {
            container.style.transition = "transform 0.5s ease-in-out";
            container.style.transform = `translateX(-${index * 100}%)`;

            // Update dots (ignore cloned slide)
            dots.forEach((dot, i) => {
                if (i === index % (totalSlides - 1)) {
                    dot.classList.add("bg-blue-600");
                    dot.classList.remove("bg-gray-300");
                } else {
                    dot.classList.add("bg-gray-300");
                    dot.classList.remove("bg-blue-600");
                }
            });

            currentSlide = index;
        }

        container.addEventListener("transitionend", () => {
            if (currentSlide === totalSlides - 1) {
                container.style.transition = "none";
                container.style.transform = "translateX(0%)";
                currentSlide = 0;
            }
        });

        // Auto play
        setInterval(() => {
            currentSlide++;
            showSlide(currentSlide);
        }, 7000);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
// ========================slide text loop=================================
        // Optional: Add pause on hover
        const banner = document.querySelector('.slide-text');
        const containerr = document.querySelector('.slide-container');
        
        containerr.addEventListener('mouseenter', () => {
            banner.style.animationPlayState = 'paused';
        });
        
        containerr.addEventListener('mouseleave', () => {
            banner.style.animationPlayState = 'running';
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
        setTimeout(showNextLine, 700); // Wait for typewriter + small delay
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
// =================================================
const url = "https://course-api.istad.co/api/v1";

async function fetchCourses() {
  try {
    const res = await fetch(`${url}/courses?page=0&size=4`);
    const data = await res.json();

    // data.content contains the course list
    const cardDisplay = data.content.map((pro) => {
      return `
        <div class="bg-white rounded-2xl shadow-lg w-full p-5 dark:bg-gray-800 dark:text-gray-200 transition-all duration-300 hover:scale-105 group" onClick="location.href='./pages/courseDetail.html?slug=${pro.slug}'"
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
            <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-bold"> <img src="./imgs/ISTAD.png" alt=""> </div>
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

    document.getElementById("images").innerHTML = cardDisplay.join("");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call function
fetchCourses();
