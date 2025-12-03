const notesContainer = document.querySelector("#notesContainer");
const addBtn = document.querySelector("#addBtn");

// Load notes from localStorage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notesContainer.innerHTML = "";

  notes.forEach(text => {
    createNote(text);
  });
}

// Save notes to localStorage
function saveNotes() {
  const notes = [];
  document.querySelectorAll(".content").forEach(note => {
    notes.push(note.innerHTML)
  })
  localStorage.setItem("notes", JSON.stringify(notes))
}

// Create a note element
function createNote(text = "") {
  const note = document.createElement("div");
  note.className = "note";

  note.innerHTML =
    `<span class="deleteBtn">✖</span>
        <div class="content" contenteditable="true">${text}</div> `;

  // Delete Note
  note.querySelector(".deleteBtn").addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

  // Auto save on typing
  note.querySelector(".content").addEventListener("input", () => {
    saveNotes();
  });

  notesContainer.appendChild(note);
}

// Add new note
addBtn.addEventListener("click", () => {
  createNote();
  saveNotes();
})

// Load saved notes when page opens
loadNotes();