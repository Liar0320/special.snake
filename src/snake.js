const DIRECTION = {
    'up':1,
    'right':2,
    'down':3,
    'left':4
};

/**🐍的一节身体 */
class SnakeBody {
    constructor(x,y,next){
        this.x = x || 0;
        this.y = y || 0;
        this.next = next || next;
    }
}

/**🐍 */
class Snake {
    /**
     * @param {Number} length 
     * @param {Number} speed 
     * @param {DIRECTION} direction 
     */
    constructor(length,speed,direction){
        this.length = length || 1;
        this.speed = speed || 1;
        this.direction = direction || DIRECTION.right;
    }

    /**
     * @param {SnakeBody} item 
     */
    __createBody (item){
        
    }
    
    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    render (ctx){
        
    }
}
