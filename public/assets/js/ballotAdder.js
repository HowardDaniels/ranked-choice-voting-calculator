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

var renderBallotList = function(ballots) {
  // $candidateList.empty();

  var ballotListItems = [];

  for (var i = 0; i < ballots.length; i++) {
    var ballot = ballots[i];
    localStorage.setItem("name" + i, ballot.name);
    ballotListItems.push(ballots[i]);
    // var $li = $("<li class='list-group-item'>").data(candidate);
    // var $span = $("<span>").text(candidate.name);
    // var $delBtn = $(
    //   "<button class='delete-note'>Delete</button>"
    // );

    // $li.append($span, $delBtn);
    // candidateListItems.push($li);
  }

var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var sampleSpace = [];

for(i = 0; i < alphabet.length; i++){
  for(j = 0; j < alphabet.length; j++){
    for(k = 0; k < alphabet.length; k++){
      if ((i < out.length || i == 25) && (j < out.length || j == 25) && (k < out.length || k == 25)){
        sampleSpace.push({
          code: alphabet[i] + alphabet[j] + alphabet[k],
          votes: 0,
          status: ""
        });
      }
    }
  }
}

for (i = 0; i < sampleSpace.length; i++){
  if ((sampleSpace[i].code).charAt(0) == "Z"){
    sampleSpace[i].status = "invalid";
  }
  if((sampleSpace[i].code).charAt(0) == (sampleSpace[i].code).charAt(1)){
      sampleSpace[i].status = "invalid";
  }
  if((sampleSpace[i].code).charAt(0) == (sampleSpace[i].code).charAt(2)){
    sampleSpace[i].status = "invalid";
}
if((sampleSpace[i].code).charAt(1) == (sampleSpace[i].code).charAt(2) && (sampleSpace[i].code).charAt(1) !== "Z" && (sampleSpace[i].code).charAt(2) !== "Z"){
  sampleSpace[i].status = "invalid";
}
if((sampleSpace[i].code).charAt(1) == "Z" && (sampleSpace[i].code).charAt(2) !== "Z"){
  sampleSpace[i].status = "invalid";
}
// else{
//   sampleSpace[i].status = "valid";
// }
if (sampleSpace[i].status == ""){
  sampleSpace[i].status = "valid";
}
  
}

for (i = 0; i < ballots.length; i++){
  if (ballots[i].firstChoice == "NaN"){
    ballots[i].firstChoice = 25;
  }
  if (ballots[i].secondChoice == "NaN"){
    ballots[i].secondChoice = 25;
  }
  if (ballots[i].thirdChoice == "NaN"){
    ballots[i].thirdChoice = 25;
  }
}

for (i = 0; i < sampleSpace.length; i++){
  for (j = 0; j < ballots.length; j++){

    if (((sampleSpace[i].code).charAt(0) == alphabet[ballots[j].firstChoice]) && ((sampleSpace[i].code).charAt(1) == alphabet[ballots[j].secondChoice]) && ((sampleSpace[i].code).charAt(2) == alphabet[ballots[j].thirdChoice])){
      sampleSpace[i].votes += 1;
    }
  }
}

console.log(sampleSpace)

  console.log(ballotListItems);

  var firstRound = [];
  var firstRoundTotal = 0;

  for (i = 0; i < out.length; i++){
    var addVotes = 0;
    for (j = 0; j < sampleSpace.length; j++){
      if (sampleSpace[j].status == "valid" && (sampleSpace[j].code).charAt(0) == alphabet[i]){
        addVotes += sampleSpace[j].votes;
      }
    }
    firstRound.push({
      name: out[i].name,
      votes: addVotes
    })
    firstRoundTotal += addVotes;
  }

console.log(firstRound)
console.log(firstRoundTotal);

var potentialRounds = out.length - 1;
console.log(potentialRounds);

var resultsArray = [];

var candidatesPlusInvalid = []

for (i = 0; i < out.length; i++){
  candidatesPlusInvalid.push({
    letter: alphabet[i],
    ballots: [],
    total: 0
  });
}

candidatesPlusInvalid.push({
  letter: "Z",
ballots: [],
total: 0
});

for (i = 0; i < potentialRounds; i++){
 
  resultsArray.push({
    round: i + 1,
    candidates: candidatesPlusInvalid
  })

}

console.log(resultsArray);

var a1 = 0;
var b1 = 0;
var c1 = 0;
var d1 = 0;
var e1 = 0;
var f1 = 0;
var g1 = 0;
var h1 = 0;
var i1 = 0;
var j1 = 0;
var k1 = 0;
var l1 = 0;
var m1 = 0;
var n1 = 0;
var o1 = 0;
var p1 = 0;
var q1 = 0;
var r1 = 0;
var s1 = 0;
var t1 = 0;
var u1 = 0;
var v1 = 0;
var w1 = 0;
var x1 = 0;
var y1 = 0;
var z1 = 0;

for (i = 0; i < sampleSpace.length; i++){
  if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "A"){
    a1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "B"){
    b1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "C"){
    c1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "D"){
    d1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "E"){
    e1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "F"){
    f1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "G"){
    g1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "H"){
    h1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "I"){
    i1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "J"){
    j1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "K"){
    k1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "L"){
    l1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "M"){
    m1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "N"){
    n1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "O"){
    o1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "P"){
    p1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "Q"){
    q1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "S"){
    s1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "T"){
    t1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "U"){
    u1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "V"){
    v1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "W"){
    w1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "X"){
    x1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "Y"){
    y1 += sampleSpace[i].votes;
  }
  else if (sampleSpace[i].status == "invalid"){
    z1 += sampleSpace[i].votes;
  }
}

