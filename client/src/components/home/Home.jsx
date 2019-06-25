import React, {Component} from 'react';
import {Col, Dropdown, Modal, Row} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Invitations from "../header/Invitations";
import YouTube from "react-youtube";


class Home extends Component {

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {
        const opts = {
            height: '310',
            width: '520',
            playerVars: {
                autoplay: 1
            }
        };

        return (
            <div>
                <Container style={{marginTop:100}}>
                    <Row>
                        <Col sm={{span: 5}} style={{marginTop: 50}}>
                            <h1>About Us</h1>
                            <p style={{fontSize: 26}}>
                                Passionate students aiming to improve collaborative editing with an easy to use
                                and extendable tool
                            </p>
                        </Col>
                        <Col sm={{span:6}} style={{paddingLeft:117}}>
                            <YouTube
                                videoId="2g811Eo7K8U"
                                opts={opts}
                                onReady={this._onReady}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


export default Home;