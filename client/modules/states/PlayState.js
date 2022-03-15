import {GAME_CONTAINER, PADDLE_HIT_HEIGHT, VIRTUAL_HEIGHT} from "../Constants.js";
export default class PlayState {
    constructor() {
        this.paused = false;
    }
    enter(params) {
        this.paddle = params.paddle;
        this.ball = params.ball;
        this.bricks = params.bricks;
        this.health = params.health;
        this.score = params.score;
        this.ball.launch();
        // Get Pause container
        this.pauseContainer = document.querySelector(".pauseContainer")

    }

    update(delta) {
        // Configure pause mode
        if (keysPressed.wasPressed(" ") && !this.paused) {
            // sounds.list.pause.play();
            this.paused = true
            this.pauseContainer.classList.remove("hide")
            keysPressed.clear();
            // Update Pause menu
        } else if (keysPressed.wasPressed(" ") && this.paused) {
            // sounds.list.pause.play();
            this.paused = false
            this.pauseContainer.classList.add("hide")
            keysPressed.clear();
        }
        // Main game update
        if (!this.paused) {
            this.paddle.update(delta);
            this.ball.update(delta);

            if (this.ball.collides(this.paddle)) {
                this.ball.paddleHit(this.paddle)
            }else if (this.ball.outOfScreen()) {
                // sounds.list.lose.play();
                if (this.health > 1) {
                    // Ball lost
                    let healthContainer = document.querySelector(".healthContainer")
                    healthContainer.removeChild(document.querySelector(".health"))
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
            }else{
                // Detect collision across all bricks with the ball
                this.bricks.forEach(brick => {
                    if(brick.inPlay && this.ball.collides(brick)){
                        brick.hit();
                        this.ball.brickHit(brick)
                    }
                });
            }
        }
        // Exit key press
        if (keysPressed.wasPressed("Escape")) {
            removeElements();
            stateMachine.change("menu");
        }
    }


    exit() {
        GAME_CONTAINER.removeChild(document.querySelector(".ball"));
    }

}

function removeElements() {
    // Remove game elements
    GAME_CONTAINER.removeChild(document.querySelector(".paddle"));
    GAME_CONTAINER.removeChild(document.querySelector(".healthContainer"));
    GAME_CONTAINER.removeChild(document.querySelector(".scoreContainer"));
    GAME_CONTAINER.removeChild(document.querySelector(".pauseContainer"));

}
