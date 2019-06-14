import  "./base/compatible";
import { canvas } from "./config";

import _ from 'lodash';

/**游戏组件 */
import Background from './game/Background';



/**初始化游戏组件 */
const background = new Background(); 

/**
 * 每帧的更新
 * @param {CanvasRenderingContext2D} ctx 
 */
function update(ctx) {
    background.render(ctx);
    ctx.fillStyle = '#000';
    ctx.fillRect(canvas.size,canvas.size,canvas.size,canvas.size);
}







/**初始化画布，创建更新周期 */
function init() {
    var c = document.createElement('canvas');
    c.height = canvas.height;
    c.width = canvas.width;
    var ctx = c.getContext("2d");
    document.body.append(c);
    function loop() {
        window.requestAnimationFrame(()=>{
            update(ctx);
            loop();
        });
    }
    loop();
}

init();



