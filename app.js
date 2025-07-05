// Enhanced Tennis-themed Portfolio JavaScript with 3D Court Animation

const EMAILJS_CONFIG = {
    publicKey: '-BoSpDCEFmsg40Pjr',          // Replace with your EmailJS public key
    serviceId: 'service_a7hlyon',          // Replace with your EmailJS service ID
    templateId: 'template_w8q6wk6'         // Replace with your EmailJS template ID
};

function validateForm() {
    const form = document.getElementById('contact-form');
    if (!form) {
        console.error('Contact form not found');
        return false;
    }
    
    // More flexible field selection to handle different naming conventions
    const name = form.querySelector('input[name="from_name"]') || 
                 form.querySelector('input[name="name"]') ||
                 form.querySelector('input[name="user_name"]');
    
    const email = form.querySelector('input[name="from_email"]') || 
                  form.querySelector('input[name="email"]') ||
                  form.querySelector('input[name="user_email"]');
    
    const message = form.querySelector('textarea[name="message"]');
    
    let isValid = true;
    const errors = [];
    
    // Clear previous error styles
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    
    // Name validation
    if (!name || !name.value.trim()) {
        errors.push('Name is required');
        if (name) name.classList.add('error');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
        name.classList.add('error');
        isValid = false;
    }
    
    // Email validation with better regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    if (!email || !email.value.trim()) {
        errors.push('Email is required');
        if (email) email.classList.add('error');
        isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        errors.push('Please enter a valid email address');
        email.classList.add('error');
        isValid = false;
    }
    
    // Message validation
    if (!message || !message.value.trim()) {
        errors.push('Message is required');
        if (message) message.classList.add('error');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
        message.classList.add('error');
        isValid = false;
    }
    
    if (!isValid) {
        showToast('Please fix the following errors: ' + errors.join(', '), 'error');
        // Focus on first error field
        const firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
    }
    
    return isValid;
}


