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
            // let x_counts = canvas.x_counts;
            // let y_counts = canvas.y_counts;

            let counts = was();
            counts.sort((a,b)=>{
                return Math.random() - 0.5;
            });
            counts.forEach(item=>{
                this.set(new Food(item[0],item[1],null));
            });

            // for (let index = 0; index < len; index++) {
            //     this.set(new Food(Math.floor(Math.random()*x_counts),Math.floor(Math.random()*y_counts),null));
            // }
        }
    };
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
        this.food = this.routeMap.create();
        return this.food;
    }

 

    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx){
        ctx.fillStyle = '#fff';
        let size = canvas.size;
        ctx.fillRect(this.food.x*size,this.food.y*size,size,size);
    }

    /**
     * was
     */
    renderWas(ctx){
        if(!this.was) this.was = [];
        ctx.fillStyle = '#800080';
        let size = canvas.size;
        this.was.forEach(item=>{
            ctx.fillRect(item.x*size,item.y*size,size,size);
        });
    }

    destroyed(){
        /**was */
        if(this.was){
            this.was.push(this.food);
        }else{
            this.was = [];
        } 


        this.food = null;
    }
    
}

/**was */
function was() {
    var counts = [];
    for (let index = 0; index < 10; index++) {
        let temp = [10+(index/2),40+index];
        // temp.push();
        counts.push (temp);
    }

    for (let index = 0; index < 10; index++) {
        let temp = [15+(index/2),50-index];
        // temp.push();
        counts.push (temp);
    }

    for (let index = 0; index < 10; index++) {
        let temp = [20+(index/2),40+index];
        // temp.push();
        counts.push (temp);
    }
    for (let index = 0; index < 10; index++) {
        let temp = [25+(index/2),50-index];
        // temp.push();
        counts.push (temp);
    }

   
    for (let index = 0; index < 10; index++) {
        let temp = [35+(index/2),50-index];
        // temp.push();
        counts.push (temp);
    }

 
    for (let index = 0; index < 10; index++) {
        let temp = [40+(index/2),40+index];
        // temp.push();
        counts.push (temp);
    }

    for (let index = 0; index < 5; index++) {
        let temp = [38+(index),45];
        // temp.push();
        counts.push (temp);
    }
    
    for (let index = 0; index < 10; index++) {
        let temp = [40+(index/2),40+index];
        // temp.push();
        counts.push (temp);
    }

    for (let index = 0; index < 5; index++) {
        let temp = [38+(index),45];
        // temp.push();
        counts.push (temp);
    }

    for (let index = 0; index < 5; index++) {
        let temp = [50+(index),40];
        // temp.push();
        counts.push (temp);
    }

    for (let index = 0; index < 4; index++) {
        let temp = [50+(index),41+index];
        // temp.push();
        counts.push (temp);
    }

    for (let index = 0; index < 5; index++) {
        let temp = [54-(index),45+index];
        // temp.push();
        counts.push (temp);
    }
    for (let index = 0; index < 5; index++) {
        let temp = [50+(index),50];
        // temp.push();
        counts.push (temp);
    }
    
    
  
    return counts;
}

export {
    Food,
    FoodFactory
};