//check if browser supports service worker
//before registering the worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker
            .register('../serviceWorker.js')
            .then(res => console.log('Service worker registered'))
            .catch(err => console.log('Service worker not registered', err))
    }) 
}

/* ==========================
    To toggle between themes
========================== */
const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

//checks for last theme in browser storage
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

//enables toggle between dark and light themes 
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
    }
};

toggleSwitch.addEventListener('change', switchTheme);

/* ==================
    To clear textarea
=================== */

const textareaTitle = document.querySelector('.title');
const textareaDesc = document.querySelector('.desc');
const clearButton = document.querySelector('.clear-button');

function clearTextAreaTitle() {
    if (textareaTitle.value !== '') {
        textareaTitle.value = '';
    }
};

clearButton.addEventListener('click', clearTextAreaTitle);

function clearTextAreaDesc() {
    if (textareaDesc.value !== '') {
        textareaDesc.value = '';
    }
};

clearButton.addEventListener('click', clearTextAreaDesc);

/* ========================
    To save notes and show
    save-success display
======================== */

const saveButton = document.querySelector('.save-button');
const addNoteArea = document.querySelector('.newnote-container');
let notesList = new Array;

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function saveToStorage() {
    let noteTitle = textareaTitle.value;
    let noteDesc = textareaDesc.value;
    let noteDate = new Date;
    notesList.push({
        id: Date.now(),
        textTitle: noteTitle,
        textDesc: noteDesc,
        date: `Last edited at ${noteDate.toLocaleTimeString()} on ${days[noteDate.getDay()]}, ${noteDate.getDate()} ${months[noteDate.getMonth()]} ${noteDate.getFullYear()}`
    });
    localStorage['notes'] = JSON.stringify(notesList);
    swal.fire({
            allowOutsideClick: false,
            title: "Note saved successfully!",
            icon: "success",
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Saved Notes',
            cancelButtonText: 'New note'
        })
        .then((result) => {
            if (result.value) {
                window.location.assign("notes.html");
            } else {
                location.reload();
            }
        })
}

function saveNote() {
    if (textareaTitle.value !== '' && textareaDesc.value !== '') {
        if (localStorage.length === 1) {
            saveToStorage();
        } else if (localStorage.length === 0) {
            localStorage.setItem('theme', '');
            saveToStorage();
        } else if (localStorage.getItem('notes') === null) {
            localStorage.clear();
            localStorage.setItem('theme', 'null');
            saveToStorage();
        } else {
            notesList = JSON.parse(localStorage['notes']);
            saveToStorage();
        }
        textareaTitle.value = '';
        textareaDesc.value = '';
    } else {
        swal.fire({
            title: "Note cannot be empty!",
            icon: "warning"
        });
    }
};

saveButton.addEventListener('click', saveNote);
