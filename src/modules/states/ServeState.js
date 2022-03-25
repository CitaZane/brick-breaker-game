import Ball from "../elements/Ball.js";
import {GAME_CONTAINER} from "../Constants.js";
import LevelMaker from "../LevelMaker.js";
import {getHtml} from "../utils.js";

export default class ServeState {
    constructor(){
        this.levelManager = new LevelMaker();
        // 3 stages-> 1 story mode on, 0 last story, -1 story mode false
        this.storyMode = 1;
    }

    enter(params) {
        console.log("Serve")
        this.paddle = params.paddle;
        this.health = params.health;
        this.score = params.score;
        this.ball = new Ball();
        this.level = params.level;
        // Create health, score, pause container, storyLine
        if (params.path === "menu") {
            getHtml("./configs/gameSetup.html")
            .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
            .then(()=>{
                // Read the level blueprint and initialize the story and bricks
                this.levelManager.mapLevel(this.level)
                this.storyMode = 1;
            })
            
        }
        if (params.path === "victory"){
            // Read the level blueprint and initialize the story and bricks
            this.levelManager.mapLevel(this.level)
            this.storyMode = 1;
        }
    }
    update(delta) {
        // Update paddle and ball
        this.paddle.update(delta);
        this.ball.followPaddle(this.paddle)
        
        if (keysPressed.wasPressed(" ")) {
            keysPressed.clear();
            if(this.storyMode == 1){
                let last = this.levelManager.nextStory();
                if(last === 1){
                    this.storyMode = 0
                }
            }else if(this.storyMode == 0){
                this.levelManager.hideStory();
                this.storyMode--
            }else{
                // sounds.list.confirm.play();
                stateMachine.change("play", {
                    paddle: this.paddle,
                    ball: this.ball,
                    bricks:this.levelManager.bricks,
                    health: this.health,
                    score: this.score,
                    level:this.level
                });
            }
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
}
