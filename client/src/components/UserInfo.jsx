import React, {Component} from "react";
import axios from "axios";
import {Button, Card, Row, FormControl as Input,InputGroup} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import python from "../images/python.jpg";
import ImageUpload from "./ImageUpload";

class UserInfo extends Component {
    componentDidMount() {
      axios.get("/getUserInfo")
          .then(res =>{
              this.setState({
                  image: res.image,
                  username: res.username,
                  firstName: res.firstName,
                  lastName: res.lastName,
                  email: res.email,
                  password: res.password
              })
          })
    };

    state = {
        uploadForm : false,
        image: python,
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null
    };

    inputChangeHandler = (e)=>{
      this.setState({[e.target.id] : e.target.value})
    };

    openUploadForm = ()=>{
        this.setState({uploadForm:true});
    };

    closeUploadForm = ()=>{
        this.setState({uploadForm:false});
    };

    saveChangeHandler = ()=>{
      axios.post("/updateUserInfo")
          .then(res=>{
              console.log(res + "User Info Updated");
          }).catch(err=>{
              console.log(err);
      })
    };

    changeImageHandler = (uploadedImage)=>{
        console.log(uploadedImage);
        this.setState({
            image: uploadedImage
        })
    };

    updateImage = (uploadImage)=>{
        this.setState({image: uploadImage});
        document.getElementsByClassName("userInfoImage");
    };

    render() {
        return (
            <div>
                <Container style={{paddingLeft: 100,marginTop: 100, height:500}}>
                    <Row>
                        <Card className={"pictureCard"}>
                            <Card.Header>User Picture</Card.Header>
                            <Card.Body className={"Body"}>
                                <Card className={"imageDiv"}>
                                    <Card.Img
                                        src={python}
                                        className={"userInfoImage"}
                                    />
                                    <Card.Body className={"editButton"}>
                                        <button onClick={this.openUploadForm} className={"userInfoImageButton"} >Edit</button>
                                    </Card.Body>
                                </Card>
                                <Card.Subtitle>Username</Card.Subtitle>
                            </Card.Body>
                        </Card>
                        <ImageUpload
                            changeImage={this.changeImageHandler}
                            show={this.state.uploadForm}
                            onHide={this.closeUploadForm}
                            updateImage={this.updateImage}
                        />
                        <Card className={"informationCard"}>
                            <Card.Header>User Information</Card.Header>
                            <Card.Body >
                                <InputGroup>
                                    <InputGroup.Prepend><InputGroup.Text>First Name</InputGroup.Text></InputGroup.Prepend>
                                    <Input id={"firstName"} value={this.state.firstName} onChange={this.inputChangeHandler}/>
                                </InputGroup><br/>
                                <InputGroup>
                                    <InputGroup.Prepend><InputGroup.Text>Last Name</InputGroup.Text></InputGroup.Prepend>
                                    <Input id={"lastName"} value={this.state.lastName} onChange={this.inputChangeHandler}/>
                                </InputGroup><br/>
                                <InputGroup>
                                    <InputGroup.Prepend><InputGroup.Text>Username</InputGroup.Text></InputGroup.Prepend>
                                    <Input id={"username"} value={this.state.username} onChange={this.inputChangeHandler}/>
                                </InputGroup><br/>
                                <InputGroup>
                                    <InputGroup.Prepend><InputGroup.Text>Password</InputGroup.Text></InputGroup.Prepend>
                                    <Input id={"password"} value={this.state.password} onChange={this.inputChangeHandler}/>
                                </InputGroup><br/>
                                <InputGroup>
                                    <InputGroup.Prepend><InputGroup.Text>Email</InputGroup.Text></InputGroup.Prepend>
                                    <Input id={"email"} value={this.state.email} onChange={this.inputChangeHandler}/>
                                </InputGroup><br/>
                            </Card.Body>
                            <Card.Footer><Button
                                variant={"primary"}
                                onClick={this.saveChangeHandler}>Save changes</Button>
                            </Card.Footer>
                        </Card>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default UserInfo;