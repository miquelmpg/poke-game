class PokeTrainer extends Collisionable {
    constructor(ctx, x, y) {
        super();
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.h = 50;
        this.w = 50;

        this.vx = 0;
        this.vy = 0;

        this.sprite = new Image();
        this.sprite.src = '/assets/images/sprites/pokemon-trainer.png';
        this.sprite.vFrames = 4;
        this.sprite.hFrames = 4;
        this.sprite.vFrameIndex = 0;
        this.sprite.hFrameIndex = 3;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameW = Math.floor(this.sprite.width / this.sprite.vFrames);
            this.sprite.frameH = Math.floor(this.sprite.height / this.sprite.hFrames);
            this.w = this.sprite.frameW;
            this.h = this.sprite.frameH;
        }

        this.drawCount = 0;

        this.canThrow = true;
        this.pokeballs = [];
        this.kindOfBall = 0;
        this.megaEvolve = false;
        this.isInThouch = false;
    }

    onKeyPress(event) {
        const isPressed = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_RIGHT:
                if (isPressed) {
                    this.vx = TRAINER_VX;
                } else {
                    this.sprite.vFrameIndex = 0;
                    this.sprite.hFrameIndex = 2;
                    this.vx = 0;
                }
                break;
            case KEY_LEFT:
                if (isPressed) {
                    this.vx = -TRAINER_VX;
                } else {
                    this.sprite.vFrameIndex = 0;
                    this.sprite.hFrameIndex = 1;
                    this.vx = 0;
                }
                break;
            case KEY_DOWN:
                if (isPressed) {
                    this.vy = TRAINER_VY;
                } else {
                    this.sprite.vFrameIndex = 0;
                    this.sprite.hFrameIndex = 0;
                    this.vy = 0;
                }
                break;
            case KEY_UP:
                if (isPressed) {
                    this.vy = -TRAINER_VY;
                } else {
                    this.sprite.vFrameIndex = 0;
                    this.sprite.hFrameIndex = 3;
                    this.vy = 0;
                }
                break;
            case KEY_THROW:
                switch (this.kindOfBall) {
                    case 0:
                        this.pokeballThrown(POKEBALL);
                        break;
                    case 1:
                        this.pokeballThrown(SUPERBALL);
                        break;
                    case 2:
                        this.pokeballThrown(ULTRABALL);
                        break;
                    case 3:
                        this.pokeballThrown(MASTERBALL);
                        break;
                }
        }
    }

    pokeballThrown(SRC) {
        if (this.canThrow &&
            this.sprite.hFrameIndex === 0) {
            this.canThrow = false;
            this.pokeballs.push(Pokeball.pokeball(this.ctx, this.x + this.w - 50, this.y + 45, 0, POKEBALL_SPEED, SRC, ''));
            setTimeout(() => {
                this.canThrow = true
                this.kindOfBall = 0}, TRAINER_POKEBALL_RELOAD);
        } else if (this.canThrow &&
            this.sprite.hFrameIndex === 1) {
            this.canThrow = false;
            this.pokeballs.push(Pokeball.pokeball(this.ctx, this.x, this.y + 10, -POKEBALL_SPEED, 0, SRC, ''));
            setTimeout(() => {
                this.canThrow = true
                this.kindOfBall = 0}, TRAINER_POKEBALL_RELOAD);
        } else if (this.canThrow &&
            this.sprite.hFrameIndex === 2) {
            this.canThrow = false;
            this.pokeballs.push(Pokeball.pokeball(this.ctx, this.x + this.w, this.y + 10, POKEBALL_SPEED, 0, SRC, ''));
            setTimeout(() => {
                this.canThrow = true
                this.kindOfBall = 0}, TRAINER_POKEBALL_RELOAD);
        } else if (this.canThrow &&
            this.sprite.hFrameIndex === 3) {
            this.canThrow = false;
            this.pokeballs.push(Pokeball.pokeball(this.ctx, this.x + this.w - 50, this.y, 0, -POKEBALL_SPEED, SRC, ''));
            setTimeout(() => {
                this.canThrow = true
                this.kindOfBall = 0}, TRAINER_POKEBALL_RELOAD);
        } 
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        this.pokeballs.forEach((pokeball) => pokeball.move());
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

            this.pokeballs.forEach((pokeball) => pokeball.draw());
        }
    }

    animate() {
        if (this.vx < 0) {
            this.animateFrames(1, 0, 4, 5);        
        } else if (this.vx > 0) {
            this.animateFrames(2, 0, 4, 5);
        } else if (this.vy < 0) {
            this.animateFrames(3, 0, 4, 5);
        } else if (this.vy > 0) {
            this.animateFrames(0, 0, 4, 5);
        }
    }

    animateFrames(initialHFrame, initialVFrame, frames, frequency) {
        if (this.sprite.hFrameIndex !== initialHFrame) {
            this.sprite.hFrameIndex = initialHFrame;
            this.sprite.vFrameIndex = initialVFrame;
        } else if (this.drawCount % frequency === 0) {
            this.drawCount = 0;
            this.sprite.vFrameIndex = (this.sprite.vFrameIndex + 1) % frames;
        }
    }

    clear() {
        this.pokeballs = this.pokeballs.filter((pokeball) => {
            return (!pokeball.isThrown &&
            pokeball.x >= 0 &&
            pokeball.x + pokeball.w < this.ctx.canvas.width);
        });
        this.pokeballs = this.pokeballs.filter((pokeball) => {
            return (!pokeball.isThrown &&
            pokeball.y >= 0 &&
            pokeball.y + pokeball.h < this.ctx.canvas.height);
        });
    }
}