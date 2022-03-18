import Ball from "../Ball.js";
import {GAME_CONTAINER} from "../Constants.js";
import LevelMaker from "../LevelMaker.js";
import {getHtml} from "../utils.js";

export default class ServeState {
    constructor(){
        this.levelManager = new LevelMaker();
    }

    enter(params) {
        console.log("Serve")
        this.paddle = params.paddle;
        this.health = params.health;
        this.score = params.score;
        this.ball = new Ball();
        this.level = params.level
        // Create health, score, pause container
        if (params.path === "menu") {
            this.createGameElements();
            this.bricks = this.levelManager.createMap(this.level);
        }
        if (params.path === "victory"){
             this.bricks = this.levelManager.createMap(this.level);
        }
    }
    update(delta) {
        // Update paddle and ball
        this.paddle.update(delta);
        this.ball.followPaddle(this.paddle)
        
        if (keysPressed.wasPressed(" ")) {
            // sounds.list.confirm.play();
            stateMachine.change("play", {
                paddle: this.paddle,
                ball: this.ball,
                bricks:this.bricks,
                health: this.health,
                score: this.score,
                level:this.level
            });
        }
        // Esc -> back to start
        if (keysPressed.wasPressed("Escape")) {
            // Remove game elements
            GAME_CONTAINER.removeChild(document.querySelector(".ball"));
            GAME_CONTAINER.removeChild(document.querySelector(".paddle"));
            GAME_CONTAINER.removeChild(document.querySelector(".healthContainer"));
            GAME_CONTAINER.removeChild(document.querySelector(".scoreContainer"));
            stateMachine.change("menu");
        }
    }
    exit() {
        keysPressed.clear();
    }

    createGameElements() {
        getHtml("./configs/gameSetup.html")
            .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
    }
}
