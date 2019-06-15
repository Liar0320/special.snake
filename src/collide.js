import { Snake } from "./game/Snake";
import { Food } from "./game/Food";
import { canvas } from "./config";

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

/**
 * 
 * @param {Food} food 
 * @param {snakeBody} snakeBody 
 * 两个物体有交集即
 */
function isSame(food,snakeBody) {
    return (Math.abs(snakeBody.x - food.x ) < 1) &&  (Math.abs(snakeBody.y - food.y)< 1) ;
}

/**
 * @param {snakeBody} header 
 */
function isSnakeSelfCollide(header) {
   // let first = header;
   let node = header.next;
   let result = false;
   if(node === null) return false;
   node = node.next;
   while (node && !result) {
      // result = (header.x === node.x ) &&  (header.y === node.y )
      result = isSame(node,header);
      node = node.next;
   }
   return result;
}

/**
 * @param {snakeBody} header 
 */
function isSnakeToWall(header) {
   if(header.x < 0 || header.y<0 || header.x > (canvas.x_counts) || header.y > (canvas.y_counts)){
      return true;
   }else{
      return false;
   }
}

function isGameOver(header) {
   return  isSnakeToWall(header) ||  isSnakeSelfCollide(header) ;
}

export  {
   isCollide,
   isGameOver,
};