document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized successfully');
    } else {
        console.error('EmailJS library not loaded! Make sure to include the EmailJS script.');
    }

    // Navigation Elements
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    // Form Elements
    const contactForm = document.getElementById('contact-form');
    
    // Sections for scroll spy
    const sections = document.querySelectorAll('section[id]');
    
    // Loading Screen Elements
    const loadingScreen = document.getElementById('loading-screen');
    
    // 3D Court Elements
    const courtLines = document.querySelectorAll('.court-line-3d');
    const tennisBall3D = document.querySelector('.tennis-ball-3d');
    const courtContainer = document.querySelector('.court-container');
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Mobile Navigation Toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show-menu');
            
            // Animate hamburger menu
            const hamburger = navToggle.querySelector('.hamburger');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show-menu');
            const hamburger = navToggle.querySelector('.hamburger');
            hamburger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll Spy - Active Navigation Links
    function scrollSpy() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active-link'));
                // Add active class to current link
                if (navLink) {
                    navLink.classList.add('active-link');
                }
            }
        });
    }
    
    // Header background on scroll
    function handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }

        // Enhanced Contact form handling with EmailJS - FIXED VERSION
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Scroll event listener
    window.addEventListener('scroll', function() {
        scrollSpy();
        handleHeaderScroll();
        revealOnScroll();
        parallaxEffect();
    });
    
    // Reveal animations on scroll
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.about__card, .project-card, .skill-item, .contact__card');
        
        reveals.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize reveal elements
    function initRevealElements() {
        const reveals = document.querySelectorAll('.about__card, .project-card, .skill-item, .contact__card');
        reveals.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
    
    // Skill bar animations
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-item__progress');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                }
            });
        });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Loading Screen Animation
    function initLoadingScreen() {
        // Show loading screen
        loadingScreen.style.display = 'flex';
        
        // Animate court setup
        setTimeout(() => {
            const setupLines = document.querySelectorAll('.setup-line');
            setupLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.animation = `lineSetup 0.5s ease-out forwards`;
                }, index * 300);
            });
        }, 500);
        
        // Hide loading screen after animations
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Start 3D court animations
                initializeCourtAnimations();
            }, 500);
        }, 3000);
    }
    
    // Initialize 3D Court Animations
    function initializeCourtAnimations() {
        // Progressive line drawing
        startProgressiveLineDrawing();
        
        // Tennis ball physics
        startTennisBallPhysics();
        
        // Court interaction effects
        setupCourtInteractions();
    }
    
    // Progressive Line Drawing Animation
    function startProgressiveLineDrawing() {
        const lines = document.querySelectorAll('.court-line-3d');
        
        lines.forEach((line, index) => {
            const delay = index * 200;
            setTimeout(() => {
                line.style.opacity = '1';
                
                // Add drawing animation based on line type
                if (line.classList.contains('sideline-left') || line.classList.contains('sideline-right') || line.classList.contains('center-service-line')) {
                    line.style.animation = `drawLineVertical 1s ease-out forwards`;
                } else {
                    line.style.animation = `drawLineHorizontal 1s ease-out forwards`;
                }
            }, delay);
        });
        
        // Show tennis ball after lines are drawn
        setTimeout(() => {
            if (tennisBall3D) {
                tennisBall3D.style.opacity = '1';
                tennisBall3D.style.animation = 'ballPhysics 4s ease-in-out infinite';
            }
        }, lines.length * 200 + 1000);
    }
    
    // Tennis Ball 3D Physics
    function startTennisBallPhysics() {
        if (!tennisBall3D) return;
        
        let ballPosition = { x: 30, y: 40, z: 30 };
        let ballVelocity = { x: 2, y: 0, z: 0 };
        let gravity = 0.5;
        let bounce = 0.8;
        
        function updateBallPhysics() {
            // Update position
            ballPosition.x += ballVelocity.x;
            ballPosition.y += ballVelocity.y;
            ballPosition.z += ballVelocity.z;
            
            // Apply gravity
            ballVelocity.y += gravity;
            
            // Bounce off court surface
            if (ballPosition.y > 40) {
                ballPosition.y = 40;
                ballVelocity.y *= -bounce;
            }
            
            // Bounce off court sides
            if (ballPosition.x > 70 || ballPosition.x < 10) {
                ballVelocity.x *= -1;
            }
            
            // Reset position if ball goes too far
            if (ballPosition.x > 90) {
                ballPosition = { x: 30, y: 40, z: 30 };
                ballVelocity = { x: 2, y: -3, z: 0 };
            }
            
            // Apply position to ball
            tennisBall3D.style.left = ballPosition.x + '%';
            tennisBall3D.style.top = ballPosition.y + '%';
            tennisBall3D.style.transform = `translateZ(${ballPosition.z}px)`;
        }
        
        // Start physics simulation
        setInterval(updateBallPhysics, 50);
    }
    
    // Court Interaction Effects
    function setupCourtInteractions() {
        const courtSurface = document.querySelector('.court-surface');
        
        if (courtSurface) {
            // Mouse interaction with court
            courtSurface.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                // Subtle rotation based on mouse position
                const rotateX = (y - 0.5) * 10;
                const rotateY = (x - 0.5) * 10;
                
                this.style.transform = `rotateX(${60 + rotateX}deg) rotateY(${5 + rotateY}deg)`;
            });
            
            // Reset on mouse leave
            courtSurface.addEventListener('mouseleave', function() {
                this.style.transform = 'rotateX(60deg) rotateY(5deg)';
            });
        }
    }
    
    // Enhanced Project Card Animations
    function enhanceProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)';
            });
        });
    }
    
    // Skill Tags Enhanced Animation
    function enhanceSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
                this.style.boxShadow = '0 10px 25px rgba(34, 139, 34, 0.3)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Typing Effect for Home Subtitle
    function typeWriter() {
        const subtitle = document.querySelector('.home__subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            subtitle.style.borderRight = '2px solid #228B22';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    setTimeout(() => {
                        subtitle.style.borderRight = 'none';
                    }, 1000);
                }
            }, 50);
        }
    }
    
    // Parallax Effect for Home Section
    function parallaxEffect() {
        const homeVisual = document.querySelector('.home__visual');
        if (homeVisual) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            homeVisual.style.transform = `translateY(${rate}px)`;
        }
    }
    
    // Court Line Glow Effect
    function addCourtLineGlow() {
        const lines = document.querySelectorAll('.court-line-3d');
        
        lines.forEach(line => {
            line.addEventListener('animationend', function() {
                // Add glow effect after line is drawn
                this.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)';
                
                // Remove glow after a short time
                setTimeout(() => {
                    this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
                }, 500);
            });
        });
    }
    
    // Achievement Counter Animation
    function animateAchievementCounters() {
        const counters = document.querySelectorAll('.achievement__number');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = counter.textContent;
                    const isFloat = target.includes('.');
                    const targetValue = parseFloat(target.replace('+', ''));
                    
                    let current = 0;
                    const increment = targetValue / 100;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        
                        if (current >= targetValue) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            if (isFloat) {
                                counter.textContent = current.toFixed(2);
                            } else {
                                counter.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
                            }
                        }
                    }, 20);
                }
            });
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Court Texture Animation
    function addCourtTextureAnimation() {
        const courtBase = document.querySelector('.court-base-3d');
        if (courtBase) {
            // Add subtle texture animation
            setInterval(() => {
                const randomShift = Math.random() * 2 - 1;
                courtBase.style.backgroundPosition = `${randomShift}px ${randomShift}px`;
            }, 3000);
        }
    }
    
    // Net Wave Animation
    function addNetWaveAnimation() {
        const netMesh = document.querySelector('.net-mesh');
        if (netMesh) {
            let wavePhase = 0;
            
            setInterval(() => {
                wavePhase += 0.1;
                const waveHeight = Math.sin(wavePhase) * 2;
                netMesh.style.transform = `translateY(${waveHeight}px)`;
            }, 100);
        }
    }
    
    // Advanced Ball Shadow Physics
    function enhanceBallShadow() {
        const ballShadow = document.querySelector('.ball-shadow');
        if (ballShadow && tennisBall3D) {
            const observer = new MutationObserver(() => {
                const ballRect = tennisBall3D.getBoundingClientRect();
                const ballHeight = parseInt(tennisBall3D.style.top || '40');
                
                // Adjust shadow based on ball height
                const shadowScale = Math.max(0.5, 1 - (ballHeight - 40) / 100);
                const shadowOpacity = Math.max(0.1, 0.3 - (ballHeight - 40) / 200);
                
                ballShadow.style.transform = `translateZ(-25px) scale(${shadowScale})`;
                ballShadow.style.opacity = shadowOpacity;
            });
            
            observer.observe(tennisBall3D, { 
                attributes: true, 
                attributeFilter: ['style'] 
            });
        }
    }
    
    // Initialize all functions
    function init() {
        initRevealElements();
        animateSkillBars();
        enhanceProjectCards();
        enhanceSkillTags();
        addCourtLineGlow();
        animateAchievementCounters();
        addCourtTextureAnimation();
        addNetWaveAnimation();
        enhanceBallShadow();
        
        // Add typing effect with delay
        setTimeout(typeWriter, 4000);
        
        // Initial scroll spy check
        scrollSpy();
        
        // Initial reveal check
        revealOnScroll();
    }
    
    // Run initialization
    init();
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Performance optimizations
    function optimizeAnimations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll('.court-container').forEach(container => {
                container.style.animation = 'none';
            });
            
            document.querySelectorAll('.tennis-ball-3d').forEach(ball => {
                ball.style.animation = 'none';
            });
        }
    }
    
    // Court Performance Monitor
    function monitorCourtPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        function checkFPS() {
            const currentTime = performance.now();
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // If FPS is too low, reduce animation complexity
                if (fps < 30) {
                    const courtContainer = document.querySelector('.court-container');
                    if (courtContainer) {
                        courtContainer.style.animation = 'none';
                    }
                }
            }
            
            requestAnimationFrame(checkFPS);
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    // Apply optimizations
    optimizeAnimations();
    monitorCourtPerformance();
    
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes courtGlow {
            0%, 100% {
                box-shadow: 0 0 20px rgba(34, 139, 34, 0.3);
            }
            50% {
                box-shadow: 0 0 40px rgba(34, 139, 34, 0.6);
            }
        }
        
        @keyframes ballGlow {
            0%, 100% {
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(204, 255, 0, 0.5);
            }
            50% {
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(204, 255, 0, 0.8);
            }
        }
        
        .court-base-3d:hover {
            animation: courtGlow 2s ease-in-out infinite;
        }
        
        .tennis-ball-3d:hover {
            animation: ballGlow 1s ease-in-out infinite;
        }
        
        .loading-screen.fade-out {
            opacity: 0;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Viewport-based animations
    function handleViewportAnimations() {
        const courtContainer = document.querySelector('.court-container');
        if (courtContainer) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    } else {
                        entry.target.style.animationPlayState = 'paused';
                    }
                });
            });
            
            observer.observe(courtContainer);
        }
    }
    
    handleViewportAnimations();
});

