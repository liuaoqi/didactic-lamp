import React from "react";
import { TableRow, TableCell, TextField, NativeSelect, Tooltip, IconButton, Button } from "@material-ui/core";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';



class UserRow extends React.Component {
    constructor(props) {
        super(props)
        const {value} = props
        this.state = {
            selectedUser: value,
            username: value.username,
            admin: value.admin,
            name: value.name,
            email: value.email,
            region: value.region,
            editMode: false
            }

        }

    handleCancel = () => {
        const {value} = this.props
        this.setState({
            selectedUser: null,
            username: value.username,
            admin: value.admin,
            name: value.name,
            email: value.email,
            region: value.region,
            editMode: false
        })
    }

    handleChangeUserType = (event) => {
        // Update the user type
        const userType = event.target.value
        if (userType.match('Admin')) {
            this.setState({ admin: true })
        } else {
            this.setState({ admin: false })
        }
    }

    render() {
        const { handleDeleteUser, rowKey, value, handleEditUser,handleUserType} = this.props
        const editMode = this.state.editMode

        return(
            <TableRow key={ rowKey }>
                <TableCell component="th" scope="row">
                    <TextField disabled={!editMode} name="Username" value={this.state.username} onChange={(event) => this.setState({username: event.target.value})}/>
                </TableCell>
                <TableCell component="th" scope="row">
                    <TextField disabled={!editMode} name='Name' value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })}/>
                </TableCell>
                <TableCell component="th" scope="row">
                    <NativeSelect disabled={!editMode} defaultValue = {handleUserType}
                                  onChange={(event) => this.handleChangeUserType(event)}>
                        <option value="Admin">Admin</option>
                        <option value="Regular User">Regular User</option>
                    </NativeSelect>
                </TableCell>
                <TableCell component="th" scope="row">
                    <TextField disabled={!editMode} name="Email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })}/>
                </TableCell>
                <TableCell component="th" scope="row">
                    <NativeSelect disabled={!editMode} defaultValue = {this.state.region}
                                  onChange={(event) => this.setState({ region: event.target.value })}>
                        <option value="Ajax">Ajax</option>
                        <option value="Aurora">Aurora</option>
                        <option value="Brampton">Brampton</option>
                        <option value="Brock">Brock</option>
                        <option value="Burlington">Burlington</option>
                        <option value="Caledon">Caledon</option>
                        <option value="Clarington">Clarington</option>
                        <option value="EastGwillimbury">East Gwillimbury</option>
                        <option value="Georgina">Georgina</option>
                        <option value="HaltonHills">Halton Hills</option>
                        <option value="King">King</option>
                        <option value="Markham">Markham</option>
                        <option value="Milton">Milton</option>
                        <option value="Mississauga">Mississauga</option>
                        <option value="Newmarket">Newmarket</option>
                        <option value="Oakville">Oakville</option>
                        <option value="Oshawa">Oshawa</option>
                        <option value="Pickering">Pickering</option>
                        <option value="RichmondHill">Richmond Hill</option>
                        <option value="Scugog">Scugog</option>
                        <option value="Toronto">Toronto</option>
                        <option value="Uxbridge">Uxbridge</option>
                        <option value="Vaughan">Vaughan</option>
                        <option value="Whitby">Whitby</option>
                        <option value="Whitchurch-Stouffville">Whitchurch-Stouffville</option>
                    </NativeSelect>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Tooltip title="Edit User">
                        {editMode ? 
                        (<div>
                            <Button type='submit' onClick={() => { this.setState({editMode: false}, handleEditUser(this.state))}}>
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
                    <Tooltip title="Delete User">
                        <IconButton onClick={() => {handleDeleteUser(value)} }>
                            <HighlightOffIcon/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
       )
    }
}

export default UserRow