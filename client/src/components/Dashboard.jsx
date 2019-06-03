import React, { Component } from 'react';
import {Col, Navbar, Row} from 'react-bootstrap';
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import logo from "../images/logo_icon.png";
// import searchIcon from "../images/Zoom-icon.png";
// import dropDown from "../images/dropdown.png";
// import user from "../images/user.png";
// import ML from "../images/ML.jpg";
// import python from "../images/python.jpg";
// import codeQuality from "../images/code_quality.png";
// import thinkAndCode from "../images/tac.png";
import SessionCreationForm from "./SessionCreationForm";
import SearchBar from "./SearchBar";
import UserPanel from "./UserPanel";
import DashboardCard from "./DashboardCard";


class Dashboard extends Component{
    state = {
      modalShow:false
    };

    modalClose = () => this.setState({ modalShow: false });

    render() {
        return(
            <div style={{color:'white'}}>
                <SessionCreationForm
                    show={this.state.modalShow}
                    onHide={this.modalClose}
                />
                <Navbar style={{backgroundColor:"#43b581",height:103}} sticky="top">
                    <Col sm={{offset: 1}}>
                        <Row>
                            <Image src={logo}/>
                        </Row>
                    </Col>
                    <SearchBar/>
                    <UserPanel/>
                </Navbar>
                <Container style={{marginTop:100,backgroundColor:"#232937"}}>
                    <DashboardCard/>
                    {/*<Row>*/}
                        {/*<Col style={{width:240,height:150}}>*/}
                            {/*<a href="/SessionU"><Image src={thinkAndCode}  width={"100%"} height={150}/></a>*/}
                            {/*<p style={{textAlign: "center" }}>Think and Code</p>*/}
                        {/*</Col>*/}
                        {/*<Col  style={{width:240,height:150}}>*/}
                            {/*<a href="/SessionU"><Image src={python}   width={"100%"} height={150}/></a>*/}
                            {/*<p style={{textAlign: "center" }}>Python</p>*/}
                        {/*</Col>*/}
                        {/*<Col  style={{width:240,height:150}}>*/}
                            {/*<a href="/SessionU"><Image src={ML}  width={"100%"} height={150}/></a>*/}
                            {/*<p style={{textAlign: "center" }}>ML</p>*/}
                        {/*</Col>*/}
                        {/*<Col  style={{width:240,height:150}}>*/}
                            {/*<a href="/SessionU"><Image src={codeQuality}  width={"100%"} height={150}/></a>*/}
                            {/*<p style={{textAlign: "center" }}>Code Quality</p>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                </Container>
            </div>
        );
    }
}


export default Dashboard;