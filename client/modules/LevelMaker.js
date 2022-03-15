import Brick from "./Brick.js";
import { GAME_CONTAINER, TILE_SIZE, VIRTUAL_WIDTH } from "./Constants.js";

export default class LevelMaker{
    createMap(level){
        let container = document.createElement("div")
        container.classList.add("brickContainer")
        GAME_CONTAINER.appendChild(container)
        this.bricks = [];
        let rows = 5;
        let columns = 25;
        let offsetx = (VIRTUAL_WIDTH - columns*TILE_SIZE) /2

        for(let x=0; x<columns; x++){
            for(let y =0; y<rows; y++){
                let b = new Brick(x*TILE_SIZE + offsetx,y*TILE_SIZE,1, container)
                this.bricks.push(b)
                b.draw();
            }
        }
        return this.bricks
    }
}