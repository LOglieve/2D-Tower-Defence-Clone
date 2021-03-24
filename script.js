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
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}



//projectiles

//defenders

//enemies

//resources

//utilities
//main animation loop - constatly drawn and deleted
function animate(){
    console.log(controlsBar.height);
    ctx.fillStyle = 'blue';
    //redraw static controls bar
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
    
    
    //will run and call itself - recursion
    requestAnimationFrame(animate);
}
animate();