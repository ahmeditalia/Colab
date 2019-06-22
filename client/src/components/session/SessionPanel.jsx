import React, { Component } from 'react';
import {Card, Col, Form, Nav, ProgressBar, Spinner} from 'react-bootstrap';
import { enableRipple } from '@syncfusion/ej2-base';
import {TreeViewComponent} from "@syncfusion/ej2-react-navigations";
import {CheckBoxComponent} from '@syncfusion/ej2-react-buttons';
import {connect} from "react-redux";
import {SESSION_SOCKET} from "../../store/dataMapping/socket";
import {GET_PROFILE_PIC} from "../../store/dataMapping/serverURLs";
import {SESSION_CONNECTED_USERS, SESSION_PRIVACY, SESSION_USER_ROLE} from "../../store/dataMapping/session";
import {USERNAME} from "../../store/dataMapping/user";
import {MY_ROLE} from "../../store/dataMapping/sessionUsersData";
enableRipple(true);

class SessionPanel extends Component{

    constructor(props){
        super(props);
        this.treeObj = null;
        this.fields = {
            [SESSION_CONNECTED_USERS]: [],
            id: 'id',
            parentID: 'pid',
            text: 'name',
            hasChildren: 'hasChild'
        }

    }

    state =  {

    };


    componentDidMount() {
        const {socket} = this.props;

        socket.on("current-users",(users, role ,callback)=>{
            this.props.setMyRole(role , ()=>{
                let dataSource = [];
                if(this.props[MY_ROLE] === "ghost")
                {
                    users.forEach((user)=>{
                        this.setState({[user[USERNAME]]: user[SESSION_USER_ROLE]});
                        dataSource[dataSource.length] = {id: user[USERNAME], name: user[USERNAME], eimg: GET_PROFILE_PIC + user[USERNAME] , ejob:user[SESSION_USER_ROLE] ,hasChild: true};
                    });
                }else{
                    users.forEach((user)=>{
                        this.setState({[user[USERNAME]]: user[SESSION_USER_ROLE]});
                        dataSource[dataSource.length] = {id: user[USERNAME], name: user[USERNAME], eimg: GET_PROFILE_PIC + user[USERNAME] , ejob:user[SESSION_USER_ROLE] ,hasChild: true};
                        dataSource[dataSource.length] = {id: user[USERNAME]+1 , pid: user[USERNAME], name: 'owner'};
                        dataSource[dataSource.length] = {id: user[USERNAME]+2 , pid: user[USERNAME], name: 'mod'};
                        dataSource[dataSource.length] = {id: user[USERNAME]+3 , pid: user[USERNAME], name: 'ghost'};
                    });
                }
                this.treeObj.fields.dataSource = dataSource;
                callback();
            });
        });

        socket.on("user-joined",(user)=>{
            let dataSource = [];
            if(this.treeObj.getTreeData().some( item => item['id'] === user[USERNAME] )) {
                this.treeObj.enableNodes([user[USERNAME]]);
            }else if(this.props[MY_ROLE] === "ghost") {
                this.setState({[user[USERNAME]]: user[SESSION_USER_ROLE]});
                dataSource[dataSource.length] = {id: user[USERNAME], name: user[USERNAME], eimg: GET_PROFILE_PIC + user[USERNAME] , ejob: user[SESSION_USER_ROLE] ,hasChild: true};
            }else{
                this.setState({[user[USERNAME]]: user[SESSION_USER_ROLE]});
                dataSource[dataSource.length] = {id: user[USERNAME], name: user[USERNAME], eimg: GET_PROFILE_PIC + user[USERNAME] , ejob: user[SESSION_USER_ROLE] ,hasChild: true};
                dataSource[dataSource.length] = {id: user[USERNAME]+1 , pid: user[USERNAME] ,name: 'owner'};
                dataSource[dataSource.length] = {id: user[USERNAME]+2 , pid: user[USERNAME] ,name: 'mod'};
                dataSource[dataSource.length] = {id: user[USERNAME]+3 , pid: user[USERNAME] ,name: 'ghost'};
            }
            this.treeObj.addNodes(dataSource);
        });

        socket.on("user-left",(user)=>{
            if(this.treeObj)
                this.treeObj.disableNodes([user[USERNAME]]);
        });
    }


    treeClick = (e)=>{
        console.log(this.state);
        let targetNodeId = this.treeObj.selectedNodes[0];
        let pid = this.treeObj.getNode(targetNodeId).parentID;
        if(!pid)
        {
            const {socket} = this.props;
            socket.emit("watch-user", targetNodeId);
        }
/*
        let name = this.treeObj.getNode(targetNodeId).text;
        console.log(this.treeObj.getNode(targetNodeId));
        this.setState({[pid]: name});
        document.getElementById(pid).setAttribute("checked","true");
        console.log(this.state);

        console.log(this.treeObj.selectedNodes[0]);
        console.log();*/

    };

    nodeTemplate = (data)=> {
        if(data.hasChild)
        {
            return (
                <div className={"parentItem"}>
                    <img className="eimage" src={data.eimg}
                         alt={data.eimg}/>
                    <div className="ename">{data.name}</div>
                    <div className="ejob">{data.ejob}</div>
                    <ProgressBar className={"progressbar"} now={100} label={100+"%"} variant={"success"}/>
                </div>);
        }
        else{
            return (
                <div style={{paddingTop:5}}>
                    <Form.Check inline  custom={true} value={data.name}
                                defaultChecked={this.state[data.pid] === data.name}
                                id ={data.id} type="radio" label={data.name} name ={data.pid}
                                onClick={this.permissionChangeHandler}/>
                </div>);
        }
    };



    render() {
        return(
            <Col xs={3}>
                <div className={"panelSection"}>
                    <Card.Header as={"h4"}> Users </Card.Header>
{/*
                    <AutoCompleteComponent id="atcelement" placeholder="  Invite others" highlight={true} />
*/}
                    <TreeViewComponent
                        fields={this.fields}
                        nodeTemplate={this.nodeTemplate}
                        cssClass={"custom"}
                        ref={tree => (this.treeObj = tree)}
                        nodeClicked={this.treeClick}
                    />
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