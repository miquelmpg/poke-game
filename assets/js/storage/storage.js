        const localStorageTasks = localStorage.getItem(LOCAL_STORAGE_SCORE_KEY);
        const scores = localStorageTasks ?  JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCORE_KEY)) : [];

        const menuButtonGreen = document.querySelector('.menu-green');
        const input = document.querySelector('.score-name');
        const scoreList = document.querySelector('.score-list');

        scores.sort((a, b) => b[1] - a[1]);
        scores.splice(5);
        scores.forEach((score) => renderTask(score));

        function renderTask(scoreValue) {
            const li = document.createElement('LI');
            const divOne = document.createElement('DIV');
            const divTwo = document.createElement('DIV');
            const divContainer = document.createElement('DIV');
            divContainer.appendChild(divOne);
            divContainer.appendChild(divTwo);
            divOne.innerText = `${scoreValue[0]}`;
            divTwo.innerText = `${scoreValue[1]}`;
            li.appendChild(divContainer);
            scoreList.appendChild(li);
        }