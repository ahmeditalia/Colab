import React, { Component } from 'react';
import {USERNAME} from "../../store/dataMapping/user";
import {AxiosInstance as axios} from "axios";
import {Button, Nav, Row} from "react-bootstrap";
import {MDBIcon} from "mdbreact";


class SessionToolbar extends Component{

    run = ()=>{
        console.log("run function");
        this.props.socket.emit("save-file",this.state.editor,(data)=>{
            if(data) {
                axios.post("/lsp/run-task",{
                    sessionId: this.state.id,
                    username: localStorage.getItem(USERNAME),
                    taskId: 1
                },{headers: {'Authorization': "bearer " + localStorage.getItem('user')}})
                    .then((res)=> {
                        let grade = res.data.correct/(res.data.correct+res.data.wrong)*100;
                        this.setState({correct: res.data.correct, wrong:res.data.wrong, grade: grade})
                    })
                    .catch(()=> console.log("grade error"))
            }
        });
    };


    render() {
        return(
            <Row className={"sessionBar"}>
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                        <span className="custom-dropdown small">
                            <select placeholder={"Font Size"}>
                                <option>10</option>
                                <option>12</option>
                                <option>14</option>
                                <option>16</option>
                                <option>18</option>
                            </select>
                        </span>
                    </Nav.Item>
                    <Nav.Item>
                        <span className="custom-dropdown small">
                            <select placeholder={"Them"}>
                                <option>tomorrow</option>
                                <option>github</option>
                                <option>monokai</option>
                                <option>terminal</option>
                            </select>
                        </span>
                    </Nav.Item>
                    <Nav.Item>
                        <Button size={"sm"} variant={"outline-success"}><MDBIcon icon="tasks" />{" Tasks"}</Button>
                    </Nav.Item>
                    <Nav.Item>
                        <Button onClick={this.run} size={"sm"} variant={"outline-success"}><MDBIcon icon="play" />{" Run"}</Button>
                    </Nav.Item>
                </Nav>
            </Row>
        );
    }
}

export default SessionToolbar;