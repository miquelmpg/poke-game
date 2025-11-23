class Pokemon extends Collisionable {

    static random(ctx) {
        return new Pokemon(ctx, Math.floor(Math.random() * ((CANVAS_WIDTH - 100))), Math.floor(Math.random() * (CANVAS_HEIGHT - 350) + 50));
    }

    constructor(ctx, x, y) {
        super();
        this.ctx = ctx;
        
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100;

        this.sprite = new Image();
        this.sprite.isReady = true;
        this.isDead = false;
        this.hasHit = false;

        this.getPokemon().then(pokemon => {
            this.sprite.src = pokemon.sprites.front_default;
            this.cry = pokemon.cries.latest;
            this.typeOne = pokemon.types['0'].type.name;
            if (pokemon.types.length > 1) {
                this.typeTwo = pokemon.types['1'].type.name;
            } else {
                this.typeTwo = null;
            }
        });
    }

    randomMove() {
        const randomNumber = Math.floor(Math.random() * (4 * 1) + 1);
        switch (randomNumber) {
            case 1:
                this.x += POKEMON_NORMAL_SPEED;
                break;
            case 2:
                this.x += -POKEMON_NORMAL_SPEED;
                break;
            case 3:
                this.y += POKEMON_NORMAL_SPEED;
                break;
            case 4:
                this.y += -POKEMON_NORMAL_SPEED;
                break;
        }
    }

    draw() {
        if (this.sprite.isReady) {
            Utils.debugDrawable(this);
            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            );
        }
    }

    getRandomNumber() {
        return Math.floor(Math.random() * (MAX_POKEMON_NUMBER - MIN_POKEMON_NUMBER) + MIN_POKEMON_NUMBER );
    }

    async getPokemon() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.getRandomNumber()}`);
        const pokemon = await response.json();
        return pokemon;
    }
}