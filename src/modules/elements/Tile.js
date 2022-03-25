import {GAME_CONTAINER, TILE_SIZE} from "../Constants.js";

export default class Tile{
    constructor(){
        this.tile = this.createTile();
        this.image= "url(../graphics/bricks.png)"
    }
    calcPosition(){
      this.pos=this.tile.getBoundingClientRect(); 
    }
    // Create html element for tile
    createTile(){
        let tile = document.createElement("div");
        tile.classList.add("tile")
        return tile
    }
    addTexture(tileValue, type){
        this.y = 0
        for(let i = type; i>0; i--){
            this.y += i*TILE_SIZE
        }
        this.x = tileValue * TILE_SIZE;
        this.tile.style.backgroundImage = this.image; 
        this.tile.style.backgroundPosition = `-${this.x}px  -${this.y}px`
    }
    hit(){
        this.y +=TILE_SIZE
        this.tile.style.backgroundPosition = `-${this.x}px  -${this.y}px`
    }


}