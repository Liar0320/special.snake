import { canvas } from "../config";
/**食物 */
class Food {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {SnakeBody} next 
     */
    constructor(x,y,next){
        this.x = x || 0;
        this.y = y || 0;
        this.size = canvas.size; //保存size大小
        this.next = next || next;
    }
}

/**
 * 生成轨迹保存在一个routeMap轨迹对象中
 */
function routeMap() {
    let store = [];
    return {
        get:function () {
            return store;
        },
        /** 存储每一个生成的food  方便以后用来方向处理
         * @param {Food} food 
         */
        set:function (food) {
            store.push(food);
        },
        /**
         * @returns {Food}
         */
        create:function () {
            if(store.length === 0){
                this.init(20);
            }
           return store.shift();
        },
        init:function (len) {
            let x_counts = canvas.x_counts;
            let y_counts = canvas.y_counts;
            for (let index = 0; index < len; index++) {
                this.set(new Food(Math.floor(Math.random()*x_counts),Math.floor(Math.random()*y_counts),null));
            }
        }
    }
}

class FoodFactory {
    constructor(){

        this.routeMap = routeMap();
        this.routeMap.init(20);
    }

    /**
     * @returns {Food}
     */
    create(){
        this.food = this.routeMap.create()
        return this.food;
    }

 

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx){
        ctx.fillStyle = '#333';
        let size = canvas.size;
        ctx.fillRect(this.food.x*size,this.food.y*size,size,size);
    }

    destroyed(){
        this.food = null;
    }
    
}

export {
    Food,
    FoodFactory
};