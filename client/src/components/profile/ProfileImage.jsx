import React, {Component} from "react";
import {Button, Card, Image} from "react-bootstrap";
import ImageUpload from "./ImageUpload";
import {connect} from "react-redux";

class ProfileImage extends Component {


    state={
        uploadForm: false,
        username: this.props.username
    };

    openUploadForm = ()=>{
        this.setState({uploadForm:true});
    };

    closeUploadForm = ()=>{
        this.setState({uploadForm:false});
    };

    render() {
        return(
            <Card className={"pictureCard"}>
                <Card.Header>User Picture</Card.Header>
                <Card.Body className={"Body"}>
                    <Button variant={"link"} onClick={this.openUploadForm}>
                        <Image
                            className={"myImage"}
                            roundedCircle
                            src={this.props.img.URL}
                        />
                    </Button>
                    {/*<Card className={"imageDiv"}>
                        <Card.Img
                            className={"myImage"}
                            roundedCircle
                            src={this.props.img.URL}
                        />

                        <Card.Body className={"imageBody"}>
                            <Button variant={"light"} onClick={this.openUploadForm} >Edit</Button>
                        </Card.Body>
                    </Card>*/}
                    <Card.Subtitle className="mt-2">{this.state.username}</Card.Subtitle>
                </Card.Body>
                <ImageUpload
                    show={this.state.uploadForm}
                    onHide={this.closeUploadForm}
                />
            </Card>
        );

    }
}

const mapStateToProps = (combinedReducers)=>{
    return {
        username: combinedReducers.profile.profile.username,
        img: combinedReducers.profile.profile.image
    }
};


export default connect(mapStateToProps,null)(ProfileImage);