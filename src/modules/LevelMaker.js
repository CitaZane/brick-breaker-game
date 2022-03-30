import Brick from "./elements/Brick.js";
import { GAME_CONTAINER, TILE_SIZE, VIRTUAL_WIDTH } from "./Constants.js";
import { fetchJson } from "./utils.js";
import Story from "./elements/Story.js";

export default class LevelMaker{
    constructor(){
        this.makeBrickContainer();
    }

    mapLevel(level){
        fetchJson(`../levels/${level}.json`)
        .then((res)=>{
            this.level = res.level
            this.story = new Story(res.intro);
            this.story.show();
            this.brickBlueprint = res.bricks
            this.generateBricks();
        })
    }
    generateBricks(){
        let xOffset = 140; //Offset calculated to placethe bricks in center for 25 bricks
        let yOffset = 40; //placed  one tile size from top
        this.bricks = [];

        for (let type in this.brickBlueprint){
            this.brickBlueprint[type].forEach(brick => {
                let b = new Brick(brick.x*TILE_SIZE+xOffset ,brick.y*TILE_SIZE+yOffset,type, this.brickContainer, brick.w, brick.h, brick.pow)
                this.bricks.push(b)
                b.draw();
            });
        }
    }
    makeBrickContainer(){
        this.brickContainer = document.createElement("div")
        this.brickContainer.classList.add("brickContainer")
        GAME_CONTAINER.appendChild(this.brickContainer)
    }
}