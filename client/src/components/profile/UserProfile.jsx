import React, {Component} from "react";
import ProfileImage from "./ProfileImage";
import {getProfile} from "../../store/actions/profileActions/getProfileAction";
import ProfileInfo from "./ProfileInfo";
import {connect} from "react-redux";
import {Alert, Form} from "react-bootstrap";
import {updateProfile} from "../../store/actions/profileActions/updateProfileAction";

class UserProfile extends Component {

    state ={
        validated: false
    };

    componentWillMount() {
        this.props.getProfile();
    }

    saveChanges = (e)=>{
        if(e.currentTarget.checkValidity()) {
            e.preventDefault();
            this.props.updateProfile(this.props.user, this.props.history)
        }
        e.preventDefault();
        this.setState({validated: true});
    };

    render() {
        if(!this.props.user) {
            return (
                <Alert variant="success">
                    <Alert.Heading>Loading...</Alert.Heading>
                </Alert>
            )
        }
        else{
            return (
                <Form id={"profile_form"} className={"profile"} onSubmit={this.saveChanges} noValidate validated={this.state.validated}>
                    <ProfileImage/>
                    <ProfileInfo/>
                </Form>
            )}
    }
}

const mapStateToProps = (combinedReducers)=>{
    return {
        user: combinedReducers.profile.profile
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        getProfile: (callback)=> dispatch(getProfile(callback)),
        updateProfile: (profile,history)=> dispatch(updateProfile(profile,history))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);