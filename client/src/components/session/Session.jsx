import React, { Component } from 'react';
import {Button, Nav, Form, ProgressBar} from 'react-bootstrap';
import SessionLayout from "./SessionLayout";
import TaskForm from "../TaskForm";
import SessionPanel from "./SessionPanel";
import python from "../session/python.jpg";
import {MDBIcon} from "mdbreact";
import requireAuth from "../authentication/requireAuth";
import {connect} from "react-redux";
import {joinSession} from "../../store/actions/sessionActions/joinSessionAction";
import {DISCONNECT_FROM_SESSION_SOCKET, SESSION_SOCKET} from "../../store/dataMapping/socket";
import {GET_PROFILE_PIC} from "../../store/dataMapping/serverURLs";
import {SESSION_CONNECTED_USERS} from "../../store/dataMapping/session";
import axios from "axios";
import {USERNAME} from "../../store/dataMapping/user";



class Session extends Component{


    state = {
        id: this.props.match.params.sessionId,
        taskShow: false,
        loaded: false,
        editor: "",
        correct: 0,
        wrong: 0,
        grade: 0

    };

    handler = (e)=>{
        console.log(e);
        this.setState({editor:e});
    };

    componentDidMount() {
        this.props.joinSession(this.state.id,()=>{
           this.setState({loaded:true});

        });
    }


    componentWillUnmount() {
        this.setState({loaded: true});
        this.props.disconnect();
    }


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
        if(!this.state.loaded){
            return <h2>Loading...</h2>
        }
        else return(
            <div>
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                        <ProgressBar now={this.state.grade} label={this.state.grade+"%"} variant={"success"} style={{width:100,fontSize:12}}/>
                    </Nav.Item>
                    <Nav.Item>
                        <span className="custom-dropdown small">
                            <select>
                                <option>tomorrow</option>
                                <option>github</option>
                            </select>
                        </span>
                    </Nav.Item>
                    <Nav.Item>
                        <span className="custom-dropdown small">
                            <select>
                                <option>tomorrow</option>
                                <option>github</option>
                            </select>
                        </span>
                    </Nav.Item>
                    <Nav.Item>
                       <span className="custom-dropdown small">
                            <select>
                                <option>tomorrow</option>
                                <option>github</option>
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
            <div className={"wrapper"} style={{color:'white'}}>


                <SessionPanel />
                <SessionLayout handler={this.handler} taskButtonValue={"Task"} rooms={["Master","Mourad"]}/>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (combinedReducer)=> {
    return {
        socket: combinedReducer.sockets[SESSION_SOCKET]
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        joinSession: (id,callback)=> dispatch(joinSession(id,callback)),
        updateSessionUsers: (users)=> dispatch({type: SESSION_CONNECTED_USERS , payload: users}),
        disconnect: ()=> dispatch({type: DISCONNECT_FROM_SESSION_SOCKET})
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(requireAuth(Session));