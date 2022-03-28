import {getHtml, removeElements} from "../utils.js";
import {GAME_CONTAINER} from "../Constants.js";
export default class VictoryState {
    enter(params) {
        console.log("Victory")
        this.path = params.path;
        this.paddle = params.paddle;
        this.health = params.health;
        this.score = params.score;
        this.level = params.level;
        this.time = params.time;
        getHtml("./configs/victory.html")
        .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
        .then(()=> {
            const bonus = this.calculateTimeBonus() // calculate bonus
            document.querySelector("#timeBonus").innerHTML = bonus;
            this.score +=bonus 
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
                time:0,
                level: this.level +1
            });
        }
    }
    exit() {
        removeElements(["victoryContainer"])
        this.clearTime(); // restart timer
        document.querySelector("#score").innerHTML = this.score // update score with bonus
        keysPressed.clear();
    }
    /* ---------------------------- helper functions ---------------------------- */
    clearTime(){
        document.querySelector("#timeMinutes").innerHTML = '00'
        document.querySelector("#timeSeconds").innerHTML = '00'
    }
    calculateTimeBonus(){
        // Temporary time onus limit set to 90 000 ms
        // Shall be updated with individual time for each lvl
        let bonus = Math.max(Math.round((90000 - this.time)/100),0)
        return bonus
    }
} 