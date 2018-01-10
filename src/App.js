import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { ConnectedSearch } from './Search';

function App({type}) {
    const componentMap = {
      HOME: ConnectedSearch
    };
    const View = componentMap[type];

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Movie Library</h1>
        </header>
        <View />
      </div>
    );
}

export default connect(function mapStateToProps(state) {
  return state.location;
}, 
(dispatch) => ({}))(App);
