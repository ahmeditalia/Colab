import React, { Component } from 'react';
import {BrowserRouter , Route , Switch} from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Session from "./components/session/Session";
import Header from "./components/header/Header";
import UserProfile from "./components/profile/UserProfile";
import requireAuth from "./components/authentication/requireAuth";
import notRequireAuth from "./components/authentication/notRequireAuth";
import ErrorPage from "./components/Error/ErrorPage";



class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/error" component={ErrorPage}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/profile" component={requireAuth(UserProfile)}/>
                    <Route path="/session" component={requireAuth(Session)}/>
                  {/*<Route path="/SessionM" component={SessionMaster}/>
                  <Route path="/SessionU" component={SessionUser}/>*/}
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
