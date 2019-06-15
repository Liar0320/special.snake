/*
 * @Author: liar 
 * @Date: 2019-06-15 19:24:24 
 * @Last Modified by: liar
 * @Last Modified time: 2019-06-15 21:51:18
 */
// ?$$  "$N        $$$  ^#$            $              d$*  "$d       '$$F  "$r   
// '$$   $$k       9$$    '           d$N            $$F     *        $$>    *   
// '$$   $$F       9$$  :             $$$r          $$$               $$>  f     
// '$$   $$        9$$.e$            . #$$          $$$               $$L.$F     
// '$$**#"         9$$ ^$            f  $$L         $$$               $$> #F     
// '$$             9$$  '           .   '$$         $$$               $$>  F     
// '$$             9$$     "        P""""$$N        '$$r     J        $$>    x   
// {$$             9$$   .$              '$$         ^$$.   d$        $$r   dF   
// """"           `""""""""       '""    """"           """"         """"""""    
                                                                              
//                      .....               d*##$.                               
//                    zP"""""$e.           $"    $o                              
//                   4$       '$          $"      $                              
//                   '$        '$        J$       $F                             
//                    'b        $k       $>       $                              
//                     $k        $r     J$       d$                              
//                     '$         $     $"       $~                              
//                      '$        "$   '$E       $                               
//                       $         $L   $"      $F ...                           
//                        $.       4B   $      $$$*"""*b                         
//                        '$        $.  $$     $$      $F                        
//                         "$       R$  $F     $"      $                         
//                          $k      ?$ u*     dF      .$                         
//                          ^$.      $$"     z$      u$$$$e                      
//                           #$b             $E.dW@e$"    ?$                     
//                            #$           .o$$# d$$$$c    ?F                    
//                             $      .d$$#" . zo$>   #$r .uF                    
//                             $L .u$*"      $&$$$k   .$$d$$F                    
//                              $$"            ""^"$$$P"$P9$                     
//                             JP              .o$$$$u:$P $$                     
//                             $          ..ue$"      ""  $"                     
//                            d$          $F              $                      
//                            $$     ....udE             4B                      
//                             #$    """"` $r            @$                      
//                              ^$L        '$            $F                      
//                                RN        4N           $                       
//                                 *$b                  d$                       
//                                  $$k                 $F                       
//                                   $$b                $F                       
//                                    $""               $F                       
//                                    '$                $                        
//                                     $L               $                        
//                                     '$               $                        
//                                      $               $                        
//                                                      "                        

import  "./base/compatible";
import { canvas } from "./config";

import _ from 'lodash';

/**游戏组件 */
import Background from './game/Background';
import {Snake,DIRECTION} from "./game/Snake";
import {FoodFactory} from "./game/Food";


import {isCollide , isGameOver} from "./collide";

/**初始化游戏组件 */
const background = new Background(); 
const snake = new Snake(); 
const foodFactory = new FoodFactory(); 
// let food = null;
snake.speed = 0.5
/**
 * 每帧的更新
 * @param {Number} time 
 * @param {CanvasRenderingContext2D} ctx 
 */
function update(time,ctx) {
    if(isGameOver(snake.header)){
        return console.log('over');
    }

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
            if(snake.direction === DIRECTION.down) return;
            snake.direction = DIRECTION.up;
            break;
        case keyMaps.ArrowRight:
            if(snake.direction === DIRECTION.left) return;
            snake.direction = DIRECTION.right;
            break;
        case keyMaps.ArrowDown:
            if(snake.direction === DIRECTION.up) return;
            snake.direction = DIRECTION.down;
            break;
        case keyMaps.ArrowLeft:
            if(snake.direction === DIRECTION.right) return;
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



