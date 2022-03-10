import Ball from "../Ball.js";

export default class ServeState {
    enter(params) {
        this.paddle = params.paddle;
        this.health = params.health;
        this.score = params.score;
        this.ball = new Ball();
        // Create health, score, pause container
        if (params.path === "start") {
            createContainer("health", this.health);
            createContainer("score", this.score);
            createContainer("pause", "PAUSE");
        }
    }
    update(delta) {
        // Update paddle
        this.paddle.update(delta);
        // Ball follows the paddle
        this.ball.x = this.paddle.x + (this.paddle.width / 2) - this.ball.width / 2;
        this.ball.y = this.paddle.y - this.ball.height;
        if (keysPressed.wasPressed(" ")) {
            sounds.list.confirm.play();
            stateMachine.change("play", {
                paddle: this.paddle,
                ball: this.ball,
                health: this.health,
                score: this.score,
            });
        }
        // Esc -> back to start
        if (keysPressed.wasPressed("Escape")) {
            // Remove game elements
            gameContainer.removeChild(document.querySelector(".ball"));
            gameContainer.removeChild(document.querySelector(".paddle"));
            gameContainer.removeChild(document.querySelector(".healthContainer"));
            gameContainer.removeChild(document.querySelector(".scoreContainer"));
            stateMachine.change("start");
        }
    }
    exit() {
        keysPressed.clear();
    }
}

function createContainer(name, value) {
    let container = document.createElement("div")
    if (name === "pause") container.classList.add("hide")
    container.classList.add(`${name}Container`)

    // Title
    let content = document.createElement('div');
    content.innerText = value;

    content.setAttribute("id", name)
    container.appendChild(content)
    gameContainer.appendChild(container)
}