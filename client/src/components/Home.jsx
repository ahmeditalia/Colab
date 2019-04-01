import React, { Component } from 'react';
import {Col, Button, InputGroup, FormControl, Form, Navbar} from 'react-bootstrap';

class Interface extends Component{
    state={
        session: "",
        singedIn: false
    };


    createSession = async ()=>{
        let response = await fetch("/createSession",
            {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ session : this.state.session }),
            });
        let data = await response.json();
        if(data.exist)
        {
            alert("this already used name");
            return;
        }
        this.props.history.push('/Session/'+this.state.session);
    };

    joinSession = async ()=>{
        let response = await fetch("/joinSession",
            {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ session : this.state.session }),
            });
        let data = await response.json();
        if(data.exist)
            this.props.history.push('/Session/'+this.state.session);
        else
            alert("No Such Session");
    };

    updateSession = (event)=>{
        console.log(event.target.value);
        this.setState({session:event.target.value});
    };

    show = ()=>{
        console.log("clicked");
        this.setState({signedIn: true});
    };

    render() {
        const {session} = this.state;
        return(
            <Navbar  bg="dark" variant="dark">
                {console.log(this.state)}
                <Col>
                <InputGroup>
                    <FormControl
                        id={"sessionName"}
                        onInput={this.updateSession}
                        placeholder="Session's Name"
                        aria-label="Session's Name"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button onClick={this.createSession} variant="outline-secondary">Create</Button>
                        <Button  onClick={this.joinSession} variant="outline-secondary">Connect</Button>
                    </InputGroup.Append>
                </InputGroup>
                </Col>
                {/*<Col sm={"2"}>
                    <h5>Welcome username</h5>
                    <Button variant="primary" onClick={this.show}>
                        Sign Out
                    </Button>
                </Col>*/}
                <Col sm={"2.5"}>
                    <form id={"form"} onSubmit={this.show}>
                        <Form.Row>
                            <Form.Label column>
                                Username
                            </Form.Label>
                            <Col sm={"8"}>
                                <Form.Control size={"sm"} placeholder="Username" />
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Form.Label column>
                                Password
                            </Form.Label>
                            <Col sm={"8"}>
                                <Form.Control size={"sm"} type="password" placeholder="Password" />
                            </Col>
                        </Form.Row>
                        <Button variant="primary" type={"submit"}>
                            Sign in
                        </Button>
                    </form>
                </Col>
            </Navbar>
        );
    }
}


export default Interface;