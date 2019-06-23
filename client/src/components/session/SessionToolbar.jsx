import React, { Component } from 'react';
import {USERNAME} from "../../store/dataMapping/user";
import {AxiosInstance as axios} from "axios";
import {Button, Nav, Row} from "react-bootstrap";
import {MDBIcon} from "mdbreact";
import {FONT_SIZE, THEME} from "../../store/dataMapping/ace";
import {connect} from "react-redux";
import {OPEN_FORM, TASK_CREATION_FORM, TASK_VIEW_FORM} from "../../store/dataMapping/form";
import TaskCreationForm from "../TaskCreationForm";
import {MY_ROLE} from "../../store/dataMapping/sessionUsersData";
import TaskViewForm from "../TaskViewForm";



class SessionToolbar extends Component{

    handleChange= (e)=>{
        this.props.handleChange(e.target.id,e.target.value);
    };

    openForm = ()=>{
        if(this.props.role === "owner") {
            this.props.openTaskCreationForm();
        }
        else {
            this.props.openTaskViewForm();
        }
    };

    run = ()=>{
        console.log("run function");
        this.props.socket.emit("save-file",this.state.editor,(data)=>{
            if(data) {
                axios.post("/lsp/run-task",{
                    sessionId: this.state.id,
                    username: localStorage.getItem(USERNAME),
                    taskId: 1
                },{headers: {'Authorization': "bearer " + localStorage.getItem('user')}})
                    .then((res)=> {
                        let grade = res.data.correct/(res.data.correct+res.data.wrong)*100;
                        this.setState({correct: res.data.correct, wrong:res.data.wrong, grade: grade})
                    })
                    .catch(()=> console.log("grade error"))
            }
        });
    };


    render() {
        return(
            <Row className={"sessionBar"}>
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                        <span className="custom-dropdown small">
                            <select id={FONT_SIZE} onChange={this.handleChange} value={this.props[FONT_SIZE]}>
                                <option value={"10"}>10</option>
                                <option value={"12"}>12</option>
                                <option value={"14"}>14</option>
                                <option value={"16"}>16</option>
                                <option value={"18"}>18</option>
                                <option value={"20"}>20</option>
                                <option value={"22"}>22</option>
                                <option value={"24"}>24</option>
                            </select>
                        </span>
                    </Nav.Item>
                    <Nav.Item>
                        <span className="custom-dropdown small">
                            <select id={THEME} onChange={this.handleChange} value={this.props[THEME]}>
                                <option value={"tomorrow"}>tomorrow</option>
                                <option value={"github"}>github</option>
                                <option value={"monokai"}>monokai</option>
                                <option value={"terminal"}>terminal</option>
                            </select>
                        </span>
                    </Nav.Item>
                    <Nav.Item>
                        <Button size={"sm"} variant={"outline-success"} onClick={this.openForm}><MDBIcon icon="tasks" />  {this.props.role === "owner" ? "Create Task" : "View Task"}</Button>
                        <TaskCreationForm/>
                        <TaskViewForm/>
                    </Nav.Item>
                    <Nav.Item>
                        <Button onClick={this.run} size={"sm"} variant={"outline-success"}><MDBIcon icon="play" />{" Run"}</Button>
                    </Nav.Item>
                </Nav>
            </Row>
        );
    }
}

const mapStateTpProps=(combinedReducer)=>{
    return{
        [THEME]: combinedReducer.editor[THEME],
        [FONT_SIZE]: combinedReducer.editor[FONT_SIZE],
        role: combinedReducer.sessionData[MY_ROLE]
    };
};
const mapDispatchTpProps=(dispatch)=> {
    return {
        handleChange: (type,value) => dispatch({type:type , payload: value}),
        openTaskCreationForm: ()=> dispatch({type:TASK_CREATION_FORM, payload: OPEN_FORM}),
        openTaskViewForm: ()=> dispatch({type:TASK_VIEW_FORM, payload: OPEN_FORM})
    };
};

export default connect(mapStateTpProps,mapDispatchTpProps)(SessionToolbar);