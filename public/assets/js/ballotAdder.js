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
  for (i = 0; i < out.length; i++){
    var option = document.createElement("OPTION");
    option.value = i;
    option.textContent = out[i].name;
    document.getElementById("firstChoice").appendChild(option);
    }

    for (i = 0; i < out.length; i++){
      var option = document.createElement("OPTION");
      option.value = i;
      option.textContent = out[i].name;
      document.getElementById("secondChoice").appendChild(option);
      }

      for (i = 0; i < out.length; i++){
        var option = document.createElement("OPTION");
        option.value = i;
        option.textContent = out[i].name;
        document.getElementById("thirdChoice").appendChild(option);
        }

        document.getElementById("submit").addEventListener("click", function(){
        var ballotFirst = document.getElementById("firstChoice").value;
        var ballotSecond = document.getElementById("secondChoice").value;
        var ballotThird = document.getElementById("thirdChoice").value;

        var fullBallot = {ballotFirst, ballotSecond, ballotThird};
        ballot = fullBallot;
        saveBallot(ballot);
      
        });

let url2 = '/api/ballots';

fetch (url2)
.then(res => res.json())
.then((out2) => {
  console.log(out2);

  var resultArray = [];
  var threeChoiceArray = [0, 0, 0];

  for (i = 0; i < out.length; i++){
    resultArray.push(threeChoiceArray);
  }

  console.log(resultArray);

 

  var firstRoundResults = [];
  for (i = 0; i < out; i++){
    // {out[i].name: 0}
  }
})


})
.catch(err => { throw err });
