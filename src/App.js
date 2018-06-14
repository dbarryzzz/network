import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style/App.css';

import * as actions from './actions';
import * as constants from './constants';

import BigBoard from './components/BigBoard';
import StartGameForm from './components/StartGameForm';

class App extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Network Showdown!</h1>
        </header>
      {this.props.gameInfo.activeBoard === constants.START_BOARD && <StartGameForm startGame={this.props.startGame.bind(this)} /> }
      {this.props.gameInfo.activeBoard === constants.BIG_BOARD && <BigBoard /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return  {
      gameInfo: state.gameInfo,
  }
}

const mapDispatchToProps  = (dispatch) =>{
  return {
      startGame: (playerId, year, numOpponents) => dispatch(actions.initGame(playerId, year, numOpponents)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
