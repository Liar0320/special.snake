import { canvas } from "../config";
import { DIRECTION } from "../enum";

/**🐍的一节身体 */
class SnakeBody {
    /** 
     * @param {number} x 
     * @param {number} y 
     * @param {SnakeBody} next 
     */
    constructor(x,y,next){
        this.x = x || 0;
        this.y = y || 0;
        // this.size = canvas.size; //保存size大小
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
    
        let node = this.header;
        let size = canvas.size;
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(node.x*size,node.y*size,size,size);
        ctx.fillStyle = '#000';
        node = node.next;
        while (node) {
            ctx.fillRect(node.x*size,node.y*size,size,size);
            node = node.next;
        }
        
        // if(this.count > this.speed){
        //     this.move();
        //     this.count = 0;
        // }else{
        //     if(this.count == undefined) this.count = 0;
        //     this.count++;
        // }

        this.move();
     
       
    }

    /**
     * 吃
     */
    eat () {
        this.__createBody(this.createNextBody(null,1));
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
    createNextBody(next,speed){
        next = next || null;
        let prev = null;
        speed = speed || this.speed;
        switch (this.direction) {
        case DIRECTION.up:
            prev = new SnakeBody(this.header.x,calc(this.header.y,speed,'-'),next);
            break;
        case DIRECTION.right:
            prev = new SnakeBody(calc(this.header.x,speed,'+'),this.header.y,next);
            break;
        case DIRECTION.down:
            prev = new SnakeBody(this.header.x,calc(this.header.y,speed,'+'),next);
            break;
        case DIRECTION.left:
            prev = new SnakeBody(calc(this.header.x,speed,'-'),this.header.y,next);
            break;
        default:
            break;
        }
        return prev;
    }

    // /**  在render 渲染一次之后进行位置的移动 
    //  *  当前节点占据上一个节点的位置 。 并且缓存当前节点 ，作为 下次循环的上一个节点
    //  *  生成一个超前的节点 给头节点占位
    //  * */
    // move (){
    //     let speed = this.speed;
    //     let prev = this.createNextBody(null,speed);
    //     // prev = this.header;
    //     // let current = prev.next;

    //     // prev = this.header;
    //     let current = this.header;
    //     while (current) {
           
    //         let temp = new SnakeBody(current.x,current.y,null);

    //         if(current.direct){
    //             if(current[current.direct] !== prev[current.direct]){
    //                 let direct = current[current.direct] > prev[current.direct]  ? -1 : 1;
    //                 current[current.direct] = calc(current[current.direct],direct * speed , '+')  ;
    //             }else{
    //                 current.direct = null;
    //             }
    //         }
    //         if(!current.direct){
    //             //判断运动的方向
    //             if(current.x !== prev.x){
    //                 let direct = current.x > prev.x  ? -1 : 1;
    //                 current.x = calc(current.x,direct * speed , '+');
    //                 current.direct = 'x';
    //             }else if(current.y !== prev.y){
    //                 let direct = current.y > prev.y ? -1 : 1;
    //                 // current.y +=  direct * speed;
    //                 current.y = calc(current.y,direct * speed , '+');
    //                 current.direct = 'y';
    //             }
    //         }

            
            
    //         prev = temp ;
    //         current = current.next;
    //     }

    // }


    /**  在render 渲染一次之后进行位置的移动 
     *  当前节点占据上一个节点的位置 。 并且缓存当前节点 ，作为 下次循环的上一个节点
     *  生成一个超前的节点 给头节点占位
     * */
    move (){
        let prev = this.createNextBody();

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

function calc(a,b,opreater) {
    let result = 0;
    switch (opreater) {
    case '+': result = Math.round((a*1000+b*1000))/1000;
        break;
    case '-': result = Math.round((a*1000-b*1000))/1000;
        break;
    default:
        break;
    }
    return result;
}

export  {
    Snake
} ;