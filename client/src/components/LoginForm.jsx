import React,{Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";

class LoginForm extends Component {

    render()
    {
        return(
            <Col>
                <form  id={"form"} onSubmit={this.show}>
                    <Form.Row>
                        <Col>
                            <Form.Label size={"sm"}>Email</Form.Label>
                            <Form.Control size={"sm"} placeholder="Email" />
                        </Col>
                        <Col>
                            <Form.Label size={"sm"}>Password</Form.Label>
                            <Form.Control size={"sm"} type="password" placeholder="Password" />
                            <small><a href='#' style={{color:"white"}}>Forgotten Password?</a></small>
                        </Col>
                        <Col>
                            <Button size={"sm"} href={"/dashboard"} style={{marginTop:32}} variant="outline-light" type={"submit"}>
                                Log in
                            </Button>
                        </Col>
                    </Form.Row>
                </form>
            </Col>
        );
    }
}
export default LoginForm;