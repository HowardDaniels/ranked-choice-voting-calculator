// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var connection = require("../config/connection.js");

// Routes
// =============================================================
module.exports = function(app) {
  // Get all candidates
  app.get("/api/all", function(req, res) {
    var dbQuery = "SELECT * FROM results";

    connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  // Add a candidate
  app.post("/api/newCandidate", function(req, res) {
    console.log("Candidate Data:");
    console.log(req.body);

    var dbQuery = "INSERT INTO results (candidate) VALUES (?)";

    connection.query(dbQuery, [req.body.candidate], function(err, result) {
      if (err) throw err;
      console.log("Candidate Successfully Saved!");
      res.end();
    });
  });

  // Add a ballot
  app.post("/api/newBallot", function(req, res) {
    console.log("Ballot Data:");
    console.log(req.body);

    var dbQuery = "INSERT INTO ballots (first_choice, second_choice, third_choice, votes VALUES (?,?,?,?)";

    connection.query(dbQuery, [req.body.first_choice, req.body.second_choice, req.body.third_choice, req.body.votes],  function(err, result) {
      if (err) throw err;
      console.log("Candidate Successfully Saved!");
      res.end();
    });
  });
};