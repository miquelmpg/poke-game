document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById("main");
    const startBoy = document.querySelector(".start-boy");
    const startGirl = document.querySelector(".start-girl");
    const canvas = document.querySelector(".main-canvas");
    const pokemon = document.querySelector(".pokemon");
    const pokemonOut = document.querySelector(".pokemon-out");
    const TimeRemaining = document.querySelector(".time-remaining");

    startBoy.addEventListener("click", () => {
        main.remove();
        canvas.classList.remove("hidden");
        canvas.classList.add("visible");
        pokemon.classList.remove("hidden");
        pokemon.classList.add("visible");
        pokemonOut.classList.remove("hidden");
        pokemonOut.classList.add("visible");
        TimeRemaining.classList.remove("hidden");
        TimeRemaining.classList.add("visible");
        const game = new Game("main-canvas");
        game.start();
    })

    startGirl.addEventListener("click", () => {
        main.remove();
        canvas.classList.remove("hidden");
        canvas.classList.add("visible");
        pokemon.classList.remove("hidden");
        pokemon.classList.add("visible");
        pokemonOut.classList.remove("hidden");
        pokemonOut.classList.add("visible");
        TimeRemaining.classList.remove("hidden");
        TimeRemaining.classList.add("visible");
        const game = new Game("main-canvas");
        game.start();
        game.trainer.sprite.src = '/assets/images/sprites/trainer-girl.png';
    })
})