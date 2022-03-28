import {TILE_SIZE} from "../Constants.js";
import { removeChildElements, removeElements } from "../utils.js";
export default class PlayState {

    enter(params) {
        this.paddle = params.paddle;
        this.ball = params.ball;
        this.bricks = params.bricks;
        this.health = params.health;
        this.score = params.score;
        this.level = params.level;
        this.time = params.time;
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
       this.time = this.time+delta*1000 // time count in miliseconds
       this.updateTime()
    //    console.log("Curr time", this.time)
        /* ------------------- check three possible ball states -> ------------------ */
        /* --- collision with paddle -ball out of screen - ball colides with brick -- */
        if (this.ball.collides(this.paddle)) {
            this.ball.paddleHit(this.paddle)
        }else if (this.ball.outOfScreen()) {
            /* -------------------------------- ball lost -------------------------------- */
            if (this.health > 1) {
                sounds.list.loseBall.play()
                removeElements(["ball"])
                this.losthHealth(); 
                stateMachine.change("serve", this.configureParams());
            } else {
                sounds.list.loseGame.play()
                /* -------------------------------- Game lost ------------------------------- */
                removeElements(["paddle", "healthContainer", "scoreContainer", "pauseContainer", "ball"]);
                removeChildElements("brickContainer");
                stateMachine.change("gameOver", this.configureParams());
            }
        }else{
            this.bricksInGame = false; // keeps tracks when all the bricks are destoyed 
            /* ------------ Detect collision across all bricks with the ball ------------ */
            this.bricks.forEach(brick => {
                if(brick.inPlay && this.ball.collides(brick)){
                    let hitResult = brick.hit(); // Brick hit returns 1 if brick destroyed, 0 if not
                    this.calculateScore(hitResult, brick)
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
    losthHealth(){
        let healthContainer = document.querySelector(".healthContainer")
        healthContainer.removeChild(document.querySelector(".health"))
        this.health --
    }
    calculateScore(brickDestroyed, brick){
        if(brickDestroyed == 1){
            this.score += 100 + brick.type*50 -  (brick.height/TILE_SIZE)*(brick.width/TILE_SIZE) *10
        }else{
            this.score += brick.type * 25 - (brick.height/TILE_SIZE)*(brick.width/TILE_SIZE) *2
        }
        document.querySelector("#score").innerHTML = this.score
    }
    updateTime(){
        let seconds = ((this.time / 1000)).toFixed(0);
        let minutes = Math.floor(seconds / 60);
        document.querySelector("#timeMinutes").innerHTML = ((minutes%60 < 10 ? '0' : '') + minutes %60)
        document.querySelector("#timeSeconds").innerHTML = ((seconds%60 < 10 ? '0' : '') + seconds%60)
    }
    configureParams(){
        return {
            ball: this.ball,
            paddle:this.paddle,
            bricks:this.bricks,
            health: this.health,
            score: this.score,
            level:this.level,
            time:this.time,
            path: "play",
        }
    }
}
