import React, { Component } from 'react';
import {BrowserRouter , Route} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SessionMaster from "./components/SessionMaster";
import SessionUser from "./components/SessionUser";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="dark">
          <Route exact path="/" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/SessionM" component={SessionMaster}/>
          <Route path="/SessionU" component={SessionUser}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
