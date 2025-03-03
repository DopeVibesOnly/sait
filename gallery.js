document.addEventListener('DOMContentLoaded', function() {
    // Initialize the photo gallery
    initPhotoGallery();
    
    // Create falling petals
    const petalsContainer = document.querySelector('.petals-container');
    const petalColors = ['#ffb6c1', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff', '#ff85a2', '#fdcce5', '#ffcad4'];
    
    for (let i = 0; i < 50; i++) {
        createPetal(petalsContainer, petalColors);
    }
    
    // Add animated navigation effects with floating hearts
    addAnimatedNavigation();
    
    // Add title animations
    addTitleAnimations();
    
    // Add decorative elements
    addDecorativeElements();
    
    // Create heart particles
    createHeartParticles();
});

// Initialize photo gallery with heart cover animations
function initPhotoGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        // Create heart particles for each item
        const heartParticles = item.querySelector('.heart-particles');
        const totalParticles = 20;
        
        for (let i = 0; i < totalParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Store random values for animation
            const tx = (Math.random() - 0.5) * 200;
            const ty = (Math.random() - 0.5) * 200;
            const delay = Math.random() * 0.5;
            const size = Math.random() * 8 + 5;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0);
                --tx: ${tx}px;
                --ty: ${ty}px;
                animation: particleFly 1.5s ease-out forwards;
                animation-delay: ${delay}s;
                opacity: 0;
            `;
            
            heartParticles.appendChild(particle);
        }
        
        // Add hover animation for heart cover
        item.addEventListener('mouseenter', function() {
            // Restart particle animations
            const particles = this.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.animation = 'none';
                void particle.offsetWidth; // Trigger reflow
                
                const delay = Math.random() * 0.5;
                particle.style.animation = `particleFly 1.5s ease-out forwards ${delay}s`;
            });
            
            // Add sparkle effect
            createSparkleEffect(this);
        });
    });
}

// Generate a random number between min and max
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Create a petal element
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
        
        nav ul li a {
            overflow: visible !important;
        }
    `;
    
    document.head.appendChild(navAnimationStyle);
}

