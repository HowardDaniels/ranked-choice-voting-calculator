var $newCandidate = $("#newCandidate");
var $newCandidateInput = $("#candidateInput");
var $candidateList = $(".list-group");
var $candidateTitle = $(".candidateTitle");

var activeCandidate = {};


// A function for getting all notes from the db
var getCandidates = function() {
  return $.ajax({
    url: "/api/candidates",
    method: "GET"
  });
};

// A function for saving a note to the db
var saveCandidate = function(candidate) {
  return $.ajax({
    url: "/api/candidates",
    data: candidate,
    method: "POST"
  });
};

// A function for deleting a note from the db
var deleteCandidate = function(id) {
  return $.ajax({
    url: "/api/candidates/" + id,
    method: "DELETE"
  });
};

// If there is an activeNote, display it, otherwise render empty inputs
var renderActiveCandidate = function() {
  $saveCandidateBtn.hide();

  if (activeCandidate.id) {
    newCandidate.attr("readonly", true);
   $newCandidateInput.val(activeCandidate.name);
  } else {
    newCandidate.attr("readonly", false);
   $newCandidateInput.val("");
  }
};

// Get the note data from the inputs, save it to the db and update the view
var handleCandidate = function() {
  var newCandidate = {
    name: $newCandidateInput.val()
  };

  var candidate = $(this)
  .parent(".list-group-item")
  .data();

  if (activeCandidate.id === candidate.id) {
    activeCandidate = {};
  }

  saveCandidate(newCandidate).then(function(data) {
    getAndRenderCandidates();
  });
};

// Delete the clicked note
var handleCandidateDelete = function(event) {
  // prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  var candidate = $(this)
    .parent(".list-group-item")
    .data();

    if (activeCandidate.id === candidate.id) {
      activeCandidate = {};
    }

  deleteCandidate(candidate.id).then(function() {
    getAndRenderCandidates();
    renderActiveCandidate();
  });
};


// Sets the activeNote and displays it
var handleCandidateView = function() {
  activeCandidate = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewCandidateView = function() {
  activeCandidate = {};
  renderActiveCandidate();
};

// If a note's title or text are empty, hide the save button
// Or else show it
// var handleRenderSaveBtn = function() {
//   if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
//     $saveNoteBtn.hide();
//   } else {
//     $saveNoteBtn.show();
//   }
// };

// Render's the list of note titles
var renderCandidateList = function(candidates) {
  $candidateList.empty();

  var candidateListItems = [];

  for (var i = 0; i < candidates.length; i++) {
    var candidate = candidates[i];

    var $li = $("<li class='list-group-item'>").data(candidate);
    var $span = $("<span>").text(candidate.name);
    var $delBtn = $(
      "<button class='delete-note'>Delete</button>"
    );

    $li.append($span, $delBtn);
    candidateListItems.push($li);
  }

  $candidateList.append(candidateListItems);
};

// var renderNoteList = function(notes) {
//   $noteList.empty();

//   var noteListItems = [];

//   for (var i = 0; i < notes.length; i++) {
//     var note = notes[i];

//     var $li = $("<li class='list-group-item'>").data(note);
//     var $span = $("<span>").text(note.title);
//     var $delBtn = $(
//       "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
//     );

//     $li.append($span, $delBtn);
//     noteListItems.push($li);
//   }

//   $noteList.append(noteListItems);
// };

// Gets notes from the db and renders them to the sidebar
var getAndRenderCandidates = function() {
  return getCandidates().then(function(data) {
    renderCandidateList(data);
  });
};

$newCandidate.on("click", handleCandidate);

// $saveNoteBtn.on("click", handleNoteSave);
// $noteList.on("click", ".list-group-item", handleNoteView);
// $newNoteBtn.on("click", handleNewNoteView);
$candidateList.on("click", ".delete-note", handleCandidateDelete);
// $noteTitle.on("keyup", handleRenderSaveBtn);
// $noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderCandidates();
// $delBtn.on("click", handleCandidateDelete);