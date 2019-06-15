import React, {Component} from 'react';
import {Alert, Button} from "react-bootstrap";


class ErrorPage extends Component {

    goBack = ()=>{
        this.props.history.go(-2);
        console.log(this.props);
    };

    render() {
        return (
            <div className={"errorDiv mt-5"}>
                <h1>401</h1>
                <Alert className={"errorDiv"}>
                    <Alert.Heading>{/*Unauthorized Access*/}UNAUTHORIZED ACCESS</Alert.Heading>
                    <p>
                        Please log in before proceeding
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={this.goBack} variant="outline-success">
                            Previous Page
                        </Button>
                    </div>
                </Alert>
            </div>
        );
    }
}


export default ErrorPage;