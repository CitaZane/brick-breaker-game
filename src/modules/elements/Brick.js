import {GAME_CONTAINER, TILE_SIZE} from "../Constants.js";
import Tile from "./Tile.js";
export default class Brick{
    #health
    #tiles
    constructor(x,y, type, container,w,h) {

        this.height = h*TILE_SIZE
        this.width = w*TILE_SIZE
        this.x = x
        this.y = y

        this.brick = this.createBrick();

        this.type = type
        this.value = (this.height/TILE_SIZE)*(this.width/TILE_SIZE)
        this.#health = type
        this.inPlay = true
        this.#tiles = []
        this.createTiles();
        this.container = container

    }

    // Triggers a hit on the brick, taking it out of play if at 0 health or
    // changing its color otherwise.
    hit(){
        this.#health --
        if(this.#health<0){
            if (this.type == 2){
                sounds.list.glassBrickDestroyed.play()
                sounds.list.glassBrickDestroyed.currentTime = 0;
            }else {
                sounds.list.brickDestroyed.play();
                sounds.list.brickDestroyed.currentTime = 0;}
            sounds.list.brickDestroyed.play();
            sounds.list.brickDestroyed.currentTime = 0;
            this.inPlay=false;
            this.container.removeChild(this.brick);
            return 1
        }else{
            sounds.list.brickHit.play();
            sounds.list.brickHit.currentTime = 0;
            this.#tiles.forEach(tile => {
                tile.hit()
            });
            return 0
        }
    }
    // Creates the brick and sets height/ width and position on Game screen
    createBrick(){
        let brick = document.createElement("div");
        brick.classList.add("brick");
        brick.style.setProperty("width", `${this.width}px`);
        brick.style.setProperty("height", `${this.height}px`);
        brick.style.setProperty("top", `${this.y}px`);
        brick.style.setProperty("left", `${this.x}px`);
        return brick
    }
    // Creates tiles and add to the brick
    createTiles(){
        for(let i= 0; i< this.width/TILE_SIZE * this.height/TILE_SIZE; i++){
            let tile = new Tile
            this.brick.appendChild(tile.tile)
            this.#tiles.push(tile)
        }
    }

    draw(){
        this.container.appendChild(this.brick)
        this.top = this.y
        this.left = this.x
        // For each tile find the position
        this.#tiles.forEach(tile => {         
            tile.calcPosition();  
        });
        // calculate the right tile
        this.#tiles.forEach(currentTile => {  
            let tileValue = 0;    
            this.#tiles.forEach(target=>{
                // Check if tile to north->west->east->south
                // resource https://gamedevelopment.tutsplus.com/tutorials/how-to-use-tile-bitmasking-to-auto-tile-your-level-layouts--cms-25673
                if(Math.floor(target.pos.bottom) == Math.floor(currentTile.pos.top) &&
                 Math.floor(target.pos.right) == Math.floor(currentTile.pos.right)){
                    tileValue+=1
                }else if(Math.floor(target.pos.right) == Math.floor(currentTile.pos.left) &&
                 Math.floor(target.pos.top) == Math.floor(currentTile.pos.top)){
                    tileValue+=2
                }else if(Math.floor(target.pos.left) == Math.floor(currentTile.pos.right)&&
                 Math.floor(target.pos.top) == Math.floor(currentTile.pos.top)){
                    tileValue+=4
                }else if(Math.floor(target.pos.top) == Math.floor(currentTile.pos.bottom) &&
                 Math.floor(target.pos.right) == Math.floor(currentTile.pos.right)){
                    tileValue+=8
                }
            })
            currentTile.addTexture(tileValue, this.type);
        });
    }

}