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

// Team member data
const teamMembers = [
  {
    name: "CHOENG SREYLEAK",
    title: "Group Leader",
    description: "Driving growth through innovative marketing strategies",
    image: "../imgs/img-team/img001.jpg",
  },
  {
    name: "KOY SOKKEA",
    title: "Sub Leader",
    description: "Creating beautiful and functional user experiences",
    image: "../imgs/p2.JPG",
  },
  {
    name: "LUY LYHAI",
    title: "Team Member",
    description: "Lea creative vision and brand strategy",
    image: "../imgs/img-team/img003.jpg",
  },
  {
    name: "TRY SOPHANY",
    title: "Team Member",
    description: "Orchestrating product development and strategy",
    image: "../imgs/img-team/img004.jpg",
  },
  {
    name: "SROEUM SAREN",
    title: "Team Member",
    description: "Building relationships and driving revenue growth",
    image: "../imgs/img-team/img005.jpg",
  },
  {
    name: "CHRACH SAVOEUN",
    title: "Team Member",
    description: "Crafting intuitive and delightful user experiences",
    image: "../imgs/img-team/img006.jpg",
  },
  {
    name: "SAN SOPHEAK",
    title: "Team Member",
    description: "Building robust and scalable software solutions",
    image: "../imgs/img-team/img007.jpg",
  },
];

// Create circular layout for desktop
function createCircularLayout() {
  const container = document.getElementById("teamMembers");
  if (!container) return;

  const radius = 380; // Increased radius for better spacing
  const centerX = container.offsetWidth / 2;
  const centerY = container.offsetHeight / 2;

  teamMembers.forEach((member, index) => {
    const angle = (index / teamMembers.length) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    const memberCard = document.createElement("div");
    // Removed background and shadow for desktop, keeping transparent look
    memberCard.className =
      "absolute w-80 rounded-2xl p-4 transition-all duration-500 hover:scale-105 animate-fadeIn bg-transparent";
    memberCard.style.left = `${x - 160}px`;
    memberCard.style.top = `${y - 80}px`;
    memberCard.style.animationDelay = `${index * 0.2}s`;

    memberCard.innerHTML = `
                    <div class="flex items-center border border-2 border-blue-500 gap-4 hover:bg-white/20 hover:backdrop-blur-sm rounded-3xl p-4 transition-all duration-300 h-56  transition-colors duration-300 mt-4">
                        <div class="member-image w-36 h-36 rounded-full p-1 flex-shrink-0 shadow-lg">
                            <img src="${member.image}" alt="${member.name}" class="w-full h-full rounded-full object-cover">
                        </div>
                        <div class="flex-1 text-center">
                            <h3 class="text-lg font-bold text-[#40a0d9;] mb-1 drop-shadow-sm">${member.name}</h3>
                            <p class="text-[#434343;] font-semibold text-sm mb-2 drop-shadow-sm dark:text-white">${member.title}</p>
                            <p class="text-[#434343;] text-xs mb-3 drop-shadow-sm  dark:text-white">
                              </p>
                            <div class="flex gap-3 text-center items-center justify-center">
                                <a href="#" class="hover:text-blue-800 transition-colors transform hover:scale-125 drop-shadow-sm">
                                    <i class="fa-brands fa-facebook-f" style="color: #40a0d9;"></i>
                                </a>
                                <a href="#" class="text-[#40a0d9;] hover:text-blue-800 transition-colors transform hover:scale-125 drop-shadow-sm">
                                    <i class="fab fa-twitter text-lg"></i>
                                </a>
                                <a href="#" class="text-[#40a0d9;] hover:text-blue-800 transition-colors transform hover:scale-125 drop-shadow-sm">
                                    <i class="fab fa-linkedin-in text-lg"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                `;

    container.appendChild(memberCard);
  });
}

// Initialize on load
document.addEventListener("DOMContentLoaded", function () {
  createCircularLayout();

  // Add click effect to center circle
  const centerCircle = document.getElementById("centerCircle");
  if (centerCircle) {
    centerCircle.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  }

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-slideInUp");
      }
    });
  }, observerOptions);

  // Observe all team cards
  document.querySelectorAll(".team-card").forEach((card) => {
    observer.observe(card);
  });
});

// Handle window resize
window.addEventListener("resize", function () {
  const container = document.getElementById("teamMembers");
  if (container && window.innerWidth >= 1024) {
    container.innerHTML = "";
    createCircularLayout();
  }
});

// Add smooth scrolling
document.addEventListener("click", function (e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});
