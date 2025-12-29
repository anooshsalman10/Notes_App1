
// select items
let textarea = document.getElementById("textarea");
let addButton = document.getElementById("addButton");
let ulList = document.getElementById("ulList");

// load notes from local storage
let notes = JSON.parse(localStorage.getItem("notes"))|| [];

// initial render
renderNotes();

// add feature
addButton.addEventListener("click", updateUI);
function updateUI() {
    let textarea1 = textarea.value.trim();
    if (textarea1 == "") {
        alert("enter a note first!");
        return;
    }

    let note={
        id:Date.now(),
        text:textarea1
    };

    notes.push( note);
    saveNotes();
    renderNotes();
    textarea.value="";
}

// save notes 
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// render notes

function renderNotes() {
    ulList.innerHTML = "";
    notes.forEach(note => {
        let notesList = document.createElement("li");
        let span = document.createElement("span");
        span.textContent = note.text;
        notesList.appendChild(span);

        // edit button
        let edit = document.createElement("button");
        edit.innerText = "edit";
        
        // edit logic
        edit.addEventListener("click", () => {
            let updatedNote = prompt("enter the updated note", note.text);

            if (updatedNote !== null && updatedNote.trim() !== "") {
                note.text = updatedNote.trim();
                saveNotes();
                renderNotes();
            }
        })


        // delete button
        let del = document.createElement("button");
        del.innerText = "delete";

        // delete logic
        del.addEventListener("click", () => {
            notes = notes.filter(n => n.id !== note.id);
            saveNotes();
            renderNotes();
        })

        // append features in list
        notesList.appendChild(edit);
        notesList.appendChild(del);
        ulList.appendChild(notesList);


    });

}





