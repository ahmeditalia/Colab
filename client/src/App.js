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
import MySessions from "./components/session/MySessions";
import Notifications from "./components/session/Notifications";


/*"proxy": "http://41.232.243.173:4213",*/

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
                    <Route path="/profile" component={UserProfile}/>
                    <Route path="/mysessions" component={MySessions}/>
                    <Route path="/notifications" component={Notifications}/>
                    <Route path="/session" component={Session}/>
                  {/*<Route path="/SessionM" component={SessionMaster}/>
                  <Route path="/SessionU" component={SessionUser}/>*/}
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
