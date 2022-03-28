import {getHtml, removeElements} from "../utils.js";
import {GAME_CONTAINER, URL} from "../Constants.js";

export default class GameOverState {
    constructor(){
       this.loseStory = ["Parrot: Oh, Cap'n, Sink me! We be in trouble. Th' last cannonball has left th' ship, we be out o' weaponrrry.", "Pirate: Shiver me timbers! Th' city still stands tall and strong. Let's turn this Sea Rover aroun'! This be not our fight t' win."] ;
       this.winStory = ["Pirate: There be no meain' in throwin' a fire o'er th' city. Mate, I think this be wrong!", "Parrot: Ye be goin' mad, me Cap'n. We must fight fer th' booty. Th' enlightenment and knowledge must have gotten t' yer soul. Ye be mad! Mad as a barnacle-covered slug!", "Pirate: Oh, me dear me bucko, ye be wrong without a doubt! We must fight together or not fight at all! We have this holly ship and 12 barrels o' rum, that be all we really need. Not all booty be silver and gold."];
       this.currentStory = 0;
       this.storyMode = 1;
    }
    enter(params) {
        this.stats = params.stats;
        this.level = params.level;
        // Handle if all 10 lvls finished and if not
        if(this.level<2){
            this.story = this.loseStory;
        }else{
            this.story= this.winStory;
        }
         getHtml("./configs/gameOver.html")
            .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
            .then(()=> {
            document.querySelector("#finalScore").innerHTML= this.stats.score;
            document.querySelector(".storyContainer").classList.remove("hide")
            document.querySelector("#storyText").innerHTML = this.story[0];
            })
    }
    update() {
        if(keysPressed.wasPressed(" ")){
            keysPressed.clear();
            if(this.storyMode == 1){
                let last = this.nextStory();
                if(last === 1) this.storyMode = 0
            }else if(this.storyMode == 0){
                this.hideStory();
                this.storyMode--
                 getHtml("./configs/enterHighscore.html")
                    .then((res)=>{GAME_CONTAINER.insertAdjacentHTML("beforeend", res)})
                    .then(()=> {
                        this.container = document.querySelector(".enterHighscore");
                        const scoreForm = document.querySelector("#highscoreForm");
                        scoreForm.addEventListener('submit', this.scoreSubmit)
                        scoreForm.setAttribute('score', this.stats.score); // adding score to form data field
                    })
                }
            }
        if (keysPressed.wasPressed("Enter")) {
            stateMachine.change("highscore");
        }
    }
    exit() {
        removeElements(["enterHighscore", "gameOverContainer"])
        keysPressed.clear();
    }
    scoreSubmit(e){
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
    
    nextStory(){
        this.currentStory++
        document.querySelector("#storyText").innerHTML = this.story[this.currentStory];
        if (this.currentStory == this.story.length-1){
            return 1
        }
         return 0
    }
    // Hide the story content from player
    hideStory(){
        document.querySelector(".storyContainer").classList.add("hide")
    }
} 