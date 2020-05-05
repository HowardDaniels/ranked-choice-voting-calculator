import React, { useRef } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";


// import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";

function BallotAdder(){
    const inputRef = useRef();
    var candArray = [];

    function addCandidate(newCandidate){
        newCandidate.preventDefault();

           newCandidate = {
                candidate: inputRef.current.value, 
            };

            candArray.push(newCandidate);
        console.log(candArray);
    
    fetch("/api/newCandidate", {
    method: "POST",
    body: candArray,
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.status === 200) {
      alert("Candidate Saved");
    } else {
      res.text().then(text => {
        if (text !== "Already added candidate") {
          text = "Failed to save the candidate, please try again -" + text;
        }
        console.log(text);
        alert(text);
      }).catch(err => { alert("Error saving the candidate please try again later."); });
    }
  }).catch(err => { alert("Error saving the candidate please try again later."); });
    }

    return(
    <div className="row" id="main-background">
            <div id="bio-para-box">
                <div className="para-head">
                    <strong>Ranked Choice Voting Calculator</strong>
                </div>
                <hr />
                <div className="text-wrap bd-highlight">
                    <form>
                        <h2>Add candidates</h2>
                        <input id="candidateName" ref={inputRef} /> <button onClick={addCandidate} >+</button>
                    </form>
                    
                    <form>
                      <h2>Add ballots</h2>
                    <input type="text" name="firstchoice" list="candidates" className="form-control" placeholder="Select a candidate's name from the list below." id="candidate" />
                         <datalist id="candidates">

                            </datalist>  
                    </form>
                        
                </div>
            </div>

        </div>

    );
}

export default BallotAdder;