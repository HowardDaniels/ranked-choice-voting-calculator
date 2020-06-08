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
  else if (sampleSpace[i].status == "valid" && sampleSpace[i].code.charAt(0) == "R"){
    r1 += sampleSpace[i].votes;
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
var round1vars = [a1, b1, c1, d1, e1, f1, g1, h1, i1, j1, k1, l1, m1, n1, o1, p1, q1, r1, s1, t1, u1, v1, w1, x1, y1, z1];

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

  var a2 = 0;   a2 += a1;
  var b2 = 0;   b2 += b1;
  var c2 = 0;   c2 += c1;
  var d2 = 0;   d2 += d1;
  var e2 = 0;   e2 += e1;
  var f2 = 0;   f2 += f1;
  var g2 = 0;   g2 += g1;
  var h2 = 0;   h2 += h1;
  var i2 = 0;   i2 += i1;
  var j2 = 0;   j2 += j1;
  var k2 = 0;   k2 += k1;
  var l2 = 0;   l2 += l1;
  var m2 = 0;   m2 += m1;
  var n2 = 0;   n2 += n1;
  var o2 = 0;   o2 += o1;
  var p2 = 0;   p2 += p1;
  var q2 = 0;   q2 += q1;
  var r2 = 0;   r2 += r1;
  var s2 = 0;   s2 += s1;
  var t2 = 0;   t2 += t1;
  var u2 = 0;   u2 += u1;
  var v2 = 0;   v2 += v1;
  var w2 = 0;   w2 += w1;
  var x2 = 0;   x2 += x1;
  var y2 = 0;   y2 += y1;
  var z2 = 0;   z2 += z1;

  var round2Array = [];
  var round2vars = [a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2, q2, r2, s2, t2, u2, v2, w2, x2, y2, z2];
  
  console.log(round2vars);

var round1ValidOnly = [];
for (i = 0; i < round1Array.length - 1; i++){
  round1ValidOnly.push(round1Array[i]);
}
 var eliminatedInRound1 = Math.min.apply(0, round1ValidOnly);
 console.log(eliminatedInRound1)

for (i = 0; i < out.length; i++){
  round2Array.push(round2vars[i]);
}

console.log(round2Array);

round2Array.push(z2);
console.log(z1);
console.log(z2);

 for (i = 0; i < round1Array.length; i++){
   if (round1Array[i] == eliminatedInRound1){
     round2Array[i] = 0;
     var eliminatedInRound1Letter = alphabet[i];
     for (j = 0; j < sampleSpace.length; j++){
       if (sampleSpace[j].status == "valid" && sampleSpace[j].code.charAt(0) == alphabet[i]){
         for (k = 0; k < round1Array.length; k++){
           if (sampleSpace[j].code.charAt(1) == alphabet[k]){
             round2Array[k] += sampleSpace[j].votes;
           }
         }
       }
    }
   }
 }

 console.log(round2Array);

 var round2Total = 0;

for (i = 0; i < round2Array.length - 1; i++){
  round2Total += round2Array[i];
}

console.log(round2Total);

 var toRound3 = 1;

for (i = 0; i < round2Array.length - 1; i++){
  if (round2Array[i]/round2Total > 0.5){
    toRound3 -= 1;
  }
}

if (toRound3 == 0){
  console.log("no more rounds");
}

else if (toRound3 == 1){

  var a3 = 0;   a3 += a2;
  var b3 = 0;   b3 += b2;
  var c3 = 0;   c3 += c2;
  var d3 = 0;   d3 += d2;
  var e3 = 0;   e3 += e2;
  var f3 = 0;   f3 += f2;
  var g3 = 0;   g3 += g2;
  var h3 = 0;   h3 += h2;
  var i3 = 0;   i3 += i2;
  var j3 = 0;   j3 += j2;
  var k3 = 0;   k3 += k2;
  var l3 = 0;   l3 += l2;
  var m3 = 0;   m3 += m2;
  var n3 = 0;   n3 += n2;
  var o3 = 0;   o3 += o2;
  var p3 = 0;   p3 += p2;
  var q3 = 0;   q3 += q2;
  var r3 = 0;   r3 += r2;
  var s3 = 0;   s3 += s2;
  var t3 = 0;   t3 += t2;
  var u3 = 0;   u3 += u2;
  var v3 = 0;   v3 += v2;
  var w3 = 0;   w3 += w2;
  var x3 = 0;   x3 += x2;
  var y3 = 0;   y3 += y2;
  var z3 = 0;   z3 += z2;

  var round3Array = [];
  var round3vars = [a3, b3, c3, d3, e3, f3, g3, h3, i3, j3, k3, l3, m3, n3, o3, p3, q3, r3, s3, t3, u3, v3, w3, x3, y3, z3];

  console.log(round3vars);

  var round2ValidOnly = [];
  for (i = 0; i < round2Array.length - 1; i++){
    round2ValidOnly.push(round2Array[i]);
  }
   var eliminatedInRound2 = Math.min.apply(0, round2ValidOnly);
   console.log(eliminatedInRound2)
  
  for (i = 0; i < out.length; i++){
    round3Array.push(round3vars[i]);
  }
  
  console.log(round3Array);
  
  round3Array.push(z3);
  
   for (i = 0; i < round2Array.length; i++){
     if (round2Array[i] == eliminatedInRound2){
       round3Array[i] = 0;
       var eliminatedInRound2Letter = alphabet[i];
       for (j = 0; j < sampleSpace.length; j++){
         if (sampleSpace[j].status == "valid" && sampleSpace[j].code.charAt(0) == alphabet[i]){
           for (k = 0; k < round2Array.length; k++){
             if (sampleSpace[j].code.charAt(1) == alphabet[k]){
               round3Array[k] += sampleSpace[j].votes;
             }
           }
         }
         else if (sampleSpace[j].status == "valid" && sampleSpace[j].code.charAt(0) == eliminatedInRound1Letter && sampleSpace[j].code.charAt(1) == alphabet[i]){
          for (k = 0; k < round2Array.length; k++){
            if (sampleSpace[j].code.charAt(2) == alphabet[k]){
              round3Array[k] += sampleSpace[j].votes;
            }
          }
        }
      }
     }
   }
  
   console.log(round3Array);
  
   var round3Total = 0;
  
  for (i = 0; i < round3Array.length - 1; i++){
    round3Total += round3Array[i];
  }
  
  console.log(round3Total);
  
   var toRound4 = 1;
  
  for (i = 0; i < round3Array.length - 1; i++){
    if (round3Array[i]/round3Total > 0.5){
      toRound4 -= 1;
    }
  }
  
  if (toRound4 == 0){
    console.log("no more rounds");
  }

  else if (toRound4 == 0){
    // ... //
  }

}

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