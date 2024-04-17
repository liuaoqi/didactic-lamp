import React, { Component } from 'react'
import './JournalEntries.css'
import {journalEntryTextStyle} from "../ProfileStyles"

class JournalEntries extends Component {
    render() {
        const {entry} = this.props.entry;
        return (
             <li className = 'styleEntriesContainer' >
                <h3 className = 'styleEntrynumber'>Entry {this.props.index}</h3>
                <p style={journalEntryTextStyle} className = 'styleText'> {entry}</p>
             </li>   
        )
    }
}

export default JournalEntries
