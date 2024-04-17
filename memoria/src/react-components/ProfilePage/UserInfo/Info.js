import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import './UserInfo.css'

 class Info extends Component {

    render() {

        const  {name,defaultValue,label, type} = this.props;
        return (
        <TextField
            disabled
            name = {name}
            value = {defaultValue}
            label = {label}
            type = {type ? type : "text"}
            className = 'inputBox'
        />
        )
    }
}

export default Info
