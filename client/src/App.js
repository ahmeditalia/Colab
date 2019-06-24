import React, { Component } from 'react';
import {BrowserRouter , Route , Switch} from "react-router-dom";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Session from "./components/session/Session";
import Header from "./components/header/Header";
import UserProfile from "./components/profile/UserProfile";
import ErrorPage from "./components/Error/ErrorPage";
import MySessions from "./components/session/MySessions";


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/error" component={ErrorPage}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/profile" component={UserProfile}/>
                        <Route exact path="/mysessions" component={MySessions}/>
                        <Route exact path="/sessions/join/:sessionId" component={Session}/>
{/*
                        <Route exact path="/reports/:sessionId/grades-pdf"/>
*/}
                    </Switch>
                </div>
            </BrowserRouter>
    );
  }
}


export default App;
