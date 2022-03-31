import Ball from "../elements/Ball.js";
import {GAME_CONTAINER} from "../Constants.js";
import LevelMaker from "../LevelMaker.js";
import {getHtml} from "../utils.js";

export default class ServeState {
    constructor(){
        this.levelManager = new LevelMaker();
    }

    enter(params) {
        this.paddle = params.paddle;
        this.stats = params.stats;
        this.ball = (params.path=="pause") ? params.ball : new Ball();
        this.level = params.level;
        this.path = params.path
        // Create health, score, pause container, storyLine
        if (params.path === "menu") {
            getHtml("./configs/gameSetup.html")
            .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
            .then(()=> {
                this.activePow = [];
                this.initLevel()  
            })
        }
        if (params.path === "victory"){
            this.activePow = [];
            this.initLevel();
        }
    }
    update(delta) {
        this.paddle.update(delta);
        this.ball.followPaddle(this.paddle)
        if(this.path == "play"){
            this.activePow.forEach(pow =>pow.updateActivated(delta));
            this.levelManager.bricks.forEach(brick => {
                let pow = brick.updatePow(delta, this.paddle)
                if(pow!=0){
                    switch (pow.type) {
                        case 1: //Extra life
                            this.stats.updateHealth(1)
                            break;
                        case 2: //paddle increase
                            this.paddle.changeSize(1);
                        break;
                        case 3: //paddle decrease
                            this.paddle.changeSize(-1);
                        break;
                        default:
                            this.activePow.push(pow)
                            break;
                    }
                } 
            });
        }
        /* ------------------------------ update story ----------------------------- */
        if(this.levelManager?.story?.active){
            if(this.levelManager.story.currentFinished()){
                if(keysPressed.wasPressed(" ")){
                    keysPressed.clear();
                    this.levelManager.story.next()
                }
                    
            };
        }else if (!this.levelManager.story?.active){
            /* ---------- storymode MediaElementAudioSourceNode, start the game --------- */
            if (keysPressed.wasPressed(" ")){
                keysPressed.clear();
                sounds.list.ballShoot.play();
                stateMachine.change("play",  this.configureParams());
            }
        }

        /* ----------------------------- open pause menu ---------------------------- */
        if (keysPressed.wasPressed("Escape")) {
            sounds.list.pause.play();
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
    }
    configureParams(){
        return{
            paddle: this.paddle,
            ball: this.ball,
            bricks:this.levelManager.bricks,
            activePow: this.activePow,
            stats :this.stats,
            level:this.level,
            path: "serve",
        }
    }
}
