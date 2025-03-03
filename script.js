document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Create falling petals
    const petalsContainer = document.querySelector('.petals-container');
    const petalColors = ['#ffb6c1', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff', '#ff85a2', '#fdcce5', '#ffcad4'];
    
    // Increase number of petals for a more impressive effect
    for (let i = 0; i < 100; i++) {
        createPetal(petalsContainer, petalColors);
    }
    
    // Create hearts in footer
    const heartContainer = document.querySelector('.heart-container');
    
    for (let i = 0; i < 20; i++) {
        createHeart(heartContainer);
    }
    
    // Button animation with enhanced celebration effect
    const btn = document.querySelector('.btn');
    btn.addEventListener('click', function() {
        // Create celebration animation
        celebrateWithHearts();
        
        // Add sparkle effect
        createSparkles();
        
        // Scroll to wishes section
        const wishesSection = document.getElementById('wishes');
        window.scrollTo({
            top: wishesSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
    
    // Add hover animations to wish cards
    const wishCards = document.querySelectorAll('.wish-card');
    wishCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.wish-icon');
            icon.style.animation = 'heartbeat 0.6s ease infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.wish-icon');
            icon.style.animation = '';
        });
    });
    
    // Add animated background effects
    addBackgroundEffects();
    
    // Animate the signature with a writing effect
    animateSignature();
    
    // Add animated floating hearts to hero section
    addFloatingHeartsToHero();
    
    // Add decorative sparkles across the site
    addDecorativeSparkles();
    
    // Add scroll indicator to hero section
    addScrollIndicator();
    
    // Add floating flower petals to message section
    addFlowerPetalsToMessage();
    
    // Add glowing effect to header
    addGlowingEffectToHeader();
    
    // Add parallax effect on scroll
    addParallaxEffect();
    
    // Add ripple effect to buttons
    addRippleEffectToButtons();
    
    // Enhanced card effects
    enhanceCardEffects();
    
    // Add animated navigation effects
    addAnimatedNavigation();
});

// Generate a random number between min and max
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Create a petal element with more variety
function createPetal(container, colors) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = randomBetween(15, 30);
    const left = randomBetween(0, 100);
    const animationDuration = randomBetween(10, 20);
    const delay = randomBetween(0, 15);
    const rotate = randomBetween(0, 360);
    const type = Math.floor(randomBetween(0, 3));
    
    let borderRadius;
    
    // Different petal shapes
    switch(type) {
        case 0: // Circle petal
            borderRadius = '50%';
            break;
        case 1: // Leaf shaped petal
            borderRadius = '50% 0 50% 0';
            break;
        case 2: // Heart like petal
            borderRadius = '50% 50% 0 50%';
            break;
    }
    
    petal.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: ${borderRadius};
        top: -30px;
        left: ${left}%;
        opacity: 0.8;
        transform: rotate(${rotate}deg);
        animation: fall ${animationDuration}s linear ${delay}s infinite;
        filter: drop-shadow(0 3px 5px rgba(0,0,0,0.1));
    `;
    
    container.appendChild(petal);
}

// Create a heart element
function createHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    
    const size = randomBetween(15, 25);
    const left = randomBetween(0, 100);
    const bottom = randomBetween(10, 100);
    const animationDuration = randomBetween(3, 6);
    
    heart.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background-color: white;
        opacity: ${randomBetween(0.3, 0.8)};
        bottom: ${bottom}%;
        left: ${left}%;
        transform: rotate(45deg);
        animation: float ${animationDuration}s ease-in-out infinite;
    `;
    
    // Create before and after pseudo-elements using actual elements for SVG compatibility
    const before = document.createElement('div');
    before.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: inherit;
        border-radius: 50%;
        top: -50%;
        left: 0;
    `;
    
    const after = document.createElement('div');
    after.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: inherit;
        border-radius: 50%;
        top: 0;
        left: -50%;
    `;
    
    heart.appendChild(before);
    heart.appendChild(after);
    container.appendChild(heart);
}

