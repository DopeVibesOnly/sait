document.addEventListener('DOMContentLoaded', function() {
    // Initialize quiz
    initQuiz();
    
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

// Quiz Data
const quizData = [
    {
        question: "Какой цвет мне нравится?",
        options: ["Синий", "Красный", "Зелёный"],
        correctAnswer: 1,
        feedback: {
            correct: "Умничка! Красный цвет очень красивый, прям как и ты )).",
            incorrect: "Правильный ответ: Красный. Красный цвет очень красивый, прям как и ты ))"
        }
    },
    {
        question: "Какое моё любимое время года?",
        options: ["Зима", "Весна", "Лето"],
        correctAnswer: 2,
        feedback: {
            correct: "Умничка! Лето люблю я больше всего, тёплое и яркое, как твоя улыбка )).",
            incorrect: "Правильный ответ: Лето. Лето - самое классное время года, тёплое и яркое, как твоя улыбка ))."
        }
    },
    {
        question: "Какое животное я считаю самым милым?",
        options: ["Котик", "Панда", "Дельфин"],
        correctAnswer: 1,
        feedback: {
            correct: "Умничка! Панды такие прикольные, такие же очаровательные, как ты )).",
            incorrect: "Правильный ответ: Панда. Панды такие прикольные, такие же очаровательные, как ты ))."
        }
    },
    {
        question: "Какое моё любимое блюдо?",
        options: ["Шашлык", "Суши", "Паста"],
        correctAnswer: 0,
        feedback: {
            correct: "Умничка! Шашлык - это лучшее, что придумало человечество! Шашлык почти такой же крутой как и ты )).",
            incorrect: "Правильный ответ: Шашлык. Шашлык - это лучшее, что придумало человечество! Шашлык почти такой же крутой как и ты ))."
        }
    },
    {
        question: "Где я мечтаю побывать?",
        options: ["Париж", "Мальдивы", "Нью-Йорк"],
        correctAnswer: 2,
        feedback: {
            correct: "Умничка! Я хочу побывать в Нью-Йорке, туда бы с тобой вместе поехать )).",
            incorrect: "Правильный ответ: Нью-Йорк. Я хочу побывать в Нью-Йорке, туда бы с тобой вместе поехать ))."
        }
    },
    {
        question: "Какой мой любимый напиток?",
        options: ["Компот", "Чай", "Горячий шоколад"],
        correctAnswer: 0,
        feedback: {
            correct: "Умничка! Я бы не отказался попить его вместе )).",
            incorrect: "Правильный ответ: Компот. Я бы не отказался попить его вместе ))."
        }
    },
    {
        question: "Какой мой любимый праздник?",
        options: ["Новый год", "День рождения", "Рождество"],
        correctAnswer: 0,
        feedback: {
            correct: "Умничка! Новый год, спасибо дед морозу за исполненное желание, теперь у меня есть ты )).",
            incorrect: "Правильный ответ: Новый год. Спасибо дед морозу за исполненное желание, теперь у меня есть ты))."
        }
    },
    {
        question: "Какой мой любимый десерт?",
        options: ["Мороженое", "Шоколад", "Чизкейк"],
        correctAnswer: 2,
        feedback: {
            correct: "Умничка! Чизкейк - это нечто восхитительное, почти такое же сладкое и приятное, как общение с тобой )).",
            incorrect: "Правильный ответ: Чизкейк. Чизкейк - это нечто восхитительное, почти такое же сладкое и приятное, как общение с тобой ))."
        }
    }
];

// Current question index
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let questionAnswered = false;
let timer = null;

// DOM Elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedback = document.getElementById('feedback');
const nextQuestionBtn = document.getElementById('next-question');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const totalQuestionsResultEl = document.getElementById('total-questions-result');
const correctAnswersEl = document.getElementById('correct-answers');
const resultMessageEl = document.getElementById('result-message');
const quizResults = document.getElementById('quiz-results');
const restartQuizBtn = document.getElementById('restart-quiz');
const progressBar = document.querySelector('.progress-bar');

// Initialize quiz
function initQuiz() {
    // Set total questions
    totalQuestionsEl.textContent = quizData.length;
    totalQuestionsResultEl.textContent = quizData.length;
    
    // Load first question
    loadQuestion();
    
    // Add event listener to next button
    nextQuestionBtn.addEventListener('click', () => {
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
        } else {
            showResults();
        }
    });
    
    // Add event listener to restart button
    restartQuizBtn.addEventListener('click', restartQuiz);
}

// Load question
function loadQuestion() {
    // Reset state
    questionAnswered = false;
    nextQuestionBtn.disabled = true;
    feedback.classList.remove('show', 'correct', 'incorrect');
    feedback.innerHTML = '';
    
    // Update question number and progress bar
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;
    
    // Get current question
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create options
    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.dataset.index = index;
        
        optionElement.addEventListener('click', () => {
            if (!questionAnswered) {
                checkAnswer(index);
            }
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Add animation to question
    questionText.style.opacity = '0';
    questionText.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        questionText.style.opacity = '1';
        questionText.style.transform = 'translateY(0)';
    }, 100);
    
    // Animate options appearance
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.style.opacity = '0';
        option.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            option.style.opacity = '1';
            option.style.transform = 'translateX(0)';
        }, 100 + (index * 100));
    });
}

