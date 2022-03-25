/* -------------------------------------------------------------------------- */
/*                                   initialization                           */
/* -------------------------------------------------------------------------- */


/* --------------------------------- imports -------------------------------- */
import StateMachine from './modules/StateMachine.js'
import MenuState from './modules/states/MenuState.js'
import PlayState from './modules/states/PlayState.js'
import GameOverState from './modules/states/GameOverState.js'
import ServeState from './modules/states/ServeState.js'
import VictoryState from './modules/states/VictoryState.js'

import Keypress from './modules/Keypress.js'
import {screenResize} from './modules/utils.js'
// import Sound from './modules/Sound.js'

/* --------------------------- initialize keyPress -------------------------- */
window.keysPressed = new Keypress({});
document.addEventListener("keydown", (e) => keysPressed.press(e))
document.addEventListener("keyup", (e) => keysPressed.unPress(e))

/* -------------------------- sound Initialization -------------------------- */
// Keep sound key the same as the name
// window.sounds = new Sound({
//     wallHit: new Audio(),
//     paddleHit: new Audio(),
//     select: new Audio(), //select option
//     pause: new Audio(),
//     confirm: new Audio(),
//     lose: new Audio(),
// })


/* ------------------------ state machine definition ------------------------ */
window.stateMachine = new StateMachine({
    menu: new MenuState(),
    play: new PlayState(),
    gameOver: new GameOverState(),
    serve: new ServeState(),
    victory: new VictoryState(),
});
window.stateMachine.change("menu");

/* ----------------------- dynamic game screen resize ----------------------- */
window.addEventListener("resize", screenResize)
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
        // keysPressed.clear();
    }
    lastUpdate = time
    window.globalID = requestAnimationFrame(update)
}

window.globalID = requestAnimationFrame(update)