import {getHtml, removeElements} from "../utils.js";
import {GAME_CONTAINER, URL} from "../Constants.js";
import Story from "../elements/Story.js"

export default class GameOverState {
    constructor(){
       this.loseStory = ["Parrot: Oh, Cap'n, Sink me! We be in trouble. Th' last cannonball has left th' ship, we be out o' weaponrrry.", "Pirate: Shiver me timbers! Th' city still stands tall and strong. Let's turn this Sea Rover aroun'! This be not our fight t' win."] ;
       this.winStory = ["Pirate: There be no meain' in throwin' a fire o'er th' city. Mate, I think this be wrong!", "Parrot: Ye be goin' mad, me Cap'n. We must fight fer th' booty. Th' enlightenment and knowledge must have gotten t' yer soul. Ye be mad! Mad as a barnacle-covered slug!", "Pirate: Oh, me dear me bucko, ye be wrong without a doubt! We must fight together or not fight at all! We have this holly ship and 12 barrels o' rum, that be all we really need. Not all booty be silver and gold."];
    }
    enter(params) {
        this.stats = params.stats;
        this.level = params.level;
        this.highscoreInputActve = false;
        // Handle if all 10 lvls finished and if not
        if(this.level<10){
            this.story = new Story(this.loseStory);
        }else{
            this.story = new Story(this.winStory);
        }
         getHtml("./configs/gameOver.html")
            .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
            .then(()=> {
            document.querySelector("#finalScore").innerHTML= this.stats.score;
            this.story.show();
            })
    }
    update() {
        if (this.story?.active){
            if(this.story.currentFinished()){
                if(keysPressed.wasPressed(" ")){
                    keysPressed.clear();
                    this.story.next()
                }
            }
        }
        if(!this.story?.active && !this.highscoreInputActve ){
            getHtml("./configs/enterHighscore.html")
                .then((res)=>{GAME_CONTAINER.insertAdjacentHTML("beforeend", res)})
                .then(()=> {
                    const scoreForm = document.querySelector("#highscoreForm");
                    scoreForm.addEventListener('submit', this.scoreSubmit);
                    document.querySelector("#highscoresSubmitBtn").addEventListener('mousedown', this.scoreSubmit)
                    scoreForm.setAttribute('score', this.stats.score); // adding score to form data field
                    this.highscoreInputActve = true;
                })
        }
        if (keysPressed.wasPressed("Escape")) {
            stateMachine.change("menu");
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
        fetch(`${URL}api/highscores`,{
            method: "POST",
            headers:{
               'Accept': 'application/json',
                'Content-Type': 'application/json' ,
            },
            body: JSON.stringify({
                name: player,
                score : score
            })
        })
        .then(()=>{
            console.log("Added new result")
            sounds.list.confirm.play()
            stateMachine.change("highscore")
        })
        .catch(error => console.log("Catch", error))
    }
} 