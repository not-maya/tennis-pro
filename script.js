// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click event listeners to navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Add animation to fact cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.fact-card, .grip-card, .tip-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add hover effects to grip cards
    const gripCards = document.querySelectorAll('.grip-card');
    gripCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});

// Add some interactive features
function addGripSelector() {
    const gripCards = document.querySelectorAll('.grip-card');
    
    gripCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            gripCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Show more details (you could expand this)
            const gripName = this.querySelector('h4').textContent;
            console.log(`Selected grip: ${gripName}`);
        });
    });
}

// Initialize interactive features
document.addEventListener('DOMContentLoaded', function() {
    addGripSelector();
});

// Add a simple grip recommendation system
function getGripRecommendation(skillLevel, shotType) {
    const recommendations = {
        'beginner': {
            'forehand': 'Eastern Forehand',
            'backhand': 'Two-Handed Backhand',
            'serve': 'Continental'
        },
        'intermediate': {
            'forehand': 'Semi-Western',
            'backhand': 'Two-Handed Backhand',
            'serve': 'Continental'
        },
        'advanced': {
            'forehand': 'Semi-Western or Western',
            'backhand': 'One-Handed or Two-Handed',
            'serve': 'Continental'
        }
    };
    
    return recommendations[skillLevel]?.[shotType] || 'Continental';
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Remove any active states
        document.querySelectorAll('.grip-card.active').forEach(card => {
            card.classList.remove('active');
        });
    }
});

// Tennis Grip Mini-Game
class TennisGripGame {
    constructor() {
        this.score = 0;
        this.level = 1;
        this.streak = 0;
        this.currentQuestion = 0;
        this.gameActive = false;
        this.questions = [];
        this.initializeQuestions();
        this.initializeGame();
    }

    initializeQuestions() {
        this.questions = [
            {
                situation: "You're a beginner learning your first forehand shot",
                icon: "🎾",
                options: ["Eastern Forehand", "Semi-Western", "Western", "Continental"],
                correct: 0,
                explanation: "Eastern Forehand is perfect for beginners as it's the most natural and easiest to learn."
            },
            {
                situation: "You want to hit heavy topspin on a high ball",
                icon: "🌪️",
                options: ["Eastern Forehand", "Semi-Western", "Western", "Continental"],
                correct: 2,
                explanation: "Western grip allows for maximum topspin and is ideal for high balls and clay courts."
            },
            {
                situation: "You're serving and want maximum power",
                icon: "⚡",
                options: ["Eastern Forehand", "Semi-Western", "Western", "Continental"],
                correct: 3,
                explanation: "Continental grip is the standard for serves, volleys, and overheads - it provides the best control and power."
            },
            {
                situation: "You're a beginner learning backhand",
                icon: "✋",
                options: ["One-Handed Backhand", "Two-Handed Backhand", "Continental", "Eastern Forehand"],
                correct: 1,
                explanation: "Two-handed backhand is easier for beginners to learn and provides more power and control."
            },
            {
                situation: "You want to hit a slice shot for approach",
                icon: "🔪",
                options: ["Semi-Western", "Western", "Continental", "Eastern Forehand"],
                correct: 2,
                explanation: "Continental grip is perfect for slice shots, providing the right angle for underspin."
            },
            {
                situation: "You're playing on clay and want topspin",
                icon: "🏟️",
                options: ["Eastern Forehand", "Semi-Western", "Continental", "One-Handed Backhand"],
                correct: 1,
                explanation: "Semi-Western grip provides excellent topspin and is the most popular choice for modern clay court play."
            },
            {
                situation: "You're volleying at the net",
                icon: "🏓",
                options: ["Western", "Semi-Western", "Continental", "Eastern Forehand"],
                correct: 2,
                explanation: "Continental grip is essential for volleys as it allows quick transitions and proper racket face angle."
            },
            {
                situation: "You want maximum reach on backhand",
                icon: "🤸",
                options: ["Two-Handed Backhand", "One-Handed Backhand", "Continental", "Semi-Western"],
                correct: 1,
                explanation: "One-handed backhand provides maximum reach and is great for defensive shots and slice."
            },
            {
                situation: "You're hitting an overhead smash",
                icon: "💥",
                options: ["Eastern Forehand", "Semi-Western", "Western", "Continental"],
                correct: 3,
                explanation: "Continental grip is the only proper grip for overhead smashes, providing power and control."
            },
            {
                situation: "You want to hit a drop shot",
                icon: "🎯",
                options: ["Western", "Semi-Western", "Continental", "Eastern Forehand"],
                correct: 2,
                explanation: "Continental grip allows for the delicate touch needed for effective drop shots."
            }
        ];
    }

