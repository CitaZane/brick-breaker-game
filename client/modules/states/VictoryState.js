import {getHtml} from "../utils.js";
import {GAME_CONTAINER} from "../Constants.js";
export default class VictoryState {
    enter(params) {
        console.log("Victory")
        this.path = params.path;
        this.paddle = params.paddle;
        this.health = params.health;
        this.score = params.score;
        this.level = params.level;
                getHtml("./configs/victory.html")
        .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
        .then(()=> {
        this.container = document.querySelector(".victoryContainer")
        })
    }
    update() {
         // On enter go to next state
        // serve state  but next level
        if (keysPressed.wasPressed(" ")) {
            stateMachine.change("serve", {
                paddle: this.paddle,
                health: this.health,
                score: this.score,
                path: "victory",
                level: this.level +1
            });
        }
    }
    exit() {
        GAME_CONTAINER.removeChild(this.container);
        keysPressed.clear();
    }
} 