// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slideshow
    initSlideshow();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations (simplified)
    initScrollAnimations();
});

// Slideshow functionality
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    
    // Set up click events for indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            currentSlide = parseInt(indicator.dataset.index);
            updateSlideshow();
        });
    });
    
    // Function to update slideshow
    function updateSlideshow() {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    // Auto advance slideshow
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlideshow();
    }
    
    // Start the slideshow timer
    setInterval(nextSlide, slideInterval);
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnMenuBtn && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
    
    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// Simplified scroll animations - focused on content visibility
function initScrollAnimations() {
    // Get elements that should animate on scroll (reduced set)
    const animateElements = [
        document.querySelector('.about-section'),
        document.querySelector('.sponsors-section')
    ];
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Add animate-in class when element appears in viewport
    function checkScroll() {
        animateElements.forEach(element => {
            if (element && isInViewport(element) && !element.classList.contains('animate-in')) {
                element.classList.add('animate-in');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
}

// Make header sticky and change its appearance on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    
    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 2rem';
        header.style.backgroundColor = 'rgba(0, 48, 73, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.padding = '1rem 2rem';
        header.style.backgroundColor = '#003049';
        header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Account for header height
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mainNav = document.querySelector('.main-nav');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
});

// Add CSS class for scroll animations (simplified)
const scrollAnimationStyle = document.createElement('style');
scrollAnimationStyle.textContent = `
    .animate-in {
        animation: fadeIn 0.5s ease forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .about-section, .sponsors-section {
        opacity: 0;
    }
`;
document.head.appendChild(scrollAnimationStyle);