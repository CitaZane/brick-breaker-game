import {GAME_CONTAINER, TILE_SIZE} from "./Constants.js";
export default class Brick{
    #type
    #health
    constructor(x,y, container) {
        this.brick = this.createBrick();
        this.#type = 0
        this.#health = 1
        this.x = x
        this.y = y
        this.height = TILE_SIZE
        this.width = TILE_SIZE
        this.inPlay = true
        this.brick.xPos = 0;
        this.brick.yPos = this.#type * TILE_SIZE
        this.container = container
    }
    // Brick placment in game
    get left() {
        return parseFloat(getComputedStyle(this.brick).getPropertyValue("--x"))
    }
    set left(value) {
        this.brick.style.setProperty("--x", value)
    }

    get top() {
        return parseFloat(getComputedStyle(this.brick).getPropertyValue("--y"))
    }
    set top(value) {
        this.brick.style.setProperty("--y", value)
    }
    // Tile texture placment in sprite sheet
    get xPos() {
        return parseFloat(getComputedStyle(this.brick).getPropertyValue("--xPos"))
    }
    set xPos(value) {
        this.brick.style.setProperty("--xPos", value)
    }

    get yPos() {
        return parseFloat(getComputedStyle(this.brick).getPropertyValue("--yPos"))
    }
    set yPos(value) {
        this.brick.style.setProperty("--yPos", value)
    }
    // Triggers a hit on the brick, taking it out of play if at 0 health or
    // changing its color otherwise.
    hit(){
        this.inPlay=false;
        this.container.removeChild(this.brick);
    }
    createBrick(){
        let brick = document.createElement("div");
        brick.classList.add("brick")
        // GAME_CONTAINER.appendChild(brick)
        return brick
    }
    draw(){
        this.container.appendChild(this.brick)
        this.top = this.y
        this.left = this.x
    }
}