import {GAME_CONTAINER, TILE_SIZE} from "../Constants.js";
export default class PlayState {
    enter(params) {
        console.log("Play")
        this.paddle = params.paddle;
        this.ball = params.ball;
        this.bricks = params.bricks;
        this.health = params.health;
        this.score = params.score;
        this.level = params.level;
        if(params.path == "serve")this.ball.launch(); 
        this.bricksInGame = false; // keeps tracks when all the bricks are destoyed
        
        this.scoreContainer = document.querySelector("#score")
    }

    update(delta) {
        /* ----------------------------- configure pause ---------------------------- */
        if (keysPressed.wasPressed("Escape")) {
            stateMachine.change("pause", {
                paddle: this.paddle,
                    ball: this.ball,
                    bricks:this.bricks,
                    health: this.health,
                    score: this.score,
                    level:this.level,
                    path: "play",
            })
        }

        /* ---------------------------- Main game update ---------------------------- */
            this.paddle.update(delta);
            this.ball.update(delta);
            
            if (this.ball.collides(this.paddle)) {
                this.ball.paddleHit(this.paddle)
            }else if (this.ball.outOfScreen()) {
                // sounds.list.lose.play();
                if (this.health > 1) {
                    /* -------------------------------- ball lost -------------------------------- */
                    GAME_CONTAINER.removeChild(document.querySelector(".ball"));
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
                    /* -------------------------------- Game lost ------------------------------- */
                    removeElements();
                    GAME_CONTAINER.removeChild(document.querySelector(".ball"));
                    stateMachine.change("gameOver", {
                        score: this.score,
                        level:this.level
                    });
                }
            }else{
                this.bricksInGame = false;
                /* ------------ Detect collision across all bricks with the ball ------------ */
                this.bricks.forEach(brick => {
                    if(brick.inPlay && this.ball.collides(brick)){
                        // Brick hit returns 1 if brick destroyed, 0 if not
                        let result = brick.hit();
                        /* ------------------------------ score hadling ----------------------------- */
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
                    GAME_CONTAINER.removeChild(document.querySelector(".ball"));
                    stateMachine.change("victory", {
                        paddle: this.paddle,
                        health: this.health,
                        score: this.score,
                        path: "play",
                        level:this.level
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
        // GAME_CONTAINER.removeChild(document.querySelector(".ball"));
        keysPressed.clear();
    }
}

function removeElements() {
    // Remove game elements
    GAME_CONTAINER.removeChild(document.querySelector(".paddle"));
    GAME_CONTAINER.removeChild(document.querySelector(".healthContainer"));
    GAME_CONTAINER.removeChild(document.querySelector(".scoreContainer"));
    GAME_CONTAINER.removeChild(document.querySelector(".pauseContainer"));

    let parent = document.querySelector(".brickContainer");
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }

}
