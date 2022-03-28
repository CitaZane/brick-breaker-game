export default class Stats{
    constructor(){
        this.score=0;
        this.time=0;
        this.health = 3;
        this.timeBonus=0;
    }
    /* --------------------------------- update --------------------------------- */
    updateTime(delta){
        this.time = this.time+delta*1000 // time count in miliseconds
        this.renderTime();
    }
    updateTimeBonus(){
        this.timeBonus = Math.max(Math.round((90000 - this.time)/100),0)
        this.score += this.timeBonus;
    }
    updateHealth(param){
        this.health +=param
        if(param<0) this.decreaseHealth();
        if(param>0)this.increaseHealth();
    }
    // BrickDestroyed holds 1 if brick destroyed, 0 if only cracked
    updateScore(brickDestroyed, brickValue, brickType){
        if(brickDestroyed == 1){
            this.score += 100 + brickType*50 - brickValue *10
        }else{
            this.score += brickType * 25 - brickValue *2
        }
        this.renderScore();
    }
    /* --------------------------------- render --------------------------------- */
    renderTime(){
        let seconds = ((this.time / 1000)).toFixed(0);
        let minutes = Math.floor(seconds / 60);
        document.querySelector("#timeMinutes").innerHTML = ((minutes%60 < 10 ? '0' : '') + minutes %60)
        document.querySelector("#timeSeconds").innerHTML = ((seconds%60 < 10 ? '0' : '') + seconds%60)
    }
    renderTimeBonus(){
        document.querySelector("#timeBonus").innerHTML = this.timeBonus;
    }
    decreaseHealth(){
        document.querySelector(".healthContainer").removeChild(document.querySelector(".health"))
    }
    increaseHealth(){
       let healthContainer = document.querySelector(".healthContainer") 
       let newHealth = document.createElement("div");
       newHealth.classList.add("health");
       healthContainer.appendChild(newHealth)
    }
    renderScore(){
        document.querySelector("#score").innerHTML = this.score
    }
    /* ---------------------------------- reset --------------------------------- */
    resetTime(){
        this.time = 0;
        document.querySelector("#timeMinutes").innerHTML = '00'
        document.querySelector("#timeSeconds").innerHTML = '00'
    }
    /* --------------------------------- helpers -------------------------------- */
}
