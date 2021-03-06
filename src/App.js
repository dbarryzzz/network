import React, { Component } from 'react';
import { connect } from 'react-redux';

import './style/App.css';

import * as actions from './actions';
import * as constants from './constants';

import BigBoard from './components/BigBoard';
import SeriesBoard from './components/SeriesBoard';
import StartGameForm from './components/StartGameForm';
// import GameInfoCard from './components/GameInfoCard';
import MainMenu from './components/MainMenu';


class App extends Component {

  componentDidMount(){
    this.props.init();
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Network Showdown!</h1>
        </header>

        <MainMenu activeBoard={this.props.gameInfo.activeBoard} updateFunction={this.props.updateBoard.bind(this)} /> 

        {/* {this.props.gameInfo.activeBoard === constants.START_BOARD && 
          <StartGameForm startGame={this.props.startGame.bind(this)} /> } */}

        {this.props.gameInfo.activeBoard === constants.BIG_BOARD && <BigBoard /> }
        {this.props.gameInfo.activeBoard === constants.SERIES_BOARD && <SeriesBoard /> }
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
      init: () => dispatch(actions.initGame()),
      startGame: (playerId, year, numOpponents) => dispatch(actions.initGame(playerId, year, numOpponents)),
      updateBoard: (newBoard) => dispatch(actions.updateBoard(newBoard)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