    initializeGame() {
        this.startBtn = document.getElementById('start-game-btn');
        this.resetBtn = document.getElementById('reset-game-btn');
        this.nextBtn = document.getElementById('next-question-btn');
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.streakElement = document.getElementById('streak');
        this.questionText = document.getElementById('question-text');
        this.situationCard = document.getElementById('situation-card');
        this.situationIcon = document.getElementById('situation-icon');
        this.situationText = document.getElementById('situation-text');
        this.gripOptions = document.getElementById('grip-options');
        this.gameFeedback = document.getElementById('game-feedback');
        this.feedbackContent = document.getElementById('feedback-content');

        this.startBtn.addEventListener('click', () => this.startGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
    }

    startGame() {
        this.gameActive = true;
        this.score = 0;
        this.level = 1;
        this.streak = 0;
        this.currentQuestion = 0;
        
        this.startBtn.style.display = 'none';
        this.resetBtn.style.display = 'inline-block';
        this.nextBtn.style.display = 'none';
        
        this.updateDisplay();
        this.showQuestion();
    }

    resetGame() {
        this.gameActive = false;
        this.score = 0;
        this.level = 1;
        this.streak = 0;
        this.currentQuestion = 0;
        
        this.startBtn.style.display = 'inline-block';
        this.resetBtn.style.display = 'none';
        this.nextBtn.style.display = 'none';
        
        this.updateDisplay();
        this.clearQuestion();
    }

    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.endGame();
            return;
        }

        const question = this.questions[this.currentQuestion];
        
        this.situationIcon.textContent = question.icon;
        this.situationText.textContent = question.situation;
        
        this.gripOptions.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'grip-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.selectAnswer(index));
            this.gripOptions.appendChild(optionElement);
        });

        this.feedbackContent.textContent = '';
        this.feedbackContent.className = 'feedback-content';
    }

    selectAnswer(selectedIndex) {
        if (!this.gameActive) return;

        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.grip-option');
        
        // Disable all options
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });

        // Mark correct and incorrect answers
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                option.classList.add('incorrect');
            }
        });

        // Check if correct
        const isCorrect = selectedIndex === question.correct;
        
        if (isCorrect) {
            this.score += 10;
            this.streak++;
            if (this.streak >= 3) {
                this.score += 5; // Bonus points for streaks
            }
            this.level = Math.floor(this.score / 50) + 1;
            
            this.feedbackContent.textContent = `🎉 Correct! ${question.explanation}`;
            this.feedbackContent.className = 'feedback-content correct';
        } else {
            this.streak = 0;
            this.feedbackContent.textContent = `❌ Incorrect. ${question.explanation}`;
            this.feedbackContent.className = 'feedback-content incorrect';
        }

        this.updateDisplay();
        this.nextBtn.style.display = 'inline-block';
    }

    nextQuestion() {
        this.currentQuestion++;
        this.nextBtn.style.display = 'none';
        this.showQuestion();
    }

    endGame() {
        this.gameActive = false;
        this.feedbackContent.innerHTML = `
            <h3>🎊 Game Complete! 🎊</h3>
            <p>Final Score: ${this.score}</p>
            <p>Level Reached: ${this.level}</p>
            <p>Great job learning about tennis grips!</p>
        `;
        this.feedbackContent.className = 'feedback-content';
        this.nextBtn.style.display = 'none';
    }

    updateDisplay() {
        this.scoreElement.textContent = this.score;
        this.levelElement.textContent = this.level;
        this.streakElement.textContent = this.streak;
    }

    clearQuestion() {
        this.situationIcon.textContent = '🎾';
        this.situationText.textContent = 'Click "Start Game" to begin!';
        this.gripOptions.innerHTML = '';
        this.feedbackContent.textContent = '';
        this.feedbackContent.className = 'feedback-content';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const game = new TennisGripGame();
    initializeGripShowcase();
});

