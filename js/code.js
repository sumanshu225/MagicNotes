console.log("helo");

showNotes();

function calculateDate() {
  let todayDate = new Date();

  let datePart = `${todayDate.getDate()}/${
    todayDate.getMonth() + 1
  }/${todayDate.getFullYear()}`;

  let hour = todayDate.getHours();
  let ampm = hour >= 12 ? `PM` : `AM`;
  hour = hour % 12 == 0 ? 12 : hour % 12;

  let minutes = todayDate.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let timePart = `${hour}:${minutes}${ampm}`;

  return `Last Edited on ${datePart} at ${timePart}`;
}

// Code to submit Notes
let submit = document.getElementById(`btn`);

submit.addEventListener(`click`, function () {
  let text = document.getElementById(`typedTxt`);
  let title = document.getElementById(`typedTitle`);

  let notes = localStorage.getItem(`notes`);
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let newObj = {
    notesTitle: title.value,
    notesText: text.value,
    notesDate: calculateDate(),
  };

  notesObj.push(newObj);

  localStorage.setItem(`notes`, JSON.stringify(notesObj));
  console.log(JSON.stringify(notesObj));

  document.getElementById(`typedTxt`).value = "";
  document.getElementById(`typedTitle`).value = "";
  showNotes();
});

// Show Notes function

function showNotes() {
  let notes = localStorage.getItem(`notes`);
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let html;

  if (notesObj.length == 0) {
    html = `<h1 class="color-d ubuntu">You have not added any Notes</h1>`;
  } else {
    html = `<h1 class="color-d ubuntu">Your Notes</h1>`;

    notesObj.forEach(function (element, index) {
      console.log(index);
      html += ` <div class="notes border-l caveat">
        <h2 class="color-l align-center">${element.notesTitle}</h2>
        <div id="text-${index}">
        <p class="color-l indie-flower" >
          ${element.notesText}
        </p>
        </div>
        <div class="buttons">
          
          <button class="caveat"  onclick="deleteNote(${index})">Delete note</button>
          <button class="caveat"  id="edit-${index}" onclick="editNote(${index})">Edit note</button>
          
          
          
        </div>
        <div class="date">${element.notesDate}</div>
      </div>
    </div>`;
    });
  }

  document.querySelector(`.noteArea`).innerHTML = html;
}

// delete Notes

function deleteNote(index) {
  console.log(`I am deleting ${index}`);
  let notes = localStorage.getItem(`notes`);
  let notesObj = JSON.parse(notes);

  notesObj.splice(index, 1);

  localStorage.setItem(`notes`, JSON.stringify(notesObj));
  showNotes();
}

// Edit Notes

function editNote(index) {
  console.log(`I am edditing ${index}`);

  let initialtext = document.getElementById(`text-${index}`).innerText;
  console.log(initialtext);

  document.getElementById(`text-${index}`).innerHTML = `
                                                    <textarea cols="30" rows="5" class="backgroundColor-l border-l textArea ubuntu editTxt">
                                                    ${initialtext.trim()}
                                                    </textarea>`;
  document.getElementsByClassName(`buttons`)[index].innerHTML = `
  <button class="caveat"  onclick="deleteNote(${index})">Delete note</button>
  <button class="caveat"  id="save-${index}" onclick="saveNote(${index})">Save note</button>
  `;
}
// saving a note

function saveNote(index) {
  console.log(`I am saving`);
  let saveBtn = document.getElementById(`save-${index}`);
  let editedTxt = document.getElementsByClassName(`editTxt`)[0].value;
  document.getElementById(`text-${index}`).innerHTML = `
    <p class="color-l indie-flower" >
          ${editedTxt}
    </p>
    `;
  document.getElementsByClassName(`buttons`)[index].innerHTML = `
  <button class="caveat"  onclick="deleteNote(${index})">Delete note</button>
  <button class="caveat"  id="edit-${index}" onclick="editNote(${index})">Edit note</button>
  `;

  // Changing edited time

  let notes = localStorage.getItem(`notes`);
  let notesObj = JSON.parse(notes);

  notesObj[index].notesDate = calculateDate();
  notesObj[index].notesText = editedTxt;

  console.log(notesObj[index].notesDate);
  console.log(calculateDate());

  localStorage.setItem(`notes`, JSON.stringify(notesObj));
  showNotes();
}

// Searching

function displaySubmenu() {
  console.log(`show now`);
  document.querySelector(".submenu").style.display = `block`;
}
function hideSubmenu() {
  console.log(`hide now`);
  document.querySelector(".submenu").style.display = `none`;
}

function searchNote(type) {
  // console.log(`clicked`, typeof content, content);
  let notes = localStorage.getItem(`notes`);
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let searchBox = document.querySelector(`.searchBox`);

  if (type == `title`) {
    searchBox.innerHTML = `
    <input
    type="text"
    id="searchTitle"
    placeholder="Title"
    class="backgroundColor-l border-l"
    />
    `;

    // searching by title
    let title = document.getElementById(`searchTitle`);
    title.addEventListener(`input`, function () {
      let titleTxt = title.value.toLowerCase();
      console.log(titleTxt);

      notesObj.forEach(function (element, index) {
        if (element.notesTitle.toLowerCase().includes(titleTxt)) {
          document.getElementsByClassName(`notes`)[
            index
          ].style.display = `block`;
        } else {
          document.getElementsByClassName(`notes`)[
            index
          ].style.display = `none`;
        }
      });
    });
  } else if (type == `text`) {
    searchBox.innerHTML = `
    <input
    type="text"
    id="searchTxt"
    placeholder="Note Text"
    class="backgroundColor-l border-l"
    />
    `;

    // Searching by noteContent

    let noteContent = document.getElementById(`searchTxt`);
    noteContent.addEventListener(`input`, function () {
      let noteTxt = noteContent.value.toLowerCase();
      console.log(`noteTxt`);

      notesObj.forEach(function (element, index) {
        if (element.notesText.toLowerCase().includes(noteTxt)) {
          document.getElementsByClassName(`notes`)[
            index
          ].style.display = `block`;
        } else {
          document.getElementsByClassName(`notes`)[
            index
          ].style.display = `none`;
        }
      });
    });
  } else if (type == `date`) {
    searchBox.innerHTML = `
    <input
    type="text"
    id="searchDate"
    placeholder="ddate or Time"
    class="backgroundColor-l border-l"
    />
    `;

    // Searching By Date

    let dateContent = document.getElementById(`searchDate`);
    dateContent.addEventListener(`input`, function () {
      dateTxt = dateContent.value;
      notesObj.forEach(function (element, index) {
        if (element.notesDate.includes(dateTxt)) {
          document.getElementsByClassName(`notes`)[
            index
          ].style.display = `block`;
        } else {
          document.getElementsByClassName(`notes`)[
            index
          ].style.display = `none`;
        }
      });
    });
  }
}

// searching by noteContent

// let noteContent = document.getElementById(`searchTxt`);
// noteContent.addEventListener(`input`, function () {
//   let noteTxt = noteContent.value.toLowerCase();
//   console.log(`noteTxt`);

//   notesObj.forEach(function (element, index) {
//     if (element.notesText.toLowerCase().includes(noteTxt)) {
//       document.getElementsByClassName(`notes`)[index].style.display = `block`;
//     } else {
//       document.getElementsByClassName(`notes`)[index].style.display = `none`;
//     }
//   });
// });
