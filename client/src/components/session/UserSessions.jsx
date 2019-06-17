import React, {Component} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import MySessions from "./MySessions";

export default class UserSessions extends Component {

    userSessions = [
        {
            sessionId:"1",
            sessionName:"Java",
            description:"description description description description description description description description ",
            hidden: "Private",
            owner: "Master",
            joinUrl: "#"
        },
        {
            sessionId:"2",
            sessionName:"C++",
            description:"description description description description description description description description ",
            hidden: "Private",
            owner: "Master",
            joinUrl: "#"
        },
        {
            sessionId:"3",
            sessionName:"Python",
            description:"description description description description description description description description ",
            hidden: "Private",
            owner: "Master",
            joinUrl: "#"
        },
        {
            sessionId:"4",
            sessionName:"C#",
            description:"description description description description description description description description ",
            hidden: "Private",
            owner: "Master",
            joinUrl: "#"
        },
        {
            sessionId:"1",
            sessionName:"Java",
            description:"description description description description description description description description ",
            hidden: "Private",
            owner: "Master",
            joinUrl: "#"
        },
        {
            sessionId:"2",
            sessionName:"C++",
            description:"description description description description description description description description ",
            hidden: "Private",
            owner: "Master",
            joinUrl: "#"
        },
        {
            sessionId:"3",
            sessionName:"Python",
            description:"description description description description description description description description ",
            hidden: "Private",
            owner: "Master",
            joinUrl: "#"
        },
        {
            sessionId:"4",
            sessionName:"C#",
            description:"description description description description description description description description ",
            hidden: "Private",
            owner: "Master",
            joinUrl: "#"
        },
        {
            sessionId:"1",
            sessionName:"Java",
            description:"description description description description description description description description ",
            hidden: "Private",
            owner: "Master",
            joinUrl: "#"
        },
        {
            sessionId:"2",
            sessionName:"C++",
            description:"description description description description description description description description ",
            hidden: "Private",
            owner: "Master",
            joinUrl: "#"
        },
        {
            sessionId:"3",
            sessionName:"Python",
            description:"description description description description description description description description ",
            hidden: "Private",
            owner: "Master",
            joinUrl: "#"
        },
        {
            sessionId:"4",
            sessionName:"C#",
            description:"description description description description description description description description ",
            hidden: "Private",
            owner: "Master",
            joinUrl: "#"
        },
    ];

    render() {
        return (
            <Tabs id="controlled-tab-example">
                <Tab eventKey="mySessions" title="MySessions">
                    <MySessions data = {this.userSessions}/>
                </Tab>
            </Tabs>
        );
    }
}