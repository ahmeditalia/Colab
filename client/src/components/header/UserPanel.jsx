import React, {Component} from 'react';
import {Dropdown, Image} from "react-bootstrap";
import SessionCreationForm from "../session/SessionCreationForm";
import {connect} from "react-redux";
import {signOut} from "../../store/actions/authenticationActions/signOutAction";
import {withRouter} from "react-router-dom";
import {USERNAME} from "../../store/dataMapping/user";
import {USER_PROFILE} from "../../store/dataMapping/URL";
import {GET_PROFILE_PIC} from "../../store/dataMapping/serverURLs";
import {OPEN_FORM, SESSION_CREATION_FORM} from "../../store/dataMapping/form";
import {MDBIcon} from "mdbreact";

class UserPanel extends Component {

    logOut = ()=>{
        this.props.signOut(this.props.history);
    };

    profile = ()=>{
        this.props.history.push(USER_PROFILE);
    };

    render() {
        return (
            <Dropdown size="sm" className={"mr-5"}>
                <Image style={{border: "1px solid", padding: "3px", objectFit: "cover"}} roundedCircle src={GET_PROFILE_PIC+localStorage.getItem(USERNAME)} width={32}
                       height={32}/>
                <Dropdown.Toggle style={{color:"white"}} variant={"link"} className={"shadow-none"}>
                    <p style={{display: "inline"}}>{localStorage.getItem(USERNAME)}</p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item as="button" onClick={this.props.openSessionCreator}><MDBIcon icon="plus" /> {" New Session"}</Dropdown.Item>
                    <SessionCreationForm/>
                    <Dropdown.Divider />
                    <Dropdown.Header>Account Settings</Dropdown.Header>
                    <Dropdown.Item as="button" onClick={this.profile}><MDBIcon icon="user-alt" />{" Profile"}</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={this.logOut}><MDBIcon icon="sign-out-alt" /> {" Sign Out"}  </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
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