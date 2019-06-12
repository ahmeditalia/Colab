import React, { Component } from 'react';
import { Col} from "react-bootstrap";
import '../../css/index.css';
import Form from "react-bootstrap/Form";
import Draggable from 'react-draggable';
const serverURL="http://localhost:3001";


class SessionLayout extends Component{

    constructor(props) {
        super(props);
        this.state={
            rooms:this.props.rooms,
            resizing:false,
            CodeSectionHeight:70,
            OutputSectionHeight:29.01
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
        const {rooms} = this.state;
        return(
            <Col style={{position:"fixed", width: 600}}>
                <div className={"wrapper"}>
                    <div  style={{height:this.state.CodeSectionHeight+"%"}}>
                        <Form.Control as={"textarea"} style={{resize: "none",height:"100%",borderRadius: 5,}} placeholder={"Write your Code ..."} /*onInput={this.send}*//>
                    </div>
                    <Draggable axis="y" onDrag={(e)=> this.resize(e)} scale={0} bounds={{bottom: 10}}>
                    <div className={"handle"}/>
                    </Draggable>
                    <div className={"content"} style={{height:this.state.OutputSectionHeight+"%"}}>
                        <Form.Control as={"textarea"} style={{resize: "none",height:"100%",borderRadius: 5}} placeholder={"Output Section ..."} /*onInput={this.send}*//>
                    </div>
                </div>
            </Col>
            /*<TabContainer id="left-tabs-example" defaultActiveKey={"Master"}>
                <Row style={{marginBottom:10}}>
                    <Col sm={3}>

                    </Col>
                    <Col sm={9} style={{display: "flex",justifyContent:"flex-end"}}>
                        <Button onClick={this.props.openTask} variant={"outline-danger"}> {this.props.taskButtonValue} </Button>
                        <Button variant={"outline-info"} style={{width:70,marginLeft:10}}> Run </Button>
                        <Button variant={"outline-info"} style={{width:70,marginLeft:10}}>Copy</Button>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <Nav className="flex-column">
                            {rooms.map((room)=>
                            {
                                return(
                                <Nav.Item key={room}>
                                    <Nav.Link key={room} eventKey={room} /*onSelect={this.joinRoom}>{room}</Nav.Link>
                                </Nav.Item>
                                );
                            })}
                        </Nav>
                    </Col>
                    <Col sm={9} >
                        <TabContent>
                            {rooms.map((room)=>
                            {
                                return(
                                    <TabPane key={room} eventKey={room}>
                                        <div className={"wrapper"}>
                                            <div className={"left"} style={{height:this.state.height}}>
                                                <Form.Control as={"textarea"} style={{resize: "none"}} key={room} rows={2} id={room} placeholder={"Write your Code ..."} /*onInput={this.send}/>
                                            </div>
                                            <Draggable axis="y" onDrag={(e)=> this.resize(e)} scale={0}>
                                            <div className={"handle"}/>
                                            </Draggable>
                                            <div className={"content"}>
                                                <Form.Control as={"textarea"} style={{resize: "none",height:"100%"}} key={room} rows={2} id={room} placeholder={"Write your Code ..."} /*onInput={this.send}/>
                                            </div>
                                        </div>
                                    </TabPane>
                                );
                            })}
                        </TabContent>
                    </Col>
                </Row>
            </TabContainer>*/
        );
    }
}


export default SessionLayout;