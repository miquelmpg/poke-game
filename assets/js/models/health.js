class Health {
    constructor(ctx, x, y, h, w) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.lives = 3;

        this.sprite = new Image();
        this.sprite.src = '/assets/images/sprites/health.png';
        this.sprite.vFrames = 1;
        this.sprite.hFrames = 5;
        this.sprite.vFrameIndex = 0;
        this.sprite.hFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameW = Math.floor(this.sprite.width / this.sprite.vFrames);
            this.sprite.frameH = Math.floor(this.sprite.height / this.sprite.hFrames);
        }
    }

    draw() {
        if (this.sprite.isReady) {
            Utils.debugDrawable(this);
            this.ctx.drawImage(
                this.sprite,
                this.sprite.vFrameIndex * this.sprite.frameW,
                this.sprite.hFrameIndex * this.sprite.frameH,
                this.sprite.frameW,
                this.sprite.frameH,
                this.x,
                this.y,
                this.w,
                this.h
            );
        }
    }
}