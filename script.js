import {ctx, cellSize, canvas, controlsBar, createGrid, handleGameGrid} from './resources/components/board.js';
import {collision} from './resources/components/helpers/collision.js';
import {mouse} from './resources/components/helpers/mouse.js';


//global variables
//const cellSize = 100;
const cellGap = 3;
const gameGrid = [];
const color = 'blue';




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
})

//projectiles

//defenders

//enemies

//resources

//utilities

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
    
    //will run and call itself - recursion
    requestAnimationFrame(animate);
}
animate();

