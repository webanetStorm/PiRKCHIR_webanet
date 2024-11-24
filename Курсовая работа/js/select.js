document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.select');
    const gradeList = document.querySelector('.grade__list');
    const selectBody = document.querySelector('.select__body');
    const selectHeader = document.querySelector('.select__header');
    const selectTitle = selectHeader.querySelector('.select__title');
    const selectIcon = selectHeader.querySelector('.select__icon');
    const averageValue = document.querySelector('.average__value');

    const calculateAverageGrade = (subjects) => {
        const gradedSubjects = subjects.filter(
            (subject) => subject.type === 'Экзамен' || subject.type === 'Зачет дифференцированный' || subject.type === 'Курсовая работа'
        );

        if (gradedSubjects.length === 0)
            return '—';

        return (gradedSubjects.reduce((sum, subject) => sum + parseFloat(subject.grade), 0) / gradedSubjects.length).toFixed(2);
    };

    const getGradeText = (grade, type) => {
        if (type === 'Экзамен' || type === 'Зачет дифференцированный' || type === 'Курсовая работа') {
            switch (parseInt(grade)) {
                case 5:
                    return 'Отл';
                case 4:
                    return 'Хор';
                case 3:
                    return 'Удовл';
                case 2:
                    return 'Неуд';
                default:
                    return '—';
            }
        } else if (type === 'Зачет') {
            return grade === 'Зачет' ? 'Зачет' : 'Незачет';
        }
        return '—';
    };

    const getGradeClass = (grade, type) => {
        if (type === 'Экзамен' || type === 'Зачет дифференцированный' || type === 'Курсовая работа') {
            switch (parseInt(grade)) {
                case 5:
                    return 'rating_positive';
                case 4:
                    return 'rating_neutral';
                case 3:
                    return 'rating_warning';
                case 2:
                    return 'rating_negative';
                default:
                    return '';
            }
        } else if (type === 'Зачет') {
            return grade === 'Зачет' ? 'rating_positive' : 'rating_negative';
        }
        return '';
    };

    const renderSubjects = (semester) => {
        const subjects = config.semesters[semester];
        gradeList.innerHTML = '';

        subjects.forEach((subject) => {
            const listItem = document.createElement('li');
            listItem.className = 'grade__item subject';

            listItem.innerHTML = `
                <div class="subject__left">
                    <div class="subject__rating">
                        <span class="subject__grade rating ${getGradeClass(subject.grade, subject.type)}">
                            ${getGradeText(subject.grade, subject.type)}
                        </span>
                    </div>
                    <div class="subject__control">
                        <h4 class="subject__name">${subject.name}</h4>
                        <p class="subject__type">${subject.type}</p>
                    </div>
                </div>
                <div class="subject__right">
                    <p class="subject__teacher">${subject.teacher}</p>
                    <p class="subject__date">${subject.date}</p>
                </div>
            `;
            gradeList.appendChild(listItem);
        });

        const averageGrade = calculateAverageGrade(subjects);
        averageValue.textContent = averageGrade;

        const newClass =
            parseFloat(averageGrade) >= 4.5
                ? 'rating_positive'
                : parseFloat(averageGrade) >= 4
                    ? 'rating_neutral'
                    : 'rating_warning';
        averageValue.className = `average__value rating rating_average ${newClass}`;
    };

    Object.keys(config.semesters).reverse().forEach((key) => {
            const semesterItem = document.createElement('div');
            semesterItem.className = 'select__item';
            semesterItem.textContent = `${key} семестр`;

            semesterItem.addEventListener('click', () => {
                document.querySelectorAll('.select__item').forEach((item) =>
                    item.classList.remove('select__item_active')
                );
                semesterItem.classList.add('select__item_active');

                selectTitle.textContent = `${key} семестр`;

                renderSubjects(key);

                selectBody.style.display = 'none';
                selectHeader.classList.remove('select__header_active');
                selectIcon.classList.remove('select__icon_active');
            });

            selectBody.appendChild(semesterItem);
        });

    selects.forEach((select) => {
        const header = select.querySelector('.select__header');
        const body = select.querySelector('.select__body');
        const title = header.querySelector('.select__title');
        const items = body.querySelectorAll('.select__item');
        const icon = header.querySelector('.select__icon');

        if (items.length) {
            items[0].classList.add('select__item_active');
            title.textContent = items[0].textContent;
        }

        header.addEventListener('click', () => {
            document.querySelectorAll('.select__body').forEach((otherBody) => {
                if (otherBody !== body) {
                    otherBody.style.display = 'none';
                }
            });
            document.querySelectorAll('.select__header').forEach((otherHeader) => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('select__header_active');
                }
            });
            document.querySelectorAll('.select__icon').forEach((otherIcon) => {
                if (otherIcon !== icon) {
                    otherIcon.classList.remove('select__icon_active');
                }
            });

            body.style.display = body.style.display === 'block' ? 'none' : 'block';
            header.classList.toggle('select__header_active');
            icon.classList.toggle('select__icon_active');
        });
    });

    document.addEventListener('click', (e) => {
        selects.forEach((select) => {
            if (!select.contains(e.target)) {
                select.querySelector('.select__body').style.display = 'none';
                select.querySelector('.select__header').classList.remove('select__header_active');
                select.querySelector('.select__icon').classList.remove('select__icon_active');
            }
        });
    });

    const firstSemester = Object.keys(config.semesters).reverse()[0];
    renderSubjects(firstSemester);
    selectTitle.textContent = `${firstSemester} семестр`;
});
