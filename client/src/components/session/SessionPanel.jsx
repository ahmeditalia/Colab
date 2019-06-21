import React, { Component } from 'react';
import {Card, Col, Nav, ProgressBar, Spinner} from 'react-bootstrap';
import { enableRipple } from '@syncfusion/ej2-base';
import {TreeViewComponent} from "@syncfusion/ej2-react-navigations";
import {CheckBoxComponent} from '@syncfusion/ej2-react-buttons';
import {connect} from "react-redux";
import {SESSION_SOCKET} from "../../store/dataMapping/socket";
import {GET_PROFILE_PIC} from "../../store/dataMapping/serverURLs";
import {SESSION_CONNECTED_USERS, SESSION_USER_ROLE} from "../../store/dataMapping/session";
import {USERNAME} from "../../store/dataMapping/user";
enableRipple(true);

class SessionPanel extends Component{

    constructor(props){
        super(props);
        this.treeObj = null;
        this.usersFields =  {
            [SESSION_CONNECTED_USERS]: [],
                id: 'id',
                parentID: 'pid',
                text: 'name',
                hasChildren: 'hasChild'
        };

    }
    componentDidMount() {
        const {socket} = this.props;
        socket.on("current-users",(users,callback)=>{
            var dataSource = [];
            users.forEach((user)=>{
                dataSource[dataSource.length] = {id: user[USERNAME], name: user[USERNAME], eimg: GET_PROFILE_PIC + user[USERNAME] , ejob:user[SESSION_USER_ROLE] ,hasChild: true};
                dataSource[dataSource.length] = {id: user[USERNAME]+1 , pid: user[USERNAME], name: 'Perm1'};
                dataSource[dataSource.length] = {id: user[USERNAME]+2 , pid: user[USERNAME], name: 'Perm2'};
                dataSource[dataSource.length] = {id: user[USERNAME]+3 , pid: user[USERNAME], name: 'Perm3'};
            });
            this.treeObj.fields.dataSource = dataSource;
            callback();

        });
        socket.on("user-joined",(user)=>{
            if(this.treeObj.getTreeData().some( item => item['id'] === user[USERNAME] )) {
                this.treeObj.enableNodes([user[USERNAME]]);
            }else{
                let dataSource = [];
                dataSource[dataSource.length] = {id: user[USERNAME], name: user[USERNAME], eimg: GET_PROFILE_PIC + user[USERNAME] , ejob: user[SESSION_USER_ROLE] ,hasChild: true};
                dataSource[dataSource.length] = {id: user[USERNAME]+1 , pid: user[USERNAME], name: 'Perm1'};
                dataSource[dataSource.length] = {id: user[USERNAME]+2 , pid: user[USERNAME], name: 'Perm2'};
                dataSource[dataSource.length] = {id: user[USERNAME]+3 , pid: user[USERNAME], name: 'Perm3'};
                this.treeObj.addNodes(dataSource);

            }
        });
        socket.on("user-left",(user)=>{
            if(this.treeObj)
                this.treeObj.disableNodes([user[USERNAME]]);
        });
    }

    permissionChangeHandler = (e)=>{
        console.log(e.target.name + " ,"+ e.target.value+" ,"+e.target.checked);
        e.target.checked = !e.target.checked;
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
                    <CheckBoxComponent
                        name={data.pid}
                        value={data.name}
                        onClick={this.permissionChangeHandler}
                        className="ename"
                        label={data.name}
                    />
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
                        fields={this.usersFields}
                        nodeTemplate={this.nodeTemplate}
                        cssClass={"custom"}
                        ref={tree => (this.treeObj = tree)}
                    />
                </div>
            </Col>
        );
    }
}
const mapStateToProps = (combinedReducer)=> {
    return {
        usersFields: combinedReducer.connectedSession.usersFields,
        socket: combinedReducer.sockets[SESSION_SOCKET]
    }
};
const mapDispatchToProps = (dispatch)=>{
    return {
        updateSessionUsers: (users)=> dispatch({type: SESSION_CONNECTED_USERS , payload: users}),
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(SessionPanel);