import React, { Component } from 'react';
import {Row} from 'react-bootstrap';
import SessionLayout from "./SessionLayout";
import TaskForm from "../TaskForm";
import SessionPanel from "./SessionPanel";
import python from "../session/python.jpg";

class Session extends Component{

    state = {
        taskShow: false
    };

    closeTask = () => this.setState({ taskShow: false });
    openTask = () => this.setState({ taskShow: true });

    render() {
        return(
            <div style={{color:'white'}}>
                <TaskForm
                    show={this.state.taskShow}
                    onHide={this.closeTask}
                />
                <Row style={{width:"100%",height:"100%",marginTop:30,marginLeft:0,backgroundColor:"#232937"}}>
                    <SessionPanel items={[
                        {img:python, username:"Tab 1",permissions:[
                            {name:"permisssdasdasdasdasdion1",value:true},
                            {name:"permission2",value:false},
                            {name:"permission3",value:true},
                            {name:"permission4",value:true},
                            ]},
                        {img:python, username:"Tab 1",permissions:[
                                {name:"permission1",value:true},
                                {name:"permission2",value:false},
                                {name:"permission3",value:true},
                                {name:"permission4",value:true},
                            ]},
                        {img:python, username:"Tab 1",permissions:[
                                {name:"permission1",value:true},
                                {name:"permission2",value:false},
                                {name:"permission3",value:true},
                                {name:"permission4",value:true},
                            ]},
                        {img:python, username:"Tab 1",permissions:[
                                {name:"permission1",value:true},
                                {name:"permission2",value:false},
                                {name:"permission3",value:true},
                                {name:"permission4",value:true},
                            ]},
                        {img:python, username:"Tab 1",permissions:[
                                {name:"permission1",value:true},
                                {name:"permission2",value:false},
                                {name:"permission3",value:true},
                                {name:"permission4",value:true},
                            ]},
                        {img:python, username:"Tab 2",permissions:[
                                {name:"permission1",value:true},
                                {name:"permission2",value:false},
                                {name:"permission3",value:false},
                                {name:"permission4",value:true},
                            ]},
                        {img:python, username:"Tab 3",permissions:[
                                {name:"permission1",value:false},
                                {name:"permission2",value:false},
                                {name:"permission3",value:false},
                                {name:"permission4",value:false},
                            ]},
                        {img:python, username:"Tab 4",permissions:[
                                {name:"permission1",value:true},
                                {name:"permission2",value:false},
                                {name:"permission3",value:true},
                                {name:"permission4",value:true},
                            ]},
                        {img:python, username:"Tab 5",permissions:[
                                {name:"permission1",value:true},
                                {name:"permission1",value:true},
                                {name:"permission1",value:true},
                                {name:"permission1",value:true},
                            ]},
                    ]}/>
                    <SessionLayout openTask={this.openTask} taskButtonValue={"Task"} rooms={["Master","Mourad"]}/>
                </Row>

            </div>
        );
    }
}


export default Session;