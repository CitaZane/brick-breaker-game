import {getHtml, removeElements} from "../utils.js";
import {GAME_CONTAINER} from "../Constants.js";
export default class VictoryState {
    enter(params) {
        this.path = params.path;
        this.paddle = params.paddle;
        this.stats = params.stats;
        this.level = params.level;
        getHtml("./configs/victory.html")
        .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
        .then(()=> this.stats.updateTimeBonus())
    }
    update() {
         // On enter go to next state
        // serve state  but next level
        if (keysPressed.wasPressed(" ")) {
            this.stats.resetTime();
            this.stats.renderScore();// update score with bonus
            stateMachine.change("serve", {
                paddle: this.paddle,
                stats:this.stats,
                path: "victory",
                level: this.level +1
            });
        }
    }
    exit() {
        removeElements(["victoryContainer"])
        keysPressed.clear();
    }
} 