import React, {Component} from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {MDBIcon} from "mdbreact";
import {connect} from "react-redux";
import {getSessions} from "../../store/actions/sessionActions/getSessionsAction";


class SearchBar extends Component {

    state={
        search: null
    };

    changeState= (e)=>{
        if(e.keyCode === 13)
            this.search();
        else
            this.setState({[e.target.id]: e.target.value});
    };

    search =()=>{
        this.props.getSessions(this.state.search);
    };

    render() {
        return (
            <InputGroup  size="sm" className="p-1 mr-5" style={{width:500}}>
                <FormControl
                    placeholder="Search Session"
                    aria-label="Search Session"
                    aria-describedby="basic-addon2"
                    onKeyDown={this.changeState}
                />
                <InputGroup.Append size="sm">
                    <Button className={"shadow-none"} variant="link" style={{borderColor: "white"}} onClick={this.search}>
                        <MDBIcon icon="search" style={{color:"white"}}/>
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        getSessions: (sessionName)=> dispatch(getSessions(sessionName))
    }
};

export default connect(null,mapDispatchToProps)(SearchBar);