// Interactive Grip Showcase
function initializeGripShowcase() {
    const gripData = {
        continental: {
            name: "Continental Grip",
            description: "The universal grip for serves, volleys, and overheads. Like shaking hands with the racket.",
            difficulty: 40,
            topspin: 20,
            power: 80,
            bevel: 1
        },
        eastern: {
            name: "Eastern Forehand",
            description: "Perfect for beginners and flat shots. Natural and easy to learn, great for volleys.",
            difficulty: 30,
            topspin: 40,
            power: 70,
            bevel: 2
        },
        'semi-western': {
            name: "Semi-Western Grip",
            description: "The modern choice for topspin and baseline play. Used by most professional players.",
            difficulty: 60,
            topspin: 80,
            power: 60,
            bevel: 3
        },
        western: {
            name: "Western Grip",
            description: "Maximum topspin for high balls and clay courts. Advanced technique for heavy spin.",
            difficulty: 80,
            topspin: 95,
            power: 50,
            bevel: 4
        }
    };

    const gripButtons = document.querySelectorAll('.grip-btn');
    const bevels = document.querySelectorAll('.bevel-3d');
    const gripName = document.getElementById('selected-grip-name');
    const gripDescription = document.getElementById('selected-grip-description');
    const difficultyFill = document.querySelector('.difficulty-fill');
    const skillFills = document.querySelectorAll('.skill-fill');

    function updateGripDisplay(gripType) {
        const data = gripData[gripType];
        
        // Update text
        gripName.textContent = data.name;
        gripDescription.textContent = data.description;
        
        // Update bars
        difficultyFill.style.width = data.difficulty + '%';
        skillFills[0].style.width = data.topspin + '%';
        skillFills[1].style.width = data.power + '%';
        
        // Update bevels
        bevels.forEach((bevel, index) => {
            bevel.classList.toggle('active', index === data.bevel - 1);
        });
        
        // Update buttons
        gripButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.grip === gripType);
        });
    }

    // Add event listeners
    gripButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            updateGripDisplay(btn.dataset.grip);
        });
    });

    bevels.forEach((bevel, index) => {
        bevel.addEventListener('click', () => {
            const gripTypes = ['continental', 'eastern', 'semi-western', 'western'];
            updateGripDisplay(gripTypes[index]);
        });
    });

    // Initialize with continental grip
    updateGripDisplay('continental');
}

// Interactive Journey Section
function initializeJourneyInteractions() {
    const bevels = document.querySelectorAll('.bevel');
    const gripName = document.getElementById('grip-name');
    const gripDescription = document.getElementById('grip-description');
    
    const gripInfo = {
        continental: {
            name: "Continental Grip",
            description: "The universal grip for serves, volleys, and overheads. Like shaking hands with the racket."
        },
        eastern: {
            name: "Eastern Forehand",
            description: "Perfect for beginners and flat shots. Natural and easy to learn."
        },
        'semi-western': {
            name: "Semi-Western Grip", 
            description: "The modern choice for topspin and baseline play. Used by most professionals."
        },
        western: {
            name: "Western Grip",
            description: "Maximum topspin for high balls and clay courts. Advanced technique."
        }
    };

    bevels.forEach(bevel => {
        bevel.addEventListener('click', () => {
            // Remove active class from all bevels
            bevels.forEach(b => b.classList.remove('active'));
            // Add active class to clicked bevel
            bevel.classList.add('active');
            
            // Update grip info
            const gripType = bevel.dataset.grip;
            const info = gripInfo[gripType];
            gripName.textContent = info.name;
            gripDescription.textContent = info.description;
        });
    });
}

// Initialize journey interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeJourneyInteractions();
});
