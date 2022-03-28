import Paddle from "../elements/Paddle.js";
import {createListformElements, getHtml, removeElements} from "../utils.js";
import {GAME_CONTAINER} from "../Constants.js";
import Stats from "../elements/Stats.js";
// 
export default class MenuState {
    #chosen
    #menu
    constructor() {
        this.#menu = [] // menu options generated from predifined html
        this.#chosen = 0; // chosen option
    }
    /* --------------------- create start menu html elements -------------------- */
    enter() {
        // sounds.background.muted = false;
        this.#chosen = 0;
        getHtml("./configs/mainMenu.html")
            .then((res)=>GAME_CONTAINER.insertAdjacentHTML("afterbegin", res))
            .then(()=> this.#menu = createListformElements("menuChoices"))
    }

    /* ---------------------------- update strat menu --------------------------- */
    update() {
        // highlight chosen option
        if (keysPressed.wasPressed("ArrowDown")) {
            if(!sounds.activated)sounds.activate();
            sounds.list.select.play();
            document.getElementById(this.#menu[this.#chosen]).classList.remove("chosen")
            this.#chosen = (this.#chosen < this.#menu.length - 1) ? this.#chosen + 1 : 0;
            document.getElementById(this.#menu[this.#chosen]).classList.add("chosen");
            keysPressed.clear();
        }
        if (keysPressed.wasPressed("ArrowUp")) {
            if(!sounds.activated)sounds.activate();
            sounds.list.select.play();
            document.getElementById(this.#menu[this.#chosen]).classList.remove("chosen")
            this.#chosen = (this.#chosen === 0) ? this.#menu.length - 1 : this.#chosen - 1;
            document.getElementById(this.#menu[this.#chosen]).classList.add("chosen");
            keysPressed.clear();
        }
        // On enter go to next state
        // Start Game
        if ( keysPressed.wasPressed(" ") && this.#menu[this.#chosen] === "start" || keysPressed.wasPressed("Enter") && this.#menu[this.#chosen] === "start") {
            sounds.list.confirm.play();
            stateMachine.change("serve", {
                level: 1,
                stats: new Stats(),
                path: "menu",
                paddle: new Paddle(),
            });
        };
        // On enter go to highscores
        if ( keysPressed.wasPressed(" ") && this.#menu[this.#chosen] === "highscores") {
            sounds.list.confirm.play();
            stateMachine.change("highscore");
        }
        if ( keysPressed.wasPressed(" ") && this.#menu[this.#chosen] === "settings") {
            sounds.list.confirm.play();
            stateMachine.change("settings");
        }
    }


    /* ----------------------- remove start menu elements ----------------------- */
    exit() {
        removeElements(["menuContainer"])
        keysPressed.clear();
    }
}
