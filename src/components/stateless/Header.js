import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">FinanceBeheer</Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/transactions">Transactions</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/import">Import</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