// Celebration function
function celebrateWithHearts() {
    const celebrationContainer = document.createElement('div');
    celebrationContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    `;
    
    document.body.appendChild(celebrationContainer);
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            const size = randomBetween(10, 25);
            const left = randomBetween(0, 100);
            
            heart.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: #ff85a2;
                top: -${size}px;
                left: ${left}%;
                opacity: ${randomBetween(0.5, 0.9)};
                transform: rotate(45deg);
                animation: celebrationFall ${randomBetween(3, 6)}s linear forwards;
            `;
            
            // Create heart shape
            const before = document.createElement('div');
            before.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: inherit;
                border-radius: 50%;
                top: -50%;
                left: 0;
            `;
            
            const after = document.createElement('div');
            after.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: inherit;
                border-radius: 50%;
                top: 0;
                left: -50%;
            `;
            
            heart.appendChild(before);
            heart.appendChild(after);
            celebrationContainer.appendChild(heart);
            
            // Remove heart after animation completes
            setTimeout(() => {
                heart.remove();
            }, 6000);
            
        }, i * 50);
    }
    
    // Remove the container after all animations complete
    setTimeout(() => {
        celebrationContainer.remove();
    }, 10000);
    
    // Add animation to style
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes celebrationFall {
            0% { transform: translateY(0) rotate(45deg); }
            100% { transform: translateY(100vh) rotate(45deg); }
        }
        
        @keyframes fall {
            0% { 
                transform: translateY(0) rotate(0deg);
                opacity: 0.8;
            }
            85% {
                opacity: 0.8;
            }
            100% { 
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Create sparkle effect
function createSparkles() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 2000;
    `;
    
    document.body.appendChild(sparkleContainer);
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const size = randomBetween(3, 8);
            const x = randomBetween(20, 80);
            const y = randomBetween(20, 80);
            
            sparkle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: white;
                box-shadow: 0 0 ${size*2}px ${size/2}px rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                top: ${y}%;
                left: ${x}%;
                opacity: 0;
                animation: sparkle 1s ease-in-out forwards;
            `;
            
            sparkleContainer.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
            
        }, i * 50);
    }
    
    setTimeout(() => {
        sparkleContainer.remove();
    }, 5000);
    
    // Add sparkle animation
    const styleSparkle = document.createElement('style');
    styleSparkle.innerHTML = `
        @keyframes sparkle {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
        }
    `;
    
    document.head.appendChild(styleSparkle);
}

// Function to add animated background effects - enhanced
function addBackgroundEffects() {
    // Create bubbles for sections
    const sections = document.querySelectorAll('.wishes, .message, .hero');
    
    sections.forEach(section => {
        const bubblesContainer = document.createElement('div');
        bubblesContainer.className = 'bubbles-container';
        bubblesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 0;
        `;
        
        section.style.position = 'relative';
        section.insertBefore(bubblesContainer, section.firstChild);
        
        // Create more bubbles with enhanced style
        for (let i = 0; i < 30; i++) {
            const bubble = document.createElement('div');
            const size = randomBetween(15, 80);
            const left = randomBetween(0, 100);
            
            bubble.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,182,193,0.1));
                bottom: -${size}px;
                left: ${left}%;
                animation: rise ${randomBetween(15, 25)}s linear ${randomBetween(0, 15)}s infinite;
                opacity: ${randomBetween(0.15, 0.35)};
                box-shadow: 0 0 15px rgba(255,255,255,0.6);
                transform: scale(${randomBetween(0.8, 1.2)}) rotate(${randomBetween(0, 360)}deg);
            `;
            
            bubblesContainer.appendChild(bubble);
        }
    });

    // Add sparkles to sections
    document.querySelectorAll('.wish-card, .message-card, .hero-content').forEach(element => {
        addSparkleEffect(element);
    });
}

