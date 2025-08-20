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

// API APPYY CARD
const container = document.getElementById("Container_card");
const prevBtn = document.getElementById("prevBtn"); // Re-added
const nextBtn = document.getElementById("nextBtn");
const paginationDots = document.getElementById("paginationDots");

let allCourses = [];
let filteredCourses = [];
let currentPage = 1;
const cardsPerPage = 8;
let totalPages = 1;

// Fetch courses from API
async function fetchCourses() {
  try {
    const url = "https://course-api.istad.co/api/v1/courses?page=0&size=40";
    const res = await fetch(url);
    const data = await res.json();
    allCourses = data.content;
    filteredCourses = [...allCourses];
    totalPages = Math.ceil(filteredCourses.length / cardsPerPage);
    renderDots();
    renderCards();
  } catch (err) {
    console.error("Failed to load courses:", err);
  }
}

// Render cards
function renderCards() {
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const visibleCourses = filteredCourses.slice(start, end);

  container.innerHTML = visibleCourses.map(pro => `
     <div class="w-full bg-white rounded-[12px] shadow-md p-4 flex flex-col space-y-4 dark:bg-gray-700 dark:text-white transition-colors duration-300" onClick="location.href='./courseDetail.html?id=${pro.id}'">
  <div class="flex justify-center mb-4">
    <img src="${pro.thumbnail}" alt="${pro.title}" class="rounded-xl w-full max-w-xs object-contain" />
  </div>
  <h2 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 dark:text-white">${pro.title}</h2>
  <p class="text-gray-600 text-md mb-4 line-clamp-2 dark:text-gray-300">${pro.description}</p>
  <div class="flex items-center text-sm text-gray-500 mb-4 space-x-4">
    <span class="bg-yellow-600 text-yellow-100 rounded-xl px-2 py-1 text-sm font-semibold shadow-[0_0_8px_rgba(255,223,93,0.7)]">
      ${pro.categoryName}
    </span>
  </div>
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-bold">
        <img src="../imgs/ISTAD.png" alt="ISTAD">
      </div>
      <span class="text-gray-700 dark:text-white font-medium">ISTAD</span>
      <div class="flex items-center text-gray-500">
        <span class="text-gray-700 text-2xl p-1 font-bold dark:text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$${pro.discount}</span>
        <span class="text-gray-500 text-md line-through dark:text-gray-300">$${pro.price}</span>
      </div>
    </div>
  </div>
</div>
  `).join("");

  updateDots();
  updateButtons();
}

// Render pagination dots
function renderDots() {
  paginationDots.innerHTML = "";
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("span");
    dot.className = "w-3 h-3 rounded-full cursor-pointer transition";
    dot.addEventListener("click", () => {
      currentPage = i + 1;
      renderCards();
    });
    paginationDots.appendChild(dot);
  }
}

// Update dots highlighting
function updateDots() {
  const dots = paginationDots.querySelectorAll("span");
  dots.forEach((dot, index) => {
    dot.className = `w-3 h-3 rounded-full cursor-pointer ${index + 1 === currentPage ? "bg-purple-500" : "bg-gray-300"}`;
  });
}

// Pagination buttons
nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
  } else {
    currentPage = 1; // Cycle back to the first page
  }
  renderCards();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
  } else {
    currentPage = totalPages; // Cycle to the last page
  }
  renderCards();
});

// Search functionality
document.getElementById("SearchInput").addEventListener("keyup", e => {
  if (e.key === "Enter") {
    const query = e.target.value.toLowerCase();
    filteredCourses = allCourses.filter(course =>
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.categoryName.toLowerCase().includes(query)
    );
    currentPage = 1;
    totalPages = Math.ceil(filteredCourses.length / cardsPerPage);
    renderDots();
    renderCards();
  }
});

// Function to update button states (optional)
function updateButtons() {
  // Add logic if you want to disable buttons at edges (optional)
}

fetchCourses();



// =============================================================================
// DOM elements
const openFilter = document.getElementById("openFilter");
const closeFilter = document.getElementById("closeFilter");
const overlay = document.getElementById("overlay");
const filterAside = document.getElementById("filterAside");
const priceRange = document.getElementById("priceRange");
const currentPrice = document.getElementById("currentPrice");
const applyFilters = document.getElementById("applyFilters");
const clearFilters = document.getElementById("clearFilters");

// Open filter aside
openFilter.addEventListener("click", function () {
  overlay.classList.remove("hidden");
  setTimeout(() => {
    overlay.classList.add("opacity-100");
    filterAside.classList.remove("-translate-x-full");
  }, 10);
  document.body.style.overflow = "hidden"; // Prevent scrolling
});

// Close filter aside
function closeFilterAside() {
  overlay.classList.remove("opacity-100");
  filterAside.classList.add("-translate-x-full");
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 300);
  document.body.style.overflow = ""; // Restore scrolling
}

// Close button click
closeFilter.addEventListener("click", closeFilterAside);

// Close on overlay click
overlay.addEventListener("click", function (e) {
  if (e.target === overlay) {
    closeFilterAside();
  }
});

// Close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !overlay.classList.contains("hidden")) {
    closeFilterAside();
  }
});

// Price range slider functionality
priceRange.addEventListener("input", function () {
  currentPrice.textContent = `${this.value}`;
});

// Apply filters functionality
applyFilters.addEventListener("click", function () {
  const selectedFilters = {
    categories: [],
    levels: [],
    priceRange: priceRange.value,
    ratings: [],
  };

  // Collect category filters
  document
    .querySelectorAll(
      'input[value="development"], input[value="business"], input[value="design"], input[value="marketing"], input[value="data-science"], input[value="it-software"]'
    )
    .forEach((checkbox) => {
      if (checkbox.checked) {
        selectedFilters.categories.push(checkbox.value);
      }
    });

  // Collect level filters
  document
    .querySelectorAll(
      'input[value="beginner"], input[value="intermediate"], input[value="advanced"], input[value="all-levels"]'
    )
    .forEach((checkbox) => {
      if (checkbox.checked) {
        selectedFilters.levels.push(checkbox.value);
      }
    });

  // Collect rating filters
  document.querySelectorAll('input[value$="-stars"]').forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFilters.ratings.push(checkbox.value);
    }
  });

  console.log("Applied Filters:", selectedFilters);

  // Visual feedback
  applyFilters.textContent = "Applied!";
  applyFilters.classList.add("bg-emerald-600");
  setTimeout(() => {
    applyFilters.textContent = "Apply Filters";
    applyFilters.classList.remove("bg-emerald-600");
    // Close the aside after applying filters
    closeFilterAside();
  }, 1000);
});

// Clear all filters functionality
clearFilters.addEventListener("click", function () {
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });

  priceRange.value = 100;
  currentPrice.textContent = "$100";

  console.log("All filters cleared");

  // Visual feedback
  clearFilters.textContent = "Cleared!";
  clearFilters.classList.add("bg-gray-300");
  setTimeout(() => {
    clearFilters.textContent = "Clear All";
    clearFilters.classList.remove("bg-gray-300");
  }, 1000);
});

// Add hover effects and animations
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      this.parentElement.classList.add("scale-105");
      setTimeout(() => {
        this.parentElement.classList.remove("scale-105");
      }, 150);
    }
  });
});
