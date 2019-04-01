import React, { Component } from 'react';
import {Row, TabContainer, TabContent, TabPane, Nav, Col, Button} from "react-bootstrap";
import '../css/index.css';
import Form from "react-bootstrap/Form";
const serverURL="http://localhost:3001";
class SessionLayout extends Component{




    constructor(props) {
        super(props);
        this.state={
            rooms:this.props.rooms
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



    render() {
        const {rooms} = this.state;
        return(
            <TabContainer id="left-tabs-example" defaultActiveKey={"Master"}>
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
                                    <Nav.Link key={room} eventKey={room} /*onSelect={this.joinRoom}*/>{room}</Nav.Link>
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
                                        <Form.Control as={"textarea"} style={{resize: "none"}} key={room} rows={19} id={room} placeholder={"Write your Code ..."} /*onInput={this.send}*/></Form.Control>
                                    </TabPane>
                                );
                            })}
                        </TabContent>
                    </Col>
                </Row>
            </TabContainer>
        );
    }
}


export default SessionLayout;