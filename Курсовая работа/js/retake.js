document.addEventListener('DOMContentLoaded', () => {
    const retakeSubjects = [];

    Object.values(config.semesters).forEach((semester) => {
        semester.forEach((subject) => {
            if (subject.grade === 'Незачет' || subject.grade === 2) {
                retakeSubjects.push(subject.name);
            }
        });
    });

    retakeSubjects.forEach((subject) => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        document.querySelector('#subject-select').appendChild(option);
    });
});
