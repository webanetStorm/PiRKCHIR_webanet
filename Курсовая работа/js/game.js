document.addEventListener('DOMContentLoaded', () => {
    const gameField = document.querySelector('.game__field');
    const scoreElement = document.querySelector('.game__score-value');
    const startButton = document.querySelector('.game__start-button');
    let score = 0;
    let gameInterval;

    function getRandomPosition() {
        const x = Math.floor(Math.random() * (gameField.offsetWidth - 100));
        const y = Math.floor(Math.random() * (gameField.offsetHeight - 50));

        return { x, y };
    }

    function createGameBlock(subject) {
        const block = document.createElement('div');
        block.className = `game__block ${subject.controlType === 'Экзамен' ? 'game__block--exam' : 'game__block--credit'}`;
        block.textContent = `${subject.name} (${subject.controlType})`;
        const { x, y } = getRandomPosition();
        block.style.left = `${x}px`;
        block.style.top = `${y}px`;

        block.addEventListener('click', () => {
            score++;
            scoreElement.textContent = score;
            block.remove();
        });

        setTimeout(() => {
            if (block.parentElement) {
                block.remove();
            }
        }, 2000);

        gameField.appendChild(block);
    }

    function startGame() {
        score = 0;
        scoreElement.textContent = score;
        gameField.innerHTML = '';

        const subjects = config.session.subjects;

        gameInterval = setInterval(() => {
            const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
            createGameBlock(randomSubject);
        }, 1500);

        setTimeout(() => {
            clearInterval(gameInterval);
            alert(`Игра окончена! Вы набрали ${score} очков.`);
        }, 30000);
    }

    startButton.addEventListener('click', startGame);
});
