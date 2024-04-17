import React, { Component } from 'react'
import {TextField}  from '@material-ui/core'
import './UserInfo.css'

class EditInfo extends Component {
    render() {
        const  {name,defaultValue,label,onChange} = this.props;
        return (
            <TextField
            name = {name}
            value = {defaultValue}
            label = {label}
            onChange = {onChange}
            className = 'inputBox'
        />         

        )
    }
}

export default EditInfo
