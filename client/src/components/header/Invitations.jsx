import React,{Component} from 'react';
import {Image, Modal, Row, Toast} from "react-bootstrap";
import {MDBIcon} from "mdbreact";
import py from "./python.jpg";
import requireAuth from "../authentication/requireAuth";
import {connect} from "react-redux";
import {INVITATIONS, SESSION_DESCRIPTION, SESSION_NAME, SESSION_OWNER} from "../../store/dataMapping/session";
import {getInvitations} from "../../store/actions/sessionActions/getInvitationsAction";
import {GET_PROFILE_PIC} from "../../store/dataMapping/serverURLs";
import {DEFAULT_SOCKET} from "../../store/dataMapping/socket";
import {CLOSE_FORM, INVITATION_FORM, SIGN_IN_FORM} from "../../store/dataMapping/form";
import {INVITATION_COUNTER} from "../../store/dataMapping/user";

class Header extends Component {

    state={
        invitations: []
    };
    componentDidMount() {
        const {socket} = this.props;
        socket.on("invited",(data)=>{
           this.setState({invitations: this.state.invitations.push(data)},()=>{
               this.props.updateCounter(this.state.invitations.length);
            })
        });
    }

    render()
    {
        return(
            <Modal style={{marginLeft:"80%",width:"270px",marginTop:"3.4%",maxHeight:"550px"}} show={this.props[INVITATION_FORM]} onHide={this.props.closeInvitations}>
                {this.props[INVITATIONS].map((inv)=>
                    <Toast className={"inv"} style={{color:"black"}} >
                        <Toast.Header style={{height:50}}>
                            <Row style={{width:"100%", marginLeft:-2}}>
                                <div style={{width:"60%", height:"40px"}}>
                                    <Image className={"eimage"} src={GET_PROFILE_PIC + inv[SESSION_OWNER]} style={{width:"50px", height:"50px",marginRight:-5}}/>
                                    <strong className={"ename"} style={{color:"black"}}>{inv[SESSION_NAME]}</strong>
                                    <div style={{fontSize:12}}><MDBIcon icon="user" />{"  "+inv[SESSION_OWNER]}</div>
                                </div>
                                <div style={{paddingTop: "10px"}}>
                                    <a id={"accept"} onClick={console.log("accept")} style={{color:"green",fontSize:11,marginRight:4}}><MDBIcon icon="check" /> Accept</a>
                                    <a id={"reject"} onClick={console.log("reject")} style={{color:"red",fontSize:11,marginLeft:4}}><MDBIcon icon="times" /> Reject</a>
                                </div>
                            </Row>
                        </Toast.Header>
                        <Toast.Body show={null} style={{width:"100%"}}>
                            {inv[SESSION_DESCRIPTION]}
                        </Toast.Body>
                    </Toast>
                )}
            </Modal>
        );

    }
}

const mapStateTpProps=(combinedReducer)=>{
    return{
        socket: combinedReducer.sockets[DEFAULT_SOCKET],
        [INVITATIONS]: combinedReducer.sessionStorage[INVITATIONS],
        [INVITATION_FORM]: combinedReducer.forms[INVITATION_FORM]
    };
};
const mapDispatchTpProps=(dispatch)=>{
    return{
        closeInvitations: ()=> dispatch({type:INVITATION_FORM, payload: CLOSE_FORM}),
        updateCounter: (value)=> dispatch({type: INVITATION_COUNTER, payload:value}),
        getInvitations: (callback)=> dispatch(getInvitations(callback))
    };

};
export default connect(mapStateTpProps,mapDispatchTpProps)(requireAuth(Header));