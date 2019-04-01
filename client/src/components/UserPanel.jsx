import React,{Component} from 'react';
import {Col, Container, Dropdown, Image, OverlayTrigger, Popover, Tooltip} from "react-bootstrap";
import dropDown from "../images/dropdown.png";
import user from "../images/user.png";
import DropdownItem from "react-bootstrap/DropdownItem";
import '../css/index.css';

class UserPanel extends Component {

    state = {
        dropDownArrow: "right",
        popOverShow: 250,
        overlay : <Tooltip>AHMED</Tooltip>,
        overlayTrigger: "hover"
    };

    dropdownMenuArrow = (isOpen)=>{
        if(isOpen)
            this.setState({dropDownArrow:"down"});
        else
            this.setState({dropDownArrow:"right"});
    };

    changeOverlayOptions =()=>{
        if(this.state.overlayTrigger === "click")
            this.setState({overlayTrigger:"hover",overlay:<Tooltip>User Profile</Tooltip>});
        else
            this.setState({overlayTrigger:"click",
                overlay:
                    <Popover style={{marginTop:20}}>
                        <p>ay 7aga</p>
                        {/*<DropdownItem as="button">UserName</DropdownItem>
                        <DropdownItem as="button">Logout</DropdownItem>*/}
                    </Popover>
            });
    };


    render()
    {
        return(
            <Col sm={{offset:1}}>
                <Dropdown onToggle={(isOpen)=> this.dropdownMenuArrow(isOpen)} drop={this.state.dropDownArrow}>
                    <Dropdown.Toggle  style={{backgroundColor:"#43b581",border:0}} >
                        <Image src={dropDown} width={25} height={25} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="button" onClick={() => this.setState({ modalShow: true })}>Create Session</Dropdown.Item>
                        <Dropdown.Item as="button">My Sessions</Dropdown.Item>
                        <Dropdown.Item as="button">Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                    {/*<OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        delay={{ show: 250, hide: 2000 }}
                        overlay={<Popover>
                            <a href={"#"}>click me</a><br/>
                            <a href={"#"}>click me</a>
                        </Popover>
                        }
                    >

                    </OverlayTrigger>*/}
                </Dropdown>
                <OverlayTrigger
                    trigger = {this.state.overlayTrigger}
                    placement="bottom-start"
                    delay={{ show: this.state.popOverShow, hide: 400 }}
                    overlay={this.state.overlay}
                >
                    <a href={"#"} onClick ={()=> this.changeOverlayOptions()}><Image style={{border:"1px solid",padding: "3px"}} rounded src={user} width={30} height={30}/></a>
                </OverlayTrigger>
            </Col>
        );
    }
}
export default UserPanel;