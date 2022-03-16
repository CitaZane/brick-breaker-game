import {GAME_CONTAINER, TILE_SIZE} from "./Constants.js";

export default class Tile{
    constructor(){
        this.tile = this.createTile();
        this.image= "url(../graphics/bricks.png)"
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
    calcPosition(){
      this.pos=this.tile.getBoundingClientRect() ; 
    }
    // Create html element for tile
    createTile(){
        let tile = document.createElement("div");
        tile.classList.add("tile")
        return tile
    }
    addTexture(tileValue, type){
        let yPosition = 0
        for(let i = type; i>0; i--){
            yPosition += i*TILE_SIZE
        }
        let x = tileValue * TILE_SIZE;
        this.tile.style.backgroundImage = this.image; 
        this.tile.style.backgroundPosition = `-${x}px  -${yPosition}px`
    }


}