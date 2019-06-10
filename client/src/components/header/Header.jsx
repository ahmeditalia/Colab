import React,{Component} from 'react';
import {Button, ButtonToolbar, Nav, Navbar} from "react-bootstrap";
import logo from "../../images/logo_icon.png";
import SignUp from "../authentication/SignUp";
import SignIn from "../authentication/SignIn";
import SearchBar from "./SearchBar";
import UserPanel from "./UserPanel";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

class Header extends Component {

    state = {
        signUpForm: false,
        signInForm: false
    };

    openSignUp = ()=>{
        this.setState({signUpForm:true});
    };

    closeSignUp = ()=>{
        this.setState({signUpForm:false});
    };

    openSignIn = ()=>{
        this.setState({signInForm:true});
    };

    closeSignIn = ()=>{
        this.setState({signInForm:false});
    };

    loggedInUserView = ()=>{
        return (
            <Navbar sticky="top">
                <Navbar.Brand href="/Home">
                    <img
                        alt=""
                        src={logo}
                        width="170"
                        height="45"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <NavLink className={"nav-link"} to={"/"}>Home</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className={"nav-link"} to={"/dashboard"}>Dashboard</NavLink>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                    <SearchBar/>
                    <UserPanel/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    };

    loggedOutUserView = ()=>{
        return (
            <Navbar sticky="top">
                <Navbar.Brand href="/Home">
                    <img
                        alt=""
                        src={logo}
                        width="170"
                        height="45"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <NavLink className={"nav-link"} to={"/"}>Home</NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className={"nav-link"} to={"/dashboard"}>Dashboard</NavLink>
                        </Nav.Item>
                    </Nav>
                    <ButtonToolbar>
                        <Button style={{color:"white"}} variant={"link mr-2"} onClick={this.openSignUp}>Sign Up</Button>
                        <Button style={{color:"white"}} variant={"link mr-2"} onClick={this.openSignIn}>Sign In</Button>
                    </ButtonToolbar>
                </Navbar.Collapse>
                <SignUp
                    show={this.state.signUpForm}
                    onHide={this.closeSignUp}
                />
                <SignIn
                    show={this.state.signInForm}
                    onHide={this.closeSignIn}
                />

            </Navbar>
        );
    };

    render()
    {
        if(this.props.user){
            console.log("there is a user");
            return this.loggedInUserView();
        }
        else {
            console.log("no user");
            return this.loggedOutUserView();
        }
    }
}

const mapStateToProps = (combinedReducer)=>{
    return{
        user: combinedReducer.auth.user
    }
};

export default connect(mapStateToProps)(Header);