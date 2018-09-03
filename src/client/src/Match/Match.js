import React, { Component } from "react";
import "./Match.css";
import {
  getThisWeek
} from "../../api";


// TODO:
// Functions for:
// Team Logo
// Team Records
// Date of Match
// League Logo(TBD)
class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: [
        {
          time: 'none',
          teams: [
          {icon: './img/tsm'},
          {icon: './img/tsm'}
          ]}
      ]
    };
  }

  async componentWillMount() {
    const games = await getThisWeek();
    let game_data = JSON.parse(games.request.response);
    console.log(game_data);
    this.setState({
      dates: game_data
    });
  }

  render() {
    console.log('dernder');

    return (
        <div>
        {this.state.dates.map((date, i) => {
          console.log(date);
          return (
            <div className="Match">
              {date.time}
              <div id="wrapper" className="top">
                <div>
                  <img className="team-icon" src={date.teams[0].icon}/>
                </div>
                <div className="vs">
                  VS
                </div>
                <div>
                  <img className="team-icon" src={date.teams[1].icon}/>
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
          )})}
      </div>
    );
  }
}

export default Match;
