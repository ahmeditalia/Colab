import React, {Component} from "react";
import {Button, Card, FormControl as Input, InputGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {updateProfile} from "../../store/actions/profileActions/updateProfileAction";
import {withRouter} from "react-router-dom";

class ProfileInfo extends Component {


    inputChangeHandler = (e)=>{
        this.props.handleProfileChange(e.target.id,e.target.value);
    };

    saveChanges = ()=>{
        this.props.updateProfile(this.props.user,()=>{
            this.props.history.push("/dashboard");
        })
    };


    render() {
        return (
            <Card className={"informationCard"}>
                <Card.Header>User Information</Card.Header>
                <Card.Body>
                    <InputGroup>
                        <InputGroup.Prepend><InputGroup.Text>First Name</InputGroup.Text></InputGroup.Prepend>
                        <Input id={"firstName"} value={this.props.user.firstName} onChange={this.inputChangeHandler}/>
                    </InputGroup><br/>
                    <InputGroup>
                        <InputGroup.Prepend><InputGroup.Text>Last Name</InputGroup.Text></InputGroup.Prepend>
                        <Input id={"lastName"} value={this.props.user.lastName} onChange={this.inputChangeHandler}/>
                    </InputGroup><br/>
                    <InputGroup>
                        <InputGroup.Prepend><InputGroup.Text>Username</InputGroup.Text></InputGroup.Prepend>
                        <Input id={"username"} value={this.props.user.username} onChange={this.inputChangeHandler}/>
                    </InputGroup><br/>
                    <InputGroup>
                        <InputGroup.Prepend><InputGroup.Text>Password</InputGroup.Text></InputGroup.Prepend>
                        <Input id={"password"} type={"password"} onChange={this.inputChangeHandler}/>
                    </InputGroup><br/>
                    <InputGroup>
                        <InputGroup.Prepend><InputGroup.Text>confirmPassword</InputGroup.Text></InputGroup.Prepend>
                        <Input id={"confirmPassword"} type={"password"} onChange={this.inputChangeHandler}/>
                    </InputGroup><br/>
                    <InputGroup>
                        <InputGroup.Prepend><InputGroup.Text>Email</InputGroup.Text></InputGroup.Prepend>
                        <Input id={"email"} value={this.props.user.email} onChange={this.inputChangeHandler}/>
                    </InputGroup><br/>
                </Card.Body>
                <Card.Footer style={{display:"flex",justifyContent:"flex-end"}}>
                    <Button variant={"primary"} onClick={this.saveChanges}>
                        Save changes
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

const mapStateToProps = (combinedReducers)=>{
    return {
        user: combinedReducers.profile.profile
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        handleProfileChange: (data,value)=> dispatch({type: data,value: value}),
        updateProfile: (profile,callback)=> dispatch(updateProfile(profile,callback))
    }
};



export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ProfileInfo));