import Brick from "./Brick.js";
import { GAME_CONTAINER, TILE_SIZE, VIRTUAL_WIDTH } from "./Constants.js";
import { fetchJson } from "./utils.js";

export default class LevelMaker{
    createMap(level){
        let xOffset = 140;
        let yOffset = 40;
        let container = document.createElement("div")
        container.classList.add("brickContainer")
        GAME_CONTAINER.appendChild(container)
        this.bricks = [];
        // Get blueprint for level and generate bricks
        fetchJson(`../levels/${level}.json`)
        .then((res)=>{
            // range over all bricks(types)
            for (let type in res.bricks){
                res.bricks[type].forEach(pos => {
                    let b = new Brick(pos.x*TILE_SIZE+xOffset ,pos.y*TILE_SIZE+yOffset,type, container, pos.w, pos.h)
                    this.bricks.push(b)
                    b.draw();
                });
            }
        })
        return this.bricks
    }
}