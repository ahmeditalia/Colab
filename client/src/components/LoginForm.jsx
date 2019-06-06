import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";

class LoginForm extends Component {

    render() {
        return (
            <Col sm={{offset: 2, span: 6}}>
                <Form  onSubmit={this.show}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control size={"sm"} placeholder="Email"/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Control size={"sm"} type="password" placeholder="Password"/>
                            {/*<small><a href='#' style={{color: "white"}}>Forgotten Password?</a></small>*/}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button size={"sm"} href={"/dashboard"} variant="outline-light"
                                    type={"submit"}>
                                Log in
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Col>
        );
    }
}

export default LoginForm;