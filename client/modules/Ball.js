export default class Ball {
    constructor() {
        this.ball = createBall();
        this.width = parseFloat(getComputedStyle(this.ball).getPropertyValue("width"));
        this.height = parseFloat(getComputedStyle(this.ball).getPropertyValue("height"));
        // keep track of velocity in both directions
        this.dx = 0;
        this.dy = 0;
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

    reset() {
        this.x = 250 - this.width / 2;
        // 15 px height of paddle
        this.y = virtualHeight - 17 - this.height;
    }

    outOfScreen() {
        if (this.y > virtualHeight) {
            return true
        }
        return false
    }
    /* --------------------- simple AABB collision detection -------------------- */
    collides(target) {

        if (this.x < target.x + target.width &&
            this.x + this.width > target.x &&
            this.y < target.y + target.height &&
            this.y + this.height > target.y) {
            sounds.list.paddleHit.play();
            return true
        }
        return false
    }
    update(delta) {
        if (!delta) delta = 0;
        this.x = this.x + this.dx * delta;
        this.y = this.y + this.dy * delta;

        // Bouncing off the walls
        if (this.x <= 0) {
            this.x = 0;
            this.dx = -this.dx
            sounds.list.wallHit.play();
        }
        if (this.x >= virtualWidth - this.width) {
            this.x = virtualWidth - this.width;
            this.dx = -this.dx
            sounds.list.wallHit.play();
        }
        if (this.y <= 0) {
            this.y = 0;
            this.dy = -this.dy;
            sounds.list.wallHit.play();
        }
    }
}
function createBall() {
    let ball = document.createElement("div");
    ball.classList.add("ball")
    gameContainer.appendChild(ball)
    return ball
}