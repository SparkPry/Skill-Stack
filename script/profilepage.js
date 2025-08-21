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


















function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page-content');
            pages.forEach(page => {
                page.classList.add('hidden');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.remove('hidden');
            
            // Update navigation
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                link.classList.remove('bg-gray-300', 'text-gray-800', 'font-medium', 'border-r-4', 'border-gray-600');
                link.classList.add('text-gray-600');
            });
            
            // Add active state to clicked link
            event.target.classList.remove('text-gray-600');
            event.target.classList.add('bg-gray-300', 'text-gray-800', 'font-medium', 'border-r-4', 'border-gray-600');
        }

        // Profile picture hover effect
        document.addEventListener('DOMContentLoaded', function() {
            const profileCircles = document.querySelectorAll('.w-24.h-24');
            
            profileCircles.forEach(circle => {
                circle.addEventListener('mouseenter', function() {
                    this.classList.add('transform', 'scale-110', 'shadow-lg');
                });
                
                circle.addEventListener('mouseleave', function() {
                    this.classList.remove('transform', 'scale-110', 'shadow-lg');
                });
            });
        });


 //  FAQ=====================================================================================================================

// Toggle FAQ items
        function toggleFAQ(button) {
            const faqItem = button.closest('.faq-item');
            const content = faqItem.querySelector('.faq-content');
            const icon = button.querySelector('.faq-icon');
            
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                content.classList.add('show');
                icon.style.transform = 'rotate(180deg)';
                faqItem.classList.add('bg-white/15');
            } else {
                content.classList.add('hidden');
                content.classList.remove('show');
                icon.style.transform = 'rotate(0deg)';
                faqItem.classList.remove('bg-white/15');
            }
        }

        // Filter FAQs by category
        function filterByCategory(event, category) {
            const faqItems = document.querySelectorAll('.faq-item');
            const buttons = document.querySelectorAll('.category-btn');
            
            // Update active button
            buttons.forEach(btn => {
                btn.classList.remove('bg-purple-500', 'text-white');
                btn.classList.add('bg-white/10', 'text-gray-300');
            });
            
            event.target.classList.add('bg-purple-500', 'text-white');
            event.target.classList.remove('bg-white/10', 'text-gray-300');
            
            // Filter items
            faqItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            checkForResults();
        }

        // Filter FAQs by search
        function filterFAQs() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-content p').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            
            checkForResults();
        }

        // Check if there are visible results
        function checkForResults() {
            const faqItems = document.querySelectorAll('.faq-item');
            const visibleItems = Array.from(faqItems).filter(item => item.style.display !== 'none');
            const noResults = document.getElementById('noResults');
            const faqContainer = document.getElementById('faqContainer');
            
            if (visibleItems.length === 0) {
                noResults.classList.remove('hidden');
                faqContainer.classList.add('hidden');
            } else {
                noResults.classList.add('hidden');
                faqContainer.classList.remove('hidden');
            }
        }

        // Add smooth scrolling and entrance animations
        document.addEventListener('DOMContentLoaded', function() {
            const faqItems = document.querySelectorAll('.faq-item');
            
            // Add entrance animation
            faqItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });

// sing out =======================================================================================================
        // Add custom animation delay
        const style = document.createElement('style');
        style.textContent = `
            .animation-delay-2000 {
                animation-delay: 2000ms;
            }
        `;
        document.head.appendChild(style);

        function handleLogout() {
            // Show loading overlay
            const overlay = document.getElementById('loadingOverlay');
            overlay.classList.remove('hidden');
            overlay.classList.add('flex');
            
            // Simulate logout process
            setTimeout(() => {
                alert('You have been successfully logged out!');
                // In a real application, you would redirect to login page or home
                // window.location.href = '/login';
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
            }, 2000);
        }

        function handleCancel() {
            // In a real application, you would redirect back to the previous page
            alert('Logout cancelled. Redirecting back...');
            // window.history.back();
        }

        function handleForgotPassword() {
            alert('Redirecting to password reset page...');
            // In a real application: window.location.href = '/forgot-password';
        }

        // Add hover effects and micro-interactions
        document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-1px)';
                });
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });
        });