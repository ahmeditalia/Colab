import React, { Component } from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {createSession} from "../../store/actions/sessionActions/createSessionAction";

class SessionCreationForm extends Component {

    state={
        sessionName:null,
        password:null
    };

    changeState = (e)=>{
        this.setState({[e.target.id]: e.target.value});
    };

    createSession = ()=>{
        this.props.createSession(this.state,()=>{
            this.props.onHide();
            this.props.history.push("/"+this.props.session.id);
        });
    };

    render() {
        return (
            <Modal {...this.props} style={{color:"black"}} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                         Create Session
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="sessionName">
                            <Form.Label>Session Name</Form.Label>
                            <Form.Control type="text" placeholder="Session Name" onChange={this.changeState}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type={"password"} placeholder="Password" onChange={this.changeState}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"outline-info"} onClick={this.createSession}>Create</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
const mapStateToProps = (combinedReducer)=>{
    return{
        session: combinedReducer.sessionStorage.openedSession
    }
};
const mapDispatchTpProps = (dispatch)=>{
    return {
        createSession: (sessionInfo,callback)=>{
            dispatch(createSession(sessionInfo,callback));
/*
            callback();
*/
        }
    }
};

export default connect(mapStateToProps,mapDispatchTpProps)(withRouter(SessionCreationForm));