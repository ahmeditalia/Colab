import React,{Component} from 'react';
import {Button, Col, Form, Image, InputGroup, Navbar, Row} from "react-bootstrap";
import logo from "../images/logo_icon.png";
import LoginForm from "./LoginForm";

class Header extends Component {

    render()
    {
        return(
            <Navbar style={{backgroundColor:"#43b581",height:103}} sticky="top">
                <Col sm={{offset:1,span:2}}>
                    <Image src={logo}></Image>
                    <small><a href='#' style={{color:"white"}}>Why Colab?</a></small>
                </Col>
                {this.props.login === true
                    ? <LoginForm/>
                    : <h1>nothing</h1>
                }
            </Navbar>
        );
    }
}
export default Header;