import {getHtml} from "../utils.js";
import {GAME_CONTAINER} from "../Constants.js";

export default class GameOverState {
    enter(params) {
        this.score = params.score
        this.level = params.level
        // Handle if all 10 lvls finished and if not
        if(this.level==1){
            getHtml("./configs/gameOver.html")
            .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
            .then(()=> {
            this.container = document.querySelector(".gameOverContainer")
            document.querySelector("#finalScore").innerHTML= this.score
        })}else{
            getHtml("./configs/enterHighscore.html")
            .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
            .then(()=> this.container = document.querySelector(".enterHighscore"))
        }
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
    // getScore = async() =>{
    //     console.log("Fetching")
    //     fetch("http://localhost:3000/highscores")
    //     .then(res => res.json())
    //     .then(data => console.log("Into highscores",data))
    // }
} 