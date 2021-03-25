import {ctx, cellSize, canvas, controlsBar, createGrid, handleGameGrid} from './resources/components/board.js';
import {collision} from './resources/components/helpers/collision.js';
import {mouse} from './resources/components/helpers/mouse.js';
import {defenders, defenderCost, Defender, handleDefenders} from './resources/components/entities/defender.js'


//global variables
//const cellSize = 100;
const cellGap = 3;
const gameGrid = [];
const color = 'blue';

//move later
let numberOfResources = 300;

let canvasPosition = canvas.getBoundingClientRect();
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

    if(numberOfResources >= defenderCost){
        defenders.push(new Defender(gridPositionX,gridPositionY));
        numberOfResources -= defenderCost;
    }

});
//projectiles

//enemies

//resources

//utilities

function handleGameStatus(){
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Resources:' + numberOfResources, 50, 50);
}

//calls createGrid function to draw the grid
createGrid(gameGrid);

//main animation loop - constatly drawn and deleted
function animate(){

    //resets position incase of window rezizing / moving
    canvasPosition = canvas.getBoundingClientRect();
    
    //deselects / clears cells so only one is selected at once
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    //fills controlbar in blue
    ctx.fillStyle = 'blue';
    //redraw static controls bar
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
    //redraws all cells
    handleGameGrid(gameGrid, mouse);
    handleDefenders();
    handleGameStatus();

    
    //will run and call itself - recursion
    requestAnimationFrame(animate);
}
animate();

