import React, {Component} from 'react';
import './App.scss';
import './sliderOverrides.scss';
import Main from '../routes.js';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
