import React,{Component} from 'react';
import {Button, ButtonToolbar, Col, Nav, Navbar} from "react-bootstrap";
import logo from "../images/logo_icon.png";

class Header extends Component {

    userPanelOption = (searchBar)=>{
        if(searchBar===true)
        {
            return <searchBar/>;
        }
        else return <Col sm={{offset: 5}}/>
    };

    render()
    {
        return(
            <Navbar style={{height:60}} sticky="top">
                <Navbar.Brand href="/Home">
                    <img
                        alt=""
                        src={logo}
                        width="170"
                        height="45"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Nav inline className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <ButtonToolbar>
                    <Button style={{color:"black"}} variant={"link mr-2"} onClick={this.props.openSignUp}>Sign Up</Button>
                    <Button style={{color:"black"}} variant={"link mr-2"} onClick={this.props.openSignIn}>Sign In</Button>
                </ButtonToolbar>
                {/*<Col sm={{offset:1,span:3}}>
                    <Image src={logo} width={170} height={45}></Image>

                </Col>*/}
{/*
                { this.props.login === true
                    ? <LoginForm/>
                    : <UserPanel barOption={this.props.barOption}/>
                }*/}
            </Navbar>
        );
    }
}
export default Header;