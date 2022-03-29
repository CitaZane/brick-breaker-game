import {GAME_CONTAINER, VIRTUAL_WIDTH, VIRTUAL_HEIGHT, PADDLE_HIT_HEIGHT} from "../Constants.js";
export default class Ball {
    #dx
    #dy
    #width
    #height
    constructor() {
        this.ball = this.createBall();
        this.#width = parseFloat(getComputedStyle(this.ball).getPropertyValue("width"));
        this.#height = parseFloat(getComputedStyle(this.ball).getPropertyValue("height"));
        // keep track of velocity in both directions
        this.#dx = 0;
        this.#dy = 0;
        this.reset();
        this.lost = false; //holds value false if ball in the game/ true if lost
    }

    get x() {
        return parseFloat(getComputedStyle(this.ball).getPropertyValue("--x"))
    }
    set x(value) {
        this.ball.style.setProperty("--x", value)
    }

    get y() {
        return parseFloat(getComputedStyle(this.ball).getPropertyValue("--y"))
    }
    set y(value) {
        this.ball.style.setProperty("--y", value)
    }

    /* ------------------- Place ball in the center of paddle ------------------- */
    reset() {
        this.lost = false;
        this.x = VIRTUAL_WIDTH / 2 - this.#width /2;
        this.y = VIRTUAL_HEIGHT - PADDLE_HIT_HEIGHT - this.#height;
    }
    /* -------------- In serve state ball folows movement of paddle ------------- */
    followPaddle( paddle){
        this.x = paddle.x + (paddle.width / 2) - this.#width / 2;
    }
     /* ----------------------- launch ball off the paddle ----------------------- */
    launch(){  
        this.#dx = 0
        // this.#dx = getRandomInt(-200, 200);
        this.#dy = -350
        // this.#dy = getRandomInt(-200, -200);
    }
    /* ------------------------- detect if ball is lost ------------------------- */
    outOfScreen() {
        if (this.y > VIRTUAL_HEIGHT-this.#height) {
            return true
        }
        return false
    }
    /* --------------------- simple AABB collision detection -------------------- */
    /* ---------- element needs accessable params: x, y , width, height ---------- */
    collides(element) {
        if (this.x + this.#width >element.x && 
            this.x<element.x +element.width &&
            this.y < element.y + element.height &&
            this.y + this.#height > element.y
            ){
                return true
            }
        return false
    }
    brickHit(brick){
        // change balls direction
        // -- we check to see if the opposite side of our velocity is outside of the brick;
        // -- if it is, we trigger a collision on that side. else we're within the X + width of
        // -- the brick and should check to see if the top or bottom edge is outside of the brick,
        // -- colliding on the top or bottom accordingly 
        let shift = 2 // quick fix for corner collision
        // left edge; only check if we're moving right
        if (this.x + shift< brick.x && this.#dx>0){
            this.#dx = -this.#dx
            this.x = brick.x - this.#width
        }else if(this.x + this.#width-shift >brick.x+brick.width && this.#dx<0){
            // right edge; only check if we're moving left
            this.#dx = -this.#dx
            this.x = brick.x + brick.width
        }else if(this.y<brick.y){
            // top edge if no X collisions, always check
            this.#dy = -this.#dy
            this.y=brick.y - this.#height
        }else{
            // bottom edge if no X collisions or top collision, last possibility
            this.#dy = -this.#dy
            this.y=brick.y +brick.height
        
        }
    }
    /* --- returns true if paddle history, false in case of ball out already of bounds -- */
    paddleHit(paddle){
        if(this.lost) return false;
        /* ------ // check if balls center is off paddle -> then drop the ball ------ */
        if(this.x+(this.#width /2) > paddle.x+paddle.width && this.y+(this.#height /2)>paddle.y){
            this.lost = true;
            return false;
        } 
        if(this.x+(this.#width /2) < paddle.x && this.y+(this.#height /2)>paddle.y){
            this.lost = true;
            return false;
        };
        /* ----------- Change ball movement based on how it hit the paddle ---------- */
        // if hit the paddle on left side
        let multiplyer = 4
        if(this.x<paddle.x+(paddle.width/2) ){
            this.#dx =50- multiplyer*(paddle.x + paddle.width/2 - this.x+this.#width/2);
            // if hit the paddle on right side 
        }else if(this.x>paddle.x+(paddle.width/2)){
            this.#dx = 50+  multiplyer*Math.abs(paddle.x + paddle.width/2 -this.x)
        }
        /* ------------- place ball above Y axis, so it doesnt get stuck ------------ */
        this.y = VIRTUAL_HEIGHT - PADDLE_HIT_HEIGHT - this.#height;
        /* --------------------------- Reverse Y velocity --------------------------- */
        this.#dy = -this.#dy;
        return true;
    }
    /* ----------- Main update - move the ball and bounce off the wals ---------- */
    update(delta = 0) {
        this.x = this.x + this.#dx * delta;
        this.y = this.y + this.#dy * delta;

        // Bouncing off the walls
        if (this.x <= 0) {
            this.x = 0;
            this.#dx = -this.#dx
            sounds.list.wallHit.play();
        }
        if (this.x >= VIRTUAL_WIDTH - this.#width) {
            this.x = VIRTUAL_WIDTH - this.#width;
            this.#dx = -this.#dx
            sounds.list.wallHit.play();
        }
        if (this.y <= 0) {
            this.y = 0;
            this.#dy = -this.#dy;
            sounds.list.wallHit.play();
        }
    }

    createBall() {
        let ball = document.createElement("div");
        ball.classList.add("ball")
        GAME_CONTAINER.appendChild(ball)
        return ball
    }  
}