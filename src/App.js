import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const helloWorld = {
      message: 'hello there',
      firstName: 'steve',
      lastName: 'benedict'
    };
    return (
      <div className="App">
        <h2>{helloWorld.message}, {helloWorld.firstName} {helloWorld.lastName}</h2>
      </div>
    );
  }
}

export default App;
