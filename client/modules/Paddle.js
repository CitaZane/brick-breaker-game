export default class Paddle {
    #speed
    #dx
    constructor() {
        this.paddle = createPaddle();
        this.#speed = 600
        this.width = parseFloat(getComputedStyle(this.paddle).getPropertyValue("width"))
        this.height = parseFloat(getComputedStyle(this.paddle).getPropertyValue("height"))
        // Velocity
        this.y = virtualHeight - 5 - this.height
        this.#dx = 0
    }

    get x() {
        return parseFloat(getComputedStyle(this.paddle).getPropertyValue("--x"))
    }
    set x(value) {
        this.paddle.style.setProperty("--x", value)
    }

    reset() {
        this.x = 250 - this.width / 2;
    }

    update(delta) {
        // dx => calculate movement in this frame
        if (!delta) delta = 0;
        if (keysPressed.wasPressed("ArrowLeft")) {
            this.#dx = - this.#speed
        } else if (keysPressed.wasPressed("ArrowRight")) {
            this.#dx = + this.#speed
        } else {
            this.#dx = 0
        }

        // Move the paddle
        if (this.#dx < 0) {
            this.x = Math.max(0, this.x + this.#dx * delta)
        } else {
            this.x = Math.min(500 - this.width, this.x + this.#dx * delta)
        }
    }
};

function createPaddle() {
    let paddle = document.createElement("div");
    paddle.classList.add("paddle")
    gameContainer.appendChild(paddle)
    return paddle
}