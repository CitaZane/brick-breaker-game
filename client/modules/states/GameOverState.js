export default class GameOverState {
    enter() {
        console.log("Enter Game Over state")
        this.container = document.createElement("div")
        this.container.setAttribute("class", "gameOverContainer")
        // Title
        let title = document.createElement('h1');
        title.innerText = "GAME OVER";
        title.setAttribute("class", "title")
        this.container.appendChild(title)

        gameContainer.appendChild(this.container)
    }
    update() {
        if (keysPressed.wasPressed("Enter") || keysPressed.wasPressed(" ")) {
            stateMachine.change("start");
        }
    }
    exit() {
        gameContainer.removeChild(this.container)
    }
} 