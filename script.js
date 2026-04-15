class LoveQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.questions = [
            "Do you love me? 💕",
            "Do you truly love me? 😍"
        ];
        this.init();
    }

    init() {
        this.yesBtn = document.getElementById('yesBtn');
        this.noBtn = document.getElementById('noBtn');
        this.questionEl = document.getElementById('question');
        this.questionContainer = document.getElementById('questionContainer');
        this.celebration = document.getElementById('celebration');
        this.catsContainer = document.getElementById('catsContainer');

        // YES - Always works perfectly
        this.yesBtn.addEventListener('click', (e) => this.handleYes(e));
        this.yesBtn.addEventListener('touchend', (e) => this.handleYes(e));

        // NO - ONLY moves when clicked
        this.noBtn.addEventListener('click', (e) => this.handleNoClick(e));
        this.noBtn.addEventListener('touchend', (e) => this.handleNoClick(e));
    }

    handleYes(e) {
        e.preventDefault();
        e.stopPropagation();

        // Nice yes animation
        this.yesBtn.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            this.yesBtn.style.transform = '';
        }, 150);

        if (this.currentQuestion === 1) {
            this.startCelebration();
        } else {
            this.nextQuestion();
        }
    }

    handleNoClick(e) {
        e.preventDefault();
        e.stopPropagation();

        // IMMEDIATELY move NO button when clicked
        this.moveNoButton();
    }

    moveNoButton() {
        const noBtn = this.noBtn;

        // Calculate random position (avoid edges)
        const maxX = window.innerWidth - 160;
        const maxY = window.innerHeight - 120;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        const rotation = (Math.random() - 0.5) * 360;

        // Move instantly
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.transform = `rotate(${rotation}deg) scale(1.05)`;
        noBtn.style.zIndex = '999';
        noBtn.style.transition = 'all 0.3s ease-out';

        // Funny message
        const messages = ['😏 Nope!', '🏃‍♂️ Missed!', '🙅‍♀️ No!', '😜 Try again!', '😂 No way!'];
        noBtn.innerHTML = messages[Math.floor(Math.random() * messages.length)];

        // Shake animation
        noBtn.style.animation = 'shake 0.5s ease-in-out';

        // Reset shake after animation
        setTimeout(() => {
            noBtn.style.animation = '';
        }, 500);
    }

    nextQuestion() {
        this.currentQuestion++;
        this.questionEl.style.opacity = '0.5';
        setTimeout(() => {
            this.questionEl.textContent = this.questions[this.currentQuestion];
            this.questionEl.style.opacity = '1';
        }, 200);

        // Reset NO button to normal position for next question
        setTimeout(() => {
            this.resetNoButton();
        }, 500);
    }

    resetNoButton() {
        const noBtn = this.noBtn;
        noBtn.style.position = '';
        noBtn.style.left = '';
        noBtn.style.top = '';
        noBtn.style.transform = '';
        noBtn.style.zIndex = '';
        noBtn.style.transition = '';
        noBtn.innerHTML = 'NO 😢';
    }

    startCelebration() {
        this.questionContainer.style.transition = 'opacity 0.5s';
        this.questionContainer.style.opacity = '0';

        setTimeout(() => {
            this.questionContainer.style.display = 'none';
            this.celebration.style.display = 'flex';
            this.celebrationEffects();
        }, 500);
    }

    celebrationEffects() {
        // Dancing cats
        const catEmojis = ['🐱', '🐈', '😻', '🐾', '😸'];
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const cat = document.createElement('div');
                cat.innerHTML = catEmojis[Math.floor(Math.random() * catEmojis.length)];
                cat.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}vw;
                    top: ${Math.random() * 100}vh;
                    font-size: ${40 + Math.random() * 30}px;
                    pointer-events: none;
                    z-index: 1001;
                    animation: bounce 1.2s infinite alternate;
                    animation-delay: ${i * 0.1}s;
                `;
                document.body.appendChild(cat);
                setTimeout(() => cat.remove(), 4000);
            }, i * 120);
        }

        // Heart rain
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = ['💖', '💕', '💗', '💓'][Math.floor(Math.random() * 4)];
                heart.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * 100}vw;
                    animation: heartParticle 2.5s linear forwards;
                    font-size: ${25 + Math.random() * 20}px;
                    pointer-events: none;
                    z-index: 1002;
                `;
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 3000);
            }, i * 60);
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => new LoveQuiz());