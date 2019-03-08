import React from 'react';
import './no-match.scss';
import {Link} from 'react-router-dom';

class NoMatch extends React.Component {
  render() {
    return (
      <div className="no-match">
        <i className="far fa-dizzy" />
        <h1>Oops</h1>
        <p>We can't seem to find that page...</p>
        <Link to="/">Try searching for a company</Link>
      </div>
    );
  }
}

export default NoMatch;
