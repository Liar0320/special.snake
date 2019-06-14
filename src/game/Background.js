import { canvas } from '../config';
class Background {
    constructor (color){
        this.color = color || '#dedede';
    }
    
    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    render(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}
export default Background;