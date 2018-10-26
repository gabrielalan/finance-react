import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">FinanceBeheer</Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/" exact>Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/transactions">Transactions</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/import">Import</NavLink></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
