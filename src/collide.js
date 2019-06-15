import { Snake } from "./game/Snake";
import { Food } from "./game/Food";

/**
 * 碰撞检测
 * @param {Food} food 
 * @param {Snake} snake 
 * @returns {Boolean} 
 */
function isCollide(food,snake) {
   let node = snake.header;
   let result = false;
   while ( result === false && node) {
      result = isSame(node,food);
      node = node.next;
   }
   return result;
}

function isSame(food,snakeBody) {
    return (food.x === snakeBody.x) && (food.y === snakeBody.y);
}

export default isCollide;