// Add sparkle effect to elements
function addSparkleEffect(element) {
    setInterval(() => {
        const sparkle = document.createElement('div');
        const size = randomBetween(2, 4);
        const x = randomBetween(0, 100);
        const y = randomBetween(0, 100);
        
        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: white;
            box-shadow: 0 0 ${size*3}px ${size}px rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            top: ${y}%;
            left: ${x}%;
            opacity: 0;
            z-index: 5;
            animation: sparkle 1.5s ease-in-out forwards;
            pointer-events: none;
        `;
        
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }, randomBetween(2000, 4000));
}

// Add floating hearts to hero section - enhanced
function addFloatingHeartsToHero() {
    const hero = document.querySelector('.hero');
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'floating-hearts';
    heartsContainer.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 5;
    `;
    
    hero.appendChild(heartsContainer);
    
    // Increase number of hearts and use SVG for better quality
    for (let i = 0; i < 45; i++) {
        const heart = document.createElement('div');
        const size = randomBetween(15, 50);
        const left = randomBetween(0, 100);
        const top = randomBetween(0, 100);
        const duration = randomBetween(10, 30);
        const delay = randomBetween(0, 10);
        const rotate = randomBetween(-20, 20);
        const color = `rgba(${randomBetween(230, 255)}, ${randomBetween(100, 180)}, ${randomBetween(150, 200)}, ${randomBetween(0.1, 0.5)})`;
        
        heart.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path fill="${color}" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        heart.style.cssText = `
            position: absolute;
            top: ${top}%;
            left: ${left}%;
            filter: drop-shadow(0 0 5px ${color});
            animation: floatingHeart ${duration}s ease-in-out ${delay}s infinite;
            transform: rotate(${rotate}deg);
        `;
        
        heartsContainer.appendChild(heart);
    }
    
    const styleFloatingHearts = document.createElement('style');
    styleFloatingHearts.innerHTML = `
        @keyframes floatingHeart {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(5deg); }
            50% { transform: translateY(0) rotate(0deg); }
            75% { transform: translateY(20px) rotate(-5deg); }
        }
    `;
    
    document.head.appendChild(styleFloatingHearts);
}

// Add background animated effects
const styleBackground = document.createElement('style');
styleBackground.innerHTML = `
    @keyframes rise {
        0% { transform: translateY(0) scale(1); opacity: 0.1; }
        50% { opacity: 0.3; }
        100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
    }
`;
document.head.appendChild(styleBackground);

// Animate the signature with a writing effect
function animateSignature() {
    const signature = document.querySelector('.signature');
    const originalText = signature.textContent;
    signature.textContent = '';
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < originalText.length) {
            signature.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 100);
}

// Add decorative sparkles across the site
function addDecorativeSparkles() {
    const sections = document.querySelectorAll('section, header, footer');
    
    sections.forEach(section => {
        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            const size = randomBetween(2, 5);
            const x = randomBetween(0, 100);
            const y = randomBetween(0, 100);
            
            sparkle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                opacity: ${randomBetween(0.2, 0.6)};
                animation-delay: ${randomBetween(0, 5)}s;
            `;
            
            section.appendChild(sparkle);
        }
    });
}

// Add scroll indicator to hero section
function addScrollIndicator() {
    const hero = document.querySelector('.hero');
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    
    scrollIndicator.addEventListener('click', () => {
        const wishesSection = document.getElementById('wishes');
        window.scrollTo({
            top: wishesSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
    
    hero.appendChild(scrollIndicator);
}

// Add floating flower petals to message section
function addFlowerPetalsToMessage() {
    const messageSection = document.querySelector('.message');
    const petalsContainer = document.createElement('div');
    petalsContainer.className = 'message-petals-container';
    petalsContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    `;
    
    messageSection.style.position = 'relative';
    messageSection.insertBefore(petalsContainer, messageSection.firstChild);
    
    const flowers = ['✿', '❀', '✽', '❁', '✾', '✼'];
    
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        const flower = flowers[Math.floor(Math.random() * flowers.length)];
        const size = randomBetween(15, 30);
        
        petal.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            color: rgba(255, 133, 162, ${randomBetween(0.1, 0.3)});
            top: ${randomBetween(-10, 110)}%;
            left: ${randomBetween(-10, 110)}%;
            animation: floatMessagePetal ${randomBetween(15, 30)}s linear infinite;
            transform: rotate(${randomBetween(0, 360)}deg);
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        `;
        
        petal.textContent = flower;
        petalsContainer.appendChild(petal);
    }
    
    const styleFloatMessagePetal = document.createElement('style');
    styleFloatMessagePetal.innerHTML = `
        @keyframes floatMessagePetal {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(${randomBetween(-50, 50)}px, ${randomBetween(-30, 30)}px) rotate(${randomBetween(0, 90)}deg); }
            50% { transform: translate(${randomBetween(-70, 70)}px, ${randomBetween(-50, 50)}px) rotate(${randomBetween(90, 180)}deg); }
            75% { transform: translate(${randomBetween(-50, 50)}px, ${randomBetween(-30, 30)}px) rotate(${randomBetween(180, 270)}deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
        }
    `;
    
    document.head.appendChild(styleFloatMessagePetal);
}

// Add glowing effect to header
function addGlowingEffectToHeader() {
    const header = document.querySelector('header');
    const glowAnimation = document.createElement('style');
    
    glowAnimation.innerHTML = `
        @keyframes headerGlow {
            0%, 100% { box-shadow: 0 5px 25px rgba(255, 133, 162, 0.3); }
            50% { box-shadow: 0 5px 35px rgba(255, 133, 162, 0.6); }
        }
    `;
    document.head.appendChild(glowAnimation);
    
    header.style.animation = 'gradientAnimation 15s ease infinite, headerGlow 4s ease-in-out infinite';
    
    // Add font animation to site title
    const siteTitle = document.querySelector('.logo h1');
    siteTitle.style.animation = 'titlePulse 3s infinite';
    
    const titleAnimation = document.createElement('style');
    titleAnimation.innerHTML = `
        @keyframes titlePulse {
            0%, 100% { transform: scale(1); text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.25); }
            50% { transform: scale(1.05); text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.35); }
        }
    `;
    document.head.appendChild(titleAnimation);
}

// Add parallax effect on scroll
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Move hero elements
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
        
        // Move petals
        const petalsContainers = document.querySelectorAll('.petals-container, .message-petals-container');
        petalsContainers.forEach(container => {
            container.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        });
    });
}

// Add ripple effect to buttons
function addRippleEffectToButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.7);
                border-radius: 50%;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: ${x - 50}px;
                top: ${y - 50}px;
                transform: scale(0);
                opacity: 1;
                animation: buttonRipple 0.6s linear;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Hide menu toggle on load
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.style.display = 'none';
    }
    
    const rippleAnimation = document.createElement('style');
    rippleAnimation.innerHTML = `
        @keyframes buttonRipple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleAnimation);
}

// Enhanced card effects
function enhanceCardEffects() {
    const cards = document.querySelectorAll('.wish-card, .message-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 30;
            const angleY = (centerX - x) / 30;
            
            this.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
            this.style.boxShadow = `
                ${angleY * -1}px ${angleX}px 20px rgba(255, 133, 162, 0.3),
                0 10px 20px rgba(0, 0, 0, 0.1)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.08)';
            setTimeout(() => {
                this.style.transition = '';
            }, 300);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.1s ease';
        });
    });
}

// Add animated navigation effects with floating hearts
function addAnimatedNavigation() {
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Create 5-8 small floating hearts
            const heartsCount = Math.floor(randomBetween(5, 9));
            
            for (let i = 0; i < heartsCount; i++) {
                const heart = document.createElement('div');
                const size = randomBetween(6, 12);
                
                heart.className = 'nav-heart';
                heart.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background-color: ${Math.random() > 0.5 ? '#ff85a2' : '#fff'};
                    left: ${randomBetween(10, 90)}%;
                    top: -${size}px;
                    opacity: ${randomBetween(0.6, 0.9)};
                    transform: rotate(45deg);
                    animation: navHeartFloat ${randomBetween(0.8, 1.5)}s ease-out forwards;
                    z-index: 1;
                    pointer-events: none;
                `;
                
                // Create heart shape with pseudo elements
                const before = document.createElement('div');
                before.style.cssText = `
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: inherit;
                    border-radius: 50%;
                    top: -50%;
                    left: 0;
                `;
                
                const after = document.createElement('div');
                after.style.cssText = `
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: inherit;
                    border-radius: 50%;
                    top: 0;
                    left: -50%;
                `;
                
                heart.appendChild(before);
                heart.appendChild(after);
                this.appendChild(heart);
                
                // Remove hearts after animation completes
                setTimeout(() => {
                    heart.remove();
                }, 1500);
            }
            
            // Add glowing pulse to link
            this.style.background = 'rgba(255, 255, 255, 0.3)';
            this.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            // Remove styling on mouseleave
            this.style.background = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add animation styles
    const navAnimationStyle = document.createElement('style');
    navAnimationStyle.innerHTML = `
        @keyframes navHeartFloat {
            0% { transform: translateY(0) rotate(45deg) scale(0); opacity: 0; }
            20% { opacity: 0.8; }
            100% { transform: translateY(-30px) rotate(45deg) scale(1); opacity: 0; }
        }
        
        nav ul li a {
            overflow: visible !important;
        }
    `;
    
    document.head.appendChild(navAnimationStyle);
}