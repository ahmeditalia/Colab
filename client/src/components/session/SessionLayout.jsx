import React, { Component } from 'react';
import { Col} from "react-bootstrap";
import '../../css/index.css';
import Form from "react-bootstrap/Form";
import Draggable from 'react-draggable';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/mode/c_cpp';
import 'brace/theme/github';
import 'brace/theme/tomorrow';

class SessionLayout extends Component{

    constructor(props) {
        super(props);
        this.state={
            rooms:this.props.rooms,
            resizing:false,
            CodeSectionHeight:70,
            OutputSectionHeight:29.01,
            editor:"",
            output: ""
        };
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

    handling = (e)=>{
        this.setState({editor: e},()=>{
            this.props.handler(this.state.editor);
        });

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
                            value={this.state.editor}
                            onChange={this.handling}
                            fontSize={"16px"}
                            mode="c_cpp"
                            width={"100%"}
                            height={"100%"}
                            theme="tomorrow"
                            name="UNIQUE_ID_OF_DIV"
                            editorProps={{$blockScrolling: true}}
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
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
                            fontSize={"16px"}
                            width={"100%"}
                            height={"100%"}
                            theme="tomorrow"
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


export default SessionLayout;