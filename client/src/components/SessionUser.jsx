import React, { Component } from 'react';
import {Col, Navbar, Row, Dropdown, Form, Button} from 'react-bootstrap';
import Image from "react-bootstrap/Image";
import logo from "../images/logo_icon.png";
import dropDown from "../images/dropdown.png";
import user from "../images/user.png";
import SessionLayout from "./SessionLayout";
import TaskForm from "./TaskForm";
import Header from "./header/Header";


class SessionUser extends Component{

    state = {
        taskShow: false
    };

    closeTask = () => this.setState({ taskShow: false });
    openTask = () => this.setState({ taskShow: true });

    render() {
        return(
            <div style={{color:'white'}}>
                <TaskForm
                    show={this.state.taskShow}
                    onHide={this.closeTask}
                />
                <Header login={false} barOption={false}/>
                <Row style={{width:"100%",height:"100%",marginTop:30}}>
                    <SessionLayout openTask={this.openTask} taskButtonValue={"Task"} rooms={["Master","Mourad"]}/>
                </Row>

            </div>
        );
    }
}


export default SessionUser;