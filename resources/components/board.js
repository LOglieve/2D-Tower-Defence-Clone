import {collision} from './helpers/collision.js';
import {mouse} from './helpers/mouse.js';


export const canvas = document.getElementById("playingBoard");
//ctx = context
export const ctx = canvas.getContext('2d');
export const cellSize = 100;

canvas.width = 900;
canvas.height = 600;



//game board
export const controlsBar = {
    width: canvas.width,
    height: cellSize,
}

export class Cell{
    constructor(x, y){
        //x coord
        this.x = x;
        //y coord
        this.y = y;

        this.width = cellSize;
        this.height = cellSize;
    }
    draw(mouse){
        if(mouse.x && mouse.y && collision(this, mouse)){
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        
    }
}

//create games grid
export function createGrid(gameGrid){
    //cycle through cell positions
    for(let y = cellSize; y < canvas.height; y+= cellSize){
        for(let x = 0; x < canvas.width; x+= cellSize){
            //Adds a new cell into grid array
            gameGrid.push(new Cell(x,y));

        }

    }
}

export function handleGameGrid(gameGrid){
    //call draw method for all cells in the gameGrid array
    for(let i = 0; i < gameGrid.length; i++){
        gameGrid[i].draw(mouse);
    }
}

