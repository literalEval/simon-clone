class Game {
    constructor() {
        for (let i: number = 0; i < 4; i++) {
            this.presses[i].addEventListener("click", () => {
                if (this.isRunning) {
                    if (this.currentStack[this.currentIndex] == i) {
                        this.audioList[i].play();
                        
                        if (this.currentStack.length == this.currentIndex + 1) {
                            this.currentScore++;
                            this.currentScoreCard.textContent = `${this.currentScore}`;
                            
                            setTimeout(() => {
                                this.getNew();
                            }, 500);
                        }
                    } else {
                        if (this.currentScore > this.maxScore) {
                            this.maxScore = this.currentScore;
                            this.maxScoreCard.textContent = `${this.maxScore}`;
                        }
                        this.gameOver();
                    }

                    this.currentIndex++;
                }
            });
        }

        this.btnToggle.addEventListener("click", (e) => {
            this.isRunning = !this.isRunning;

            if (this.isRunning) {
                this.getNew();
                this.btnToggle.classList.add('on');
            } else {
                this.btnToggle.classList.remove('on');
            }
        });
    }

    presses: NodeListOf<HTMLElement> = document.querySelectorAll(".press")!;

    pressGreen: HTMLElement = document.querySelector(".press--green")!;
    pressRed: HTMLElement = document.querySelector(".press--red")!;
    pressBlue: HTMLElement = document.querySelector(".press--blue")!;
    pressYellow: HTMLElement = document.querySelector(".press--yellow")!;

    btnToggle: HTMLElement = document.querySelector(".btn-toggle")!;

    currentScoreCard: HTMLElement = document.querySelector('.current-score-card')!;
    maxScoreCard: HTMLElement = document.querySelector('.max-score-card')!;

    back: HTMLElement = document.querySelector('.back')!;

    greenAudio: HTMLAudioElement = new Audio("assets/sounds/green.mp3");
    redAudio: HTMLAudioElement = new Audio("assets/sounds/red.mp3");
    blueAudio: HTMLAudioElement = new Audio("assets/sounds/blue.mp3");
    yellowAudio: HTMLAudioElement = new Audio("assets/sounds/yellow.mp3");
    gameOverAudio: HTMLAudioElement = new Audio("assets/sounds/wrong.mp3");

    audioList: HTMLAudioElement[] = [
        this.greenAudio,
        this.redAudio,
        this.blueAudio,
        this.yellowAudio,
    ];

    isRunning: boolean = false;
    currentScore: number = 0;
    maxScore: number = 0;
    currentIndex: number = -1;
    currentStack: number[] = [];

    getNew(): number {
        var newEntry: number = Math.round(Math.random() * 4);
        newEntry = newEntry == 4 ? 3 : newEntry;
        this.currentStack.push(newEntry);

        this.audioList[newEntry].play();
        this.presses[newEntry].classList.add("on");

        setTimeout(
            (index: number) => {
                this.presses[index].classList.remove("on");
            },
            500,
            newEntry
        );

        this.currentIndex = 0;
        return newEntry;
    }

    getCurrent(): number {
        return this.currentIndex;
    }

    gameOver(): void {
        this.gameOverAudio.play();
        this.currentIndex = -1;
        this.currentStack.length = 0;
        this.isRunning = false;

        this.currentScore = 0;
        this.currentScoreCard.textContent = '0';
        this.btnToggle.classList.remove('on');

        this.back.style.setProperty('--bubble-color', 'red');

        setTimeout(() => {
            this.back.style.setProperty('--bubble-color', 'rgba(255, 255, 255, 0.07)');
        }, 2000);
    }
}

var game = new Game();
