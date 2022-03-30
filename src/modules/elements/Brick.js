import {GAME_CONTAINER, TILE_SIZE} from "../Constants.js";
import PowerUp from "./PowerUp.js";
import Tile from "./Tile.js";
export default class Brick{
    #health
    #tiles
    constructor(x,y, type, container,w,h,pow =0) {
        this.height = h*TILE_SIZE
        this.width = w*TILE_SIZE
        this.x = x
        this.y = y

        this.brick = this.createBrick(); //html element
        this.pow = (pow == 0 )? 0: new PowerUp(pow);
        this.type = type
        this.value = (this.height/TILE_SIZE)*(this.width/TILE_SIZE)
        this.#health = type
        this.inPlay = true
        this.#tiles = []
        this.createTiles();
        this.container = container
    }
    /* ----------- // Only updates powerup if it is locked or falling ----------- */
    /* -------------- other cases gets handled from pay/serve state ------------- */
    updatePow(delta, paddle){
        if(this.pow == 0) return 0;
        return this.pow.updateDeactivated(delta, paddle)
    }
    /* -- Triggers a hit on the brick, taking it out of play if at 0 health or -- */
    /* ---------------------- changing its color otherwise. --------------------- */
    hit(){
        if(this.pow?.status == "locked") this.pow.drop();
        this.#health --
        /* ------------------------------ brick cracked ----------------------------- */
        if(this.#health>=0){
            sounds.list.brickHit.play();
            sounds.list.brickHit.currentTime = 0;
            this.#tiles.forEach(tile =>tile.hit());
            return 0
        }
        /* ----------------------------- brick destroyed ---------------------------- */
        if (this.type == 2){
            sounds.list.glassBrickDestroyed.play()
            sounds.list.glassBrickDestroyed.currentTime = 0;
        }else {
            sounds.list.brickDestroyed.play();
            sounds.list.brickDestroyed.currentTime = 0;
        }
        this.inPlay=false;
        this.container.removeChild(this.brick);
        return 1
    }
    /* -- Creates the brick and sets height/ width and position on Game screen -- */
    createBrick(){
        let brick = document.createElement("div");
        brick.classList.add("brick");
        brick.style.setProperty("width", `${this.width}px`);
        brick.style.setProperty("height", `${this.height}px`);
        brick.style.setProperty("top", `${this.y}px`);
        brick.style.setProperty("left", `${this.x}px`);
        return brick
    }
    /* ------------------- Creates tiles and add to the brick ------------------- */
    createTiles(){
        for(let i= 0; i< this.width/TILE_SIZE * this.height/TILE_SIZE; i++){
            let tile = new Tile
            this.brick.appendChild(tile.tile)
            this.#tiles.push(tile)
        }
    }
    /* -------------- Draws brick + tiles  + powerups on the screen ------------- */
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
        // Add powerup
        if(this.pow !=0){
            this.pow.draw(this.container, this.height,this.width, this.x, this.y)
        }
    }

}