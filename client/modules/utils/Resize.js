import {VIRTUAL_HEIGHT, VIRTUAL_WIDTH} from '../Constants.js'

/* ----------------------- dynamic game screen resize ----------------------- */
    export const screenResize = () =>{
        console.log("Resizeeee!!!!!!!!1")
        let gameContainer = document.getElementById('game-container');
        // Calculate difference between height and width
        let heightScale = window.innerHeight / VIRTUAL_HEIGHT;
        let widthScale = window.innerWidth / VIRTUAL_WIDTH;
        // set multiplyer based on smallest difference
        let multiplyer
        if (heightScale> widthScale){
                multiplyer = widthScale;
        }else{
            multiplyer = heightScale;
        }
        gameContainer.style.transform = `scale(${multiplyer})`
        // Offset game screen to center if it is smaller than window width
        let offset = (window.innerWidth - VIRTUAL_WIDTH * multiplyer) / 2;
        gameContainer.style.marginLeft = `${offset}px`
    }