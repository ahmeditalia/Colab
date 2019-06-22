import React, {Component} from 'react';
import {Badge, Dropdown, Image, Modal} from "react-bootstrap";
import SessionCreationForm from "../session/SessionCreationForm";
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authenticationActions/signOutAction";
import {withRouter} from "react-router-dom";
import {INVITATION_COUNTER, USERNAME} from "../../store/dataMapping/user";
import {MY_SESSIONS_URL, USER_PROFILE_URL} from "../../store/dataMapping/URL";
import {GET_PROFILE_PIC} from "../../store/dataMapping/serverURLs";
import {INVITATION_FORM, OPEN_FORM, SESSION_CREATION_FORM} from "../../store/dataMapping/form";
import {MDBIcon} from "mdbreact";
import Invitations from "./Invitations";

class UserPanel extends Component {
    state = {
        invitations: false
    };

    mySessions = ()=>{
        this.props.history.push(MY_SESSIONS_URL);
    };

    invitations = ()=>{
      this.setState({invitations:true})
    };

    invitationsOff = ()=>{
        this.setState({invitations:false})
    };

    logOut = ()=>{
        this.props.signOut(this.props.history);
    };

    profile = ()=>{
        this.props.history.push(USER_PROFILE_URL);
    };

    render() {
        return (
            <div>
            <Dropdown size="sm" className={"mr-5"}>
                <Image style={{border: "1px solid", padding: "3px", objectFit: "cover"}} roundedCircle src={GET_PROFILE_PIC+localStorage.getItem(USERNAME)} width={32}
                       height={32}/>
                <Dropdown.Toggle style={{color:"white"}} variant={"link"} className={"shadow-none"}>
                    <p style={{display: "inline"}}>{localStorage.getItem(USERNAME)}</p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.mySessions}><MDBIcon icon="th-list" /> {" My Sessions"}</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.props.openInvitations}>
                        <MDBIcon icon="user-plus" /> {" Invitations"}
                        <Badge variant="danger" style={{borderRadius:6,marginLeft:15}}>{this.props[INVITATION_COUNTER]}</Badge>
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.props.openSessionCreator}><MDBIcon icon="plus" /> {" New Session"}</Dropdown.Item>
                    <SessionCreationForm/>
                    <Dropdown.Divider />
                    <Dropdown.Header>Account Settings</Dropdown.Header>
                    <Dropdown.Item as="button" onClick={this.profile}><MDBIcon icon="user-alt" />{" Profile"}</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.logOut}><MDBIcon icon="sign-out-alt" /> {" Sign Out"}  </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
        );
    }
}
const mapStateToProps = (combinedReducer)=>{
    return {
        INVITATION_COUNTER: combinedReducer.profile[INVITATION_COUNTER]
    };
};

const mapDispatchToProps = (dispatch)=>{
    return {
        signOut: (history)=> dispatch(signOut(history)),
        openSessionCreator:  ()=> dispatch({type:SESSION_CREATION_FORM, payload: OPEN_FORM}),
        openInvitations:  ()=> dispatch({type:INVITATION_FORM, payload: OPEN_FORM})
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserPanel));