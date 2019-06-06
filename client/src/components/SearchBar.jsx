import React, {Component} from 'react';
import {Button, Col, Form, FormControl, Image, InputGroup} from "react-bootstrap";
import searchIcon from "../images/Zoom-icon.png";


class SearchBar extends Component {

    render() {
        return (
            <Col sm={{span: 7}}>
                <InputGroup varinat="outline-light" style={{backgroundColor: "#43b581"}}>
                    <FormControl
                        placeholder="Search Session"
                        aria-label="Search Session"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button className={"shadow-none"} varinat="outline-light" style={{backgroundColor: "#43b581", borderColor: "white"}}>
                            <Image src={searchIcon}/>
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Col>
        );
    }
}

export default SearchBar;