// Check answer
function checkAnswer(selectedIndex) {
    questionAnswered = true;
    const currentQuestion = quizData[currentQuestionIndex];
    const options = optionsContainer.querySelectorAll('.option');
    const selectedOption = options[selectedIndex];
    const correctOption = options[currentQuestion.correctAnswer];
    
    if (selectedIndex === currentQuestion.correctAnswer) {
        // Correct answer
        selectedOption.classList.add('correct');
        feedback.textContent = currentQuestion.feedback.correct;
        feedback.classList.add('show', 'correct');
        correctAnswersCount++;
        
        // Create celebration effect
        createCorrectAnswerCelebration();
    } else {
        // Incorrect answer
        selectedOption.classList.add('incorrect');
        correctOption.classList.add('correct');
        feedback.textContent = currentQuestion.feedback.incorrect;
        feedback.classList.add('show', 'incorrect');
    }
    
    // Enable next button after 5 seconds
    timer = setTimeout(() => {
        nextQuestionBtn.disabled = false;
        
        // Add pulsing effect to the button
        nextQuestionBtn.classList.add('pulse-animation');
        
        // Auto-proceed to next question after 5 seconds
        if (currentQuestionIndex < quizData.length - 1) {
            timer = setTimeout(() => {
                nextQuestionBtn.click();
            }, 5000);
        } else {
            timer = setTimeout(() => {
                showResults();
            }, 5000);
        }
    }, 5000);
}

// Create celebration effect for correct answers
function createCorrectAnswerCelebration() {
    const quizDisplay = document.querySelector('.quiz-display');
    const colors = ['#ff85a2', '#ffb6c1', '#ffc8dd', '#ffafcc', '#a2d2ff', '#4CAF50'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const size = randomBetween(5, 15);
            const color = colors[Math.floor(Math.random() * colors.length)];
            const isCircle = Math.random() > 0.5;
            const startPositionX = randomBetween(0, quizDisplay.offsetWidth);
            const startPositionY = randomBetween(0, quizDisplay.offsetHeight);
            
            confetti.classList.add('confetti');
            confetti.style.setProperty('--color', color);
            confetti.style.setProperty('--radius', isCircle ? '50%' : '0');
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${startPositionX}px`;
            confetti.style.top = `${startPositionY}px`;
            
            quizDisplay.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 1000);
        }, i * 50);
    }
}

// Show results
function showResults() {
    // Clear any pending timers
    if (timer) {
        clearTimeout(timer);
    }
    
    document.querySelector('.quiz-display').style.display = 'none';
    document.querySelector('.quiz-controls').style.display = 'none';
    quizResults.style.display = 'block';
    
    correctAnswersEl.textContent = correctAnswersCount;
    
    // Set result message based on score
    let resultMessage = '';
    const scorePercentage = (correctAnswersCount / quizData.length) * 100;
    
    if (scorePercentage >= 90) {
        resultMessage = "Умничка!";
    } else if (scorePercentage >= 70) {
        resultMessage = "Умничка!";
    } else if (scorePercentage >= 50) {
        resultMessage = "Умничка!";
    } else {
        resultMessage = "Умничка!";
    }
    
    resultMessageEl.textContent = resultMessage;
    
    // Celebration animation for completing the quiz
    createCompletionCelebration();
}

// Create completion celebration
function createCompletionCelebration() {
    const quizCard = document.querySelector('.quiz-card');
    const colors = ['#ff85a2', '#ffb6c1', '#ffc8dd', '#ffafcc', '#a2d2ff', '#4CAF50', '#FFC107', '#9C27B0'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const size = randomBetween(8, 20);
            const color = colors[Math.floor(Math.random() * colors.length)];
            const isCircle = Math.random() > 0.5;
            const startPositionX = randomBetween(-100, quizCard.offsetWidth + 100);
            
            confetti.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: ${isCircle ? '50%' : '0'};
                left: ${startPositionX}px;
                top: -50px;
                z-index: 20;
                opacity: 0;
                animation: confettiFall ${randomBetween(3, 6)}s linear forwards;
            `;
            
            quizCard.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 6000);
        }, i * 50);
    }
    
    // Add confetti fall animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes confettiFall {
            0% { transform: translateY(0) rotate(0); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(${quizCard.offsetHeight + 100}px) rotate(720deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    questionAnswered = false;
    
    // Reset display
    document.querySelector('.quiz-display').style.display = 'flex';
    document.querySelector('.quiz-controls').style.display = 'flex';
    quizResults.style.display = 'none';
    
    // Load first question
    loadQuestion();
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
        
        .pulse-animation {
            animation: btnPulse 1.5s infinite;
        }
        
        @keyframes btnPulse {
            0%, 100% { transform: scale(1); box-shadow: 0 6px 20px rgba(255, 90, 138, 0.5), 0 0 0 2px rgba(255, 255, 255, 0.3); }
            50% { transform: scale(1.05); box-shadow: 0 10px 25px rgba(255, 90, 138, 0.7), 0 0 0 3px rgba(255, 255, 255, 0.5); }
        }
    `;
    document.head.appendChild(navAnimationStyle);
}

// Add title animations with floating elements
function addTitleAnimations() {
    const title = document.querySelector('.quiz-title h2');
    
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

// Add decorative elements to enhance the quiz
function addDecorativeElements() {
    // Add floating hearts to the quiz background
    const quizSection = document.querySelector('.quiz-section');
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
    
    quizSection.appendChild(floatingHeartsContainer);
    
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