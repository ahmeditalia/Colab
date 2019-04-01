import React, { Component } from 'react';
import {Col, Navbar, Row, Dropdown, Form, Button} from 'react-bootstrap';
import Image from "react-bootstrap/Image";
import logo from "../images/logo_icon.png";
import dropDown from "../images/dropdown.png";
import user from "../images/user.png";
import SessionLayout from "./SessionLayout";
import TaskCreationForm from "./TaskCreationForm";


class SessionMaster extends Component{

    state = {
        taskShow: false
    };

    closeTask = () => this.setState({ taskShow: false });
    openTask = () => this.setState({ taskShow: true });

    render() {
        return(
            <div style={{color:'white'}}>
                <TaskCreationForm
                    show={this.state.taskShow}
                    onHide={this.closeTask}
                />
                <Navbar style={{backgroundColor:"#43b581",height:103}} sticky="top">
                    <Col sm={{ span: 2, offset: 1 }} style={{marginLeft:112,marginTop:10}}>
                        <Row>
                            <Image src={logo} width={40} height={40}></Image>
                            <h1 style={{marginLeft:5,fontFamily: "lucida handwriting"}}>Colab</h1>
                        </Row>
                    </Col>
                    <Col sm={{ span: 3, offset: 5}}>
                        <Row style={{justifyContent:"flex-end"}}>
                            <Dropdown>
                                <Dropdown.Toggle style={{backgroundColor:"#43b581",border:0}} variant={"success"}>
                                    <Image src={dropDown} width={25} height={25} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Create Session</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">My Sessions</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Log Out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Image style={{marginLeft:10,marginTop:6}} src={user} width={25} height={25}/>
                            <h5 style={{marginLeft:10,marginTop:6}}>Mourad</h5>
                        </Row>
                    </Col>
                </Navbar>
                <Row style={{width:"100%",height:"100%",marginTop:30}}>
                    <Col sm={8}>
                        <SessionLayout openTask={this.openTask} taskButtonValue={"Add Task"} rooms={["Master","Mourad","Ahmed","Youssuf","Abd El-Rahman","Hdrmi"]}/>
                    </Col>
                    <Col sm={4}>
                        <Button variant={"outline-info"} style={{marginBottom:10}}>Clear</Button>
                        <Form.Control as={"textarea"} rows={19} style={{resize: "none"}}  placeholder={"Output ..."} /*onInput={this.send}*/></Form.Control>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default SessionMaster;