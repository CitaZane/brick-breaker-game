import {GAME_CONTAINER, PADDLE_HIT_HEIGHT, TILE_SIZE, VIRTUAL_HEIGHT} from "../Constants.js";
export default class PlayState {
    #chosen
    #menu
    constructor() {
        this.paused = false;
        this.#menu = [] // menu options generated from predifined html
        this.#chosen = 0; // chosen option
    }
    enter(params) {
        console.log("Play")
        this.paddle = params.paddle;
        this.ball = params.ball;
        this.bricks = params.bricks;
        this.health = params.health;
        this.score = params.score;
        this.level = params.level;
        this.ball.launch(); 
        this.bricksInGame = false; // keeps tracks when all the bricks are destoyed
        
        // Get Pause container
        this.pauseContainer = document.querySelector(".pauseContainer")
        this.scoreContainer = document.querySelector("#score")

        /* -------------------------- configure pause menu -------------------------- */
        this.#chosen = 0;
        let choices = document.getElementById("pauseMenuChoices").childNodes;
        const choiceArray = Array.from(choices);
        for (let i = 0; i < choiceArray.length; i++) {
            if (choiceArray[i]?.id){
                this.#menu.push(choiceArray[i].id)
            }
        }

    }

    update(delta) {
        /* ----------------------------- configure pause ---------------------------- */
        if (keysPressed.wasPressed("Escape") && !this.paused) {
            this.activatePause();
            keysPressed.clear();

            // Update Pause menu
        } else if (keysPressed.wasPressed("Escape") && this.paused) {
            this.deactivatePause()
            keysPressed.clear();
        }
        if(this.paused){
            // highlight chosen option
            if (keysPressed.wasPressed("ArrowDown")) {
                // sounds.list.select.play();
                document.getElementById(this.#menu[this.#chosen]).classList.remove("chosen")
                this.#chosen = (this.#chosen < this.#menu.length - 1) ? this.#chosen + 1 : 0;
                document.getElementById(this.#menu[this.#chosen]).classList.add("chosen");
                keysPressed.clear();
            }
            if (keysPressed.wasPressed("ArrowUp")) {
                // sounds.list.select.play();
                document.getElementById(this.#menu[this.#chosen]).classList.remove("chosen")
                this.#chosen = (this.#chosen === 0) ? this.#menu.length - 1 : this.#chosen - 1;
                document.getElementById(this.#menu[this.#chosen]).classList.add("chosen");
                keysPressed.clear();
            }
            if ( keysPressed.wasPressed(" ") && this.#menu[this.#chosen] === "pauseResume"){
                this.deactivatePause();
                keysPressed.clear();
            } else if(keysPressed.wasPressed(" ") && this.#menu[this.#chosen] === "pauseQuit"){
                keysPressed.clear();
                removeElements();
                stateMachine.change("menu");
            }
        }
        /* ---------------------------- Main game update ---------------------------- */
        if (!this.paused) {
            this.paddle.update(delta);
            this.ball.update(delta);
            
            if (this.ball.collides(this.paddle)) {
                this.ball.paddleHit(this.paddle)
            }else if (this.ball.outOfScreen()) {
                // sounds.list.lose.play();
                if (this.health > 1) {
                    // Ball lost
                    let healthContainer = document.querySelector(".healthContainer")
                    healthContainer.removeChild(document.querySelector(".health"))
                    stateMachine.change("serve", {
                        paddle: this.paddle,
                        health: this.health - 1,
                        score: this.score,
                        path: "play",
                        level:this.level
                    });
                } else {
                    // Game lost
                    removeElements();
                    stateMachine.change("gameOver", {
                        score: this.score,
                        level:this.level
                    });
                }
            }else{
                this.bricksInGame = false;
                // Detect collision across all bricks with the ball
                this.bricks.forEach(brick => {
                    if(brick.inPlay && this.ball.collides(brick)){
                        // Brick hit returns 1 if brick destroyed, 0 if not
                        let result = brick.hit();
                        // Handle score
                        if(result === 0){
                            this.score += brick.type * 25 - (brick.height/TILE_SIZE)*(brick.width/TILE_SIZE) *2
                        }else{
                            this.score += 100 + brick.type*50 -  (brick.height/TILE_SIZE)*(brick.width/TILE_SIZE) *10
                        }
                        this.scoreContainer.innerHTML = this.score
                        this.ball.brickHit(brick)
                    }
                    if(brick.inPlay){
                        this.bricksInGame = true;
                    }
                });
                if(!this.bricksInGame){
                    stateMachine.change("victory", {
                        paddle: this.paddle,
                        health: this.health,
                        score: this.score,
                        path: "play",
                        level:this.level
                    });
                }
            }
        }
        // Exit key press
        if (keysPressed.wasPressed("Escape")) {
            removeElements();
            stateMachine.change("menu");
        }
    }


    exit() {
        GAME_CONTAINER.removeChild(document.querySelector(".ball"));
    }
    activatePause(){
        this.paused = true
        this.pauseContainer.classList.remove("hide")
    }
    deactivatePause(){
        this.paused = false
        this.pauseContainer.classList.add("hide")
    }

}

function removeElements() {
    // Remove game elements
    GAME_CONTAINER.removeChild(document.querySelector(".paddle"));
    GAME_CONTAINER.removeChild(document.querySelector(".healthContainer"));
    GAME_CONTAINER.removeChild(document.querySelector(".scoreContainer"));
    GAME_CONTAINER.removeChild(document.querySelector(".pauseContainer"));

    let parent = document.querySelector(".brickContainer");
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }

}
