export const URL = window.location.href
export const VIRTUAL_HEIGHT = 720
export const VIRTUAL_WIDTH = 1280

export const GAME_CONTAINER =  document.getElementById('game-container');

export const PADDLE_HIT_HEIGHT = 70
export const PADDLE_STATS = [
    {width:120, height:78, offset:28, speed: 750, spriteYOffset:0}, 
    {width:200, height:42, offset:28, speed: 600,spriteYOffset:78},
    {width:300, height:254, offset:10, speed: 450,spriteYOffset:120}]

export const BALL_STATS = [
{size:10, offsetX:0}, 
{size:20, offsetX:10},
{size:30, offsetX:30}]

export const TILE_SIZE = 40
/* ------------ powerup index coresponds to the type used in code ----------- */
/* ------------- 0 index left empty => coresponds to no powerup ------------- */
export const POWERUP_STATS = [
    {name:"", lifespan:0},
    {name:"New Cannonball", lifespan:0},
    {name:"Bigger Ship", lifespan: 0},
    {name:"Smaller Ship", lifespan: 0},
    {name:"Larger Cannonball", lifespan: 0},
    {name:"Smaller Cannonball", lifespan: 0},
    {name:"Super Ball", lifespan: 5},
    {name:"Double Score", lifespan: 10}]