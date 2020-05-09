var $newCandidate = $("#newCandidate");
var $newCandidateInput = $("#candidateInput");
var $candidateList = $(".list-group");
var $candidateTitle = $(".candidateTitle");

var activeCandidate = {};

// A function for getting all candidates from the db
var getCandidates = function() {
  return $.ajax({
    url: "/api/candidates",
    method: "GET"
  });
};

// A function for getting all ballots from the db
var getBallots = function() {
  return $.ajax({
    url: "/api/ballots",
    method: "GET"
  });
};

// A function for saving a candidate to the db
var saveCandidate = function(candidate) {
  return $.ajax({
    url: "/api/candidates",
    data: candidate,
    method: "POST"
  });
};

// A function for saving a ballot to the db
var saveBallot = function(ballot) {
  return $.ajax({
    url: "/api/ballots",
    data: ballot,
    method: "POST"
  });
};

// A function for deleting a candidate from the db
var deleteCandidate = function(id) {
  return $.ajax({
    url: "/api/candidates/" + id,
    method: "DELETE"
  });
};

// A function for deleting a ballot from the db
var deleteBallot = function(id) {
  return $.ajax({
    url: "/api/ballots/" + id,
    method: "DELETE"
  });
};

// If there is an activeCandidate, display it, otherwise render empty inputs
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

// Get the candidate data from the inputs, save it to the db and update the view
var handleCandidateSave = function() {
  var newCandidate = {
    name: $newCandidateInput.val()
  };

  saveCandidate(newCandidate).then(function(data) {
    getAndRenderCandidates();
  });
};

// Delete the clicked candiddate
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

// Renders the list of candidate titles
var renderCandidateList = function(candidates) {
  $candidateList.empty();

  var candidateListItems = [];

  for (var i = 0; i < candidates.length; i++) {
    var candidate = candidates[i];

    console.log(candidates)
    localStorage.setItem("name" + i, candidate.name);

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

// Gets candidates from the db and renders them
var getAndRenderCandidates = function() {
  return getCandidates().then(function(data) {
    renderCandidateList(data);
  });
};

$newCandidate.on("click", handleCandidateSave);

$candidateList.on("click", ".list-group-item", handleCandidateView);

$candidateList.on("click", ".delete-note", handleCandidateDelete);

// Gets and renders the initial list of candidates
getAndRenderCandidates();

let url = '/api/candidates';

fetch(url)
.then(res => res.json())
.then((out) => {
  console.log('Checkout this JSON! ', out);
  console.log(out.length);
  var options = document.getElementById("firstChoice").querySelectorAll("option");
  var options2 = document.getElementById("secondChoice").querySelectorAll("option");
  var options3 = document.getElementById("thirdChoice").querySelectorAll("option");
  // console.log(options);

  for (i = 0; i < options.length; i++){
    if(options[i].value >= out.length){
      options[i].remove();
    }
  }

  for (i = 0; i < options2.length; i++){
    if(options2[i].value >= out.length){
      options2[i].remove();
    }
  }

  for (i = 0; i < options3.length; i++){
    if(options3[i].value >= out.length){
      options3[i].remove();
    }
  }

  for (i = 0; i < out.length; i++){
    if(options[i + 1].value == i){
      options[i + 1].innerText = out[i].name;
    }
  };

  var firstchoiceval = document.getElementById("firstChoice").value;
  var secondchoiceval = document.getElementById("secondChoice").value;
  var thirdchoiceval = document.getElementById("thirdChoice").value;

  document.getElementById("firstChoice").addEventListener("click", function(){

    for (i = 0; i < out.length; i++){
      if(options2[i + 1].value == i){
        options2[i + 1].innerText = out[i].name;
      }
    };

    for (i = 1; i < options2.length; i++){
      if (options2[i].value == firstchoiceval){
        options2[i].innerText = "No preference";
      }
    }

    document.getElementById("secondChoice").addEventListener("click", function(){
      for (i = 0; i < out.length; i++){
        if(options3[i + 1].value == i){
          options3[i + 1].innerText = out[i].name;
        }
      };
    
      for (i = 1; i < options3.length; i++){
        if (options3[i].value == firstchoiceval || options3[i].value == secondchoiceval){
          options3[i].innerText = "No preference";
        }
      }
    
    
    });

    document.getElementById("thirdChoice").addEventListener("click", function(){
      console.log(firstchoiceval + ", " + secondchoiceval + ", " + thirdchoiceval)
      })
})

if (document.getElementById("firstChoice").value == out[0].name){
  alert("yeah");
}

$("#100").on("click", function(){
  alert("yeah");
})

// $(document).ready(function(){
//   $("select#firstChoice").change(function(){
//       var selectedCandidate = $(this).children("option:selected").val();
//       console.log(selectedCandidate);
//   });
// });

$("#submit").on("click", function(){
  var cand1 = $("#firstChoice").children("option:selected").val();
  var cand2 = $("#secondChoice").children("option:selected").val();
  var cand3 = $("#thirdChoice").children("option:selected").val();

  var message;

  if (cand1 == "x" || cand1 == cand2 || cand1 == cand3 || cand2 == cand3){
    message = "INVALID BALLOT";
    console.log(message);
    saveBallot(ballot){
      
    }
  }
  else {
    message = cand1 + ", " + cand2 + ", " + cand3;
    console.log(message);
  };


});



})
.catch(err => { throw err });