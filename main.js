// user input
const noteName = document.querySelector("input[name='note-name']");
const noteContent = document.querySelector("textarea");
const addNoteButton = document.querySelector("input[type='submit']");
const delButton = document.querySelector(".del");
const previewButton = document.querySelector(".preview");
let notesDiv = document.querySelector(".notes");

let notes = [];

if (localStorage.getItem("notes")) {
	notes = JSON.parse(localStorage.getItem("notes"));
	creatNotesElem(notes);
}

addNoteButton.addEventListener("click", () => {
	if (noteName.value.trim() !== "" && noteContent.value.trim() !== "") {
		addNoteToArr(noteName.value, noteContent.value);
		noteName.value = "";
		noteContent.value = "";
		noteName.focus();
	}
});

function addNoteToArr(n, c) {
	const note = {
		noteName: n,
		noteContent: c,
		noteId: Date.now(),
	};

	notes.push(note);
	creatNotesElem(notes);
	updateLocalStorage(notes);
}

function creatNotesElem(notes) {
	notesDiv.innerHTML = "";

	notes.forEach(e => {
		let noteDiv = document.createElement("div");
		let noteH2 = document.createElement("h2");
		let noteP = document.createElement("p");
		let actionsDiv = document.createElement("div");
		let preBtn = document.createElement("button");
		let delBtn = document.createElement("button");
		notesDiv.appendChild(noteDiv);
		noteDiv.classList.add("note");
		noteDiv.setAttribute("data-id", e.noteId);
		noteDiv.appendChild(noteH2);
		noteH2.textContent = e.noteName;
		noteDiv.appendChild(noteP);
		noteP.textContent = e.noteContent;
		noteDiv.appendChild(actionsDiv);
		actionsDiv.classList.add("actions");
		actionsDiv.appendChild(preBtn);
		preBtn.classList.add("preview");
		preBtn.textContent = "Preview";
		actionsDiv.appendChild(delBtn);
		delBtn.classList.add("del");
		delBtn.textContent = "Delete";
	});
}

function updateLocalStorage(notes) {
	window.localStorage.setItem("notes", JSON.stringify(notes));
}


// Delete Note
addEventListener("click", (e) => {
	if (e.target.getAttribute("class") === "del") {
		notes.forEach((note, index) => {
			if (note.noteId === +e.target.parentNode.parentNode.getAttribute("data-id")) {
				notes.splice(index, 1);
			}
		});
		creatNotesElem(notes);
		updateLocalStorage(notes);
	}
});

// Preview Note
addEventListener("click", (e) => {
	if (e.target.getAttribute("class") === "preview") {
		notes.forEach((note) => {
			if (note.noteId === +e.target.parentNode.parentNode.getAttribute("data-id")) {
				let previewDiv = document.createElement("div");
				let contentDiv = document.createElement("div");
				let crossMark = document.createElement("div");
				let previewH1 = document.createElement("h2");
				let previewP = document.createElement("p");
				document.body.append(previewDiv);
				previewDiv.classList.add("note-preview");
				previewDiv.append(contentDiv);
				contentDiv.classList.add("content");
				contentDiv.append(crossMark);
				crossMark.classList.add("cross-mark");
				contentDiv.append(previewH1);
				previewH1.textContent = note.noteName;
				contentDiv.append(previewP);
				previewP.textContent = note.noteContent;
			}
		});
	}
});

// Remove Preview
addEventListener("click", (e) => {
	if (e.target.getAttribute("class") === "note-preview") {
		e.target.remove();
	}
});

addEventListener("click", (e) => {
	if (e.target.getAttribute("class") === "cross-mark") {
		e.target.parentNode.parentNode.remove();
	}
});