document.addEventListener('DOMContentLoaded', () => {
    const calendarBody = document.querySelector('.calendar__body');
    const generateDays = (startDate, endDate) => {
        const days = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            days.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return days;
    };
    const days = generateDays(new Date('2024-12-24'), new Date('2025-01-31'));
    days.forEach((day) => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar__day');
        const dateElement = document.createElement('div');
        dateElement.classList.add('calendar__day-date');
        dateElement.textContent = day.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: 'short',
        });
        dayElement.appendChild(dateElement);
        const events = config.session.subjects.filter(
            (subject) => new Date(subject.date).toDateString() === day.toDateString()
        );
        events.forEach((event) => {
            const eventElement = document.createElement('div');
            eventElement.classList.add(
                'calendar__event',
                event.controlType === 'Зачет'
                    ? 'calendar__event_zachet'
                    : event.controlType === 'Экзамен'
                        ? 'calendar__event_exam'
                        : 'calendar__event_coursework'
            );
            eventElement.textContent = `${event.name}`;
            dayElement.appendChild(eventElement);
        });
        calendarBody.appendChild(dayElement);
    });
});
