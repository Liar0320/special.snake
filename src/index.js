import  "./base/compatible";
import { canvas } from "./config";

import _ from 'lodash';

/**游戏组件 */
import Background from './game/Background';
import {Snake,DIRECTION} from "./game/Snake";
import {FoodFactory} from "./game/Food";


import isCollide from "./collide";

/**初始化游戏组件 */
const background = new Background(); 
const snake = new Snake(); 
const foodFactory = new FoodFactory(); 
// let food = null;
snake.speed = 1
/**
 * 每帧的更新
 * @param {Number} time 
 * @param {CanvasRenderingContext2D} ctx 
 */
function update(time,ctx) {
    background.render(ctx);
    snake.render(ctx);



    if(!foodFactory.food){
        foodFactory.create();
    }
    foodFactory.render(ctx);

    if(isCollide(foodFactory.food,snake)){
        snake.eat();
        foodFactory.destroyed();
    }
}


const keyMaps = {
    'ArrowUp':'38',
    'ArrowRight':'39',
    'ArrowDown':'40',
    'ArrowLeft':'37',
}

/**全局的按键事件
 * @param {KeyboardEvent} event 
 */
function eventListener(event) {
    switch (String(event.keyCode)) {
        case keyMaps.ArrowUp:
            snake.direction = DIRECTION.up;
            break;
        case keyMaps.ArrowRight:
            snake.direction = DIRECTION.right;
            break;
        case keyMaps.ArrowDown:
            snake.direction = DIRECTION.down;
            break;
        case keyMaps.ArrowLeft:
            snake.direction = DIRECTION.left;
            break;
        default:
            break;
    }
}




/**初始化画布，创建更新周期 */
function init() {
    var c = document.createElement('canvas');
    c.height = canvas.height;
    c.width = canvas.width;
    // c.addEventListener('click')
    window.addEventListener('keydown',eventListener)
    var ctx = c.getContext("2d");
    document.body.append(c);
    function loop() {
        window.requestAnimationFrame((time)=>{
            update(time,ctx);
            loop();
        });
    }
    loop();
}

init();



