import React, { Component } from 'react';
import './App.css';
import { ConnectedSearch } from './Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Movie Library</h1>
        </header>
        <ConnectedSearch />
      </div>
    );
  }
}

export default App;
