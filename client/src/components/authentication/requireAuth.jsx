import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export default function (ComposedComponent) {
    class Authentication extends Component {
        componentWillMount() {
            if (!this.props.authenticated) {
                this.props.history.push('/error');
            }
        }
        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.props.history.push('/error');
            }
        }
        PropTypes = {
            router: PropTypes.object,
        };


        render() {
            return <ComposedComponent {...this.props} />;
        }
    }
    const mapStateToProps = (state)=> {
        return { authenticated: state.auth.authenticated };
    };
    return connect(mapStateToProps)(Authentication);
}