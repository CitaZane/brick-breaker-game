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
        let xOffset = 140;
        let yOffset = 40;
        this.bricks = [];

        for (let type in this.brickBlueprint){
            this.brickBlueprint[type].forEach(pos => {
                let b = new Brick(pos.x*TILE_SIZE+xOffset ,pos.y*TILE_SIZE+yOffset,type, this.brickContainer, pos.w, pos.h)
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