// A function for saving a note to the db
var saveCandidate = function(candidate) {
    return $.ajax({
      url: "/api/candidates",
      data: candidate,
      method: "POST"
    });
  };
  