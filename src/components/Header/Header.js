import React from 'react';
import './header.scss';
import {Button} from 'semantic-ui-react';

class Header extends React.Component {
  logout() {
    localStorage.removeItem('nureviewtoken');
    window.location.reload();
  }

  render() {
    return (
      <header className="App-header">
        <div className="logo" alt="logo">
          <a href="/" className="unstyled-link">
            NUReview
          </a>
        </div>
        {this.props.isLoggedIn && (
          <Button onClick={this.logout} className="logout">
            Logout
          </Button>
        )}
      </header>
    );
  }
}

export default Header;
