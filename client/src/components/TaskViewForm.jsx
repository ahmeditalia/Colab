import React, { Component } from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {CLOSE_FORM, TASK_VIEW_FORM, TASKS} from "../store/dataMapping/form";
import {connect} from "react-redux";
import {SESSION_ID} from "../store/dataMapping/session";
import {submitTask} from "../store/actions/sessionActions/submitTaskAction";

class TaskViewForm extends Component {

    submitTask = (e)=>{
        let submitData={
            sessionId: this.props.sessionId,
            taskId: e.target.id
        };
        this.props.submitTask(submitData);
    };

    render() {
        return (
            <Modal size="lg" {...this.props} style={{color:"black"}} show={this.props.display} onHide={this.props.closeTaskForm} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header style={{backgroundColor:"#ededed"}} closeButton>
                    <h3>Tasks</h3>
                </Modal.Header>
                <Modal.Body style={{width:"100%"}}>
                    {this.props.data.map((task)=>{
                        return(
                            <Form>
                                <Form.Group>
                                    <Form.Label style={{marginLeft:"45%"}}><h6><b>{task.name}</b></h6></Form.Label>
                                        <p>{task.description} </p>
                                </Form.Group>
                                <Form.Label><h6><u>Example</u></h6></Form.Label>
                                <Form.Group style={{width:"100%"}}>
                                    <Form.Label>Input</Form.Label>
                                    <Form.Text type="text" as={"textarea"} value={task.inputs.join(',').replace(',','\n')} style={{resize:"none",width:"100%"}}/>
                                </Form.Group>
                                <Form.Group style={{width:"100%"}}>
                                    <Form.Label>Output</Form.Label>
                                    <Form.Text type="text" as={"textarea"} value={task.outputs.join(',').replace(',','\n')} style={{resize:"none",width:"100%"}}/>
                                </Form.Group>
                                    <p>{task.grade}</p>
                                    <p style={{color:"red",fontSize:12}}>{task.messages}</p>
                                <Button id={task.taskId} variant={"outline-dark"} onClick={this.submitTask}>Submit</Button>
                                <hr style={{width:"100%"}}/>
                            </Form>
                        )})}
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = (combinedReducer)=>{
    return{
        display: combinedReducer.forms[TASK_VIEW_FORM],
        data: combinedReducer.forms[TASKS],
        sessionId: combinedReducer.sessionData[SESSION_ID]
    }
};

const mapDispatchToProps = (dispatch)=>{
    return{
        closeTaskForm: ()=> dispatch({type:TASK_VIEW_FORM, payload: CLOSE_FORM}),
        submitTask: (submitData)=> dispatch(submitTask(submitData))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskViewForm);