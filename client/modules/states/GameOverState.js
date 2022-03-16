import {getHtml} from "../utils.js";
import {GAME_CONTAINER} from "../Constants.js";
export default class GameOverState {
    enter(params) {
        this.score = params.score
        getHtml("./configs/gameOver.html")
        .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
        .then(()=> {
        this.container = document.querySelector(".gameOverContainer")

        document.querySelector("#finalScore").innerHTML= this.score
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