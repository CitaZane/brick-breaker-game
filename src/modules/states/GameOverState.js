import {getHtml} from "../utils.js";
import {GAME_CONTAINER, URL} from "../Constants.js";

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
            .then((res)=>{GAME_CONTAINER.insertAdjacentHTML("afterbegin", res)})
            .then(()=> {
                this.container = document.querySelector(".enterHighscore");
                const scoreForm = document.querySelector("#highscoreForm");
                scoreForm.addEventListener('submit', this.scoreSubmit)
                scoreForm.setAttribute('score', this.score); // adding score to form data field
            })
        }
    }
    update() {
        if (keysPressed.wasPressed("Enter")) {
            stateMachine.change("menu");
        }
    }
    exit() {
        GAME_CONTAINER.removeChild(this.container);
        keysPressed.clear();
    }
    scoreSubmit(e){
        // Prevent default submitting
        // Validate if there is name input (comming soon)
        // Send data via fetch to back end
        e.preventDefault();
        const player = document.getElementById("playerName").value;
        const score = document.querySelector("#highscoreForm").getAttribute("score");
        fetch(`${URL}/highscores`,{
            method: "POST",
            headers:{
               'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                name: player,
                score : score
            })
        })
        .then(()=>console.log("Submitted",player, score))
    }
} 