import { Snake } from "../game/Snake";
import { Food } from "../game/Food";
import { DIRECTION } from "../enum";

/*
 * @Author: lich 
 * @Date: 2019-06-17 14:14:05 
 * @Last Modified by: lich
 * @Last Modified time: 2019-06-17 15:38:33
 * TODO: 根据下一个食物的位置 🐍自动去寻找食物
 * 简易的 知道食物的位置，蛇确定移动路线 先 x轴--->end 在 y轴--->end;
 */

/**
 * @param {Snake} snake 
 * @param {Food} food 
 */
function autoEat(snake,food) {
    if( Math.abs(snake.header.x - food.x) >= 1){
        snake.direction = snake.header.x > food.x ? DIRECTION.left:DIRECTION.right;
    } else if( Math.abs(snake.header.y - food.y) >= 1){
        snake.direction = snake.header.y > food.y ? DIRECTION.up : DIRECTION.down;
    }
}

export default autoEat;
