class Background {
    constructor(ctx, src, x = 0, y = 0) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;

        this.sprite = new Image();
        this.sprite.src = src;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            );
        }
    }
}