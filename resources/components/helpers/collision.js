//first + second require x, y, width and height properties
// returns true if collison occurs
export const collision = (first, second) =>{
    //if these 4 conditions are true then a collision hasn't occured
    // the ! makes is so if any of these is false then the
    if( !(first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y)){
            return true;
    };
}