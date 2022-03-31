export const URL = "http://localhost:3000"
export const VIRTUAL_HEIGHT = 720
export const VIRTUAL_WIDTH = 1280

export const GAME_CONTAINER =  document.getElementById('game-container');

export const PADDLE_HIT_HEIGHT = 70
export const PADDLE_STATS = [
    {width:120, height:78, offset:28, speed: 750, spriteYOffset:0}, 
    {width:200, height:42, offset:28, speed: 600,spriteYOffset:78},
    {width:300, height:254, offset:10, speed: 450,spriteYOffset:120}]

export const TILE_SIZE = 40
/* ------------ powerup index coresponds to the type used in code ----------- */
/* ------------- 0 index left empty => coresponds to no powerup ------------- */
export const POWERUP_STATS = [
    {name:"", lifespan:0},
    {name:"Cannonball", lifespan:0},
    {name:"Paddle Increase", lifespan: 0},
    {name:"Paddle Decrease", lifespan: 0}]