// FIXED: Enhanced form submission handler
function handleFormSubmission(e) {
    e.preventDefault();
    
    console.log('Form submission started');
    
    // Validate form first
    if (!validateForm()) {
        console.log('Form validation failed');
        return;
    }
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS library not available');
        showToast('Email service not available. Please try again later.', 'error');
        return;
    }
    
    const form = e.target;
    const formData = new FormData(form);
    const formElements = form.querySelectorAll('input, textarea, button');
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (!submitButton) {
        console.error('Submit button not found');
        showToast('Form error: Submit button not found', 'error');
        return;
    }
    
    // Disable form during submission
    formElements.forEach(element => {
        element.disabled = true;
    });
    
    // Update button state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Serving... 🎾';
    submitButton.style.background = 'linear-gradient(45deg, #2D5016, #4CAF50)';
    
    // Prepare template parameters with comprehensive field mapping
    const templateParams = {
        // Primary fields (adjust these to match your EmailJS template)
        from_name: formData.get('from_name') || formData.get('name') || formData.get('user_name') || '',
        from_email: formData.get('from_email') || formData.get('email') || formData.get('user_email') || '',
        reply_to: formData.get('from_email') || formData.get('email') || formData.get('user_email') || '',
        
        // Additional fields
        phone: formData.get('phone') || 'Not provided',
        subject: formData.get('subject') || 'Contact Form Message',
        message: formData.get('message') || '',
        
        // Metadata
        sent_time: new Date().toLocaleString(),
        website: window.location.href,
        user_agent: navigator.userAgent.substring(0, 100) // Truncated for security
    };
    
    console.log('Template parameters prepared:', {
        from_name: templateParams.from_name,
        from_email: templateParams.from_email,
        subject: templateParams.subject,
        message: templateParams.message.substring(0, 50) + '...' // Log truncated message
    });
    
    // Final validation of required fields
    if (!templateParams.from_name || !templateParams.from_email || !templateParams.message) {
        console.error('Missing required fields:', {
            name: !templateParams.from_name,
            email: !templateParams.from_email,
            message: !templateParams.message
        });
        
        showToast('Please fill in all required fields (Name, Email, Message)', 'error');
        resetFormState(formElements, submitButton, originalText);
        return;
    }
    
    // Send email using EmailJS
    console.log('Sending email via EmailJS...');
    
    emailjs.send(
        EMAILJS_CONFIG.serviceId, 
        EMAILJS_CONFIG.templateId, 
        templateParams
    )
    .then(function(response) {
        console.log('EmailJS SUCCESS:', response.status, response.text);
        showToast('Ace! Your message has been served successfully! 🎾', 'success');
        form.reset();
        
        // Clear any error styles
        form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
        
        // Optional: Celebration animation
        celebrateFormSubmission();
    })
    .catch(function(error) {
        console.error('EmailJS ERROR:', error);
        
        let errorMessage = 'Fault! Please try serving again. 🎾';
        
        // Enhanced error handling with specific error types
        if (error.status) {
            switch (error.status) {
                case 400:
                    errorMessage = 'Invalid request. Please check your form data. 🎾';
                    console.error('EmailJS 400 Error - Invalid request parameters');
                    break;
                case 401:
                    errorMessage = 'Unauthorized. Please check your EmailJS configuration. 🎾';
                    console.error('EmailJS 401 Error - Check your public key and service ID');
                    break;
                case 403:
                    errorMessage = 'Access denied. Please check your EmailJS setup. 🎾';
                    console.error('EmailJS 403 Error - Check your template ID and permissions');
                    break;
                case 404:
                    errorMessage = 'Service not found. Please check your EmailJS configuration. 🎾';
                    console.error('EmailJS 404 Error - Check your service ID and template ID');
                    break;
                case 413:
                    errorMessage = 'Message too large. Please shorten your message. 🎾';
                    console.error('EmailJS 413 Error - Payload too large');
                    break;
                case 429:
                    errorMessage = 'Too many requests. Please wait before trying again. 🎾';
                    console.error('EmailJS 429 Error - Rate limit exceeded');
                    break;
                case 500:
                    errorMessage = 'Server error. Please try again later. 🎾';
                    console.error('EmailJS 500 Error - Internal server error');
                    break;
                default:
                    errorMessage = `Service error (${error.status}). Please try again. 🎾`;
                    console.error('EmailJS Unknown Error:', error.status);
            }
        } else if (error.text) {
            // Handle text-based errors
            const errorText = error.text.toLowerCase();
            
            if (errorText.includes('invalid') || errorText.includes('parameter')) {
                errorMessage = 'Invalid configuration. Please check your form setup. 🎾';
            } else if (errorText.includes('quota') || errorText.includes('limit')) {
                errorMessage = 'Email quota exceeded. Please try again later. 🎾';
            } else if (errorText.includes('network') || errorText.includes('fetch')) {
                errorMessage = 'Network error. Please check your connection. 🎾';
            } else if (errorText.includes('template')) {
                errorMessage = 'Template error. Please contact support. 🎾';
            }
            
            console.error('EmailJS Error Details:', error.text);
        } else if (error.message) {
            console.error('EmailJS Error Message:', error.message);
            
            if (error.message.includes('Failed to fetch')) {
                errorMessage = 'Network error. Please check your internet connection. 🎾';
            }
        }
        
        showToast(errorMessage, 'error');
    })
    .finally(function() {
        console.log('EmailJS request completed');
        resetFormState(formElements, submitButton, originalText);
    });
}

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    const icon = type === 'success' ? '🎾' : '⚠️';
    const bgColor = type === 'success' ? '#4CAF50' : '#f44336';
    
    toast.innerHTML = `
        <div class="toast__content">
            <span class="toast__icon">${icon}</span>
            <span class="toast__message">${message}</span>
            <button class="toast__close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    toast.style.cssText = `
        background: ${bgColor};
        color: white;
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 12px;
        animation: toastSlideIn 0.3s ease forwards;
        position: relative;
        max-width: 400px;
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'toastSlideOut 0.3s ease forwards';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Create toast container
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
    `;
    
    // Make toasts clickable
    container.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    container.style.pointerEvents = 'auto';
    
    document.body.appendChild(container);
    return container;
}

// Optional: Celebration animation for successful form submission
function celebrateFormSubmission() {
    // Create celebration effect
    const celebration = document.createElement('div');
    celebration.innerHTML = '🎾🏆🎉';
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 48px;
        z-index: 10001;
        animation: celebration 2s ease-in-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
    }, 2000);
}

// Add CSS animations for toasts and celebration
const style = document.createElement('style');
style.textContent = `
    @keyframes toastSlideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes toastSlideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes celebration {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    .toast__close {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
    }
    
    .toast__close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .error {
        border: 2px solid #f44336 !important;
        background-color: #ffebee !important;
    }
    
    .toast__content {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
    }
`;

document.head.appendChild(style);

// Helper function to reset form state
function resetFormState(formElements, submitButton, originalText) {
    // Re-enable all form elements
    formElements.forEach(element => {
        element.disabled = false;
    });
    
    // Reset submit button
    submitButton.textContent = originalText;
    submitButton.style.background = '';
}


// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}



function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimized scroll handler
const optimizedScrollHandler = throttle(() => {
    // Handle scroll events here if needed
}, 16); // 60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Preload critical resources
function preloadResources() {
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

preloadResources();