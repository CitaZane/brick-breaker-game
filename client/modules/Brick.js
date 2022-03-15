import {GAME_CONTAINER, TILE_SIZE} from "./Constants.js";
export default class Brick{
    #type
    #health
    constructor(x,y, type, container) {
        this.brick = this.createBrick();
        this.#type = type
        this.#health = type
        this.x = x
        this.y = y
        this.height = TILE_SIZE
        this.width = TILE_SIZE
        this.inPlay = true
        this.xPos = 0;
        this.yPos = this.calculatePos();
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
    // calculate initai yPosition in sprite sheet
    calculatePos(){
        let position = 0
        for(let i = this.#type; i>0; i--){
            position += i*TILE_SIZE
        }
        return position
    }
    // Triggers a hit on the brick, taking it out of play if at 0 health or
    // changing its color otherwise.
    hit(){
        console.log(this.#health)
        this.#health --
        if(this.#health<0){
            this.inPlay=false;
            this.container.removeChild(this.brick);
        }else{
            this.yPos+=40
        }
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