// Отображение профиля
function displayProfile() {
    const profileContainer = document.getElementById("student-profile");
    profileContainer.innerHTML = `
        <p><strong>Имя:</strong> ${studentProfile.name}</p>
        <p><strong>Группа:</strong> ${studentProfile.group}</p>
        <p><strong>Средний балл:</strong> ${studentProfile.averageGrade}</p>
    `;
}

// Отображение расписания
function displaySchedule() {
    const scheduleContainer = document.getElementById("schedule");
    schedule.forEach(item => {
        scheduleContainer.innerHTML += `<p>${item.date}, ${item.subject} — ${item.time}</p>`;
    });
}

// Отображение предметов
function displaySubjects() {
    const tableBody = document.querySelector("#subjects-table tbody");
    subjects.forEach(subj => {
        tableBody.innerHTML += `
            <tr>
                <td>${subj.name}</td>
                <td>${subj.grade}</td>
                <td><a href="subject.html?id=${subj.id}">Подробнее</a></td>
            </tr>
        `;
    });
}

// Отображение информации о предмете
function displaySubjectInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const subjectId = parseInt(urlParams.get("id"));
    const subject = subjects.find(subj => subj.id === subjectId);

    if (subject) {
        document.getElementById("subject-info").innerHTML = `
            <p><strong>Название:</strong> ${subject.name}</p>
            <p><strong>Оценка:</strong> ${subject.grade}</p>
            <p><strong>Детали:</strong> ${subject.details}</p>
        `;
    }
}

// Автоматическое выполнение функций
if (document.getElementById("student-profile")) displayProfile();
if (document.getElementById("schedule")) displaySchedule();
if (document.querySelector("#subjects-table")) displaySubjects();
if (document.getElementById("subject-info")) displaySubjectInfo();
