import React, { Component } from 'react'
import { Button, Dialog, DialogContent, DialogActions, TextField, Typography } from '@material-ui/core';
import './AddEntry.css'
import {dialogStyle, dialogContainerStyle} from "./AddEntryStyles"



class AddEntry extends Component {
    state = { //Intial State 
            entry: '',
            addEntry: false
      }
    
      handleClickedAddEntry = (e) =>{
          e.preventDefault ();
          this.setState ({
              addEntry: !this.state.addEntry
            })
      }

      handleExitEntry = (e) =>{
        e.preventDefault ();
        this.setState ({
            addEntry: !this.state.addEntry
          })
      } 

      handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
       this.setState({

        [name]: value, // [name] sets the object property name to the value of the `name` variable.  THIS SAVES IT TO THE STATE 
                        
        });
      }

     
 
      handleSubmitEntry = (e) => {     //CLICKING SUBMIT WILL MAKE IT APPEAR 
        e.preventDefault ();
        this.props.addEntry(this.state.entry); 
        this.setState ({ 
            addEntry: !this.state.addEntry,
            entry: ''

          })
      }

    render() {
        return (
            <div>
                <Button   
                         className = 'styleNewEntryButton'
                         size = 'large'
                         variant="contained" 
                         color= 'default' 
                         onClick = {this.handleClickedAddEntry}>
                New Entry
                </Button>  
                
                <Dialog PaperProps={{style: dialogContainerStyle}} open = {this.state.addEntry} aria-labelledby="form-dialog-title" fullWidth={true}> 
                    <DialogContent style={dialogStyle}>
                        <Typography variant="h5" style={dialogStyle}>Add New Journal Entry</Typography>
                      <div className = 'entryContainer'>
                          <div className = 'inputContainer'>
                            <TextField
                                name = 'entry'
                                multiline
                                rows={15}
                                fullWidth= {true}
                                onChange = {this.handleChange}
                            />   
                            </div>  
                        </div>
                    </DialogContent>

                    <DialogActions style={dialogStyle} className = 'styleButtons'>
                        <Button 
                            variant='contained'
                             type='submit' 
                             className ='entryButtonsContainer'
                             onClick = {this.handleSubmitEntry}> 
                        Submit
                        </Button>
            
                       <Button 
                             type='submit'
                              className ='exitButtonContainer' 
                              onClick = {this.handleExitEntry}>
                        Exit Without Submitting 
                        </Button>
                 
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default AddEntry
