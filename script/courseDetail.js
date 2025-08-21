
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


// ==================== get course slug for hero section course details=====================================
// Get course slug from URL
const params = new URLSearchParams(window.location.search);
const courseSlug = params.get("slug");

const baseUrl = "https://course-api.istad.co/api/v1";

// ====================== 1. Fetch Hero Section ======================
async function fetchHeroSection() {
  try {
    const res = await fetch(`${baseUrl}/courses/slug/${courseSlug}?part=CONTENT_DETAILS`);
    const data = await res.json();
    const course = data.data || data;

    const heroHTML = `
  <section class="bg-[#40a0d9] text-white py-12 md:py-16 lg:py-20 mt-7"> 
  <div class="container  mx-auto px-9 p-8 mt-12 bg-white dark:bg-gray-900 rounded-3xl">
   <div class="flex flex-col lg:flex-row items-center justify-between">
    <!-- Course Info --> <div class="lg:w-2/3 mb-8 lg:mb-0">
     <h1 class="text-4xl lg:text-5xl font-bold mb-4 p-2 text-gray-900 dark:text-white"> ${course.title || "Course Title"} </h1>
      <p class="text-md mb-6 p-2 opacity-90 text-gray-800 dark:text-gray-300">
       ${course.description || "Course Description"} 
       </p>
        <div class="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-4 space-y-4 lg:space-y-0 mb-6">
         <div class="px-9 flex justify-center items-center text-xl bg-yellow-600 hover:bg-amber-500 rounded-lg p-2 text-white dark:text-">
          ${course.categoryName || "Category"}
         </div> </div> <div class="flex items-center space-x-6 text-lg p-2"> <div class="flex items-center"> <i class="fas fa-play-circle mr-2"></i>
          <span class="text-gray-700 dark:text-white">130Lesson</span> </div> </div> </div> <!-- Pricing Card --> 
          <div class="max-w-sm mx-auto rounded-xl shadow-md overflow-hidden border-gray-200 p-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 dark:border-0">
           <div class="flex justify-center mb-4"> <div class="relative w-full flex justify-center items-center"> <img src="${course.thumbnail}" class="w-full rounded-xl"/> 
           <div class="absolute inset-0 flex items-center justify-center"> <i class="fas fa-play-circle text-white text-6xl drop-shadow-lg hover:text-gray-200"></i> </div> </div> </div> 
           <div class="p-5 mt-3 flex items-center justify-center"> 
           <button onclick="openPaymentModal('Premium Plan', '$${course.discount || course.price || "0"}')" class="px-9 bg-blue-400 p-3 border-gray-600 text-white dark:text-gray-300 font-semibold py-2 rounded-md hover:bg-[#40a0d9] dark:hover:bg-gray-900 transition duration-300">
            Enroll Now </button>&nbsp;&nbsp; <span class="text-gray-700 text-2xl dark:text-white">$${course.discount || "0"}</span>&nbsp; <span class="text-gray-400 line-through text-md">$${course.price || "0"}</span> </div> </div> </div> </div> </section>
    `;
    document.getElementById("HeroCourseDetails").innerHTML = heroHTML;

  } catch (err) {
    console.error("Error fetching hero section:", err);
  }
}

// ====================== 2. Fetch Video / Curriculum Section ======================
async function fetchVideoSection() {
  try {
    const res = await fetch(`${baseUrl}/courses/slug/${courseSlug}?part=CONTENT_DETAILS`);
    const data = await res.json();
    const course = data.data || data;

    let videoHTML = "";
    if (course.sections && course.sections.length > 0) {
      videoHTML = course.sections.map((section, idx) => `
        <div class="border rounded-md mb-3">
          <button onclick="toggleDropdown(${idx})"
            class="w-full flex justify-between items-center p-3 text-left font-semibold text-gray-900 hover:bg-gray-50">
            <span>${section.title}</span>
            <i class="fas fa-chevron-down"></i>
          </button>
          <div id="dropdown-${idx}" class="hidden px-4 py-2 space-y-4">
            ${section.videos && section.videos.length > 0
          ? section.videos.map(video => `
                <div class="p-3 rounded-md bg-gray-50">
                  <div class="flex items-center space-x-3 mb-2">
                    <i class="fas fa-play-circle text-blue-500"></i>
                    <span class="font-medium">${video.title}</span>
                  </div>
                  ${video.fileName
              ? `<a href="${video.fileName}" class="text-blue-600 hover:underline">${video.title}</a>`
              : `<button class="watch-video-btn text-blue-600 hover:underline" data-video="${encodeURIComponent(video.videoFrame || '')}">
    Watch Video
 </button>`}
                </div>
              `).join("")
          : `<p class="text-gray-400">No videos available</p>`}
          </div>
        </div>
      `).join("");
    } else {
      videoHTML = `<p class="text-gray-400">No sections available</p>`;
    }

    document.getElementById("videoContainer").innerHTML = videoHTML;

  } catch (err) {
    console.error("Error fetching video section:", err);
  }
}

