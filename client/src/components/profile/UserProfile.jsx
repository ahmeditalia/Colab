import React, {Component} from "react";
import ProfileImage from "./ProfileImage";
import {getProfile} from "../../store/actions/profileActions/getProfileAction";
import ProfileInfo from "./ProfileInfo";
import {connect} from "react-redux";

class UserProfile extends Component {

    state = {
        loading: true
    };

    componentDidMount() {
        this.props.getProfile(()=>{
            this.setState({loading: false});
        });
    }

    render() {
        if(this.state.loading) {
            return "loading..."
        }
        else{
            return (
                <div className={"profile"}>
                    <ProfileImage/>
                    <ProfileInfo/>
                </div>
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
        getProfile: (callback)=> dispatch(getProfile(callback))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);