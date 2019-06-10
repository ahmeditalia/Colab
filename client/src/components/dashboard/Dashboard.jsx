import React, { Component } from 'react';
import DashboardCard from "./DashboardCard";
import {CardColumns} from "react-bootstrap";
import {connect} from "react-redux";
import {getSessions} from "../../store/actions/sessionActions/getSessionsAction";


class Dashboard extends Component{


    componentWillMount() {
        this.props.getSessions();
    }

    render() {
        return(
            <CardColumns>
                {this.props.sessions.map((session)=> <DashboardCard session={session}/>)}
            </CardColumns>
        );
    }
}


const mapStateToProps = (combineReducers)=>{
    return {
        sessions: combineReducers.sessionStorage.sessions
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        getSessions: (sessionName = "all")=> dispatch(getSessions(sessionName))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);