// ====================== 3. Fetch Related Courses ======================
async function fetchRelatedCourses() {
  try {
    const res = await fetch(`${baseUrl}/courses?page=0&size=4`);
    const data = await res.json();

    const relatedHTML = data.content.map(pro => `
      <div class="w-full bg-white rounded-[12px] shadow-md p-4 flex flex-col space-y-4 dark:bg-gray-700 dark:text-white transition-colors duration-300" onClick="location.href='./courseDetail.html?slug=${pro.slug}'"> <div class="flex justify-center mb-4"> <img src="${pro.thumbnail}" alt="${pro.title}" class="rounded-xl w-full max-w-xs object-contain" /> </div> <h2 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 dark:text-white">${pro.title}</h2> <p class="text-gray-600 text-md mb-4 line-clamp-2 dark:text-gray-300">${pro.description}</p> <div class="flex items-center text-sm text-gray-500 mb-4 space-x-4"> <span class="bg-yellow-600 text-yellow-100 rounded-xl px-2 py-1 text-sm font-semibold shadow-[0_0_8px_rgba(255,223,93,0.7)]"> ${pro.categoryName} </span> </div> <div class="flex items-center justify-between"> <div class="flex items-center space-x-2"> <img src="../imgs/ISTAD.png" alt="ISTAD" class="w-8 h-8 rounded-full"/> <span class="text-gray-700 dark:text-white font-medium">ISTAD</span> <div class="flex items-center text-gray-500"> <span class="text-gray-700 text-2xl p-1 font-bold dark:text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$${pro.discount}</span> <span class="text-gray-500 text-md line-through dark:text-gray-300">$${pro.price}</span> </div> </div> </div> </div>
    `).join("");

    document.getElementById("relatedCourses").innerHTML = relatedHTML;

  } catch (err) {
    console.error("Error fetching related courses:", err);
  }
}

// ====================== Helpers ======================
// Fixed JavaScript functions
function toggleDropdown(idx) {
    const el = document.getElementById(`dropdown-${idx}`); // Fixed template literal
    el.classList.toggle("hidden");
    
    // Also toggle the chevron icon
    const button = el.previousElementSibling;
    const icon = button.querySelector('i');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
}

