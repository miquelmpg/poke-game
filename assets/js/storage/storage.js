
// const localStorageTasks = localStorage.getItem("scores");

// const scores = localStorageTasks ? localStorageTasks.split(",") : [];

// const menuButtonGreen = document.querySelector(".menu-green");
// const input = document.querySelector(".score-name");
// const scoreList = document.querySelector(".score-list");

// menuButtonGreen.onclick = () => addTask();

// scores.forEach((score) => addTask(score));

// function addTask(scoreValue) {
//     const newScore = scoreValue ? scoreValue : input.value;
    
//     const li = document.createElement("LI");
//     li.innerText = newScore;
//     scoreList.appendChild(li);

//     scores.push(newScore);
//     localStorage.setItem("scores", scores.join(","));

//     input.value = "";
//     input.focus();
// }


// const localStorageTasks = localStorage.getItem("scores");
// const scores = localStorageTasks ? localStorageTasks.split(",") : [];

// const menuButtonGreen = document.querySelector(".menu-green");
// const input = document.querySelector(".score-name");
// const scoreList = document.querySelector(".score-list");

// menuButtonGreen.onclick = () => saveTask();

// scores.forEach((score) => renderTask(score));

// function renderTask(scoreValue) {
//     const li = document.createElement("LI");
//     li.innerText = scoreValue;
//     scoreList.appendChild(li);
// }

// function saveTask() {
//     const newScore = input.value;

//     renderTask(newScore);

//     scores.push(newScore);
//     localStorage.setItem("scores", scores.join(","));

//     input.value = "";
//     input.focus();
// }

        const localStorageTasks = localStorage.getItem("scores");
        const scores = localStorageTasks ?  JSON.parse(localStorage.getItem("scores")) : [];

        const menuButtonGreen = document.querySelector(".menu-green");
        const input = document.querySelector(".score-name");
        const scoreList = document.querySelector(".score-list");

        scores.sort((a, b) => b[1] - a[1]);
        scores.splice(5);
        scores.forEach((score) => renderTask(score));

        function renderTask(scoreValue) {
            const li = document.createElement("LI");
            const divOne = document.createElement("DIV");
            const divTwo = document.createElement("DIV");
            const divContainer = document.createElement("DIV");
            divContainer.appendChild(divOne);
            divContainer.appendChild(divTwo);
            divOne.innerText = `${scoreValue[0]}`;
            divTwo.innerText = `${scoreValue[1]}`;
            li.appendChild(divContainer);
            scoreList.appendChild(li);
        }