import { POWERUP_STATS, VIRTUAL_HEIGHT } from "../Constants.js";

//  1- life
export default class PowerUp{
    constructor(type){
        this.type = type
        this.width = 28; // constant based on drawing
        this.height= 22;//constant based on drawing
        this.status = "locked" //use different statuses -> locked/ falling//active/lost
        this.pow = this.createPow(); //html elem
        this.dy = 0;//controlls falling
        this.lifeSpan = POWERUP_STATS[this.type].lifespan //seconds powerup active
    }
    get y() {
        return parseFloat(getComputedStyle(this.pow).getPropertyValue("--y"))
    }
    set y(value) {
        this.pow.style.setProperty("--y", value)
    }
    /* ---------- update while powerup still bound to brick and falling --------- */
    updateDeactivated(delta=0, paddle){
        if(this.status != "falling") return 0;
        this.y = this.y + this.dy * delta;
        if(this.detectIfOfScreen())return 0;
        return this.detectCollision(paddle)
    }
    /* ---------------------- activate thus start the timer --------------------- */
    activate(){
        this.showPowerup();
        this.timer = 0;
        this.status = "active";
        this.removeElement();
        return this //Sends back the powerup
    }
    /* ---------------------- update when powerup in action --------------------- */
    updateActivated(delta=0){
        if(this.status != "active") return;
        this.timer += delta //time passed since activation
        if(this.timer>= this.lifeSpan)this.status = "lost" 
    }
    /* ------------------------ on brick hit drop powerup ----------------------- */
    drop(){
        this.dy = 200;
        this.status = "falling"
    }
    /* ---------------- when falling detect of out of game screen --------------- */
    detectIfOfScreen(){
        if(this.y>= VIRTUAL_HEIGHT){
            this.status= "lost"
            this.removeElement();
        }
    }
    /* ---------------------- catch if collides with paddle --------------------- */
    detectCollision(paddle){
         if (this.x + this.width >paddle.x && 
            this.x<paddle.x +paddle.width &&
            this.y < paddle.y + paddle.height &&
            this.y + this.height > paddle.y
            ){
               return this.activate();
            }
        return 0;
    }
    removeElement(){
        document.querySelector(".brickContainer").removeChild(this.pow)
    }
     // Creates the pow 
    createPow(){
        let pow = document.createElement("div");
        pow.classList.add("pow");
        pow.style.setProperty("width", `${this.width}px`);
        pow.style.setProperty("height", `${this.height}px`);
        return pow
    }
    draw(brickContainer,brickHeight, brickWidth, brickX, brickY){
        // Append pow to the container
        // set x and y coordinates based on brick
        this.x = brickX + brickWidth / 2 - this.width /2
        this.y = brickY + brickHeight /2 - this.height /2
        this.pow.style.setProperty("top", `${this.y}px`);
         this.pow.style.setProperty("left", `${this.x}px`);
         brickContainer.appendChild(this.pow)

    }
    showPowerup(){
        document.querySelector("#powerUp").innerHTML = POWERUP_STATS[this.type].name
        document.querySelector(".powerUpContainer").style.visibility = "visible"
        setTimeout(hidePowerup, 2000)
    }
}

function hidePowerup(){
    document.querySelector(".powerUpContainer").style.visibility = "hidden"
}