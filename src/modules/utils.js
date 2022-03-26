import {VIRTUAL_HEIGHT, VIRTUAL_WIDTH} from './Constants.js'

/* ----------------------- dynamic game screen resize ----------------------- */
export const screenResize = () =>{
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

/* ------------------------- /fetch predefined html ------------------------- */
export async function getHtml(url) {
    let response = await fetch(url);
    let res = await response.text();
    return res
}

/* ---------------------- fetch predefined json levels ---------------------- */
export async function fetchJson(url) {
    let response = await fetch(url);
    let res = await response.json();
    return res
}

/* ------------------ removing elements from game container ----------------- */
/* ------------------ input -> array of element class names ----------------- */
export function removeElements(elements){
    elements.forEach(element => {
        if(document.contains(document.querySelector(`.${element}`))){
            document.querySelector(`.${element}`).remove();
        }
    });
}
/* -------------------- remove all children of an element ------------------- */
/* ------------------- input -> parent element class name ------------------- */
export function removeChildElements(parentClass){
    let parent = document.querySelector(`.${parentClass}`);
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}
export function createListformElements(parentId){
    let list = []
    let choices = document.getElementById(parentId).childNodes;
    const choiceArray = Array.from(choices);
        for (let i = 0; i < choiceArray.length; i++) {
            if (choiceArray[i]?.id){
                list.push(choiceArray[i].id)
            }
        }
    return list
}