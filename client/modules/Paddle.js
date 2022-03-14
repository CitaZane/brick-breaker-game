import {GAME_CONTAINER, VIRTUAL_WIDTH} from "./Constants.js";

export default class Paddle {
    #speed
    #dx
    constructor() {
        this.paddle = this.createPaddle();
        this.#speed = 600
        this.width = parseFloat(getComputedStyle(this.paddle).getPropertyValue("width"))
        // Velocity
        this.#dx = 0
        this.reset();
    }
    
    get x() {
        return parseFloat(getComputedStyle(this.paddle).getPropertyValue("--x"))
    }
    set x(value) {
        this.paddle.style.setProperty("--x", value)
    }
    // place paddle in the middle
    reset() {
        this.x = VIRTUAL_WIDTH / 2 - this.width /2;
    }

    update(delta = 0) {
        // dx => calculate movement in this frame
        if (keysPressed.wasPressed("ArrowLeft")) {
            this.#dx = - this.#speed
            this.x = Math.max(0, this.x + this.#dx * delta)
        } else if (keysPressed.wasPressed("ArrowRight")) {
            this.#dx = + this.#speed
            this.x = Math.min(VIRTUAL_WIDTH - this.width, this.x + this.#dx * delta)
        }
    }
    // Creates initial paddle element
    createPaddle() {
        let paddle = document.createElement("div");
        paddle.classList.add("paddle")
        GAME_CONTAINER.appendChild(paddle)
        return paddle
    }
};
