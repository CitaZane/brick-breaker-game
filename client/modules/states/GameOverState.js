import {getHtml} from "../utils/getHtml.js";
import {GAME_CONTAINER} from "../Constants.js";
export default class GameOverState {
    enter() {
        getHtml("./modules/configs/gameOver.html")
        .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
        .then(()=> {
        this.container = document.getElementsByClassName("gameOverContainer")[0]
        })
    }
    update() {
        if (keysPressed.wasPressed("Enter") || keysPressed.wasPressed(" ")) {
            stateMachine.change("menu");
        }
    }
    exit() {
        GAME_CONTAINER.removeChild(this.container);
        keysPressed.clear();
    }
} 