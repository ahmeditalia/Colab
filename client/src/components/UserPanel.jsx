import React, {Component} from 'react';
import {Button, Col, Dropdown, FormControl, Image, InputGroup, Row} from "react-bootstrap";
import user from "../images/user.png";
import '../css/index.css';
import SearchBar from "./SearchBar";

class UserPanel extends Component {

    state = {
        dropDownArrow: "right",
    };

    dropdownMenuArrow = (isOpen) => {
        if (isOpen)
            this.setState({dropDownArrow: "down"});
        else
            this.setState({dropDownArrow: "right"});
    };

    render() {
        return (
            <Col>
                <Row>
                    {
                        this.props.barOption === true
                        ? <SearchBar/>
                        : <Col sm={{span:7}}/>
                    }
                    <Col sm={{offset: 2, span: 3}}>
                        <Dropdown onToggle={(isOpen) => this.dropdownMenuArrow(isOpen)} drop={this.state.dropDownArrow}>
                            <Dropdown.Toggle className={"shadow-none"}>
                                <Image style={{border: "1px solid", padding: "3px"}} rounded src={user} width={30}
                                       height={30}/>
                                <p style={{display: "inline"}}> Mourad</p>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as="button" onClick={() => this.setState({modalShow: true})}>Create
                                    Session</Dropdown.Item>
                                <Dropdown.Item as="button">My Sessions</Dropdown.Item>
                                <Dropdown.Item as="button">Log Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default UserPanel;