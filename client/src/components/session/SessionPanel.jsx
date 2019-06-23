import React, { Component } from 'react';
import {
    Accordion, Button,
    Card,
    Col,
    DropdownButton,
    Dropdown,
    Form, FormControl,
    InputGroup,
    ProgressBar,
    Row
} from 'react-bootstrap';
import {connect} from "react-redux";
import {SESSION_SOCKET} from "../../store/dataMapping/socket";
import {GET_PROFILE_PIC} from "../../store/dataMapping/serverURLs";
import {SESSION_CONNECTED_USERS, SESSION_USER_ROLE} from "../../store/dataMapping/session";
import {USERNAME} from "../../store/dataMapping/user";
import {MY_ROLE} from "../../store/dataMapping/sessionUsersData";

class SessionPanel extends Component{


    state =  {
        [SESSION_CONNECTED_USERS]: [],
        inviteeUser: "",
        msg: ""
    };

    invite=()=>{
        const {socket} = this.props;
        socket.emit("invite", this.state.inviteeUser,(success)=>{
            if(success) this.setState({msg:"  Successful Invitation"});
            else this.setState({msg:"  *No Such User"});
        });
    };

    componentDidMount() {
        console.log("we came here");
        const {socket} = this.props;

        socket.on("current-users",(users, role ,callback)=>{
            this.props.setMyRole(role, ()=>{
                let dataSource = users.map((user)=> {
                    return{
                        ...user,
                        className: "user",
                        disabled: false,
                        grade:0
                    };
                });
                console.log(dataSource);
                this.setState({[SESSION_CONNECTED_USERS]: dataSource});
                callback();
            });
        });

        socket.on("user-joined",(user)=>{
            if(this.state[SESSION_CONNECTED_USERS].some( item => item[USERNAME] === user[USERNAME] )) {
                this.updateUsers(USERNAME,user[USERNAME],"disabled",false);
            }else {
                let dataSource = [...this.state[SESSION_CONNECTED_USERS]
                    ,{
                        ...user,
                        className: "user",
                        disabled: false,
                        grade: 0
                }];
                console.log(dataSource);
                this.setState({[SESSION_CONNECTED_USERS]: dataSource});
            }

        });

        socket.on("user-left",(user)=>{
            this.updateUsers(USERNAME,user[USERNAME],"disabled",true);
        });

        socket.on("set-permission",(username,role)=>{
            if(username === localStorage.getItem(USERNAME)) this.props.setMyRole(role,()=>{});
            this.updateUsers(USERNAME,username,SESSION_USER_ROLE,role);
        });
    }


    updateUsers = (key,username,attr,value)=>{
        let dataSource = this.state[SESSION_CONNECTED_USERS].map((user)=> {
            if(user[key] === username) {
                user[attr] = value;
            }
            return user;
        });
        this.setState({[SESSION_CONNECTED_USERS]: dataSource});
        console.log(dataSource);
    };

    watchUser = (e)=>{
        console.log(e.currentTarget.id);
        const {socket} = this.props;
        socket.emit("watch-user", e.currentTarget.id);
    };

    changePermission = (e)=>{
        const {socket} = this.props;
        socket.emit("set-permission", e.target.name, e.target.value);
    };

    ownerComponent = (data)=>{
        return (
            <div key={data[USERNAME]}  disabled={data.disabled}>
            <Card disabled={data.disabled}>
                <Row style={{height: 50, marginTop: 4, borderBottom:"1px solid #dcdcdc"}}>
                    <Col md={{span:2,offset:1}}>
                        <Accordion.Toggle name={data[USERNAME]} onClick={this.changeClass} variant={"link"} className={data.className} eventKey={data[USERNAME]}/>
                    </Col>
                    <div className={"mydiv"}>
                        <a id={data[USERNAME]} onClick={this.watchUser} className={"parent"}>
                            <img className="eimage" src={ GET_PROFILE_PIC+data[USERNAME] }/>
                            <div className="ename">{data[USERNAME]}</div>
                            <div className="ejob">{data[SESSION_USER_ROLE]}</div>
                            {data[SESSION_USER_ROLE] === "ghost"?
                                <div className={"progressbarDiv"}>
                                    <ProgressBar className={"progressbar"} now={data.grade} label={data.grade+"%"} variant={"success"}/>
                                </div>: <></>}
                        </a>
                    </div>
                </Row>
                {data[SESSION_USER_ROLE] !== "owner"?
                <Accordion.Collapse eventKey={data[USERNAME]}>
                    <Form.Group className={"formGroup"}>
                        <Form.Check id={data[USERNAME]+"mod"} className={"formGroupItem"} custom={true} value={"mod"}
                                    type="radio" label="Moderator" name={data[USERNAME]}
                                    defaultChecked={data[SESSION_USER_ROLE] === "mod"}
                                    onClick={this.changePermission}/>
                        <Form.Check id={data[USERNAME]+"gh  ost"} className={"formGroupItem"} custom={true} value={"ghost"}
                                    type="radio" label="Ghost" name={data[USERNAME]}
                                    defaultChecked={data[SESSION_USER_ROLE] === "ghost"}
                                    onClick={this.changePermission}/>
                    </Form.Group>
                </Accordion.Collapse>:<></>}
            </Card>
            </div>
        );
    };

