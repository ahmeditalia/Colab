import React, {Component} from 'react';
import {Accordion, Button, Card, Col, Nav, Row,Tab} from "react-bootstrap";
import {MDBIcon} from "mdbreact";
import requireAuth from "../authentication/requireAuth";
import {connect} from "react-redux";
import {
    MY_SESSIONS,
    SESSION_DESCRIPTION,
    SESSION_HIDDEN,
    SESSION_ID,
    SESSION_NAME
} from "../../store/dataMapping/session";
import {getMySessions} from "../../store/actions/sessionActions/getMySessionsAction";
import MySessions from "./MySessions";


class Notifications extends Component {

    state={
        loaded: false
    };

    join = ()=>{

    };

    componentDidMount() {
        this.props.getMySessions(()=>{
            this.setState({loaded: true});
        });
    }

    componentWillUnmount() {
        this.setState({loaded:false})
    }

    render() {
        /*if (!this.state.loaded) {
            return <h2>Loading...</h2>
        }else if(!this.props[MY_SESSIONS]) {
            return <h2>No Sessions</h2>
        }else*/ return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Tab 1</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Tab 2</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <MySessions/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h2>second</h2>

                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}

const mapStateTpProps=(combinedReducer)=>{
    return{
        [MY_SESSIONS]: combinedReducer.sessionStorage[MY_SESSIONS]
    };
};
const mapDispatchTpProps=(dispatch)=>{
    return{
        getMySessions: (callback)=> dispatch(getMySessions(callback))
    };

};

export default connect(mapStateTpProps,mapDispatchTpProps)(requireAuth(Notifications));