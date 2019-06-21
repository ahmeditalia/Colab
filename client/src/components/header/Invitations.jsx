import React,{Component} from 'react';
import {Image, Row, Toast} from "react-bootstrap";
import {MDBIcon} from "mdbreact";
import py from "./python.jpg";

class Header extends Component {

    render()
    {
        return(
            <div>
                {/*{this.props.invitations.map(*/}
                {/*(inv)=>*/}
                <Toast className={"inv"} style={{color:"black"}} >
                    <Toast.Header style={{height:50}}>
                        <Row style={{width:"100%", marginLeft:-2}}>
                            <div style={{width:"60%", height:"40px"}}>
                                <Image className={"eimage"} src={py} style={{width:"50px", height:"50px",marginRight:-5}}/>
                                <strong className={"ename"} style={{color:"black"}}>{this.props.invitations.name}</strong>
                                <div style={{fontSize:12}}><MDBIcon icon="user" />{"  "+this.props.invitations.owner}</div>
                            </div>
                            <div style={{paddingTop: "10px"}}>
                                <a id={"accept"} onClick={console.log("accept")} style={{color:"green",fontSize:11,marginRight:4}}><MDBIcon icon="check" /> Accept</a>
                                <a id={"reject"} onClick={console.log("reject")} style={{color:"red",fontSize:11,marginLeft:4}}><MDBIcon icon="times" /> Reject</a>
                            </div>
                        </Row>
                    </Toast.Header>
                    <Toast.Body show={null} style={{width:"100%"}}>
                            {this.props.invitations.description}
                    </Toast.Body>
                </Toast>
                {/*)}*/}
            </div>
        );

    }
}
export default Header;