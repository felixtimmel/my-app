import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Button extends Component {
    constructor (props) {
        super(props)

        this.state = {
            content: "",
            link: ""
        }
    }

    render() {
        return (
            <Link to={this.props.link}>{this.props.content}</Link>
        );
    }
}

export default Button