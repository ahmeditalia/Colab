import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

class SignIn extends Component {


  
    logIn = ()=>{
        console.log("done");
    };
    render() {
        return (
            <Modal {...this.props}  style={{color:"black"}} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sign In
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.logIn}>Sign In</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default SignIn;