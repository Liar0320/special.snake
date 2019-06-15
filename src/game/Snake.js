import { canvas } from "../config";
const DIRECTION = {
    'up':1,
    'right':2,
    'down':3,
    'left':4
};

/**🐍的一节身体 */
class SnakeBody {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {SnakeBody} next 
     */
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

        /** SnakeBody */
        this.header = null;

        this.__createBody(new SnakeBody(0,0,null));

    }

    /**
     * @param {SnakeBody} item 
     */
    __createBody (item){
        item.next =  this.header;
        this.header = item;
    }
    
    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    render (ctx){
        ctx.fillStyle = '#000';
        let node = this.header;
        let size = canvas.size;
        while (node) {
            ctx.fillRect(node.x*size,node.y*size,size,size);
            node = node.next;
        }
       this.move();
    }

    /**
     * 吃
     */
    eat () {
        this.__createBody(this.createNextBody());
    }
    
    /**
     * 死亡
     */
    died (){
        console.log("蛇死了");
    }

    /**创建下一个蛇的身体
     * @param {SnakeBody} next 
     * @returns {SnakeBody}
     */
    createNextBody(next){
        next = next || null;
        let prev = null;
        let speed = this.speed;
        switch (this.direction) {
            case DIRECTION.up:
                prev = new SnakeBody(this.header.x,this.header.y-speed,next);
                break;
            case DIRECTION.right:
                prev = new SnakeBody(this.header.x+speed,this.header.y,next);
                break;
            case DIRECTION.down:
                prev = new SnakeBody(this.header.x,this.header.y+speed,next);
                break;
            case DIRECTION.left:
                prev = new SnakeBody(this.header.x-speed,this.header.y,next);
                break;
            default:
                break;
        }
        return prev;
    }

    /**  在render 渲染一次之后进行位置的移动 
     *  当前节点占据上一个节点的位置 。 并且缓存当前节点 ，作为 下次循环的上一个节点
     *  生成一个超前的节点 给头节点占位
     * */
    move (){
        let prev = this.createNextBody();
        // prev = this.header;
        // let current = prev.next;

        // prev = this.header;
        let current = this.header;
        while (current) {
           
            let temp = new SnakeBody(current.x,current.y,null);

            current.x = prev.x;
            current.y = prev.y;
            
            prev = temp ;
            current = current.next;
        }

    }
}

export  {
    Snake,
    DIRECTION
} ;