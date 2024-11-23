document.addEventListener("DOMContentLoaded", () => {
    const subjects = {
        1: [
            { name: "Алгебра", grade: "4" },
            { name: "Второй иностранный язык (немецкий)", grade: "4.5" },
            { name: "Геометрия", grade: "4.5" },
            { name: "Информатика", grade: "4.6" },
            { name: "История России", grade: "4.47" },
            { name: "Литература", grade: "4.45" }
        ],
        2: [
            { name: "Алгебра", grade: "4.2" },
            { name: "Физика", grade: "4.8" },
            { name: "Английский язык", grade: "4.7" },
            { name: "Химия", grade: "4.4" },
            { name: "Обществознание", grade: "4.6" }
        ]
    };

    const subjectList = document.getElementById("subjectList");
    const semesterSelect = document.getElementById("semesterSelect");

    const renderSubjects = (semester) => {
        subjectList.innerHTML = ""; // Очищаем список
        subjects[semester].forEach(subject => {
            const li = document.createElement("li");
            li.className = "subject-item";
            li.innerHTML = `
                <div class="subject-circle">${subject.grade}</div>
                <p>${subject.name}</p>
            `;
            subjectList.appendChild(li);
        });
    };

    semesterSelect.addEventListener("change", (e) => {
        const semester = e.target.value;
        renderSubjects(semester);
    });

    // Отображаем предметы для 1 семестра по умолчанию
    renderSubjects(1);
});