// Add title animations with floating elements
function addTitleAnimations() {
    const title = document.querySelector('.gallery-title h2');
    
    // Add decorative underline
    const underline = document.createElement('div');
    underline.style.cssText = `
        position: absolute;
        height: 3px;
        background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), transparent);
        bottom: -10px;
        left: 10%;
        right: 10%;
        border-radius: 3px;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
        animation: underlinePulse 3s ease-in-out infinite;
    `;
    title.appendChild(underline);
    
    // Add floating sparkles around the title
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        const size = randomBetween(6, 12);
        const angle = (i / 6) * 360;
        const radius = randomBetween(100, 150);
        const x = Math.cos(angle * Math.PI / 180) * radius;
        const y = Math.sin(angle * Math.PI / 180) * radius;
        
        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: white;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            box-shadow: 0 0 ${size*2}px rgba(255, 255, 255, 0.8);
            transform: translate(${x}px, ${y}px);
            animation: titleOrbit 10s linear infinite, sparkleGlow 3s ease-in-out infinite;
            animation-delay: ${i * 0.5}s;
        `;
        
        document.querySelector('.title-decoration').appendChild(sparkle);
    }
    
    // Add animation for underline
    const underlineAnimation = document.createElement('style');
    underlineAnimation.innerHTML = `
        @keyframes underlinePulse {
            0%, 100% { opacity: 0.5; width: 80%; left: 10%; }
            50% { opacity: 0.8; width: 90%; left: 5%; }
        }
        
        @keyframes titleOrbit {
            0% { transform: translate(var(--x, 0), var(--y, 0)) rotate(0deg); }
            100% { transform: translate(var(--x, 0), var(--y, 0)) rotate(360deg); }
        }
        
        @keyframes sparkleGlow {
            0%, 100% { opacity: 0.2; transform: scale(0.8); }
            50% { opacity: 0.8; transform: scale(1.2); }
        }
    `;
    document.head.appendChild(underlineAnimation);
}

// Add decorative elements to enhance the gallery
function addDecorativeElements() {
    // Add floating hearts to the gallery background
    const gallerySection = document.querySelector('.photo-gallery');
    const floatingHeartsContainer = document.createElement('div');
    floatingHeartsContainer.className = 'floating-hearts-container';
    floatingHeartsContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    gallerySection.appendChild(floatingHeartsContainer);
    
    // Create 20 floating hearts with varied styles
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        const size = randomBetween(15, 30);
        const left = randomBetween(0, 100);
        const top = randomBetween(0, 100);
        const delay = randomBetween(0, 5);
        const duration = randomBetween(10, 20);
        const color = `rgba(255, ${randomBetween(100, 220)}, ${randomBetween(150, 220)}, ${randomBetween(0.1, 0.3)})`;
        
        heart.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path fill="${color}" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        heart.style.cssText = `
            position: absolute;
            top: ${top}%;
            left: ${left}%;
            filter: drop-shadow(0 0 5px ${color});
            animation: floatingHeart ${duration}s ease-in-out ${delay}s infinite;
            transform: rotate(${randomBetween(-10, 10)}deg);
        `;
        
        floatingHeartsContainer.appendChild(heart);
    }
    
    // Add floating heart animation
    const heartAnimation = document.createElement('style');
    heartAnimation.innerHTML = `
        @keyframes floatingHeart {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(-20px, 20px); }
            50% { transform: translate(0, 40px); }
            75% { transform: translate(20px, 20px); }
        }
    `;
    document.head.appendChild(heartAnimation);
}

// Create sparkle effect when hovering gallery items
function createSparkleEffect(element) {
    const sparklesCount = 15;
    
    for (let i = 0; i < sparklesCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const size = randomBetween(3, 6);
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
                z-index: 15;
                animation: itemSparkle 1.5s ease-in-out forwards;
                pointer-events: none;
            `;
            
            element.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1500);
        }, i * 100);
    }
    
    // Add sparkle animation
    const sparkleAnimation = document.createElement('style');
    sparkleAnimation.innerHTML = `
        @keyframes itemSparkle {
            0% { transform: scale(0); opacity: 0; }
            50% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
        }
    `;
    
    if (!document.querySelector('style[data-sparkle]')) {
        sparkleAnimation.setAttribute('data-sparkle', 'true');
        document.head.appendChild(sparkleAnimation);
    }
}

// Create heart particles for enhanced effect when revealing photos
function createHeartParticles() {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'reveal-particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 20;
            opacity: 0;
        `;
        
        item.appendChild(particlesContainer);
        
        item.addEventListener('mouseenter', function() {
            particlesContainer.style.opacity = '1';
            
            // Create burst of hearts
            for (let i = 0; i < 10; i++) {
                const mini = document.createElement('div');
                const size = randomBetween(8, 15);
                const angle = randomBetween(0, 360);
                const distance = randomBetween(50, 150);
                const x = Math.cos(angle * Math.PI / 180) * distance;
                const y = Math.sin(angle * Math.PI / 180) * distance;
                const delay = randomBetween(0, 0.5);
                
                mini.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    top: 50%;
                    left: 50%;
                    background-color: #ff85a2;
                    transform: translate(-50%, -50%) rotate(45deg) scale(0);
                    opacity: 0;
                    animation: heartBurst 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                    animation-delay: ${delay}s;
                    --x: ${x}px;
                    --y: ${y}px;
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
                
                mini.appendChild(before);
                mini.appendChild(after);
                particlesContainer.appendChild(mini);
                
                setTimeout(() => {
                    mini.remove();
                }, 1500);
            }
        });
        
        item.addEventListener('mouseleave', function() {
            particlesContainer.style.opacity = '0';
            particlesContainer.innerHTML = '';
        });
    });
    
    // Add heart burst animation
    const burstAnimation = document.createElement('style');
    burstAnimation.innerHTML = `
        @keyframes heartBurst {
            0% { transform: translate(-50%, -50%) rotate(45deg) scale(0); opacity: 0; }
            20% { transform: translate(-50%, -50%) rotate(45deg) scale(1); opacity: 0.8; }
            100% { transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(45deg) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(burstAnimation);
}