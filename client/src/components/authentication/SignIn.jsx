import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {signIn} from "../../store/actions/authenticationActions/signInAction"
import {Redirect, withRouter} from "react-router-dom";

class SignIn extends Component {

    state = {
        username: null,
        password: null
    };

    changeState = (e)=>{
        this.setState({[e.target.id]: e.target.value});
    };

    logIn = (e)=>{
        console.log(this.props);
        this.props.signin(this.state,()=>{
            this.props.onHide();
            this.props.history.push("/dashboard");
        });
    };
    render() {
/*        if(this.props.user){
            return <Redirect to={"/dashboard"}/>
        }*/
        return (
            <Modal {...this.props} style={{color:"black"}} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sign In
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Username" onChange={this.changeState}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={this.changeState}/>
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

const mapStateToProps = (combinedReducer)=>{
    return{
        user: combinedReducer.auth.user
    }
};

const mapDispatchToProps = (dispatch)=>{
    return{
        signin: (signInData,callback) => dispatch(signIn(signInData,callback))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SignIn));