import React, {Component} from 'react';
import './App.scss';
import Main from '../routes.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo" alt="logo">
            NUReview
          </div>
          <Main />
        </header>
      </div>
    );
  }
}

export default App;
