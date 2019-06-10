import React, {Component} from 'react';
import {Dropdown, Image} from "react-bootstrap";
import user from "../../images/user.png";
import SessionCreationForm from "../session/SessionCreationForm";
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authenticationActions/signOutAction";
import {withRouter} from "react-router-dom";

class UserPanel extends Component {

    state={
        sessionCreator:false
    };

    openSessionCreator = ()=>{
        this.setState({sessionCreator:true});
    };

    closeSessionCreator = ()=>{
        this.setState({sessionCreator:false});
    };

    logOut = ()=>{
        this.props.signOut(()=>{
            this.props.history.push("/");
        });
    };

    render() {
        return (
            <Dropdown size="sm" className={"mr-5"}>
                <Image style={{border: "1px solid", padding: "3px"}} roundedCircle src={"/getpic"} width={32}
                       height={32}/>
                <Dropdown.Toggle style={{color:"white"}} variant={"link"} className={"shadow-none"}>
                    <p style={{display: "inline"}}> Mourad</p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.openSessionCreator}>New Session</Dropdown.Item>
                    <SessionCreationForm
                        show={this.state.sessionCreator}
                        onHide={this.closeSessionCreator}
                    />
                    <Dropdown.Divider />
                    <Dropdown.Header>User Settings</Dropdown.Header>
                    <Dropdown.Item as="button">Profile</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.logOut}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        signOut: (callback)=> {
            dispatch(signOut());
            callback();
        }
    }
};

export default connect(null,mapDispatchToProps)(withRouter(UserPanel));