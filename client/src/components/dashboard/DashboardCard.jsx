import React, { Component } from 'react';
import {Card} from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import {SESSION_DESCRIPTION, SESSION_ID, SESSION_NAME} from "../../store/dataMapping/session";
import {JOIN_SESSION} from "../../store/dataMapping/serverURLs";

class DashboardCard extends Component{
    state = {
        collapse:false
    };

    render() {
        return(
            <Card onMouseEnter={()=> this.setState({collapse:true})}
                  onMouseLeave={()=> this.setState({collapse:false})}>
                <img src={"../../images/python.jpg"} alt={this.props.session[SESSION_NAME]}/>
                    <Card.Body>
                        <Card.Title >{this.props.session[SESSION_NAME]}</Card.Title>
                        <div>
                            <Card.Text >{this.props.session[SESSION_DESCRIPTION]}</Card.Text>
                            <Button href={JOIN_SESSION + this.props.session[SESSION_ID]}>Join</Button>
                        </div>
                    </Card.Body>
            </Card>
        );
    }
}


export default DashboardCard;