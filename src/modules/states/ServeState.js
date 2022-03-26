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
        this.paddle = params.paddle;
        this.health = params.health;
        this.score = params.score;
        this.ball = (params.path=="pause") ? params.ball : new Ball();
        this.level = params.level;
        // Create health, score, pause container, storyLine
        if (params.path === "menu") {
            getHtml("./configs/gameSetup.html")
            .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
            .then(()=> this.initLevel())  
        }
        if (params.path === "victory") this.initLevel();
    }
    update(delta) {
        this.paddle.update(delta);
        this.ball.followPaddle(this.paddle)
        /* ------------------------------ update story ----------------------------- */
        if (keysPressed.wasPressed(" ")) {
            keysPressed.clear();
            if(this.storyMode == 1){
                let last = this.levelManager.nextStory();
                if(last === 1) this.storyMode = 0;
            }else if(this.storyMode == 0){
                this.levelManager.hideStory();
                this.storyMode--
            }else{
                // sounds.list.confirm.play();
                stateMachine.change("play",  this.configureParams());
            }
        }
        /* ----------------------------- open pause menu ---------------------------- */
        if (keysPressed.wasPressed("Escape")) {
            stateMachine.change("pause", this.configureParams())
        }
    }
    exit() {
        keysPressed.clear();
    }
    /* ---------------------------- helper functions ---------------------------- */
    /* ------ Read the level blueprint and initialize the story and bricks ------ */
    initLevel(){
        this.levelManager.mapLevel(this.level)
        this.storyMode = 1;
    }
    configureParams(){
        return{
            paddle: this.paddle,
            ball: this.ball,
            bricks:this.levelManager.bricks,
            health: this.health,
            score: this.score,
            level:this.level,
            path: "serve",
        }
    }
}
