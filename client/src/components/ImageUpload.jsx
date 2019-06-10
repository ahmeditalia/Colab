import React, {Component} from 'react';
import {Button, Modal} from "react-bootstrap";
import axios from "axios";

class ImageUpload extends Component {
    state ={
        image : null,
        button: true
    };

    imageChange = (e)=>{
        this.setState({
            image: e.target.files[0],
            button: false
        });
        console.log("image upload");
    };

    changeImage = ()=>{
      console.log(this.state.image);
      axios.post("/updateUserImage").then(res=>{
          console.log(res);
          this.props.updateImage(res.data.image);
      });
      this.props.onHide();
    };

    render() {
        return (
            <Modal {...this.props}  style={{color:"black"}} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Upload Image
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type={"file"} onChange={this.imageChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" disabled={this.state.button} onClick={this.changeImage}>Done</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ImageUpload;