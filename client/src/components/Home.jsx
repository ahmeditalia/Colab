import React, {Component} from 'react';
import {Col, Button, Form, Navbar, Row, InputGroup} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Header from "./Header";
import SignUp from "./SignUp";
import SignIn from "./SignIn";


class Home extends Component {


    state = {
        signUpForm: false,
        signInForm: false
    };
    constructor(props, context) {
        super(props, context);
    }

    openSignUp = ()=>{
        this.setState({signUpForm:true});
    };

    closeSignUp = ()=>{
        this.setState({signUpForm:false});
    };

    openSignIn = ()=>{
        this.setState({signInForm:true});
    };

    closeSignIn = ()=>{
        this.setState({signInForm:false});
    };

    render() {
        return (
            <div>
                <Header openSignUp={this.openSignUp} openSignIn={this.openSignIn} login={true} barOption={false}/>
                <Container style={{marginTop:100}}>
                    <Row>
                        <Col sm={{span: 5}} style={{marginTop: 50}}>
                            <h1>About Us</h1>
                            <p style={{fontSize: 26}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                        </Col>
                        <SignUp
                            show={this.state.signUpForm}
                            onHide={this.closeSignUp}
                        />
                        <SignIn
                            show={this.state.signInForm}
                            onHide={this.closeSignIn}
                        />
                    </Row>
                </Container>
            </div>
        );
    }
}


export default Home;