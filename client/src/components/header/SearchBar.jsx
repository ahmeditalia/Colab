import React, {Component} from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {MDBIcon} from "mdbreact";
import {connect} from "react-redux";


class SearchBar extends Component {

    state={
        search: null
    };

    changeState= (e)=>{
        this.setState({[e.target.id]: e.target.value});
    };

    enterSearch = (e)=>{
        if(e.keyCode === 13){}
/*
            this.props.getSessions(this.state.search);
*/
    };

    search =()=>{
        this.props.getSessions(this.state.search);
    };

    render() {
        return (
            <InputGroup  size="sm" className="p-1 mr-5" style={{width:500}}>
                <FormControl
                    id={"search"}
                    placeholder="Search Session"
                    onKeyDown={this.enterSearch}
                    onChange={this.changeState}
                />
                <InputGroup.Append size="sm">
                    <Button className={"shadow-none"} variant="link" style={{borderColor: "white"}} onClick={this.search} >
                        <MDBIcon icon="search" style={{color:"white"}}/>
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
/*
        getSessions: (sessionName)=> dispatch(getSessions(sessionName))
*/
    }
};

export default connect(null,mapDispatchToProps)(SearchBar);