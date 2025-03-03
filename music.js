document.addEventListener('DOMContentLoaded', function() {
    // Initialize music players
    initMusicPlayers();
    
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
});

// Initialize music players
function initMusicPlayers() {
    const players = document.querySelectorAll('.music-player');
    let currentlyPlaying = null;
    
    players.forEach(player => {
        const playPauseBtn = player.querySelector('.play-pause-btn');
        const progressBar = player.querySelector('.progress-bar');
        const playIcon = playPauseBtn.querySelector('.fa-play');
        const pauseIcon = playPauseBtn.querySelector('.fa-pause');
        const audioUrl = playPauseBtn.dataset.audio;
        
        // Create audio element
        const audio = new Audio(audioUrl);
        
        // Update progress bar as audio plays
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
        });
        
        // When audio ends
        audio.addEventListener('ended', () => {
            player.classList.remove('playing');
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            progressBar.style.width = '0%';
            currentlyPlaying = null;
        });
        
        // Play/Pause button click event
        playPauseBtn.addEventListener('click', () => {
            if (currentlyPlaying && currentlyPlaying !== audio) {
                // Stop currently playing audio
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
                
                // Reset other players
                players.forEach(p => {
                    if (p.classList.contains('playing')) {
                        p.classList.remove('playing');
                        const pi = p.querySelector('.fa-play');
                        const pa = p.querySelector('.fa-pause');
                        pi.style.display = 'block';
                        pa.style.display = 'none';
                    }
                });
            }
            
            if (player.classList.contains('playing')) {
                // Pause
                audio.pause();
                player.classList.remove('playing');
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                currentlyPlaying = null;
                stopMusicNotes(player);
            } else {
                // Play
                audio.play();
                player.classList.add('playing');
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                currentlyPlaying = audio;
                createMusicNotes(player);
            }
        });
        
        // Progress bar click event
        player.querySelector('.progress-container').addEventListener('click', function(e) {
            if (audio.src) {
                const percent = e.offsetX / this.offsetWidth;
                audio.currentTime = percent * audio.duration;
                progressBar.style.width = `${percent * 100}%`;
            }
        });
        
        // Add hover effect to player
        player.addEventListener('mouseenter', function() {
            // Add sparkle effect
            createSparkleEffect(this);
            
            // Pulse disc
            const disc = this.querySelector('.player-disc');
            disc.style.transform = 'scale(1.1)';
            setTimeout(() => {
                disc.style.transform = 'scale(1)';
            }, 300);
        });
        
        player.addEventListener('mouseleave', function() {
            const disc = this.querySelector('.player-disc');
            disc.style.transform = 'scale(1)';
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
    const title = document.querySelector('.music-title h2');
    
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

// Add decorative elements to enhance the music page
function addDecorativeElements() {
    // Add floating hearts to the background
    const musicSection = document.querySelector('.music-section');
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
    
    musicSection.appendChild(floatingHeartsContainer);
    
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

// Create sparkle effect
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

// Create music notes animation
function createMusicNotes(player) {
    player.musicNotesInterval = setInterval(() => {
        const musicNote = document.createElement('div');
        const isHash = Math.random() > 0.5;
        const noteChar = isHash ? '♪' : '♫';
        const size = randomBetween(15, 25);
        const startX = randomBetween(10, 90);
        const startY = randomBetween(20, 80);
        const moveX = randomBetween(-80, 80);
        const moveY = randomBetween(-80, -30);
        const rotation = randomBetween(-180, 180);
        
        musicNote.className = 'music-note';
        musicNote.textContent = noteChar;
        musicNote.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            left: ${startX}%;
            top: ${startY}%;
            color: rgba(255, 133, 162, ${randomBetween(0.3, 0.7)});
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
            --tx: ${moveX}px;
            --ty: ${moveY}px;
            --rot: ${rotation}deg;
        `;
        
        player.appendChild(musicNote);
        
        setTimeout(() => {
            musicNote.remove();
        }, 3000);
    }, 800);
}

// Stop music notes animation
function stopMusicNotes(player) {
    clearInterval(player.musicNotesInterval);
}