import React, { Component } from 'react';
import { Col} from "react-bootstrap";
import '../../css/index.css';
import Draggable from 'react-draggable';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/monokai';
import 'brace/theme/terminal';
import {connect} from "react-redux";
import {FONT_SIZE, THEME, INPUT_TEXT} from "../../store/dataMapping/ace";
import {SESSION_SOCKET} from "../../store/dataMapping/socket";
import {GET_TASKS} from "../../store/dataMapping/form";

class SessionLayout extends Component{

    state={
        resizing:false,
        CodeSectionHeight:70,
        OutputSectionHeight:29.01,
        output: ""

    };

    componentDidMount() {
        const {socket} = this.props;
        socket.on("init-file", (textData)=>{
            this.props.handleChange(INPUT_TEXT, textData);
        });
        socket.on("init-tasks", (tasks)=>{
            console.log("tasks",tasks);
            tasks.forEach(function (task) {
                task["grade"] = null;
                task["messages"] = "";
            });
            this.props.getTasks(tasks);
        });
    }

    /*componentWillMount() {
        console.log("mounted");

        const {session} = this.props.match.params;

        let socket = io.connect(serverURL+"/"+session);
        socket.on("connect",()=>{
            this.setState({connected:"Connected"});
            socket.emit("newUser",this.state.user,(username)=>{
                console.log(username);
                this.setState({user:username});
            });
        });
        socket.on("disconnect",()=>{
            this.setState({connected:"Disconnected"});
        });

        socket.on("connectedClients", (clients)=>{
            this.setState({rooms: clients});
        });

        socket.on("sharedCode", (id , code)=>{
            console.log(code);
            console.log(document.getElementById(id));
            document.getElementById(id).value = code;

        });
        this.setState({socket: socket});
    }
*/

    handleChange = (e)=>{
        this.props.handleChange(e);
        console.log(e);
        const {socket} = this.props;
        socket.emit("update-file", e);
    };

    joinRoom = (event)=>{
        this.state.socket.emit("joinRoom",event);
    };

    send = (event)=>{
        this.state.socket.emit("sharedCode", event.target.id , event.target.value);
    };

    getDimensions=(el)=> {
        let rect=el.getBoundingClientRect();
        return {height:rect.height,y:rect.top};
    };

    resize = (e)=>{
        e.stopPropagation();
        e.preventDefault();
        let div = this.getDimensions(document.querySelector(".wrapper"));
        let Y_start = div.y;
        let h = div.height;
        let newHeight = Math.min((e.clientY - Y_start)/h*100,96);
        newHeight = Math.max(newHeight,4);
        this.setState({CodeSectionHeight:newHeight,OutputSectionHeight:99.01-newHeight-0.01});
    };

    render() {
        return(
            <Col xs={9}>
                <div className={"codingSection"}>
                    <div className={"content"} style={{height:this.state.CodeSectionHeight+"%"}}>
                        <AceEditor
                            value={this.props[INPUT_TEXT]}
                            onChange={this.handleChange}
                            fontSize={this.props[FONT_SIZE]+"px"}
                            mode="c_cpp"
                            width={"100%"}
                            height={"100%"}
                            theme={this.props[THEME]}
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{$blockScrolling: true}}
                            setOptions={{
                                enableBasicAutoCompletion: true,
                                enableLiveAutoCompletion: true,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}
                        />
                    </div>
                    <Draggable axis="y" onDrag={(e)=> this.resize(e)} scale={0} bounds={{bottom: 10}}>
                    <div className={"handle"}/>
                    </Draggable>
                    <div className={"content"} style={{height:this.state.OutputSectionHeight+"%"}}>
                        <AceEditor
                            value={this.state.output}
                            fontSize={this.props[FONT_SIZE]+"px"}
                            width={"100%"}
                            height={"100%"}
                            theme={this.props[THEME]}
                            name="outputArea"
                            editorProps={{$blockScrolling: true}}
                            readOnly={true}
                            showGutter={false}
                            highlightActiveLine={false}
                        />
                    </div>
                </div>
            </Col>
        );
    }
}

const mapStateTpProps=(combinedReducer)=>{
    return{
        [THEME]: combinedReducer.editor[THEME],
        [FONT_SIZE]: combinedReducer.editor[FONT_SIZE],
        [INPUT_TEXT]: combinedReducer.editor[INPUT_TEXT],
        socket: combinedReducer.sockets[SESSION_SOCKET]
    };
};
const mapDispatchTpProps=(dispatch)=> {
    return {
        handleChange: (type,value) => dispatch({type:type , payload: value}),
        getTasks: (tasks) => dispatch({type:GET_TASKS, payload: tasks})
    };
};


export default connect(mapStateTpProps,mapDispatchTpProps)(SessionLayout);