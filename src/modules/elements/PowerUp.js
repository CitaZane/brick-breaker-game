import { VIRTUAL_HEIGHT } from "../Constants.js";

//  1- life
export default class PowerUp{
    constructor(type){
        this.type = type
        this.width = 28; // constant based on drawing
        this.height= 22;//constant based on drawing
        this.status = "locked" //use different statuses -> locked/ falling//active/lost
        this.pow = this.createPow(); //html elem
        this.dy = 0;//controlls falling
        this.lifeSpan = 5 //seconds powerup active

    }
    get y() {
        return parseFloat(getComputedStyle(this.pow).getPropertyValue("--y"))
    }
    set y(value) {
        this.pow.style.setProperty("--y", value)
    }
    /* -------------------- if returns 1 -> start the powerup ------------------- */
    update(delta=0, paddle){
        if(this.status == "falling"){
            this.y = this.y + this.dy * delta;
            if(this.detectIfOfScreen())return 0;
            return this.detectCollision(paddle)
        }
        if(this.status == "active"){
            //time passed since activation
            let timePassed = (new Date() - this.startTime ) /1000; 
            if(timePassed>= this.lifeSpan){
                console.log("Lost after", timePassed)
                this.status = "lost" 
            }
        }
        return 0;
    }
    activate(){
        this.startTime = new Date();
        this.status = "active";
        console.log("Activated")
        this.removeElement();
        return this //activation code
    }
    drop(){
        this.dy = 200;
        this.status = "falling"
    }
    detectIfOfScreen(){
        if(this.y>= VIRTUAL_HEIGHT){
            this.status= "lost"
            this.removeElement();
        }
    }
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
}