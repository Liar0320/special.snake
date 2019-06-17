function canvasFactroy() {
    var __size = 5;
    var __x_counts = 100;
    var __y_counts = 100;

    var canvas = {
        /**每一个格子大小 */
        get size(){
            return __size;
        },
        set size(size){
            __size = size;
            __changeSize();
            return __size;
        },
    
        /**x轴上的格子数量 */
        get x_counts(){
            return __x_counts;
        },
        set x_counts(counts){
            __x_counts = counts;
            __changeSize();
            return __x_counts;
        },
    
    
        /**y轴上的格子数量 */
        get y_counts(){
            return __y_counts;
        },
        set y_counts(counts){
            __y_counts = counts;
            __changeSize();
            return __y_counts;
        },
    
        /**画布宽度 */
        width:0,
        /**画布高度 */
        height:0,
    };
    
    function __changeSize(){
        if(canvas.width === 0){
            canvas.width = canvas.size*canvas.x_counts;
        }
        if(canvas.height === 0){
            canvas.height = canvas.size*canvas.y_counts;
        }
    }
    __changeSize ();
    return canvas;
}

const canvas = canvasFactroy();

export  {
    canvas
};