import React, { Component } from 'react';

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
         <a href={this.props.link}>{this.props.content}</a>
        );
    }
}

export default Button