// safer open/close
function openVideoModal(videoUrl) {
  try {
    if (!videoUrl) {
      console.error("openVideoModal: no videoUrl provided");
      return;
    }

    const modal = document.getElementById("videoModal");
    const iframe = document.getElementById("videoFrame");
    if (!modal || !iframe) {
      console.error("openVideoModal: modal or iframe not found (check IDs)");
      return;
    }

    let src = videoUrl;

    // Try to extract YouTube ID (watch?v= / youtu.be / embed)
    const ytMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/);
    if (ytMatch) {
      src = `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    } else if (videoUrl.includes("youtube.com") && !videoUrl.includes("embed")) {
      // fallback to add autoplay if not embed
      src = videoUrl + (videoUrl.includes("?") ? "&" : "?") + "autoplay=1";
    }

    iframe.src = src;
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden"); // optional: prevent background scroll
  } catch (err) {
    console.error("openVideoModal error:", err);
  }
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal");
  const iframe = document.getElementById("videoFrame");
  if (iframe) iframe.src = "";
  if (modal) modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

// close when clicking outside modal content
window.addEventListener("click", (e) => {
  const modal = document.getElementById("videoModal");
  if (modal && e.target === modal) {
    closeVideoModal();
  }
});

// ====================== Run All ======================
if (courseSlug) {
  fetchHeroSection();
  fetchVideoSection();
  fetchRelatedCourses();
} else {
  console.error("No course slug in URL");
}


// =======================open video modal==========================================

// =====================dropdown video===============================
function toggleDropdown(id) {
  const dropdown = document.getElementById(`dropdown-${id}`);
  const arrow = document.getElementById(`arrow-${id}`);

  dropdown.classList.toggle("hidden");
  arrow.classList.toggle("rotate-180");
}

function expandAll(event) {
  event.preventDefault();

  // Get all dropdowns and arrows
  const dropdowns = document.querySelectorAll('[id^="dropdown-"]');
  const arrows = document.querySelectorAll('[id^="arrow-"]');

  dropdowns.forEach(dropdown => dropdown.classList.remove("hidden"));
  arrows.forEach(arrow => arrow.classList.add("rotate-180"));
}





//   ================================== Payment Section ===============================================
    let selectedPlan = "";
    let selectedPrice = "";

    function openPaymentModal(planName, price) {
      selectedPlan = planName;
      selectedPrice = price;
      document.getElementById(
        "selectedPlan"
      ).textContent = `${planName} - ${price}`;

      const overlay = document.getElementById("modalOverlay");
      const modal = document.getElementById("paymentModal");

      // Show overlay
      overlay.classList.remove("opacity-0", "invisible");
      overlay.classList.add("opacity-100", "visible");

      // Show modal with animation
      setTimeout(() => {
        modal.classList.remove("scale-95", "opacity-0");
        modal.classList.add("scale-100", "opacity-100");
      }, 50);

      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    }

    function closeModal(event) {
      if (
        event &&
        event.target !== event.currentTarget &&
        !event.target.closest("button")
      ) {
        return;
      }

      const overlay = document.getElementById("modalOverlay");
      const modal = document.getElementById("paymentModal");

      // Hide modal with animation
      modal.classList.remove("scale-100", "opacity-100");
      modal.classList.add("scale-95", "opacity-0");

      // Hide overlay after animation
      setTimeout(() => {
        overlay.classList.remove("opacity-100", "visible");
        overlay.classList.add("opacity-0", "invisible");
      }, 200);

      // Restore scrolling
      document.body.style.overflow = "auto";

      // Reset form
      document.getElementById("paymentForm").reset();
    }

    function processPayment(event) {
      event.preventDefault();

      const submitBtn = document.getElementById("submitBtn");
      const submitText = document.getElementById("submitText");
      const loadingSpinner = document.getElementById("loadingSpinner");

      // Show loading state
      submitBtn.disabled = true;
      submitText.classList.add("hidden");
      loadingSpinner.classList.remove("hidden");

      // Simulate payment processing
      setTimeout(() => {
        // Success state
        submitBtn.classList.remove("from-purple-600", "to-blue-600");
        submitBtn.classList.add("from-green-500", "to-green-600");
        loadingSpinner.classList.add("hidden");
        submitText.textContent = "Payment Successful!";
        submitText.classList.remove("hidden");

        setTimeout(() => {
          alert(
            `Payment successful for ${selectedPlan}! Thank you for your purchase.`
          );
          closeModal();

          // Reset button state
          submitBtn.disabled = false;
          submitBtn.classList.remove("from-green-500", "to-green-600");
          submitBtn.classList.add("from-purple-600", "to-blue-600");
          submitText.textContent = "Complete Payment";
        }, 1500);
      }, 2000);
    }

    // Format card number input
    document
      .getElementById("cardNumber")
      .addEventListener("input", function (e) {
        let value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "");
        let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
        e.target.value = formattedValue;
      });

    // Format expiry date input
    document.getElementById("expiry").addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      e.target.value = value;
    });

    // Only allow numbers in CVV
    document.getElementById("cvv").addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D/g, "");
    });

    // Close modal with Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal();
      }
    });

    // Tab functionality
    const tabs = document.querySelectorAll(".nav-tab");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        tabs.forEach((t) => {
          t.classList.remove(
            "active",
            "text-blue-600",
            "border-b-2",
            "border-blue-600"
          );
          t.classList.add("text-gray-600");
        });

        // Add active class to clicked tab
        tab.classList.add(
          "active",
          "text-blue-600",
          "border-b-2",
          "border-blue-600"
        );
        tab.classList.remove("text-gray-600");

        // Hide all tab contents
        tabContents.forEach((content) => {
          content.classList.add("hidden");
        });

        // Show corresponding content
        const targetTab = tab.getAttribute("data-tab");
        document.getElementById(targetTab).classList.remove("hidden");
      });
    });

    // Add to cart functionality
    document.getElementById("addToCart").addEventListener("click", () => {
      // Simple notification (in a real app, this would add to cart)
      const button = document.getElementById("addToCart");
      const originalText = button.textContent;

      button.textContent = "Added to Cart!";
      button.classList.add("bg-green-600");
      button.classList.remove("bg-blue-600");

      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("bg-green-600");
        button.classList.add("bg-blue-600");
      }, 2000);
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });

    // Add some scroll effects
    window.addEventListener("scroll", () => {
      const nav = document.querySelector(".sticky");
      if (window.scrollY > 100) {
        nav.classList.add("shadow-md");
      } else {
        nav.classList.remove("shadow-md");
      }
    });
    // ==========================================
    function toggleDropdown(id) {
      const dropdown = document.getElementById(`dropdown-${id}`);
      const arrow = document.getElementById(`arrow-${id}`);

      dropdown.classList.toggle("hidden");
      arrow.classList.toggle("rotate-0");
      arrow.classList.toggle("rotate-180");
    }

    function expandAll(e) {
      e.preventDefault();
      for (let i = 1; i <= 5; i++) {
        const dropdown = document.getElementById(`dropdown-${i}`);
        const arrow = document.getElementById(`arrow-${i}`);

        dropdown.classList.remove("hidden");
        arrow.classList.remove("rotate-0");
        arrow.classList.add("rotate-180");
      }
    }