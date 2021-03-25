import { ctx, cellSize } from "../board.js";

export const defenders = [];
export let defenderCost = 100;

export class Defender{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.shooting = false;
        this.health = 100;
        this.projectiles = [];
        this.timer = 0;
    }
    draw(){
        //draw defender as red rectangle
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        //display health
        ctx.fillStyle = 'gold';
        ctx.font = '20px Arial'
        ctx.fillText(Math.floor(this.health), this.x + 30, this.y + 35);
    }
}

export function handleDefenders(){
    for(let i = 0; i < defenders.length; i++){
        defenders[i].draw();
    }
}