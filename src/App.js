import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import Header from './components/stateless/Header';
import Home from './components/stateful/pages/home/Home';
import Transactions from './components/stateful/pages/transactions/Transactions';
import Import from './components/stateful/pages/import/Import';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Header />
          <div className="app__container mt-4">
            <Route exact path="/" component={Home} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/import" component={Import} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
