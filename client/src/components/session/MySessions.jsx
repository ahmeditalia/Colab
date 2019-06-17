import React, {Component} from 'react';
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import {MDBIcon} from "mdbreact";

class MySessions extends Component {
    state = {
        id: this.props.sessionId,
        sessionName : this.props.sessionName,
        description: this.props.description,
        hidden: this.props.hidden,
        owner: this.props.owner,
        joinUrl: this.props.joinUrl
    };

    render() {
        return (
            this.props.data.map((session)=>
                    <Accordion defaultActiveKey="0" style={{color:"black"}}>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey={session.sessionId}>
                                <Row>
                                    <Col md={{span:2}}>{session.sessionName}</Col>
                                    <Col md={{span:2,offset:8}}><MDBIcon far icon="plus-square" />{"  More Information"}</Col>
                                </Row>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={session.sessionId} style={{paddingRight:"1%"}}>
                                <Row style={{marginTop:"1%", marginBottom:"1%"}}>
                                    <Col md={{ span: 5}} style={{paddingLeft:"30px"}}>
                                        {session.description}
                                    </Col>
                                    <Col md={{span: 1,offset:1}}>
                                        {session.hidden}
                                    </Col>
                                    <Col md={{span: 1,offset:1}}>
                                        {session.owner}
                                    </Col>
                                    <Col md={{span: 1,offset:2}}>
                                        <Button style={{background:"none",color:"black",border:"none"}}>
                                            <MDBIcon icon="sign-in-alt"/>{" Join "}
                                        </Button>
                                    </Col>
                                </Row>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
            )

        );
    }
}

export default MySessions;