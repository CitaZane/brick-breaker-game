import {TILE_SIZE} from "../Constants.js";
import { removeChildElements, removeElements } from "../utils.js";
export default class PlayState {

    enter(params) {
        this.paddle = params.paddle;
        this.ball = params.ball;
        this.bricks = params.bricks;
        this.stats = params.stats;
        this.level = params.level;
        if(params.path == "serve")this.ball.launch(); 
    }

    update(delta=0) {
        /* ----------------------------- configure pause ---------------------------- */
        if (keysPressed.wasPressed("Escape")) {
            sounds.list.pause.play();
            stateMachine.change("pause", this.configureParams());
        }

        /* ---------------------------- Main game update ---------------------------- */
        this.paddle.update(delta);
        this.ball.update(delta);
        this.stats.updateTime(delta);
        /* ------------------- check three possible ball states -> ------------------ */
        /* --- collision with paddle -ball out of screen - ball colides with brick -- */
        if (this.ball.collides(this.paddle)) {
            this.ball.paddleHit(this.paddle)
        }else if (this.ball.outOfScreen()) {
            /* -------------------------------- ball lost -------------------------------- */
            if (this.stats.health > 1) {
                sounds.list.loseBall.play()
                removeElements(["ball"]);
                this.stats.updateHealth(-1);
                stateMachine.change("serve", this.configureParams());
            } else {
                sounds.list.loseGame.play()
                /* -------------------------------- Game lost ------------------------------- */
                removeElements(["paddle", "healthContainer", "scoreContainer", "pauseContainer","timeContainer", "ball"]);
                removeChildElements("brickContainer");
                stateMachine.change("gameOver", this.configureParams());
            }
        }else{
            this.bricksInGame = false; // keeps tracks when all the bricks are destoyed 
            /* ------------ Detect collision across all bricks with the ball ------------ */
            this.bricks.forEach(brick => {
                if(brick.inPlay && this.ball.collides(brick)){
                    let hitResult = brick.hit(); // Brick hit returns 1 if brick destroyed, 0 if not
                    this.stats.updateScore(hitResult,brick.value, brick.type)
                    this.ball.brickHit(brick) // change ball direction
                }
                if(brick.inPlay) this.bricksInGame = true; // keep track when all bricks are destroyed
            });
                if(!this.bricksInGame){
                sounds.list.victory.play();
                removeElements(["ball"])
                stateMachine.change("victory", this.configureParams());
            }
        }
    }

    exit() {
        keysPressed.clear();
    }

    /* ----------------------------- helper function ---------------------------- */
    configureParams(){
        return {
            ball: this.ball,
            paddle:this.paddle,
            bricks:this.bricks,
            stats: this.stats,
            level:this.level,
            path: "play",
        }
    }
}
