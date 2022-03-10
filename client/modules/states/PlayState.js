export default class PlayState {
    constructor() {
        this.paused = false;
    }
    enter(params) {
        console.log("Enter Play state")
        this.paddle = params.paddle;
        this.ball = params.ball;
        this.health = params.health;
        this.score = params.score;
        // Give random starting velocity
        this.ball.dx = getRandomInt(-200, 200);
        this.ball.dy = getRandomInt(-100, -150);
        // create Pause container
        this.pauseContainer = document.querySelector(".pauseContainer")

    }

    update(delta) {
        // Configure pause mode
        if (keysPressed.wasPressed(" ") && !this.paused) {
            sounds.list.pause.play();
            this.paused = true
            this.pauseContainer.classList.remove("hide")
        } else if (keysPressed.wasPressed(" ") && this.paused) {
            sounds.list.pause.play();
            this.paused = false
            this.pauseContainer.classList.add("hide")

        }
        // Main game update
        if (!this.paused) {
            this.paddle.update(delta);
            this.ball.update(delta);

            if (this.ball.collides(this.paddle)) {
                // Reverse Y velocity
                this.ball.dy = -this.ball.dy;

                this.ball.y = virtualHeight - 17 - this.ball.height;
            }
            if (this.ball.outOfScreen()) {
                sounds.list.lose.play();
                if (this.health > 1) {
                    // Ball lost
                    document.getElementById("health").innerText = this.health - 1;
                    stateMachine.change("serve", {
                        paddle: this.paddle,
                        health: this.health - 1,
                        score: this.score,
                        path: "play"
                    });
                } else {
                    // Game lost
                    removeElements();
                    stateMachine.change("gameOver");
                }
            }
        }
        // Exit key press
        if (keysPressed.wasPressed("Escape")) {
            removeElements();
            stateMachine.change("start");
        }
    }


    exit() {
        gameContainer.removeChild(document.querySelector(".ball"));
    }

}

function removeElements() {
    // Remove game elements
    gameContainer.removeChild(document.querySelector(".paddle"));
    gameContainer.removeChild(document.querySelector(".healthContainer"));
    gameContainer.removeChild(document.querySelector(".scoreContainer"));
    gameContainer.removeChild(document.querySelector(".pauseContainer"));

}


// Pipe height randomizer
function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}