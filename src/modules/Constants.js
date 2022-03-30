export const URL = "http://localhost:3000"
export const VIRTUAL_HEIGHT = 720
export const VIRTUAL_WIDTH = 1280

export const GAME_CONTAINER =  document.getElementById('game-container');

export const PADDLE_HIT_HEIGHT = 70

export const TILE_SIZE = 40
/* ------------ powerup index coresponds to the type used in code ----------- */
/* ------------- 0 index left empty => coresponds to no powerup ------------- */
export const POWERUP_STATS = [{name:"", lifespan:0},{name:"Life", lifespan:0}, {name:"Super ball", lifespan: 5}]