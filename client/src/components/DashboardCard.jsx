import React, { Component } from 'react';
import {Collapse, Row, Card, CardGroup, CardColumns, CardDeck} from 'react-bootstrap';
import img1 from "../images/python.jpg";
import img2 from "../images/abstract-matrix.jpg";
import img3 from "../images/i_love_java_wallpaper.jpg";
import img4 from "../images/Think_Different.jpg";
import Button from "react-bootstrap/Button";

class DashboardCard extends Component{
    state = {
        collapse:false
    };

    render() {
        return(
            <Row>
                <CardDeck>
                <Card className={"card"} onMouseEnter={()=> this.setState({collapse:true})}
                      onMouseLeave={()=> this.setState({collapse:false})}>
                    <img src={img1} className={"img"} alt={"python"}/>
                        <Card.Body className={"data"}>
                            <Card.Title >Think and Code</Card.Title>
                            <div className={"content"}>
                            <Card.Text >put ur text here,
                                put ur text here</Card.Text>
                            <Button>Join</Button>
                            </div>
                        </Card.Body>
                </Card>
                <Card className={"card"} onMouseEnter={()=> this.setState({collapse:true})}
                      onMouseLeave={()=> this.setState({collapse:false})}>
                    <img src={img2} className={"img"} alt={"python"}/>
                    <Card.Body className={"data"}>
                        <Card.Title >Think and Code</Card.Title>
                        <div className={"content"}>
                            <Card.Text >put ur text here,
                                put ur text here</Card.Text>
                            <Button>Join</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card className={"card"} onMouseEnter={()=> this.setState({collapse:true})}
                      onMouseLeave={()=> this.setState({collapse:false})}>
                    <img src={img3} className={"img"} alt={"python"}/>
                    <Card.Body className={"data"}>
                        <Card.Title >Think and Code</Card.Title>
                        <div className={"content"}>
                            <Card.Text >put ur text here,
                                put ur text here</Card.Text>
                            <Button>Join</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card className={"card"} onMouseEnter={()=> this.setState({collapse:true})}
                      onMouseLeave={()=> this.setState({collapse:false})}>
                    <img src={img4} className={"img"} alt={"python"}/>
                    <Card.Body className={"data"}>
                        <Card.Title >Think and Code</Card.Title>
                        <div className={"content"}>
                            <Card.Text >put ur text here,
                                put ur text here</Card.Text>
                            <Button>Join</Button>
                        </div>
                    </Card.Body>
                </Card>
                </CardDeck>
            </Row>
        );
    }
}


export default DashboardCard;