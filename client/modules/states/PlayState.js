import {GAME_CONTAINER, PADDLE_HIT_HEIGHT, TILE_SIZE, VIRTUAL_HEIGHT} from "../Constants.js";
export default class PlayState {
    constructor() {
        this.paused = false;
    }
    enter(params) {
        console.log("Play")
        this.paddle = params.paddle;
        this.ball = params.ball;
        this.bricks = params.bricks;
        this.health = params.health;
        this.score = params.score;
        this.level = params.level;
        this.ball.launch(); 
        this.bricksInGame = false; // keeps tracks when all the bricks are destoyed
        // Get Pause container
        this.pauseContainer = document.querySelector(".pauseContainer")
        this.scoreContainer = document.querySelector("#score")

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
                        path: "play",
                        level:this.level
                    });
                } else {
                    // Game lost
                    removeElements();
                    stateMachine.change("gameOver", {
                        score: this.score,
                    });
                }
            }else{
                this.bricksInGame = false;
                // Detect collision across all bricks with the ball
                this.bricks.forEach(brick => {
                    if(brick.inPlay && this.ball.collides(brick)){
                        // Brick hit returns 1 if brick destroyed, 0 if not
                        let result = brick.hit();
                        // this.bricksInGame -=result
                        // Handle score
                        if(result === 0){
                            this.score += brick.type * 25 - (brick.height/TILE_SIZE)*(brick.width/TILE_SIZE) *2
                        }else{
                            this.score += 100 + brick.type*50 -  (brick.height/TILE_SIZE)*(brick.width/TILE_SIZE) *10
                        }
                        this.scoreContainer.innerHTML = this.score
                        this.ball.brickHit(brick)
                    }
                    if(brick.inPlay){
                        this.bricksInGame = true;
                    }
                });
                if(!this.bricksInGame){
                    stateMachine.change("victory", {
                        paddle: this.paddle,
                        health: this.health,
                        score: this.score,
                        path: "play",
                        level:this.level
                    });
                }
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
    GAME_CONTAINER.removeChild(document.querySelector(".brickContainer"));

}
