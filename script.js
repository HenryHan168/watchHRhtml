document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentLang = 'en';

    function switchLang(lang) {
        currentLang = lang;
        
        // Update language buttons
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Switch all elements with data-en/data-zh attributes
        document.querySelectorAll('[data-en]').forEach(el => {
            const text = el.getAttribute('data-' + lang);
            if (text) {
                el.textContent = text;
            }
        });
        
        // Update screenshot images based on language
        updateScreenshots(lang);
    }

    // Screenshot carousel functionality
    const indicators = document.querySelectorAll('.indicator');
    const screens = document.querySelectorAll('.watch-screen');
    let currentScreen = 0;
    let autoPlayInterval;

    function showScreen(index) {
        // Hide all screens
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show selected screen and indicator
        screens[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentScreen = index;
    }

    function nextScreen() {
        const next = (currentScreen + 1) % screens.length;
        showScreen(next);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextScreen, 3000);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    // Update screenshots based on language
    function updateScreenshots(lang) {
        const screenImages = document.querySelectorAll('.screen-image');
        const screenshotImages = document.querySelectorAll('.screenshot-image');
        
        screenImages.forEach((img, index) => {
            const currentSrc = img.src;
            const newSrc = currentSrc.replace(`/${currentLang === 'en' ? 'zh_TW' : 'en_US'}/`, `/${lang === 'en' ? 'en_US' : 'zh_TW'}/`);
            img.src = newSrc;
        });
        
        screenshotImages.forEach((img, index) => {
            const currentSrc = img.src;
            const newSrc = currentSrc.replace(`/${currentLang === 'en' ? 'zh_TW' : 'en_US'}/`, `/${lang === 'en' ? 'en_US' : 'zh_TW'}/`);
            img.src = newSrc;
        });
    }

    // Event listeners for language switching
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            switchLang(this.dataset.lang);
        });
    });

    // Event listeners for screenshot indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showScreen(index);
            stopAutoPlay();
            startAutoPlay(); // Restart autoplay
        });
    });

    // Pause autoplay when hovering over watch device
    const watchDevice = document.querySelector('.watch-device');
    if (watchDevice) {
        watchDevice.addEventListener('mouseenter', stopAutoPlay);
        watchDevice.addEventListener('mouseleave', startAutoPlay);
    }

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .screenshot-item, .privacy-card').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (hero && heroVisual) {
            const rate = scrolled * -0.5;
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });

    // Initialize
    switchLang('en');
    showScreen(0);
    startAutoPlay();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .screenshot-item, .privacy-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-card.animate-in, .screenshot-item.animate-in, .privacy-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        body.loaded .hero-content,
        body.loaded .hero-visual {
            animation: none;
        }
        
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
            
            .nav-links.active {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);
}); 