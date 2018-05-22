import React, { Component } from 'react';
import './style/App.css';

import BigBoard from './components/BigBoard';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Network Showdown!</h1>
        </header>
        <BigBoard />
      </div>
    );
  }
}

export default App;
