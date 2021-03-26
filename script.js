import {ctx, cellSize, canvas, controlsBar, createGrid, handleGameGrid, canvasPosition, reCanvas} from './resources/components/board.js';
import {collision} from './resources/components/helpers/collision.js';
import {mouse} from './resources/components/helpers/mouse.js';
import {inc, frame, defenders, defenderCost, Defender, handleDefenders, handleEnemies, gameLives} from './resources/components/entities/entities.js';


//global variables
//const cellSize = 100;
const cellGap = 3;
const gameGrid = [];
const color = 'blue';
let numberOfResources = 300;

canvas.addEventListener('mousemove', function(e){
    //set mouse coords
    //as canvas doesnt cover entired screen we offset using convasPotion variable
    //this ensures we have the cocrect x and y coords when we hover over the canvas
    mouse.x = e.x - canvasPosition.left;
    mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener('mouseleave', function(e){
    //removes mouse coords when not hovering over convas
    mouse.x = undefined;
    mouse.y = undefined;
});

canvas.addEventListener('click', function(){
    //this will give me the value of the nearest  grid position to the left
    const gridPositionX = mouse.x - (mouse.x % cellSize);
    const gridPositionY = mouse.y - (mouse.y % cellSize);

    //if controlsBar clicked
    if(gridPositionY < cellSize) return;


    //check if cell is already occupied
    for( let i = 0; i < defenders.length; i++){
        if(defenders[i].x == gridPositionX && defender[i].y == gridPositionY) return;
    }

    if(numberOfResources >= defenderCost){
        defenders.push(new Defender(gridPositionX,gridPositionY));
        numberOfResources -= defenderCost;
    }

});

//utilities
function handleGameStatus(){
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Resources:' + numberOfResources, 50, 50);

    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('Lives:' + gameLives, 500, 50);



    if(gameLives <= 0){
        ctx.fillStyle = 'black',
        ctx.font = '90px Arial',
        ctx.fillText('GAME OVER', 135, 330);
    }
}

//calls createGrid function to draw the grid
createGrid(gameGrid);

//main animation loop - constatly drawn and deleted
function animate(){

    //resets position incase of window rezizing / moving
    reCanvas();
    
    //deselects / clears cells so only one is selected at once
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    //fills controlbar in blue
    ctx.fillStyle = 'blue';
    //redraw static controls bar
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
    //redraws all cells
    handleGameGrid(gameGrid, mouse);
    handleDefenders();
    handleEnemies();
    
    
    
    inc();
    console.log(frame);
    

    handleGameStatus();
    //will run and call itself - recursion
    if(!gameLives == 0){
        requestAnimationFrame(animate);

    }
}
animate();

