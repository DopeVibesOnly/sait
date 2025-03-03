document.addEventListener('DOMContentLoaded', function() {
    // Compliments database - combined from all categories
    const compliments = [
        // Искренние
        "Ты умеешь слушать так, что хочется рассказать тебе всё.",
        "Твой смех, пусть даже и на расстоянии, делает день лучше.",
        "Рядом с тобой чувствуешь себя как-то по-особенному.. словно дома, но лучше.",
        "У тебя классное чувство юмора — не обычное, специфическое, и мне это нравится ))",
        "Ты делаешь обычные вещи необычным способом, и это всегда цепляет.",
        "С тобой приятно проводить время.",
        "Ты как-то особенно улыбаешься глазами, это редкость.",
        "Ты прямо мастер в общении, с тобой хочется общаться только больше и больше ))",
        "Ты здорово подбираешь слова — никогда не скажешь банальщину.",
        "Ты делаешь классные фотки — в них всегда есть какой-то свой взгляд.",
        "Ты очень наблюдательная — замечаешь детали, которые все пропускают.",
        "Ты умеешь поддержать разговор так, что он не превращается в пустую болтовню.",
        "Ты легко находишь общий язык с разными людьми, это редкий талант.",
        "У тебя есть свои фирменные словечки, которые никто больше не использует.",
        "Твоя улыбка какая-то заразительная — сразу хочется улыбнуться в ответ.",
        "Твои волосы выглядят так, будто ты только что от стилиста, даже если это не так.",
        "У тебя очень приятный голос — его хочется слушать и слушать.",
        "У тебя очень выразительная мимика — смотришь и всё понятно без слов.",
        "В твоей внешности есть что-то от старого кино — такая красота, которая не выходит из моды.",
        "Ты умеешь быть красивой без всяких ухищрений.",
        "У тебя есть своя изюминка, которая выделяет тебя из толпы.",
        "Твоя красота не бросается в глаза, но чем дольше смотришь, тем больше замечаешь.",
        "В тебе есть неуловимое очарование, которое сложно описать, но легко почувствовать.",
        "В тебе есть какая-то киношная красота — как у героинь старых добрых фильмов.",
    ];

    // DOM elements
    const complimentText = document.getElementById('compliment-text');
    const generateBtn = document.getElementById('generate-btn');
    const heartsDecoration = document.querySelector('.hearts-decoration');
    
    // Initialize
    addFloatingHeartsToSection();
    addTitleAnimations();
    
    // Event listeners
    generateBtn.addEventListener('click', generateCompliment);
    
    // Generate compliment
    function generateCompliment() {
        let newCompliment;
        
        // Make sure we don't get the same compliment twice in a row
        do {
            newCompliment = compliments[Math.floor(Math.random() * compliments.length)];
        } while (newCompliment === complimentText.textContent && compliments.length > 1);
        
        // Animate out old text
        complimentText.style.opacity = '0';
        complimentText.style.transform = 'translateY(20px) scale(0.9)';
        
        // Change text and animate in after a small delay
        setTimeout(() => {
            complimentText.textContent = newCompliment;
            complimentText.style.opacity = '1';
            complimentText.style.transform = 'translateY(0) scale(1)';
            
            // Add enhanced floating hearts animation
            createEnhancedFloatingHearts();
            createSparkleEffect();
            createShimmerEffect();
            createFloatingBlossoms();
        }, 300);
    }
    
    // Create enhanced floating hearts animation with more variety
    function createEnhancedFloatingHearts() {
        const heartsContainer = heartsDecoration;
        heartsContainer.innerHTML = '';
        
        const heartColors = ['#ff85a2', '#ffb6c1', '#ffc8dd', '#ff5a8a', '#ff6699'];
        
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                const size = Math.random() * 15 + 8;
                const startPos = Math.random() * 80 + 10;
                const color = heartColors[Math.floor(Math.random() * heartColors.length)];
                
                // More random and varied movement
                const translateX = (Math.random() * 300 - 150) + 'px';
                const translateY = (Math.random() * -200 - 50) + 'px';
                const rotate = (Math.random() * 720 - 360) + 'deg';
                const scale = Math.random() * 0.5 + 0.5;
                
                heart.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background-color: ${color};
                    bottom: 0;
                    left: ${startPos}%;
                    transform: rotate(45deg) scale(0);
                    opacity: 0;
                    z-index: 5;
                    --translateX: ${translateX};
                    --translateY: ${translateY};
                    --rotate: ${rotate};
                    --scale: ${scale};
                    box-shadow: 0 0 10px rgba(255, 133, 162, 0.5);
                    animation: floatHeart 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
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
                    box-shadow: inherit;
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
                    box-shadow: inherit;
                `;
                
                heart.appendChild(before);
                heart.appendChild(after);
                heartsContainer.appendChild(heart);
                
                // Remove heart after animation completes
                setTimeout(() => {
                    heart.remove();
                }, 2500);
            }, i * 40);
        }
        
        // Add a decorative ribbon element
        const ribbon = document.createElement('div');
        ribbon.style.cssText = `
            position: absolute;
            height: 40px;
            width: 200px;
            background-color: rgba(255, 133, 162, 0.2);
            top: 40%;
            left: 50%;
            transform: translateX(-50%) rotate(-5deg);
            border-radius: 10px;
            z-index: 1;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
        `;
        heartsContainer.appendChild(ribbon);
        
        setTimeout(() => {
            ribbon.remove();
        }, 2500);
    }
    
    // Create shimmer effect
    function createShimmerEffect() {
        const container = document.querySelector('.compliment-display');
        
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: -100%;
            left: -100%;
            width: 300%;
            height: 300%;
            background: linear-gradient(
                to right, 
                rgba(255,255,255,0) 0%,
                rgba(255,255,255,0.3) 50%,
                rgba(255,255,255,0) 100%
            );
            transform: rotate(30deg);
            animation: shimmerAcross 1.5s ease-in-out forwards;
            pointer-events: none;
        `;
        
        container.appendChild(shimmer);
        
        setTimeout(() => {
            shimmer.remove();
        }, 1500);
    }

    // Create sparkle effect with improved aesthetics
    function createSparkleEffect() {
        const container = document.querySelector('.compliment-display');
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                const size = Math.random() * 4 + 2;
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                
                sparkle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background-color: white;
                    border-radius: 50%;
                    top: ${y}%;
                    left: ${x}%;
                    box-shadow: 0 0 ${size*3}px white;
                    opacity: 0;
                    z-index: 4;
                    animation: sparkle 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                `;
                
                container.appendChild(sparkle);
                
                setTimeout(() => {
                    sparkle.remove();
                }, 1500);
            }, i * 30);
        }
    }
    
    // Add floating hearts to the section background
    function addFloatingHeartsToSection() {
        const section = document.querySelector('.compliment-generator');
        const petalsContainer = document.querySelector('.petals-container');
        
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            const size = Math.random() * 30 + 10;
            const left = Math.random() * 100;
            const duration = Math.random() * 40 + 20;
            const delay = Math.random() * 40;
            
            heart.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                bottom: -${size}px;
                left: ${left}%;
                opacity: ${Math.random() * 0.6 + 0.2};
                transform: rotate(45deg);
                animation: floatUp ${duration}s linear ${delay}s infinite;
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
            petalsContainer.appendChild(heart);
        }
    }
    
    // Add title animations with floating elements
    function addTitleAnimations() {
        const title = document.querySelector('.generator-title h2');
        
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
    }
    
    // Create floating blossoms for extra decoration
    function createFloatingBlossoms() {
        const complimentDisplay = document.querySelector('.compliment-display');
        const flowers = ['✿', '❀', '✽', '❁', '✾'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const blossom = document.createElement('div');
                const flower = flowers[Math.floor(Math.random() * flowers.length)];
                const size = randomBetween(20, 40);
                
                blossom.style.cssText = `
                    position: absolute;
                    font-size: ${size}px;
                    color: rgba(255, 133, 162, ${randomBetween(0.1, 0.3)});
                    top: ${randomBetween(0, 100)}%;
                    left: ${randomBetween(-10, 110)}%;
                    transform: rotate(${randomBetween(0, 360)}deg);
                    animation: floatBlossom 6s ease-in-out forwards;
                    z-index: 1;
                    opacity: 0;
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
                `;
                
                blossom.textContent = flower;
                complimentDisplay.appendChild(blossom);
                
                setTimeout(() => {
                    blossom.remove();
                }, 6000);
            }, i * 200);
        }
    }
    
    // Generate a random number between min and max
    function randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // Add animation styles with improved animations
    const animationStyles = document.createElement('style');
    animationStyles.innerHTML = `
        @keyframes floatUp {
            0% { transform: translateY(0) rotate(45deg); opacity: 0; }
            10% { opacity: var(--opacity, 0.3); }
            100% { transform: translateY(-1500px) rotate(45deg); opacity: 0; }
        }
        
        @keyframes sparkle {
            0% { transform: scale(0); opacity: 0; }
            20% { transform: scale(1.2); opacity: 1; }
            50% { transform: scale(0.8); opacity: 0.8; }
            100% { transform: scale(0); opacity: 0; }
        }
        
        @keyframes floatHeart {
            0% { transform: rotate(45deg) scale(0); opacity: 0; }
            15% { transform: rotate(45deg) scale(var(--scale, 1)); opacity: 0.9; }
            100% { transform: translate(var(--translateX), var(--translateY)) rotate(calc(45deg + var(--rotate))) scale(0); opacity: 0; }
        }
        
        @keyframes shimmerAcross {
            0% { transform: translateX(-100%) rotate(30deg); }
            100% { transform: translateX(100%) rotate(30deg); }
        }
        
        @keyframes titleOrbit {
            0% { transform: translate(var(--x, 0), var(--y, 0)) rotate(0deg); }
            100% { transform: translate(var(--x, 0), var(--y, 0)) rotate(360deg); }
        }
        
        @keyframes sparkleGlow {
            0%, 100% { opacity: 0.2; transform: scale(0.8); }
            50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes floatBlossom {
            0% { transform: translateY(20px) rotate(0deg); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.6; }
            100% { transform: translateY(-100px) rotate(180deg); opacity: 0; }
        }
        
        @keyframes underlinePulse {
            0%, 100% { opacity: 0.5; width: 80%; left: 10%; }
            50% { opacity: 0.8; width: 90%; left: 5%; }
        }
        
        nav ul li a {
            overflow: visible !important;
        }
    `;
    document.head.appendChild(animationStyles);
    
    // Initial compliment
    generateCompliment();
    
    // Add animated navigation effects with floating hearts
    function addAnimatedNavigation() {
        const navLinks = document.querySelectorAll('nav ul li a');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                // Create 5-8 small floating hearts
                const heartsCount = Math.floor(Math.random() * 4 + 5);
                
                for (let i = 0; i < heartsCount; i++) {
                    const heart = document.createElement('div');
                    const size = Math.random() * 6 + 6;
                    
                    heart.className = 'nav-heart';
                    heart.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        background-color: ${Math.random() > 0.5 ? '#ff85a2' : '#fff'};
                        left: ${Math.random() * 80 + 10}%;
                        top: -${size}px;
                        opacity: ${Math.random() * 0.3 + 0.6};
                        transform: rotate(45deg);
                        animation: navHeartFloat ${Math.random() * 0.7 + 0.8}s ease-out forwards;
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
    }
    addAnimatedNavigation();
});