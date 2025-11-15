class Superball {
    constructor(ctx, x, y, vx, vy, w = 30, h = 30) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.vx = vx;
        this.vy = vy;

        this.sprite = new Image();
        this.sprite.src = '/assets/images/sprites/superball.png';
        this.sprite.vFrames = 10;
        this.sprite.hFrames = 1 ;
        this.sprite.vFrameIndex = 0;
        this.sprite.hFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameW = Math.floor(this.sprite.width / this.sprite.vFrames);
            this.sprite.frameH = Math.floor(this.sprite.height / this.sprite.hFrames);
        }

        this.spriteStatic = new Image();
        this.spriteStatic.src = '/assets/images/sprites/super.png';
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

    move() {
        this.x += this.vx;
        this.y += this.vy;
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

            this.animate();
            this.drawCount++;
        }
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

    animate() {
        if (this.drawCount % 5 === 0) {
            this.drawCount = 0;
            this.sprite.vFrameIndex = (this.sprite.vFrameIndex + 1) % this.sprite.vFrames;
        }
    }

    collidesWith(element) {
        return (
            this.x < element.x + element.w &&
            this.x + this.w > element.x &&
            this.y < element.y + element.h &&
            this.y + this.h > element.y
        );
    }
}