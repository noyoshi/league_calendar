import React, { Component } from "react";
import "./Match.css";

// TODO:
// Functions for:
// Team Logo
// Team Records
// Date of Match
// League Logo(TBD)
class Match extends Component {
  render() {
    return (
      <div className="Match">
        <div id="wrapper" className="top">
          <div>
            <img className="team-icon" src="./img/tsm.png"/>
          </div>
          <div className="vs">
            VS
          </div>
          <div>
            <img className="team-icon" src="./img/tsm.png"/>
          </div>
        </div>
        <div id="wrapper" className="bottom">
          <div>
            <i>Record 1</i>
          </div>
          <div>
          </div>
          <div>
            <i>Record 2</i>
          </div>
        </div>
      </div>
    );
  }
}

export default Match;
