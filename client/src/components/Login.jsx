import React, { Component } from 'react';
import {Col, Button, Form, Navbar, Row, InputGroup} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Header from "./Header";

class Login extends Component{
    render() {
        return(
            <div style={{color:'white'}}>
                <Header login={true}/>
                <Container style={{marginTop:100,backgroundColor:"#232937"}}>
                    <Row>
                        <Col style={{marginTop:50}}>
                            <h1>About Us</h1>
                            <p style={{width:500,fontSize:26}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </Col>
                        <Col sm={4} style={{marginRight:100}}>
                            <Form style={{backgroundColor:'white',borderRadius:10,padding:20,color:'black'}}>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Username" />
                                </Form.Group>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="outline-light" style={{backgroundColor:"#43b581",width:"100%"}}>Sign up for Colab</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default Login;