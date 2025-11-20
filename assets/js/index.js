document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById("main");
    const score = document.getElementById("score");
    const startBoy = document.querySelector(".start-boy");
    const startGirl = document.querySelector(".start-girl");
    const scoreButton = document.querySelector(".score");
    const scoreButtonRed = document.querySelector(".score-red");
    const menuButtonGreen = document.querySelector(".menu-green");
    const canvas = document.querySelector(".main-canvas");
    const pokemon = document.querySelector(".pokemon");
    const pokemonOut = document.querySelector(".pokemon-out");
    const TimeRemaining = document.querySelector(".time-remaining");

    startBoy.addEventListener("click", () => {
        main.classList.add("hidden");
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

        const localStorageTasks = localStorage.getItem("scores");
        const scores = localStorageTasks ?  JSON.parse(localStorage.getItem("scores")) : [];

        const menuButtonGreen = document.querySelector(".menu-green");
        const input = document.querySelector(".score-name");

        menuButtonGreen.onclick = () => saveTask();

        function saveTask() {
            const newScore = [input.value.toUpperCase(), game.totalPoints];

            renderTask(newScore);

            scores.push(newScore);
            localStorage.setItem("scores", JSON.stringify(scores));

            input.value = "";
            input.focus();
        }
    });

    startGirl.addEventListener("click", () => {
        main.classList.add("hidden");
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

        const localStorageTasks = localStorage.getItem("scores");
        const scores = localStorageTasks ?  JSON.parse(localStorage.getItem("scores")) : [];

        const menuButtonGreen = document.querySelector(".menu-green");
        const input = document.querySelector(".score-name");

        menuButtonGreen.onclick = () => saveTask();

        function saveTask() {
            const newScore = [input.value.toUpperCase(), game.totalPoints];

            renderTask(newScore);

            scores.push(newScore);
            localStorage.setItem("scores", JSON.stringify(scores));

            input.value = "";
            input.focus();
        }
    });

    scoreButton.addEventListener("click", () => {
        main.classList.add("hidden");
        score.classList.remove("hidden");
    });

    scoreButtonRed.addEventListener("click", () => {
        score.classList.add("hidden");
        main.classList.remove("hidden");
    });

    menuButtonGreen.addEventListener("click", () => {
        location.reload();
    })
})