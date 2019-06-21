import React,{Component} from 'react';
import {Image, Row, Toast} from "react-bootstrap";
import {MDBIcon} from "mdbreact";
import py from "./python.jpg";
import requireAuth from "../authentication/requireAuth";
import {connect} from "react-redux";
import {INVITATIONS, SESSION_DESCRIPTION, SESSION_NAME, SESSION_OWNER} from "../../store/dataMapping/session";
import {getInvitations} from "../../store/actions/sessionActions/getInvitationsAction";
import {GET_PROFILE_PIC} from "../../store/dataMapping/serverURLs";

class Header extends Component {

    render()
    {
        return(
            <div>
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
            </div>
        );

    }
}

const mapStateTpProps=(combinedReducer)=>{
    return{
        [INVITATIONS]: combinedReducer.sessionStorage[INVITATIONS]
    };
};
const mapDispatchTpProps=(dispatch)=>{
    return{
        getInvitations: (callback)=> dispatch(getInvitations(callback))
    };

};
export default connect(mapStateTpProps,mapDispatchTpProps)(requireAuth(Header));