import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";

class SignUp extends Component {

    render() {
        return (
            <Modal {...this.props}  style={{color:"black"}} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success">Sign up for Colab</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default SignUp;