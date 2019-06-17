import { canvas } from "./config";

class GameCtrl {
    /** 游戏结束
     * @param {CanvasRenderingContext2D} ctx 
     */
    over(ctx){
        ctx.fillStyle = "#333";
        ctx.font = "30px Arial";
        ctx.textAlign = "center",
        ctx.textBaseline = "middle";
        ctx.fillText("游戏失败",canvas.width/2,canvas.height/2 - 30 );

        this.startRender(ctx,"重新开始");
    }

    /** 开始游戏的绘制
     * @param {CanvasRenderingContext2D} ctx 
     * @param {String} text 
     */
    startRender(ctx,text){
        ctx.fillStyle = "#333";
        ctx.font = "15px Arial";
        ctx.textAlign = "center",
        ctx.textBaseline = "middle";
        ctx.fillText(text,canvas.width/2,canvas.height/2);
    }
}

export default GameCtrl;