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
import HighscoreState from './modules/states/HighscoreState.js'
import PauseState from './modules/states/PauseState.js'
import SettingsState from './modules/states/SettingsState.js'

import Keypress from './modules/Keypress.js'
import {screenResize} from './modules/utils.js'
import Sound from './modules/Sound.js'

/* --------------------------- initialize keyPress -------------------------- */
window.keysPressed = new Keypress({});
document.addEventListener("keydown", (e) => keysPressed.press(e))
document.addEventListener("keyup", (e) => keysPressed.unPress(e))

/* -------------------------- sound Initialization -------------------------- */
// Keep sound key the same as the name
window.sounds = new Sound({
    wallHit: new Audio(),
    paddleHit: new Audio(),
    brickHit:new Audio(),
    brickDestroyed: new Audio(),
    glassBrickDestroyed: new Audio(),
    ballShoot: new Audio(),
    loseBall: new Audio(),
    loseGame: new Audio(),
    select: new Audio(), //select option
    pause: new Audio(),
    confirm: new Audio(),
    victory: new Audio(),
    powerUp: new Audio(),
    type: new Audio()
}, new Audio())


/* ------------------------ state machine definition ------------------------ */
window.stateMachine = new StateMachine({
    menu: new MenuState(),
    settings : new SettingsState(),
    play: new PlayState(),
    pause: new PauseState(),
    gameOver: new GameOverState(),
    serve: new ServeState(),
    victory: new VictoryState(),
    highscore : new HighscoreState(),
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
    }
    lastUpdate = time
    window.globalID = requestAnimationFrame(update)
}

window.globalID = requestAnimationFrame(update)