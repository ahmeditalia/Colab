import React, { Component } from 'react';
import {Card} from 'react-bootstrap';
import Button from "react-bootstrap/Button";

class DashboardCard extends Component{
    state = {
        collapse:false
    };

    render() {
        const {img,title,description} = this.props.session;
        return(
            <Card onMouseEnter={()=> this.setState({collapse:true})}
                  onMouseLeave={()=> this.setState({collapse:false})}>
                <img src={img} alt={"python"}/>
                    <Card.Body>
                        <Card.Title >{title}</Card.Title>
                        <div>
                            <Card.Text >{description}</Card.Text>
                            <Button>Join</Button>
                        </div>
                    </Card.Body>
            </Card>
        );
    }
}


export default DashboardCard;