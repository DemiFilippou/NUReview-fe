import React, {Component} from 'react';
import './App.scss';
import './sliderOverrides.scss';
import Main from '../routes.js';
import {Button} from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo" alt="logo">
            NUReview
          </div>
          {localStorage.nureviewtoken && (
            <Button onClick={this.logout} className="logout">
              Logout
            </Button>
          )}
        </header>
        <Main />
      </div>
    );
  }

  logout() {
    localStorage.removeItem('nureviewtoken');
    window.location.reload();
  }
}

export default App;
