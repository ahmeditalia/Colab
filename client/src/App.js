import React, { Component } from 'react';
import {BrowserRouter , Route} from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import SessionMaster from "./components/SessionMaster";
import SessionUser from "./components/SessionUser";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/SessionM" component={SessionMaster}/>
          <Route path="/SessionU" component={SessionUser}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
