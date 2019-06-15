const canvas = {
    __size:5,
    /**每一个格子大小 */
    get size(){
        return this.__size;
    },
    set size(size){
        this.__size = size;
        this.__changeSize();
        return this.__size;
    },


    /**x轴上的格子数量 */
    __x_counts:100,
    get x_counts(){
        return this.__x_counts;
    },
    set x_counts(counts){
        this.__x_counts = counts;
        this.__changeSize();
        return this.__x_counts;
    },


    /**y轴上的格子数量 */
    __y_counts:100,
    get y_counts(){
        return this.__y_counts;
    },
    set y_counts(counts){
        this.y_counts = counts;
        this.__changeSize();
        return this.y_counts;
    },


    /**画布宽度 */
    width:0,
    /**画布高度 */
    height:0,

    __changeSize(){
        if(this.width === 0){
            this.width = this.size*this.x_counts;
        }
        if(this.height === 0){
            this.height = this.size*this.y_counts;
        }
    }
};

canvas.__changeSize();

export  {
    canvas
};