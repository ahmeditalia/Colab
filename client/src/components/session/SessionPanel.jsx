import React, { Component } from 'react';
import {Accordion, Card, Col, Form, ProgressBar, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import {SESSION_SOCKET} from "../../store/dataMapping/socket";
import {GET_PROFILE_PIC} from "../../store/dataMapping/serverURLs";
import {SESSION_CONNECTED_USERS, SESSION_USER_ROLE} from "../../store/dataMapping/session";
import {USERNAME} from "../../store/dataMapping/user";
import {MY_ROLE} from "../../store/dataMapping/sessionUsersData";

class SessionPanel extends Component{


    componentDidMount() {
        console.log("we came here");
        const {socket} = this.props;

        socket.on("current-users",(users, role ,callback)=>{
            this.props.setMyRole(role, ()=>{
                this.setState({[SESSION_CONNECTED_USERS]: this.state[SESSION_CONNECTED_USERS].concat(users)});
                callback();
            });
        });

        socket.on("user-joined",(user)=>{
            if(this.state[SESSION_CONNECTED_USERS].some( item => item[USERNAME] === user[USERNAME] )) {
                console.log("enable it"); ////////////////////////////////////////////////////
            }else {
                this.setState({[SESSION_CONNECTED_USERS]: [...this.state[SESSION_CONNECTED_USERS],user]});
            }
        });

        socket.on("user-left",(user)=>{

        });
    }


    watchUser = (e)=>{
        console.log(e.currentTarget.id);
        const {socket} = this.props;
        socket.emit("watch-user", e.currentTarget.id);

    };

    changePermission = (e)=>{

    };

    ownerComponent = (data)=>{
        return (
            <Card>
                <Row style={{height: 50, marginTop: 4, borderBottom:"1px solid #dcdcdc"}}>
                    <Col md={{span:2,offset:1}}>
                        <Accordion.Toggle variant={"link"} className={"user"} eventKey="0"/>
                    </Col>
                    <div className={"mydiv"}>
                        <a id={data[USERNAME]} onClick={this.watchUser} className={"parent"}>
                            <img className="eimage" src={ GET_PROFILE_PIC+data[USERNAME] }/>
                            <div className="ename">{data[USERNAME]}</div>
                            <div className="ejob">{data[SESSION_USER_ROLE]}</div>
                        </a>
                    </div>
                </Row>
                <Accordion.Collapse eventKey="0">
                    <Form.Group className={"formGroup"}>
                        <Form.Check className={"formGroupItem"} custom={true} value={"owner"}
                                    id ={"owner"} type="radio" label="Owner" name={data[USERNAME]}
                                    defaultChecked={data[SESSION_USER_ROLE] === "owner"}/>
                        <Form.Check className={"formGroupItem"} custom={true} value={"mod"}
                                    id ={"mod"} type="radio" label="Moderator" name={data[USERNAME]}
                                    defaultChecked={data[SESSION_USER_ROLE] === "mod"}/>
                        <Form.Check className={"formGroupItem"} custom={true} value={"ghost"}
                                    id ={"ghost"} type="radio" label="Ghost" name={data[USERNAME]}
                                    defaultChecked={data[SESSION_USER_ROLE] === "ghost"}/>
                    </Form.Group>
                </Accordion.Collapse>
            </Card>
        );
    };
    ghostComponent = (data)=> {
        return(
            <Card>
                <Row style={{height: 50, marginTop: 4, borderBottom:"1px solid #dcdcdc"}}>
                    <Col md={{span:2,offset:1}}>
                        <Accordion.Toggle variant={"link"} className={"user"} eventKey="0"/>
                    </Col>
                    <div className={"mydiv"}>
                        <a id={data[USERNAME]} onClick={this.watchUser} className={"parent"}>
                            <img className="eimage" src={ GET_PROFILE_PIC+data[USERNAME] }/>
                            <div className="ename">{data[USERNAME]}</div>
                            <div className="ejob">{data[SESSION_USER_ROLE]}</div>
                            <div className={"progressbarDiv"}>
                                <ProgressBar className={"progressbar"} now={100} label={100+"%"} variant={"success"}/>
                            </div>
                        </a>
                    </div>
                </Row>
            </Card>
        );
    };


    state =  {
        [SESSION_CONNECTED_USERS]: []
    };

    changeClass = (e)=>{
        e.target.className = e.target.className+" toggled";
        console.log(e.target.className);
    };

    render() {
        return(
            <Col xs={3}>
                <div className={"panelSection"}>
                    <Card.Header as={"h4"}> Users </Card.Header>
{/*
                    <AutoCompleteComponent id="atcelement" placeholder="  Invite others" highlight={true} />
*/}

                    <Accordion>
                        {this.state[SESSION_CONNECTED_USERS].length > 0 && this.state[SESSION_CONNECTED_USERS].map((user)=>{
                            console.log("fk u");
                            console.log(user);
                            return user[SESSION_USER_ROLE] === "ghost"? this.ghostComponent(user): this.ownerComponent(user);
                        })}
                    </Accordion>
                </div>
            </Col>
        );
    }
}
const mapStateToProps = (combinedReducer)=> {
    return {
        socket: combinedReducer.sockets[SESSION_SOCKET],
        [MY_ROLE]: combinedReducer.sessionData[MY_ROLE]
    }
};
const mapDispatchToProps = (dispatch)=>{
    return {
        updateSessionUsers: (users)=> dispatch({type: SESSION_CONNECTED_USERS , payload: users}),
        setMyRole: (role,callback) => {
            dispatch({type: MY_ROLE, payload: role});
            callback();
        }
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(SessionPanel);