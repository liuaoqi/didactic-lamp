import React from "react";
import { TableRow, TableCell, TextField, NativeSelect, Tooltip, IconButton, Button } from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';

class ResourcesRow extends React.Component {
    constructor(props) {
        super(props)
        const {value} = props
        this.state = {
            selectedResource: value,
            name: value.name,
            url: value.url,
            phoneNumber: value.phoneNumber,
            editMode: false
            }

        }

    handleCancel = () => {
        const {value} = this.props
        this.setState({
            selectedResource: null,
            name: value.name,
            url: value.url,
            phoneNumber: value.phoneNumber,
            editMode: false
        })
    }

    render() {
        const { rowKey, value, handleEditResource, handleDeleteResource } = this.props
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
                    <Tooltip title="Edit Resource">
                        {editMode ? 
                        (<div>
                            <Button type='submit' onClick={() => { this.setState({editMode: false}, handleEditResource(this.state))}}
                                >
                                Submit
                            </Button>
                            <Button onClick={() => {this.setState({editMode: false}, this.handleCancel())}}>
                                Cancel
                            </Button>
                        </div>) : 
                        (<IconButton onClick={() => {this.setState({editMode: true})} }>
                            <EditIcon/>
                        </IconButton>)
                        }
                        
                    </Tooltip>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Tooltip title="Delete Resource">
                        <IconButton onClick={() => {handleDeleteResource(value)} }>
                            <HighlightOffIcon/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
       )
    }
}

export default ResourcesRow;