import {createListformElements, removeElements} from '../utils.js'
export default class PauseState {
    constructor(){
        this.menu = [] // menu options generated from predifined html
        this.chosen = 0; // chosen option
    }
    enter(params) {
        this.params = params;
        this.path = params.path;
        this.params.path = "pause";
        sounds.renderVolume();
        this.container = document.querySelector(".pauseContainer");
        this.container.classList.remove("hide")

         /* -------------------------- configure pause menu -------------------------- */
        this.chosen = 0;
        this.menu = createListformElements("pauseMenuChoices")
    }
    update() {
        if (keysPressed.wasPressed("ArrowDown")) {
            sounds.list.select.play();
            keysPressed.clear();
            document.getElementById(this.menu[this.chosen]).classList.remove("chosen")
            this.chosen = (this.chosen < this.menu.length - 1) ? this.chosen + 1 : 0;
            document.getElementById(this.menu[this.chosen]).classList.add("chosen");
        }
        if (keysPressed.wasPressed("ArrowUp")) {
            keysPressed.clear();
            sounds.list.select.play();
            document.getElementById(this.menu[this.chosen]).classList.remove("chosen")
            this.chosen = (this.chosen === 0) ? this.menu.length - 1 : this.chosen - 1;
            document.getElementById(this.menu[this.chosen]).classList.add("chosen");
        }
         if (keysPressed.wasPressed("ArrowLeft")) {
            keysPressed.clear();
            if(this.menu[this.chosen] === "pauseSoundEffects"){
                sounds.list.select.play();
                sounds.decreaseSoundVol();
            }
             if(this.menu[this.chosen] === "pauseSoundBackground"){
                sounds.list.select.play();
                sounds.decreaseBackgroundVol();
            }
        }
        if (keysPressed.wasPressed("ArrowRight")) {
            keysPressed.clear();
            if(this.menu[this.chosen] === "pauseSoundEffects"){
                sounds.list.select.play();
                sounds.increaseSoundVol();
            }
            if(this.menu[this.chosen] === "pauseSoundBackground"){
                sounds.list.select.play();
                sounds.increaseBackgroundVol();
            }
        }
        if ( keysPressed.wasPressed(" ") && this.menu[this.chosen] === "pauseResume"){
            keysPressed.clear();
            sounds.list.confirm.play();
            stateMachine.change(this.path, this.params);
        } else if(keysPressed.wasPressed(" ") && this.menu[this.chosen] === "pauseQuit"){
            keysPressed.clear();
            sounds.list.confirm.play();
            removeElem();
            stateMachine.change("menu");
        }
    }
    exit() {
         keysPressed.clear();
         this.container.classList.add("hide")
    }
} 
function removeElem() {
    removeElements(["paddle", "healthContainer", "scoreContainer", "pauseContaner", "storyContainer", "ball", "timeContainer"]);
    let parent = document.querySelector(".brickContainer");
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}