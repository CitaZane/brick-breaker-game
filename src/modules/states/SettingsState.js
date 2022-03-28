import {createListformElements, getHtml, removeElements} from "../utils.js";
import {GAME_CONTAINER} from "../Constants.js";
export default class SettingsState {
    constructor() {
        this.menu = [] // menu options generated from predifined html
        this.chosen = 0; // chosen option
    }
    enter() {
        this.chosen = 0;
        getHtml("./configs/settings.html")
            .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
            .then(()=> this.menu = createListformElements("settingsChoices"))
            .then(()=> sounds.renderVolume())
    }
    update() {
        if (keysPressed.wasPressed("ArrowDown")) {
            sounds.list.select.play();
            document.getElementById(this.menu[this.chosen]).classList.remove("chosen")
            this.chosen = (this.chosen < this.menu.length - 1) ? this.chosen + 1 : 0;
            document.getElementById(this.menu[this.chosen]).classList.add("chosen");
            keysPressed.clear();
        }
        if (keysPressed.wasPressed("ArrowUp")) {
            sounds.list.select.play();
            document.getElementById(this.menu[this.chosen]).classList.remove("chosen")
            this.chosen = (this.chosen === 0) ? this.menu.length - 1 : this.chosen - 1;
            document.getElementById(this.menu[this.chosen]).classList.add("chosen");
            keysPressed.clear();
        }
        if (keysPressed.wasPressed("ArrowLeft")) {
            keysPressed.clear();
            if(this.menu[this.chosen] === "settingsSoundEffects"){
                sounds.list.select.play();
                sounds.decreaseSoundVol();
            }
             if(this.menu[this.chosen] === "settingsSoundBackground"){
                sounds.list.select.play();
                sounds.decreaseBackgroundVol();
            }
        }
        if (keysPressed.wasPressed("ArrowRight")) {
            keysPressed.clear();
            if(this.menu[this.chosen] === "settingsSoundEffects"){
                sounds.list.select.play();
                sounds.increaseSoundVol();
            }
            if(this.menu[this.chosen] === "settingsSoundBackground"){
                sounds.list.select.play();
                sounds.increaseBackgroundVol();
            }
        }
        if ( keysPressed.wasPressed(" ") && this.menu[this.chosen] === "settingsBack") {
            sounds.list.confirm.play();
            stateMachine.change("menu");
        }
    }
    exit() {
        keysPressed.clear();
        removeElements(["settingsContainer"])
    }

} 