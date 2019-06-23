import React, {Component} from 'react';
import {Col, Dropdown, Modal, Row} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Invitations from "../header/Invitations";


class Home extends Component {




    render() {
        return (
            <div style={{backgroundImage:process.env.PUBLIC_URL+"/colab15.jpg",backgroundSize:"cover"}}>
                <Container style={{marginTop:100}}>
                    <Row>
                        <Col sm={{span: 5}} style={{marginTop: 50}}>
                            <h1>About Us</h1>
                            <p style={{fontSize: 26}}>
                                Passionate students aiming to improve collaborative editing with an easy to use
                                and extendable tool
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default Home;