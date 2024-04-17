import React, { Component } from 'react'
import JournalList from './JournalList'
import AddEntry from  '../AddEntry/AddEntry'
import './Journal.css'
import MessageSnackBar from '../../MessageSnackBar'

class Journal extends Component {
    
    state = { 
        entries: [],
        openSnackBar: false,
        message: ""
 };
    getEntries = () => {
        const username = this.props.state.userInfo.username
        const url = '/api/getprofile'
        fetch (url, { 
            method: 'post', 
            body: JSON.stringify({username: username}),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            if(res.status === 200){
                return res.text()
            }
            else{
                alert('Could not get entries')
            }
        })
        .then((text)=>{
            const json = JSON.parse(text)
            this.setState({
                entries: json.journalEntries 
            })
        }).catch((error) => {
            console.log(error)
        })
      
    }

    componentDidMount(){
       this.getEntries();
    }

    handleCloseSnackBar = () => {
        this.setState({openSnackBar: false})
    }

    addEntry =  (entry) =>  {
        // server call to add entry to user's entries
        const newEntry = {
            entry: entry,
            username: this.props.state.userInfo.username
        }
        const request = new Request('/api/profile', {
            method: 'post', 
            body: JSON.stringify(newEntry),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
        fetch(request)
        .then((res) => {
            if(res.status === 200){
                return res.text()
            }
            else{
                alert('Could not get add entry')
            }
        })
        .then((text)=>{
            this.setState ({ entries: [...this.state.entries, newEntry]}, () => {this.setState({openSnackBar: true, message: "Added journal entry!"})})
        })
        .catch((error) => {
            console.log(error)
        })
       
    }

    render() {
        if(this.state.entries === null ){
            return null;
        }
        return (
            <div>
                <h2 className ='journalTitle'>My COVID Journal</h2>
                 <JournalList entries = {this.state.entries} />
                 <AddEntry addEntry = {this.addEntry}/>
                 <MessageSnackBar message={this.state.message} openSnackBar={this.state.openSnackBar} handleClose={this.handleCloseSnackBar}></MessageSnackBar>
            </div>
        )
    }
}



export default Journal
