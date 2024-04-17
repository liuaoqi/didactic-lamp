import React from "react";
import { TableRow, TableCell, TextField, Tooltip, IconButton, Button } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';

class NewResource extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            url: '',
            phoneNumber: '',
            editMode: false
            }
        }

    handleCancel = () => {
        this.setState({
            name: '',
            url: '',
            phoneNumber: '',
            editMode: false
        })
    }

    handleAddResource = (value) => {
        if (value.name.length > 0) {
            if (value.url.length > 0) {
                this.props.handleAddResource(value)
                this.handleCancel()
            } else {
                alert("Please enter the resource url.")
            }
        }  else {
            alert("Please enter the resource name.")
        }
    }

    render() {
        const { rowKey, value, handleAddResource } = this.props
        const editMode = this.state.editMode

        return(
            <TableRow key={ rowKey }>
                <TableCell component="th" scope="row">
                    <TextField disabled={!editMode} name="ResourcesName" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })}/>
                </TableCell>
                <TableCell component="th" scope="row">
                    <TextField disabled={!editMode} name="ResourcesLink" value={this.state.url} onChange={(event) => this.setState({ url: event.target.value })}/>
                </TableCell>
                <TableCell component="th" scope="row">
                    <TextField disabled={!editMode} name='ResourcesContact' value={this.state.phoneNumber} onChange={(event) => this.setState({ phoneNumber: event.target.value })}/>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Tooltip title="Add Resource">
                        {editMode ? 
                        (<div>
                            <Button type='submit' onClick={() => { this.setState({editMode: false}, this.handleAddResource(this.state))}}>
                                Submit
                            </Button>
                            <Button onClick={() => {this.setState({editMode: false}, this.handleCancel())}}>
                                Cancel
                            </Button>
                        </div>) : 
                        (<IconButton onClick={() => {this.setState({editMode: true})} }>
                            <AddCircleIcon/>
                        </IconButton>)
                        }
                        
                    </Tooltip>
                </TableCell>
            </TableRow>
       )
    }
}

export default NewResource;