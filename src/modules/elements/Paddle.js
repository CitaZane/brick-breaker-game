import {GAME_CONTAINER, PADDLE_HIT_HEIGHT, PADDLE_STATS, VIRTUAL_HEIGHT, VIRTUAL_WIDTH} from "../Constants.js";

export default class Paddle {
    #speed
    constructor(type) {
        this.type= type
        this.paddle = this.createPaddle();
        this.updateStats();
        this.y = VIRTUAL_HEIGHT- PADDLE_HIT_HEIGHT
        this.height = 20; // standard height for collision detection
        this.dx = 0 // Velocity
        this.reset();
    }
    /* ---------- controll x property -> coresponds to paddle movement ---------- */
    get x() {
        return parseFloat(getComputedStyle(this.paddle).getPropertyValue("--x"))
    }
    set x(value) {
        this.paddle.style.setProperty("--x", value)
    }
    /* ----------------------- place paddle in the middle ----------------------- */
    reset() {
        this.x = VIRTUAL_WIDTH / 2 - this.width /2;
    }

    update(delta = 0) {
        // dx => calculate movement in this frame
        if (keysPressed.wasPressed("ArrowLeft")) {
            this.dx = - this.#speed
            this.x = Math.max(0, this.x + this.dx * delta)
        } else if (keysPressed.wasPressed("ArrowRight")) {
            this.dx = + this.#speed
            this.x = Math.min(VIRTUAL_WIDTH - this.width, this.x + this.dx * delta)
        }
    }
    /* --------------------- /Creates initial paddle element -------------------- */
    createPaddle() {
        let paddle = document.createElement("div");
        paddle.classList.add("paddle")
        GAME_CONTAINER.appendChild(paddle)
        return paddle
    }
    /* ------------- increase or decrease paddle size for power-ups ------------- */
    changeSize(change){
        /* -------------- // Change paddle based on change (+ 1 or -1) -------------- */
        /* ---------------------- first check if in bounds 0-2 ---------------------- */
        if (this.type+change <0 || this.type+change > PADDLE_STATS.length -1)return;
        this.type +=change;
        this.updateStats()
    }
    /* --------------------- position paddle based on stats --------------------- */
    updateStats(){
        this.paddle.style.bottom = `${PADDLE_STATS[this.type].offset}px`
        this.paddle.style.width = `${PADDLE_STATS[this.type].width}px`
        this.paddle.style.height = `${PADDLE_STATS[this.type].height}px`
        this.paddle.style.backgroundPosition = `0px  -${PADDLE_STATS[this.type].spriteYOffset}px`
        this.width = PADDLE_STATS[this.type].width;
        this.#speed = PADDLE_STATS[this.type].speed;
    }
};
