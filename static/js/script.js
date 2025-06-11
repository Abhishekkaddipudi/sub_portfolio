// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Profile page loaded successfully!');
    
    // Initialize page functionality
    initializeCardHoverEffects();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeContactLinks();
});

// Card hover effects with enhanced animations
function initializeCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        card.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'translateY(-2px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }, 150);
            
            // You can add navigation logic here
            console.log('Card clicked:', this.querySelector('.card-title').textContent);
        });
    });
}

// Smooth scrolling for internal links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize scroll-based animations
function initializeAnimations() {
    // Create intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Apply animation to sections
    const sections = document.querySelectorAll('.skills-section, .contact-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Staggered animation for cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
        observer.observe(item);
    });
}

// Enhanced contact link functionality
function initializeContactLinks() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.querySelector('span').textContent;
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Log the interaction (you can replace this with actual functionality)
            console.log(`Contact link clicked: ${linkText}`);
            
            // Special handling for specific links
            if (linkText === 'Buy me a Coffee !') {
                // You can add special coffee buying logic here
                showNotification('Thanks for considering buying me a coffee! ☕');
            }
        });
    });
}

// Social link functionality
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.querySelector('span').textContent;
            console.log(`Social link clicked: ${linkText}`);
            
            // Add ripple effect
            createRippleEffect(this, e);
        });
    });
}

// Create ripple effect for buttons
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
    `;
    
    // Add ripple animation CSS if not already present
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Show notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3a2540;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Typing animation for the main title
function initializeTypingAnimation() {
    const title = document.querySelector('.main-title');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
}

// Skill item hover effects
function initializeSkillEffects() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Parallax effect for sections
function initializeParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.02 * (index + 1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Theme toggle functionality (bonus feature)
function initializeThemeToggle() {
    // You can add a theme toggle button to switch between dark/light modes
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: #3a2540;
        border: none;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        this.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });
    
    // Uncomment the next line if you want to add the theme toggle
    // document.body.appendChild(themeToggle);
}

// Loading animation
function initializeLoadingAnimation() {
    // Add loading overlay
    const loader = document.createElement('div');
    loader.id = 'loading-overlay';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #191919;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 50px;
        height: 50px;
        border: 3px solid #2f212f;
        border-top: 3px solid #c7c7c7;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    loader.appendChild(spinner);
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Profile page loaded successfully!');
    
    // Initialize all features
    initializeCardHoverEffects();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeContactLinks();
    initializeSocialLinks();
    initializeSkillEffects();
    initializeThemeToggle();
    
    // Optional: Add loading animation
    // initializeLoadingAnimation();
    
    // Optional: Add typing animation
    // initializeTypingAnimation();
    
    // Optional: Add parallax effect (can be performance intensive)
    // initializeParallaxEffect();
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});


let allCards = [];

function renderCards(cards) {
    const container = document.getElementById('cards-grid');
    container.innerHTML = ''; // Clear previous content

    cards.forEach(card => {
        const article = document.createElement('article');
        article.className = card.class;

        const a = document.createElement('a');
        a.href = card.href;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.style.textDecoration = 'none';

        const img = document.createElement('img');
        img.src = card.img.src;
        img.alt = card.img.alt;
        img.className = card.img.class;

        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = card.title;

        const description = document.createElement('p');
        description.className = card.descriptionClass;
        description.textContent = card.description;

        article.appendChild(img);
        article.appendChild(title);
        article.appendChild(description);
        a.appendChild(article);
        container.appendChild(a);
    });
}

function filterCards(tag) {
    if (tag === 'all') {
        renderCards(allCards);
    } else {
        const filtered = allCards.filter(card => card.tag === tag);
        renderCards(filtered);
    }
}

// Load and render all cards on page load
fetch('/portfolio/portfolio/static/cards.json')
    .then(response => response.json())
    .then(cards => {
        allCards = cards;
        renderCards(allCards);
    })
    .catch(error => console.error('Error loading cards:', error));

    document.getElementById('nav-toggle').addEventListener('click', function () {
        document.getElementById('nav-links').classList.toggle('show');
    });