class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.ctx = this.canvas.getContext('2d');

        this.fps = FPS;
        this.drawIntervalId = undefined;
        this.pokemonTimer = undefined;

        this.background = new Background(this.ctx, BACKGROUND_MAIN);
        this.fenceLeft = new Wildcard(this.ctx, 0, 568, 225, 25);
        this.fenceRight = new Wildcard(this.ctx, 405, 568, 195, 25);
        this.topTrees = new Wildcard(this.ctx, 100, 25, 400, 50);
        this.easterEgg = new Wildcard(this.ctx, 200, 600, 20, 20);

        this.trainer = new PokeTrainer(this.ctx, 275, 600);

        this.pokemon = new Pokemon(this.ctx);
        this.pokemons = [];
        this.pokemons.push(this.pokemon);

        this.balls = [];

        this.lives = new Health(this.ctx, 20, 700, 30, 150);

        this.totalPoints = 0;

        this.setUpListeners();
        this.setupPokemonGenerate();
        setInterval(() => this.randomBall(), 5000);
        setInterval(() => this.randomRemoveBall(), 7000);
        setInterval(() => {
            if (this.trainer.megaEvolve) {
                this.trainer.h = this.trainer.sprite.frameH;
                this.trainer.w = this.trainer.sprite.frameW;
                this.trainer.megaEvolve = false;
                this.trainer.canThrow = true;
            }
        }, 5000);
        this.nextPokemonTimer();
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.checkCollisions();
                this.gameFinished();
                this.addField();
            }, this.fps);
        }
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    setUpListeners() {
        addEventListener('keydown', (event) => this.trainer.onKeyPress(event));
        addEventListener('keyup', (event) => this.trainer.onKeyPress(event));
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.balls = this.balls.filter((ball) => !ball.isTaken);
        this.pokemons = this.pokemons.filter((pokemon) => !pokemon.isDead);
        this.trainer.clear();
    }

    move() {
        this.trainer.move();
        this.checkBounds(this.trainer);
        this.pokemons.forEach((pokemon) => this.checkBounds(pokemon));
        this.pokemons.forEach((pokemon) => pokemon.randomMove());
    }

    checkBounds(character) {
        if (character.x < 0) {
            character.x = 0;
        } else if (character.x + character.w > this.canvas.width) {
            character.x = this.canvas.width - character.w;
        } else if (character.y < 0) {
            character.y = 0;
        } else if (character.y + character.h > this.canvas.height) {
            character.y = this.canvas.height - character.h;
        }
    }

    checkCollisions() {
        for (const pokemon of this.pokemons) {
            if (this.trainer.collidesWith(pokemon) && 
                !this.trainer.isInThouch && 
                ((pokemon.typeOne === "fire" || pokemon.typeOne === "poison" || pokemon.typeOne === "dragon") || 
                (pokemon.typeTwo === "fire" || pokemon.typeTwo === "poison" || pokemon.typeTwo === "dragon")) && 
                !pokemon.hasHit) {
                    this.lives.lives -= 1;
                    this.lives.sprite.hFrameIndex += 1;
                    pokemon.hasHit = true;
            } else {
                this.trainer.isInThouch = false;
            }
            if (this.trainer.collidesWith(pokemon) && 
                !this.trainer.isInThouch && 
                ((pokemon.typeOne === "water" || pokemon.typeOne === "ice" || pokemon.typeOne === "ground") || 
                (pokemon.typeTwo === "water" || pokemon.typeTwo === "ice" || pokemon.typeTwo === "ground")) && 
                !pokemon.hasHit) {
                if (this.trainer.vx > 0) {
                    this.trainer.vx = this.trainer.vx += 10;
                    pokemon.hasHit = true;
                } else if (this.trainer.vx < 0) {
                    this.trainer.vx = this.trainer.vx -= 10;
                    pokemon.hasHit = true;
                } else if (this.trainer.vy > 0) {
                    this.trainer.vy = this.trainer.vy += 10;
                    pokemon.hasHit = true;
                } else if (this.trainer.vy < 0) {
                    this.trainer.vy = this.trainer.vy -= 10;
                    pokemon.hasHit = true;
                }
            } else {
                this.trainer.isInThouch = false;
            }
            if (this.trainer.collidesWith(pokemon) && 
                !this.trainer.isInThouch && 
                ((pokemon.typeOne === "grass" || pokemon.typeOne === "normal" || pokemon.typeOne === "fairy") || 
                (pokemon.typeTwo === "grass" || pokemon.typeTwo === "normal" || pokemon.typeTwo === "fairy")) && 
                !pokemon.hasHit) {
                if (this.lives.lives === 5) {
                    this.lives.lives += 0;
                } else {
                    this.lives.lives += 1;
                    this.lives.sprite.hFrameIndex -= 1;
                    this.trainer.isInThouch = false;
                    pokemon.hasHit = true;
                }
            }
            if (this.trainer.collidesWith(pokemon) && 
                !this.trainer.isInThouch && 
                ((pokemon.typeOne === "electric" || pokemon.typeOne === "dark" || pokemon.typeOne === "ghost") || 
                (pokemon.typeTwo === "electric" || pokemon.typeTwo === "dark" || pokemon.typeTwo === "ghost")) && 
                !pokemon.hasHit) {
                this.trainer.vx = 0;
                this.trainer.vy = 0;
            }
            if (this.trainer.collidesWith(pokemon) && 
                !this.trainer.isInThouch && 
                ((pokemon.typeOne === "psychic" || pokemon.typeOne === "fighting" || pokemon.typeOne === "flying") || 
                (pokemon.typeTwo === "psychic" || pokemon.typeTwo === "fighting" || pokemon.typeTwo === "flying")) && 
                !pokemon.hasHit) {
                POKEBALL_SPEED = POKEBALL_SPEED * -1;
                setTimeout(() => POKEBALL_SPEED = POKEBALL_SPEED * -1, 5000);
                pokemon.hasHit = true;
            }
        }

        for (const pokemon of this.pokemons) {
            if (pokemon.y > POKEMON_OUT_DISTANCE) {
                pokemon.isDead = true;
                this.addPoint();
                this.addTypeOne(pokemon);
            }
        }

        for (const ball of this.balls) {
            if (this.trainer.collidesWith(ball)) {
                ball.isTaken = true;
                if (ball instanceof Superball) { 
                    this.trainer.kindOfBall = 1;
                } else if (ball instanceof Ultraball) { 
                    this.trainer.kindOfBall = 2;
                } else if (ball instanceof Masterball) { 
                    this.trainer.kindOfBall = 3;
                } else if (ball instanceof MegaStone) {
                    this.trainer.h = 250;
                    this.trainer.w = 250;
                    this.trainer.megaEvolve = true;
                    this.trainer.canThrow = false;
                }
            }
        }

        for (const pokemon of this.pokemons) {
            if (this.trainer.megaEvolve && this.trainer.collidesWith(pokemon)) {
                this.trainer.canThrow = false;
                pokemon.isDead = true;
                this.addPoint();
                this.addTypeOne(pokemon);
            }
        }

        for (const pokemon of this.pokemons) {
            if (this.trainer.collidesWith(pokemon) && this.trainer.x < pokemon.x) {
                pokemon.x = pokemon.x - 1;
            }
            if (this.trainer.collidesWith(pokemon) && this.trainer.x > pokemon.x) {
                pokemon.x = pokemon.x + 1;
            }
            if (this.trainer.collidesWith(pokemon) && this.trainer.y > pokemon.y) {
                pokemon.y = pokemon.y + 1;
            }
            if (this.trainer.collidesWith(pokemon) && this.trainer.y < pokemon.y) {
                pokemon.y = pokemon.y - 1;
            }
            // if (this.trainer.collidesWith(pokemon) && (pokemon.y > POKEMON_OUT_DISTANCE)) {
            //     pokemon.isDead = true;
            //     this.addPoint();
            //     this.addTypeOne(pokemon);
            // }
        }

        for (const pokemon of this.pokemons) {
            for (const pokeball of this.trainer.pokeballs) {
                if (pokeball instanceof Pokeball) {
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.y + pokeball.h >= pokemon.y) && (pokeball.y < pokemon.y)){
                        pokemon.y += 50;
                        pokeball.isThrown = true;                    
                    }
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.y < pokemon.y + pokemon.h) && (pokeball.y + pokeball.h > pokemon.y + pokemon.h)){
                        pokemon.y -= 50;
                        pokeball.isThrown = true;
                    }
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.x < pokemon.x + pokemon.w) && (pokeball.x > pokemon.x)) {
                        pokemon.x -= 50;
                        pokeball.isThrown = true;
                    }
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.x + pokeball.w > pokemon.x) && (pokeball.x < pokemon.x)) {
                        pokemon.x += 50;
                        pokeball.isThrown = true;
                    }
                }
                if (pokeball instanceof Superball) {
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.y + pokeball.h >= pokemon.y) && (pokeball.y < pokemon.y)){
                        pokemon.y += 100;
                        pokeball.isThrown = true;                    
                    }
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.y < pokemon.y + pokemon.h) && (pokeball.y + pokeball.h > pokemon.y + pokemon.h)){
                        pokemon.y -= 100;
                        pokeball.isThrown = true;
                    }
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.x < pokemon.x + pokemon.w) && (pokeball.x > pokemon.x)) {
                        pokemon.x -= 100;
                        pokeball.isThrown = true;
                    }
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.x + pokeball.w > pokemon.x) && (pokeball.x < pokemon.x)) {
                        pokemon.x += 100;
                        pokeball.isThrown = true;
                    }
                }
                if (pokeball instanceof Ultraball) {
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.y + pokeball.h >= pokemon.y) && (pokeball.y < pokemon.y)){
                        pokemon.y += 150;
                        pokeball.isThrown = true;                    
                    }
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.y < pokemon.y + pokemon.h) && (pokeball.y + pokeball.h > pokemon.y + pokemon.h)){
                        pokemon.y -= 150;
                        pokeball.isThrown = true;
                    }
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.x < pokemon.x + pokemon.w) && (pokeball.x > pokemon.x)) {
                        pokemon.x -= 150;
                        pokeball.isThrown = true;
                    }
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.x + pokeball.w > pokemon.x) && (pokeball.x < pokemon.x)) {
                        pokemon.x += 150;
                        pokeball.isThrown = true;
                    }
                }
                if (pokeball instanceof Masterball) {
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.y + pokeball.h >= pokemon.y) && (pokeball.y < pokemon.y)){
                        pokemon.isDead = true;
                        pokeball.isThrown = true;
                        this.addPoint();
                        this.addTypeOne(pokemon);
                    }
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.y < pokemon.y + pokemon.h) && (pokeball.y + pokeball.h > pokemon.y + pokemon.h)){
                        pokemon.isDead = true;
                        pokeball.isThrown = true;
                        this.addPoint();
                        this.addTypeOne(pokemon);
                    }
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.x < pokemon.x + pokemon.w) && (pokeball.x > pokemon.x)) {
                        pokemon.isDead = true;
                        pokeball.isThrown = true;
                        this.addPoint();
                        this.addTypeOne(pokemon);
                    }
                    if (pokeball.collidesWith(pokemon) && !pokeball.isThrown && (pokeball.x + pokeball.w > pokemon.x) && (pokeball.x < pokemon.x)) {
                        pokemon.isDead = true;
                        pokeball.isThrown = true;
                        this.addPoint();
                        this.addTypeOne(pokemon);
                    }
                }
            }
        }

        for (const pokemon of this.pokemons) {
            if (pokemon.collidesWith(this.fenceLeft) || pokemon.collidesWith(this.fenceRight)) {
                pokemon.y = pokemon.y - (this.fenceLeft.h - 20);
                pokemon.y = pokemon.y - (this.fenceRight.h - 20);
            }
        }

        if (this.trainer.collidesWith(this.fenceLeft) && (this.trainer.y + this.trainer.h >= this.fenceLeft.y) && (this.trainer.y < this.fenceLeft.y)) {
            this.trainer.y = this.fenceLeft.y -this.trainer.h;
        }
        if (this.trainer.collidesWith(this.fenceLeft) && (this.trainer.y < this.fenceLeft.y + this.fenceLeft.h) && (this.trainer.y + this.trainer.h > this.fenceLeft.y + this.fenceLeft.h)) {
            this.trainer.y = this.fenceLeft.y + this.fenceLeft.h;
        }
        if (this.trainer.collidesWith(this.fenceLeft) && (this.trainer.x < this.fenceLeft.x + this.fenceLeft.w) && (this.trainer.x > this.fenceLeft.x)) {   
            this.trainer.x = this.fenceLeft.x + this.fenceLeft.w;
        }

        if (this.trainer.collidesWith(this.fenceRight) && (this.trainer.y + this.trainer.h >= this.fenceRight.y) && (this.trainer.y < this.fenceRight.y)) {
            this.trainer.y = this.fenceRight.y - this.trainer.h;
        }
        if (this.trainer.collidesWith(this.fenceRight) && (this.trainer.y < this.fenceRight.y + this.fenceRight.h) && (this.trainer.y + this.trainer.h > this.fenceRight.y + this.fenceRight.h)) {
            this.trainer.y = this.fenceRight.y + this.fenceRight.h;
        }
        if (this.trainer.collidesWith(this.fenceRight) && (this.trainer.x + this.trainer.w > this.fenceRight.x) && (this.trainer.x < this.fenceRight.x)) {   
            this.trainer.x = this.fenceRight.x - this.trainer.w;
        }

        if (this.trainer.collidesWith(this.topTrees)) {
            this.trainer.y = this.topTrees.y + this.topTrees.h;
        }

        let isShown = false;
        
            const egg = document.querySelector(".egg");
            if (this.trainer.collidesWith(this.easterEgg) && this.trainer.sprite.hFrameIndex === 3 && egg.classList.contains("hidden") && (!isShown)) {
                setTimeout(() => {egg.classList.remove("hidden");
                egg.classList.add("visible");
                isShown = true;
                }, 2000);
            } else if (!this.trainer.collidesWith(this.easterEgg) && !isShown) {
                egg.classList.add("hidden");
                egg.classList.remove("visible");
                isShown = false;
            }
    }

    gameOver() {
        this.stop();
        this.removeGameOverContainers();
    }

    removeGameOverContainers() {
        const canvas = document.getElementById("main-canvas");
        const gameOver = document.getElementById("gameOver");
        const types = document.getElementById("types");
        const statistics = document.getElementById("statistics");
        canvas.classList.remove("visible");
        canvas.classList.add("hidden");
        types.remove();
        statistics.remove();
        gameOver.classList.remove("hidden");
        gameOver.classList.add("display-column");
    }

    randomBall() {
        const randomNumber = Math.random();
        const xRandomNumberGround = Math.floor(Math.random() * ((CANVAS_WIDTH - 50)));
        const yRandomNumberGround = Math.floor(Math.random() * (CANVAS_HEIGHT - 250) + 50);
        
        if (randomNumber < 0.25) {
            this.balls.push(new Masterball(this.ctx, xRandomNumberGround, yRandomNumberGround));
        } else if (randomNumber > 0.25 && randomNumber < 0.4) {
            this.balls.push(new Ultraball(this.ctx, xRandomNumberGround, yRandomNumberGround));
        } else if (randomNumber > 0.4 && randomNumber < 0.85) {
            this.balls.push(new Superball(this.ctx, xRandomNumberGround, yRandomNumberGround));
        } else {
            this.balls.push(new MegaStone(this.ctx, xRandomNumberGround, yRandomNumberGround));
        }
    }

    randomRemoveBall() {
        const randomNumber = Math.floor(Math.random() * ((this.balls.length - 0)));
        this.balls.splice(randomNumber, 1);
    }

    addPoint() {
        this.totalPoints++;
        document.getElementById("number-total-points").innerText = this.totalPoints;
    }

    addField() {
        document.getElementById("number-pokemon-field").innerText = this.pokemons.length;
    }

    addTypeOne(pokemon) {
        let typeTwoClass = null;
        const typeOneId = document.getElementById(pokemon.typeOne);
        const typeOneClass = document.querySelector(`.${pokemon.typeOne}`);
        const typeTwoId = document.getElementById(pokemon.typeTwo);
        if (typeOneClass.classList.contains("hidden")) {
            typeOneClass.classList.remove("hidden");
            typeOneClass.classList.add("visible");
            typeOneId.innerText = parseInt(typeOneId.innerText) + 1;
        } else {
            typeOneId.innerText = parseInt(typeOneId.innerText) + 1;
        }
        if (pokemon.typeTwo) {
            typeTwoClass = document.querySelector(`.${pokemon.typeTwo}`);
            if (typeTwoClass && typeTwoClass.classList.contains("hidden")) {
                typeTwoClass.classList.remove("hidden");
                typeTwoClass.classList.add("visible");
            }
            typeTwoId.innerText = Number(typeTwoId.innerText) + 1;
        }
    }

    setupPokemonGenerate() {
        this.generatePokemon();
        this.resetNextPokemonTimer();
        const generateInterval = setInterval(() => {
            this.generatePokemon();
            this.resetNextPokemonTimer();
            if (this.pokemons.length > MAX_POKEMON_GROUND) {
                clearInterval(generateInterval);
                this.changeStates();
                this.setupPokemonGenerate();
            }
        }, POKEMON_GENERATE_INTERVAL);
    }

    generatePokemon() {
        const randomNumber = Math.floor(Math.random() * 3);
        switch (randomNumber) {
            case 0:
                this.pokemons.push(new Pokemon(this.ctx));
                break;
            case 1:
                this.pokemons.push(new Pokemon(this.ctx), new Pokemon(this.ctx));
                break;
            case 2:
                this.pokemons.push(new Pokemon(this.ctx), new Pokemon(this.ctx), new Pokemon(this.ctx));
                break;
        }
    }

    changeStates() {
        this.pokemons = [];
        this.lives.lives -= 1;
        this.lives.sprite.hFrameIndex += 1;
    }

    gameFinished () {
        if (this.lives.lives === 0) {
            this.balls = [];
            this.pokemons = [];
            clearInterval(this.pokemonTimer);
            setTimeout(() => this.gameOver(), 500);
        }
    }

    resetNextPokemonTimer() {
        this.nextPokemonTime = (POKEMON_GENERATE_INTERVAL / 1000);
    }

    nextPokemonTimer() {
        this.resetNextPokemonTimer();
        this.pokemonTimer = setInterval(() => {
            this.nextPokemonTime--;
            if (this.nextPokemonTime < 0) {
                this.nextPokemonTime = (POKEMON_GENERATE_INTERVAL / 1000);
            }
            document.getElementById("next-pokemon-timer").innerText =
                Math.max(0, Math.floor(this.nextPokemonTime));
        }, 1000);
    }

    draw() {
        this.background.draw();
        this.fenceLeft.draw();
        this.fenceRight.draw();
        this.topTrees.draw();
        this.easterEgg.draw();
        this.balls.forEach((ball) => ball.staticDraw());
        this.pokemons.forEach((pokemon) => pokemon.draw());
        this.trainer.draw();
        this.lives.draw();
    }
}