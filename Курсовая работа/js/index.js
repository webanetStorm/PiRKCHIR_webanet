document.addEventListener('DOMContentLoaded', () => {
    function getNextEvent(subjects) {
        return subjects
            .map(subject => {
                return { ...subject, datetime: new Date(`${subject.date}T${subject.time}`) };
            })
            .filter(subject => subject.datetime > new Date())
            .sort((a, b) => a.datetime - b.datetime)[0];
    }

    const nextEvent = getNextEvent(config.session.subjects);

    if (nextEvent) {
        document.querySelector('.timer__subject').textContent = `${nextEvent.controlType.toLowerCase()} по предмету "${nextEvent.name}"`;

        function updateCountdown() {
            const diff = nextEvent.datetime - new Date();

            if (diff <= 0) {
                document.querySelector('.timer').textContent = 'Событие уже началось!';
                return;
            }

            document.querySelector('.timer__days').textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
            document.querySelector('.timer__hours').textContent = Math.floor((diff / (1000 * 60 * 60)) % 24);
            document.querySelector('.timer__minutes').textContent = Math.floor((diff / (1000 * 60)) % 60);
            document.querySelector('.timer__seconds').textContent = Math.floor((diff / 1000) % 60);
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    } else {
        document.querySelector('.timer').textContent = 'Нет предстоящих событий!';
    }
});