var round1Array = [];
var round1vars = [a1, b1, c1, d1, e1, f1, g1, h1, j1, k1, l1, m1, n1, o1, p1, q1, r1, s1, t1, u1, v1, w1, x1, y1, z1];

for (i = 0; i < out.length; i++){
  round1Array.push(round1vars[i]);
}

round1Array.push(z1);

console.log(round1Array);

var round1Total = 0;

for (i = 0; i < round1Array.length - 1; i++){
  round1Total += round1Array[i];
}

console.log(round1Total);

var toRound2 = 1;

for (i = 0; i < round1Array.length - 1; i++){
  if (round1Array[i]/round1Total > 0.5){
    toRound2 -= 1;
  }
}

if (toRound2 == 0){
  console.log("no more rounds");
}

else if (toRound2 == 1){

  var a2 = 0;
  var b2 = 0;
  var c2 = 0;
  var d2 = 0;
  var e2 = 0;
  var f2 = 0;
  var g2 = 0;
  var h2 = 0;
  var i2 = 0;
  var j2 = 0;
  var k2 = 0;
  var l2 = 0;
  var m2 = 0;
  var n2 = 0;
  var o2 = 0;
  var p2 = 0;
  var q2 = 0;
  var r2 = 0;
  var s2 = 0;
  var t2 = 0;
  var u2 = 0;
  var v2 = 0;
  var w2 = 0;
  var x2 = 0;
  var y2 = 0;
  var z2 = 0;

  var round2Array = [];
  var round2vars = [a2, b2, c2, d2, e2, f2, g2, h2, j2, k2, l2, m2, n2, o2, p2, q2, r2, s2, t2, u2, v2, w2, x2, y2, z2];

 var eliminatedInRound1 = Math.min.apply(0, round1Array);

//  for (i = 0; i < round1Array.length; i++){
//    if (round1Array[i] == eliminatedInRound1){
//      round2Array[i] = 0;
//    }
//  }
 console.log(round2Array);
}

// absolute Mehrheit? 
// wenn nein:
// Mindestzahl finden
// Mindestzahl mit 0 ersetzen
// zweite Preferenzen vom Verlierer finden
// Stimmen an die jeweiligen anderen Kandidaten verteilen

// [AZZ, BZZ, CZZ, ABZ, ACZ, BAZ, BCZ, CAZ, CBZ, ABC, ACB, BAC, BCA, CAB, CBA]

// A: [AZZ, ABZ, ACZ, ABC, ACB]
// B: [BZZ, BAZ, BCZ, BAC, BCA]
// C: [CZZ, CAZ, CBZ, CAB, CBA] {eliminated}

// for (i = 0; i < carray.length; i++){
// for (j = 0; j < dividedSampleSpace.length; j++){
// if (carray[i].code.charAt(1) == dividedSampleSpace[j].letter){
// remove carray [i];
// dividedSampleSpace[j].codes.append(carray[i]);
// }
// }
// }

// A: [AZZ, ABZ, ACZ, ABC, ACB, CAZ, CAB]
// B: [BZZ, BAZ, BCZ, BAC, BCA, CBZ, CBA]

