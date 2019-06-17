/*
 * @Author: liar 
 * @Date: 2019-06-15 19:24:24 
 * @Last Modified by: lich
 * @Last Modified time: 2019-06-17 16:09:46
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
/**画布的配置 */
import { canvas } from "./config";

// import _ from 'lodash';

/**游戏组件 */
/**背景构造器 */
import Background from './game/Background';
/**🐍构造器 */
import {Snake} from "./game/Snake";
/**食物构造器 */
import {FoodFactory} from "./game/Food";
/**碰撞器  食物碰撞 游戏结束 */
import {isCollide , isGameOver} from "./game/collide";

/**枚举类 键盘值 和 运动方向 */
import { KEYMAPS , DIRECTION } from "./enum";
import GameCtrl from "./game";

/**初始化游戏组件 */
const background = new Background(); 

/**🐍 */
let snake = new Snake(1,1,DIRECTION.down); 

/**🐀 */
const foodFactory = new FoodFactory(); 
foodFactory.create();

/**🎮控制 */
const gameCtrl = new GameCtrl();


/**🐍自动寻找🐀 */
import autoEat from "./autoEat/autoEat";




/**
 * 每帧的更新
 * @param {Number} time 
 * @param {CanvasRenderingContext2D} ctx 
 */
function update(time,ctx) {
    if(isGameOver(snake.header)){
        gameCtrl.over(ctx);
        // snake = new Snake(); 
        return console.log('over');
    }

    background.render(ctx);
    foodFactory.renderWas(ctx);
    snake.render(ctx);
    foodFactory.render(ctx);

    if(isCollide(foodFactory.food,snake)){
        // snake.eat();
        foodFactory.destroyed();
    }

    if(!foodFactory.food){
        foodFactory.create();
    }

    

    autoEat(snake,foodFactory.food);

    snake.move();
}


/**全局的按键事件
 * @param {KeyboardEvent} event 
 */
function eventListener(event) {
    switch (String(event.keyCode)) {
    case KEYMAPS.ArrowUp:
        if(snake.direction === DIRECTION.down) return;
        snake.direction = DIRECTION.up;
        break;
    case KEYMAPS.ArrowRight:
        if(snake.direction === DIRECTION.left) return;
        snake.direction = DIRECTION.right;
        break;
    case KEYMAPS.ArrowDown:
        if(snake.direction === DIRECTION.up) return;
        snake.direction = DIRECTION.down;
        break;
    case KEYMAPS.ArrowLeft:
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
    window.addEventListener('keydown',eventListener);
    var ctx = c.getContext("2d");
    document.body.append(c);
    function loop() {
        window.requestAnimationFrame((time)=>{
            update(time,ctx);
            loop();
        });
        // setInterval(()=>{
        //     update(0,ctx);
        // },50);
    }
    loop();
}

init();



