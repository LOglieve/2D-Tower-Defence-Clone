import { ctx, cellSize, canvas, canvasPosition} from "../board.js";


export const defenders = [];
export let defenderCost = 100;

export let enemies = [];
export let enemyPosition = [];
let enemyInterval = 600;

export let frame = 0;
export let gameLives = 3;



//DEFENDERS
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
        //draw defender as green square
        ctx.fillStyle = 'green';
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



//ENEMIES
class Enemy{
    constructor(verticalPosition){
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = cellSize;
        this.height = cellSize;
        //random number between 0.2 and 0.4
        this.speed = Math.random() * (0.4 - 0.2) + 0.2;
        this.movement = this.speed;
        //generate a random number between 25 and 100
        //Math.random() * (max - min) + min
        this.health = Math.random() * (100 - 25) + 25;
        this.maxHealth = this.health;

    }
    //makes enmies walk to the left
    update(){
        this.x -= this.movement;
    }
    draw(){
        //drae enemies as red square
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y , this.width, this.height);

        //display health
        ctx.fillStyle = 'gold';
        ctx.font = '20px Arial'
        ctx.fillText(Math.floor(this.health), this.x + 30, this.y + 35);

    }
}

export function handleEnemies(){
    for(let i = 0; i < enemies.length; i++){
        enemies[i].update();
        enemies[i].draw();

        //remove enemies once they hit x canvas wall
        if(enemies[i].x < 0){
            enemies.splice(i, 1);

            gameLives --;

        }
    }
    if (frame % enemyInterval === 0){
        let verticalPosition = Math.floor(Math.random()* 5 + 1) * cellSize;
        enemies.push(new Enemy(verticalPosition));
        enemyPosition.push(verticalPosition);


    }
}

export const inc = () =>{
    return frame++;
}





//PROJECTILES