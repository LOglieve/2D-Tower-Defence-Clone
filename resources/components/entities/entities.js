import { ctx, cellSize, canvas, canvasPosition} from "../board.js";
import { collision } from "../helpers/collision.js";


export let defenders = [];
export let defenderCost = 100;

export let enemies = [];
export let enemyPosition = [];
let enemyInterval = 600;

export let frame = 0;
export let gameLives = 3;

export let projectiles = [];


//DEFENDERS
export class Defender{
    constructor(x, y, ){
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
        this.shooting = false;
        this.health = 100;
        this.timer = 100; //REPLACE WITH VAR LATER
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
    update(){
        if(frame % 100 == 0 ){
            projectiles.push(new Projectiles(this.x, this.y));
        }

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







//PROJECTILES
class Projectiles{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.power = 20;
        this.speed = 5;
    }
    update(){
        this.x += this.speed;
    }
    draw(){
        ctx.fillstyle = 'black';
        ctx.beginPath();
        //makes circle
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        ctx.fill();
    }
}



//handlers

// export function handleDefenders(){
//     for(let i = 0; i < defenders.length; i++){
//         defenders[i].draw();
//         defenders[i].update();

//         for(let j = 0; j < enemies.length; j++){

//             //if defender i exists andis colliding with an enemy
//             if(defenders[i] && collision(defenders[i], enemies[j])){
//                 enemies[j].movement = 0;
//                 defenders[i].health -= 0.2;

//                 if(defenders[i].health <= 0){
//                     defenders.splice(i,1);
//                     i--;
//                     enemies[j].movement = enemies[j].speed;

//                 }
//             }
//         }
//     }
// }


// export function handleEnemies(){
//     for(let i = 0; i < enemies.length; i++){
//         enemies[i].update();
//         enemies[i].draw();

//         //remove enemies once they hit x canvas wall
//         if(enemies[i].x < 0){
//             enemies.splice(i, 1);
//             enemyPosition.splice(i,1);

//             gameLives --;

//         }
//     }
//     if (frame % enemyInterval === 0){
//         let verticalPosition = Math.floor(Math.random()* 5 + 1) * cellSize;
//         enemies.push(new Enemy(verticalPosition));
//         enemyPosition.push(verticalPosition);


//     }
// }

// function handleProjectiles(){
//     for(let i = 0; i < projectiles.length; i++){
//         projectiles[i].update();
//         projectiles[i].draw();

//         if(projectiles[i] && projectiles [i].x > canvas.width - cellSize){
//             projectiles.splice(i,1);
//             i--;
//         }

//     }
// }

export const handleEntities = () =>{
    const largest = calcLargest(defenders.length, enemies.length, projectiles.length);
    for(let i = 0; i < largest; i++){
        //defenders 
        if(defenders[i]){
            defenders[i].draw();
            defenders[i].update();

            for(let j = 0; j < enemies.length; j++){

                //if defender i exists andis colliding with an enemy
                if(defenders[i] && collision(defenders[i], enemies[j])){
                    enemies[j].movement = 0;
                    defenders[i].health -= 0.2;

                    if(defenders[i].health <= 0){
                        defenders.splice(i,1);
                        i--;
                        enemies[j].movement = enemies[j].speed;

                    }
                }
            }

        }

        //enemy 
        if(enemies[i]){
            enemies[i].update();
            enemies[i].draw();

            //remove enemies once they hit x canvas wall
            if(enemies[i].x < 0){
                enemies.splice(i, 1);
                enemyPosition.splice(i,1);

                gameLives --;

            }
        }
        
        //projectile
        if(projectiles[i]){
            projectiles[i].update();
            projectiles[i].draw();

             if(projectiles[i] && projectiles [i].x > canvas.width - cellSize){
             projectiles.splice(i,1);
             i--;
             }
            
        }
    }

    //ENEMY
    if (frame % enemyInterval === 0){
        let verticalPosition = Math.floor(Math.random()* 5 + 1) * cellSize;
         enemies.push(new Enemy(verticalPosition));
         enemyPosition.push(verticalPosition);


    }
}


//UTILITIES
export const inc = () =>{
    return frame++;
}

export const resetEntities = () =>{
    frame = 0;
    gameLives = 3;
    defenders.length = 0;
    enemies.length = 0;
    enemyPosition.length = 0;
}

export const calcLargest = (x, y, z) =>{
    if(x >= y && x >= z){
        return x
    }else if(y >= x && y >= z){
        return y;
    }else{
        return z;
    }

}
