import Ball from "../Ball.js";
import {GAME_CONTAINER} from "../Constants.js";
import {getHtml} from "../utils/getHtml.js";

export default class ServeState {

    enter(params) {
        this.paddle = params.paddle;
        this.health = params.health;
        this.score = params.score;
        this.ball = new Ball();
        // Create health, score, pause container
        if (params.path === "menu") {
            this.createGameElements();
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
                health: this.health,
                score: this.score,
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
        getHtml("./modules/configs/gameSetup.html")
            .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
    }
}
