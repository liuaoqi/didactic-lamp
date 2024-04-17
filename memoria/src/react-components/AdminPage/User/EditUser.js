import React from "react";
import { Toolbar, Typography, Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import UserTable from './UserTable.js';
import {adminTabTitleStyle} from "../styles"

class EditUser extends React.Component {

    state = {
        selectedUser: null,
        users: null,
        openEditUser: false,
        currUser: null,
        openDialog: false,
        message: ""
    }

    handleOpenDialog = (message) => {
        this.setState({openDialog: true, message: message})
    }

    handleCloseDialog = () => {
        this.setState({openDialog: false})
    }

    getUsers = () => {
        const url = '/api/admin/edit'
        fetch (url) 
        .then((res)=>{
            if(res.status === 200){
                return res.text()
            }
            else{
                alert('Could not get users ')
            }
        })
        .then((users)=>{
            const userList = JSON.parse(users)
            this.setState({
                users: userList.users
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount = () => {
         this.getUsers();
     }

    handleEditUser = (user) => {
        // server call to edit user
        const url = '/api/admin/edit-user'
        fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            if (res.status === 200) {
                this.handleOpenDialog("Changes successfully saved!")
            } else {
                alert('Something went wrong. Please try again.')
            }
        })
    }

    handleDeleteUser = (user) => {
        // server call to delete user
        const url = '/api/admin/delete-user'
        fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            if (res.status === 200) {
                this.handleOpenDialog('User successfully deleted!')
            } else {
                alert('Something went wrong. Please try again.')
            }
        })
    }

    render() {
        const {users} = this.state
        if(users === null){
            return null;
        }
        return(
            <div className="adminContainer">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" style={adminTabTitleStyle}>
                        EDIT USER
                    </Typography>
                </Toolbar>
                <div className="tableOfUsers">
                    <UserTable
                        userList={ this.state.users }
                        userClicked={ this.onClickUser }
                        stateType={ this.state.type }
                        handleDeleteUser={this.handleDeleteUser}
                        handleEditUser={this.handleEditUser}
                        />
                </div>
                <Dialog onClose={() => this.handleCloseDialog()} open={this.state.openDialog}>
                    <DialogContent>
                        <Typography>{this.state.message}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleCloseDialog()}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default EditUser;