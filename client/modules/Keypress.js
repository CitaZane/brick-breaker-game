export default class Keypress {
    #keysPressed
    constructor(keysPressed) {
        this.#keysPressed = keysPressed;
    }

    /* ---------------------------- register keypress --------------------------- */
    press(e) {
        this.#keysPressed[e.key] = true;
        // console.log(this.#keysPressed)
    }

    /* --------------- check if key has been pressed in last frame -------------- */
    wasPressed(key) {
        return this.#keysPressed[key];
    }

    /* ----------------------------- clear all keys ----------------------------- */
    clear() {
        this.#keysPressed = {};
    }
} 
