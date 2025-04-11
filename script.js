let items = {
    day1: [],
    day2: [],
    day3: [],
    day4: [],
    day5: [],
    day6: [],
    day7: []
};

function updateList() {
    ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'].forEach(day => {
        const list = document.getElementById(day);
        list.innerHTML = '';
        items[day].forEach((item, index) => {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.checked;
            checkbox.onchange = () => {
                items[day][index].checked = checkbox.checked;
                updateDayCheckbox(day);
            };
            li.appendChild(checkbox);
            li.appendChild(document.createTextNode(item.text));
            list.appendChild(li);
        });
        updateDayCheckbox(day);
    });
}

function updateDayCheckbox(day) {
    const dayCheckbox = document.getElementById(day + 'Checkbox');
    const dayHeader = document.getElementById(day + 'Header');
    const workoutList = document.getElementById(day);
    const allChecked = items[day].every(item => item.checked);
    dayCheckbox.checked = allChecked;
    dayHeader.style.backgroundColor = allChecked ? '#50C878' : '';
    dayHeader.classList.toggle('checked', allChecked); // Add this line to toggle the class
    workoutList.classList.toggle('checked', allChecked);
}

function saveList() {
    const json = JSON.stringify(items);
    localStorage.setItem('trainingsplan', json);
    alert('Liste gespeichert!');
}

function loadList() {
    const json = localStorage.getItem('trainingsplan');
    if (json) {
        items = JSON.parse(json);
        updateList();
        alert('Liste geladen!');
    } else {
        alert('Keine gespeicherte Liste gefunden.');
    }
}

function downloadJSON() {
    const json = JSON.stringify(items, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trainingsplan.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importJSON() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
        const json = event.target.result;
        items = JSON.parse(json);
        updateList();
    };
    reader.readAsText(file);
}

function resetCheckboxes() {
    ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'].forEach(day => {
        items[day].forEach(item => item.checked = false);
    });
    updateList();
}

// Initialize the list with default items
items.day1 = [
    { text: 'Bankdrücken: 4 Sätze, 8-12 Wiederholungen', checked: false },
    { text: 'Schulterdrücken (Kurzhanteln): 4 Sätze, 8-12 Wiederholungen', checked: false },
    { text: 'Butterfly oder Fliegende: 3 Sätze, 10-12 Wiederholungen', checked: false },
    { text: 'Seitheben für die Schultern: 3 Sätze, 12-15 Wiederholungen', checked: false },
    { text: 'Trizeps-Dips: 3 Sätze, bis zur Erschöpfung', checked: false }
];
items.day2 = [
    { text: 'Kniebeugen: 4 Sätze, 8-12 Wiederholungen', checked: false },
    { text: 'Beinpresse: 4 Sätze, 10-12 Wiederholungen', checked: false },
    { text: 'Ausfallschritte (mit oder ohne Hanteln): 3 Sätze, 12-15 Wiederholungen pro Bein', checked: false },
    { text: 'Plank: 3 Durchgänge, jeweils 30-60 Sekunden', checked: false },
    { text: 'Crunches: 3 Sätze, 12-15 Wiederholungen', checked: false },
    { text: 'Hanging Leg Raises: 3 Sätze, 10-12 Wiederholungen', checked: false }
];
items.day3 = [
    { text: 'Klimmzüge: 4 Sätze, bis zur Erschöpfung', checked: false },
    { text: 'Rudern mit Kurzhanteln: 4 Sätze, 8-12 Wiederholungen', checked: false },
    { text: 'Kreuzheben: 4 Sätze, 8-12 Wiederholungen', checked: false },
    { text: 'Bizepscurls: 3 Sätze, 10-12 Wiederholungen', checked: false },
    { text: 'Seitliche Plank: 3 Durchgänge, jeweils 20-40 Sekunden pro Seite', checked: false }
];
items.day4 = [
    { text: 'Cardio: 30 Minuten', checked: false }
];
items.day5 = [
    { text: 'Cardio: 30 Minuten', checked: false }
];
items.day6 = [
    { text: 'Stretching: 30 Minuten', checked: false }
];
items.day7 = [
    { text: 'Stretching: 30 Minuten', checked: false }
];

updateList();

window.onload = function() {
    loadList();
};
