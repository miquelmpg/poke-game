class Wildcard {
    constructor(ctx, x, y, w, h) {
        this.ctx = ctx;
        
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw() {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(
            this.x, 
            this.y,
            this.w,
            this.h)
    };
}