import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {signUp} from "../../store/actions/authenticationActions/signUpAction";
import {withRouter,Redirect} from "react-router-dom";

class SignUp extends Component {

    state = {
        username: null,
        email: null,
        password: null
    };

    changeState = (e)=>{
        this.setState({[e.target.id]: e.target.value});
    };

    signUp = (e)=>{
        this.props.signUp(this.state,()=>{
            this.props.history.push("/dashboard");
        });
    };

    render() {
        /*if(this.props.user){
            return <Redirect to={"/dashboard"}/>
        }*/
        return (
            <Modal {...this.props}  style={{color:"black"}} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sign Up
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={this.changeState}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={this.changeState}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.changeState}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={this.sigUp}>Sign up for Colab</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (combinedReducer)=>{
    return{
        user: combinedReducer.auth.user
    }
};

const mapDispatchToProps = (dispatch)=>{
    return{
        signUp: (signUpData,callback)=> dispatch(signUp(signUpData,callback))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignUp));