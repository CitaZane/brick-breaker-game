import {GAME_CONTAINER} from "../Constants.js";
export default class PauseState {
    constructor(){
        this.menu = [] // menu options generated from predifined html
        this.chosen = 0; // chosen option
    }
    enter(params) {
        console.log("Enter pause;")
        this.params = params;
        this.path = params.path;
        this.params.path = "pause";
        this.container = document.querySelector(".pauseContainer");
        this.container.classList.remove("hide")

         /* -------------------------- configure pause menu -------------------------- */
        this.chosen = 0;
        let choices = document.getElementById("pauseMenuChoices").childNodes;
        const choiceArray = Array.from(choices);
        for (let i = 0; i < choiceArray.length; i++) {
            if (choiceArray[i]?.id){
                this.menu.push(choiceArray[i].id)
            }
        }
    }
    update() {
         if (keysPressed.wasPressed("ArrowDown")) {
                // sounds.list.select.play();
                document.getElementById(this.menu[this.chosen]).classList.remove("chosen")
                this.chosen = (this.chosen < this.menu.length - 1) ? this.chosen + 1 : 0;
                document.getElementById(this.menu[this.chosen]).classList.add("chosen");
                keysPressed.clear();
            }
            if (keysPressed.wasPressed("ArrowUp")) {
                // sounds.list.select.play();
                document.getElementById(this.menu[this.chosen]).classList.remove("chosen")
                this.chosen = (this.chosen === 0) ? this.menu.length - 1 : this.chosen - 1;
                document.getElementById(this.menu[this.chosen]).classList.add("chosen");
                keysPressed.clear();
            }
            if ( keysPressed.wasPressed(" ") && this.menu[this.chosen] === "pauseResume"){
                keysPressed.clear();
                stateMachine.change(this.path, this.params);
            } else if(keysPressed.wasPressed(" ") && this.menu[this.chosen] === "pauseQuit"){
                keysPressed.clear();
                removeElements();
                stateMachine.change("menu");
            }
    }
    exit() {
         keysPressed.clear();
         this.container.classList.add("hide")
    }
} 
function removeElements() {
    // Remove game elements
    GAME_CONTAINER.removeChild(document.querySelector(".paddle"));
    GAME_CONTAINER.removeChild(document.querySelector(".healthContainer"));
    GAME_CONTAINER.removeChild(document.querySelector(".scoreContainer"));
    GAME_CONTAINER.removeChild(document.querySelector(".pauseContainer"));
    if(document.contains(document.querySelector(".storyContainer"))){
        GAME_CONTAINER.removeChild(document.querySelector(".storyContainer"));
    }
    if(document.contains(document.querySelector(".ball"))){
        GAME_CONTAINER.removeChild(document.querySelector(".ball"));
    }
    let parent = document.querySelector(".brickContainer");
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }

}