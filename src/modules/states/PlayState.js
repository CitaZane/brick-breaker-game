import {TILE_SIZE} from "../Constants.js";
import { removeChildElements, removeElements } from "../utils.js";
export default class PlayState {

    enter(params) {
        this.paddle = params.paddle;
        this.ball = params.ball;
        this.bricks = params.bricks;
        this.stats = params.stats;
        this.level = params.level;
        this.activePow = params.activePow;
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
        this.bricks.forEach(brick => {
           let pow = brick.updatePow(delta, this.paddle)
           /* ---------------------------- activate powerups --------------------------- */
           if(pow!=0){
               sounds.list.powerUp.play()
               switch (pow.type) {
                   case 1: //Extra life
                       this.stats.updateHealth(1)
                       break;
                    case 2: //paddle increase
                        this.paddle.changeSize(1);
                    break;
                    case 3: //paddle decrease
                        this.paddle.changeSize(-1);
                    break;
                    case 4: //ball increase
                        this.ball.changeSize(1);
                    break;
                    case 5: //ball decrease
                        this.ball.changeSize(-1);
                    break;
                    case 6: //Super ball
                        this.ball.activateSuper();
                    case 7: //double score
                        this.stats.multiply = 2;
                   default:
                       this.activePow.push(pow)
                       break;
               }
            }
        });
        this.activePow.forEach(pow => {
                pow.updateActivated(delta);
                if(pow.status == "lost" && pow.type ==6)this.ball.deactivateSuper(); 
                if(pow.status == "lost" && pow.type ==7)this.stats.multiply =1;    
            });
        /* -------------------------- clean up poweruparray ------------------------- */
        this.activePow = this.activePow.filter(pow => pow.status != "lost")
        /* ------------------- check three possible ball states -> ------------------ */
        /* --- collision with paddle -ball out of screen - ball colides with brick -- */
        if (this.ball.collides(this.paddle)) {
            let bounced = this.ball.paddleHit(this.paddle)
            if(bounced)sounds.list.paddleHit.play()
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
                    let hitResult = brick.hit(this.ball.super); // Brick hit returns 1 if brick destroyed, 0 if not
                    this.stats.updateScore(hitResult,brick.value, brick.type)
                    if(!this.ball.super)this.ball.brickHit(brick) // change ball direction
                }
                if(brick.inPlay) this.bricksInGame = true; // keep track when all bricks are destroyed
            });
                if(!this.bricksInGame){
                sounds.list.victory.play();
                removeElements(["ball"])
                removeChildElements("brickContainer"); // for safety if powerups still falling
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
            activePow: this.activePow,
            stats: this.stats,
            level:this.level,
            path: "play",
        }
    }
}