    ghostComponent = (data)=> {
        return(
            <div key={data[USERNAME]} disabled={data.disabled}>
            <Card>
                <Row style={{height: 50, marginTop: 4, borderBottom:"1px solid #dcdcdc"}}>
                    <Col md={{span:2,offset:1}}>
                        <Accordion.Toggle name={data[USERNAME]} onClick={this.changeClass} variant={"link"} className={data.className} eventKey={data[USERNAME]}/>
                    </Col>
                    <div className={"mydiv"}>
                        <a id={data[USERNAME]} onClick={this.watchUser} className={"parent"}>
                            <img className="eimage" src={ GET_PROFILE_PIC+data[USERNAME] }/>
                            <div className="ename">{data[USERNAME]}</div>
                            <div className="ejob">{data[SESSION_USER_ROLE]}</div>
                            {data[SESSION_USER_ROLE] === "ghost"?
                                <div className={"progressbarDiv"}>
                                    <ProgressBar className={"progressbar"} now={parseInt(data.grade)} label={data.grade+"%"} variant={"success"}/>
                                </div>: <></>}
                        </a>
                    </div>
                </Row>
            </Card>
            </div>
        );
    };

    showTaskGrades = (e)=>{
        this.props.socket.emit("task-grades",e.target.id,(users)=>{
            users.forEach((user)=>{
                this.updateUsers(USERNAME, user.username, "grade" , user.grade);
            });
            console.log("af",this.state[SESSION_CONNECTED_USERS]);
        });
    };

    changeClass = (e)=>{
        this.updateUsers(USERNAME,e.target.name,"className", e.target.className === "user"? "user toggled":"user");
    };

    changeHandling = (e)=>{
        this.setState({[e.target.id]: e.target.value});
    };


    render() {
        return(
            <Col xs={3}>
                <div className={"panelSection"}>
                    <Card.Header as={"h4"}>
                        Users
                        <DropdownButton variant={"secondary"} id="grades" title="Grades" style={{float:"right",marginTop: "-5px", marginRight:" -8px"}}>
                            {
                                this.props.tasks.map((task)=>{
                                    return (
                                    <Dropdown.Item id={task.taskId} onClick={this.showTaskGrades}>
                                        {task.name}
                                    </Dropdown.Item>
                                )})
                            }
                        </DropdownButton>
                    </Card.Header>
                    <Accordion>
                        {this.state[SESSION_CONNECTED_USERS].length > 0 && this.state[SESSION_CONNECTED_USERS].map((user)=>{
                            return this.props[MY_ROLE] === "ghost"? this.ghostComponent(user): this.ownerComponent(user);
                        })}
                    </Accordion>
                    <div style={{display:"flex", flexDirection: "column"}}>
                        <InputGroup style={{position:"absolute",bottom:4}} className="mb-3">
                            <FormControl
                                id={"inviteeUser"}
                                placeholder="Recipient's username"
                                onChange={this.changeHandling}
                            />
                            <InputGroup.Append>
                                <Button id="invite" variant={"secondary"} onClick={this.invite}>Invite</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <small style={{position:"absolute",bottom:4 , float:"right"}}>{this.state.msg}</small>
                    </div>
                </div>
            </Col>
        );
    }
}
const mapStateToProps = (combinedReducer)=> {
    return {
        tasks: combinedReducer.forms.tasks,
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