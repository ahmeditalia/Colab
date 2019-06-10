import React, { Component } from 'react';
import {BrowserRouter , Route , Switch} from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import SessionMaster from "./components/SessionMaster";
import SessionUser from "./components/SessionUser";
import Header from "./components/header/Header";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path="/dashboard" component={Dashboard}/>
                  <Route path="/:id" component={SessionUser}/>
                  {/*<Route path="/SessionM" component={SessionMaster}/>
                  <Route path="/SessionU" component={SessionUser}/>*/}
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
