import Paddle from "../Paddle.js";
// 
export default class StartState {
    #chosen
    #menu
    constructor() {
        this.#menu = ["start", "high score", "settings"] // menu options
        this.#chosen = 0; // chosen option
    }
    /* --------------------- create start menu html elements -------------------- */
    enter() {
        this.container = document.createElement("div")
        this.container.setAttribute("class", "startContainer")
        // Title
        let title = document.createElement('h1');
        title.innerText = "BRICK BREAKER";
        title.setAttribute("class", "title")
        this.container.appendChild(title)
        // menu
        let menu = document.createElement("div")
        menu.setAttribute("class", "menuContainer")

        this.#menu.forEach((choice, index) => {
            let content = document.createElement('p');
            content.innerText = choice.toUpperCase();
            if (index == this.#chosen) {
                content.classList.add("chosen")
            }
            content.classList.add("menuChoice")
            content.setAttribute("id", choice)
            menu.appendChild(content)
        });

        this.container.appendChild(menu)
        gameContainer.appendChild(this.container)

    }

    /* ---------------------------- update strat menu --------------------------- */
    update() {
        // highlight chosen option
        if (keysPressed.wasPressed("ArrowDown")) {
            sounds.list.select.play();
            document.getElementById(this.#menu[this.#chosen]).classList.remove("chosen")
            this.#chosen = (this.#chosen < this.#menu.length - 1) ? this.#chosen + 1 : 0;
            document.getElementById(this.#menu[this.#chosen]).classList.add("chosen")
        }
        if (keysPressed.wasPressed("ArrowUp")) {
            sounds.list.select.play();
            document.getElementById(this.#menu[this.#chosen]).classList.remove("chosen")
            this.#chosen = (this.#chosen === 0) ? this.#menu.length - 1 : this.#chosen - 1;
            document.getElementById(this.#menu[this.#chosen]).classList.add("chosen")
        }
        // On enter go to next state
        // Start Game
        if (keysPressed.wasPressed("Enter") && this.#chosen === 0 || keysPressed.wasPressed(" ") && this.#chosen === 0) {
            sounds.list.confirm.play();
            stateMachine.change("serve", {
                paddle: new Paddle(),
                health: 3,
                score: 0,
                path: "start"
            });
        }
    }


    /* ----------------------- remove start menu elements ----------------------- */
    exit() {
        gameContainer.removeChild(this.container);
        keysPressed.clear();
    }
}
