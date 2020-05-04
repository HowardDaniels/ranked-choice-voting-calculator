import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Wrapper from "./components/Wrapper";
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import BallotAdder from './pages/BallotAdder';
import Footer from './components/Footer';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// Comment

function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <Wrapper>
          <Route exact path="/" component={Home} />
          <Route exact path="/simulator" component={Simulator} />
          <Route exact path="/ballotadder" component={BallotAdder} />
        </Wrapper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;