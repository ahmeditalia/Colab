import React, {Component} from 'react';
import {Badge, Button, Dropdown, Form, Image, Modal, ModalDialog} from "react-bootstrap";
import SessionCreationForm from "../session/SessionCreationForm";
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authenticationActions/signOutAction";
import {withRouter} from "react-router-dom";
import {PASSWORD, USERNAME} from "../../store/dataMapping/user";
import {MY_SESSIONS_URL, USER_PROFILE_URL} from "../../store/dataMapping/URL";
import {GET_PROFILE_PIC} from "../../store/dataMapping/serverURLs";
import {OPEN_FORM, SESSION_CREATION_FORM} from "../../store/dataMapping/form";
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
                    <Dropdown.Item as="button" onClick={this.invitations}>
                        <MDBIcon icon="user-plus" /> {" Invitations"}
                        <Badge variant="danger" style={{borderRadius:6,marginLeft:15}}>{"9"}</Badge>
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.props.openSessionCreator}><MDBIcon icon="plus" /> {" New Session"}</Dropdown.Item>
                    <SessionCreationForm/>
                    <Dropdown.Divider />
                    <Dropdown.Header>Account Settings</Dropdown.Header>
                    <Dropdown.Item as="button" onClick={this.profile}><MDBIcon icon="user-alt" />{" Profile"}</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.logOut}><MDBIcon icon="sign-out-alt" /> {" Sign Out"}  </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Modal style={{marginLeft:"80%",width:"270px",marginTop:"3.4%",maxHeight:"550px"}} show={this.state.invitations} onHide={this.invitationsOff}>
                    <Invitations invitations={{name:"JAVA", owner:"Owner", description:"description description description description"}}/>
            </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        signOut: (history)=> dispatch(signOut(history)),
        openSessionCreator:  ()=> dispatch({type:SESSION_CREATION_FORM, payload: OPEN_FORM})
    }
};

export default connect(null,mapDispatchToProps)(withRouter(UserPanel));