function nextRound(){
  // determine if first round or subsequent round just finished
  var voteList = [];
for (i = 0; i < out.length; i++){
  if (out[i].votes == Math.min.apply(min, voteList)){
var eliminated = out[i];    
  }
}
out[eliminated].votes = 0;
}

// var firstPref = [];

// for (i = 0; i < out.length; i++){
//   firstPref.push({
//     name: i,
//     ballots: []
//   });
// }

// // console.log(firstPref);

// for (i = 0; i < out.length; i++){
//   var array = [];
//   for (j = 0; j < ballots.length; j++){
//     if (ballots[j].firstChoice == i){
//       array.push(j);
//       firstPref[i].ballots = array;
//     }
//   }
// }

// console.log(firstPref);

// var secondPref = [];

// for (i = 0; i < out.length; i++){
//   secondPref.push({
//     name: i,
//     ballots: []
//   });
// }

// // console.log(secondPref);

// for (i = 0; i < out.length; i++){
//   var array = [];
//   for (j = 0; j < ballots.length; j++){
//     if (ballots[j].secondChoice == i){
//       array.push(j);
//       secondPref[i].ballots = array;
//     }
//   }
// }

// console.log(secondPref);

// var thirdPref = [];

// for (i = 0; i < out.length; i++){
//   thirdPref.push({
//     name: i,
//     ballots: []
//   });
// }

// // console.log(secondPref);

// for (i = 0; i < out.length; i++){
//   var array = [];
//   for (j = 0; j < ballots.length; j++){
//     if (ballots[j].thirdChoice == i){
//       array.push(j);
//       thirdPref[i].ballots = array;
//     }
//   }
// }

// console.log(thirdPref);

// var results1 = [];
// var results2 = [];

// var total1 = 0;
// var total2 = 0;

// for (i = 0; i < out.length; i++){
//   total1 += firstPref[i].ballots.length;
// }

// for (i = 0; i < out.length; i++){
//   results1.push({
//     name: out[i].name,
//     votes: firstPref[i].ballots.length,
//     percent: (firstPref[i].ballots.length * 100)/total1
//   });
// }

// console.log(results1);

// var nextRoundNeeded = 0;

// for (i = 0; i < results1.length; i++){
//   if (results1[i].percent > 50){
//   console.log("Winner: " + results1[i].name);
//   }
//   else{
//     nextRoundNeeded += 1;
//   }

// }

// if (nextRoundNeeded == results1.length){
//   console.log("Next round needed");
//   var arrayforElimination = [];
//   for (i = 0; i < results1.length; i++){
//     arrayforElimination.push(results1[i].percent);
//   }
//   console.log(Math.min.apply(Math, arrayforElimination));
//   var eliminatedCandidate1;
//   for (i = 0; i < results1.length; i++){
//     if (results1[i].percent == Math.min.apply(Math, arrayforElimination)){
//       eliminatedCandidate1 = results1[i].name;
//       console.log(eliminatedCandidate1);
//     }
//   }
 
// }

// const arraynum = [2, 5, 9];

// console.log(arraynum);

// const index = arraynum.indexOf(5);
// if (index > -1) {
//   arraynum.splice(index, 1);
// }

// // array = [2, 9]
// console.log(arraynum); 

  // $candidateList.append(candidateListItems);
};

// Gets candidates from the db and renders them
var getAndRenderBallots = function() {
  return getBallots().then(function(data) {
    renderBallotList(data);
  });
};

getAndRenderBallots();

$("#submit").on("click", function(){
  var cand1 = parseInt($("#firstChoice").children("option:selected").val());
  var cand2 = parseInt($("#secondChoice").children("option:selected").val());
  var cand3 = parseInt($("#thirdChoice").children("option:selected").val());

  var message;

  var ballot = {
    firstChoice: cand1,
    secondChoice: cand2,
    thirdChoice: cand3
  }

  if (cand1 == "x" || cand1 == cand2 || cand1 == cand3 || cand2 == cand3){
    message = "INVALID BALLOT";
    console.log(message);
  }
  else {
    message = cand1 + ", " + cand2 + ", " + cand3;
    console.log(message);
    saveBallot(ballot);
    console.log(ballot);
    // tallyVotes();
    getAndRenderBallots();
    console.log(`${out[0].name}: `)
    console.log(ballot[0] + ", " + ballot[1])
    // deleteBallot(ballot[0])
  };

});



})
.catch(err => { throw err });