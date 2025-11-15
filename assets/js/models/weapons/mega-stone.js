class MegaStone {
    constructor(ctx, x, y, vx, vy, w = 20, h = 20) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.spriteStatic = new Image();
        this.spriteStatic.src = '/assets/images/sprites/mega.png';
        this.spriteStatic.vFrames = 1;
        this.spriteStatic.hFrames = 1;
        this.spriteStatic.vFrameIndex = 0;
        this.spriteStatic.hFrameIndex = 0;
        this.spriteStatic.onload = () => {
            this.spriteStatic.isReady = true;
            this.spriteStatic.frameW = Math.floor(this.spriteStatic.width / this.spriteStatic.vFrames);
            this.spriteStatic.frameH = Math.floor(this.spriteStatic.height / this.spriteStatic.hFrames);
        }

        this.drawCount = 0;
        this.isThrown = false;
        this.isTaken = false;
    }

    staticDraw() {
        if (this.spriteStatic.isReady) {
            Utils.debugDrawable(this);
            this.ctx.drawImage(
                this.spriteStatic,
                this.spriteStatic.vFrameIndex * this.spriteStatic.frameW,
                this.spriteStatic.hFrameIndex * this.spriteStatic.frameH,
                this.spriteStatic.frameW,
                this.spriteStatic.frameH,
                this.x,
                this.y,
                this.w,
                this.h
            );
        }
    }
}