/* -------------------------------------------------------------------------- */
/*                                   initialization                           */
/* -------------------------------------------------------------------------- */


/* --------------------------------- imports -------------------------------- */
import StateMachine from './modules/StateMachine.js'
import StartState from './modules/states/StartState.js'
import PlayState from './modules/states/PlayState.js'
import GameOverState from './modules/states/GameOverState.js'
import ServeState from './modules/states/ServeState.js'

import Keypress from './modules/Keypress.js'
import Sound from './modules/Sound.js'

/* -------------------------------- constants ------------------------------- */
window.gameContainer = document.getElementById('game-container')
window.virtualHeight = 250;
window.virtualWidth = 500;

/* --------------------------- initialize keyPress -------------------------- */
window.keysPressed = new Keypress({});
document.addEventListener("keydown", (e) => window.keysPressed.press(e))

/* -------------------------- sound Initialization -------------------------- */
// Keep sound key the same as the name
window.sounds = new Sound({
    wallHit: new Audio(),
    paddleHit: new Audio(),
    select: new Audio(), //select option
    pause: new Audio(),
    confirm: new Audio(),
    lose: new Audio(),
})


/* ------------------------ state machine definition ------------------------ */
window.stateMachine = new StateMachine({
    start: new StartState(),
    play: new PlayState(),
    gameOver: new GameOverState(),
    serve: new ServeState(),
});
window.stateMachine.change("start");




/* ----------------------- dynamic game screen resize ----------------------- */
window.addEventListener("resize", () => {
    let multiplyer = (window.innerWidth - 40) / window.virtualWidth;
    gameContainer.style.transform = `scale(${multiplyer})`
    let offset = (window.innerHeight - window.virtualHeight * multiplyer) / 2;
    gameContainer.style.marginTop = `${offset}px`
})
window.dispatchEvent(new Event('resize'))


/* -------------------------------------------------------------------------- */
/*                               main game loop                               */
/* -------------------------------------------------------------------------- */
let lastUpdate

function update(time) {
    if (lastUpdate) {
        // Delta -> time difference between frames for smoother animation
        // 1000 from ms to second
        let delta = (time - lastUpdate) / 1000;

        window.stateMachine.update(delta);
        keysPressed.clear();
    }
    lastUpdate = time
    window.globalID = requestAnimationFrame(update)
}

window.globalID = requestAnimationFrame(update)



/* -------------------------------------------------------------------------- */
/*                                  game plan                                 */
/* -------------------------------------------------------------------------- */
//Story mode
//select level

// story mode -> story -> continue -> (countdown) -> shoot(serve) -> play
// Lose ball -> serve ->play