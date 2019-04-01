import React, { Component } from 'react';
import {Button, Form, Modal} from "react-bootstrap";

class SessionCreationForm extends Component {
    render() {
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton style={{backgroundColor:"#43b581"}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                         Create Session
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor:"#232937"}}>
                    <Form>
                        <Form.Label>
                            Session Name
                        </Form.Label>
                        <Form.Control/>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor:"#232937"}}>
                    <Button href={"/SessionM"} variant={"outline-info"}>Create</Button>
                    <Button variant={"outline-info"} onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default SessionCreationForm;