const canvas = document.getElementById("playingBoard");
//ctx = context
const ctx = canvas.getContext('2d');

canvas.width = 900;
canvas.height = 600;

//global variables
const cellSize = 100;
const cellGap = 3;
const gameGrid = [];
const color = 'blue';


//mouse object
const mouse = {
    x: undefined,
    y: undefined,
    width: 0.1,
    height: 0.1,
}

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


//game board
const controlsBar = {
    width: canvas.width,
    height: cellSize,
}

class Cell{
    constructor(x, y){
        //x coord
        this.x = x;
        //y coord
        this.y = y;

        this.width = cellSize;
        this.height = cellSize;
    }
    draw(){
        if(mouse.x && mouse.y && collision(this, mouse)){
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        
    }
}

//create games grid
function createGrid(){
    //cycle through cell positions
    for(let y = cellSize; y < canvas.height; y+= cellSize){
        for(let x = 0; x < canvas.width; x+= cellSize){
            //Adds a new cell into grid array
            gameGrid.push(new Cell(x,y));

        }

    }
}
//calls createGrid function to draw the grid
createGrid();

function handleGameGrid(){
    //call draw method for all cells in the gameGrid array
    for(let i = 0; i < gameGrid.length; i++){
        gameGrid[i].draw();
    }
}

//projectiles

//defenders

//enemies

//resources

//utilities
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
    handleGameGrid();
    
    //will run and call itself - recursion
    requestAnimationFrame(animate);
}
animate();

//first + second require x, y, width and height properties
// returns true if collison occurs
const collision = (first, second) =>{
    //if these 4 conditions are true then a collision hasn't occured
    // the ! makes is so if any of these is false then the
    if( !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y)){
            return true;
    };
}