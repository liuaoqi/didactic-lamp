import React, { Component } from 'react'
import  {v4 as uuidv4} from 'uuid'
import JournalEntries from './JournalEntries'
import './Journal.css'


class JournalList extends Component {
    render() {
        const {entries} = this.props
        const reverseEntries = entries.slice().reverse();
        const entriesLength = entries.length;
        return (
        <div className = 'entriesJournal'>      

               {reverseEntries.map((entry,index)=>(  
                 <JournalEntries
                    key={uuidv4(
                        entry
                      )}

                        index = {entriesLength-index}
                        entry = {entry}

                    />
                    ))} 
         </div>
        )
    }
}


export default JournalList
