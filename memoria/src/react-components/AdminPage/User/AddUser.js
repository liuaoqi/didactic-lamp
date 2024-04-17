import React from "react";
import { Toolbar, Typography, Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import CreateAccountForm from "../../LogIn/CreateAccountForm.js";
import {adminTabTitleStyle} from "../styles";

class AddUser extends React.Component {

    state = {
        selectedUser: null,
        type: 'add',
        openDialog: false,
        message: ''
    }
    
    onClickUser = (user) => {
        if (user) {
            alert(user.name);
        }
    }

    handleOpenDialog = (message) => {
        this.setState({openDialog: true, message: message})
    }

    handleCloseDialog = () => {
        this.setState({openDialog: false})
    }

    handleAddNewUser = (values) => {
        // make call to server to validate account creation
        const user = {
            username: values.newUsername,
            password: values.newPassword,
            name: values.newName, 
            region: values.newRegion, 
            email: values.newEmail
        };
        fetch('/api/createaccount', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            if (res.status === 200) {
                this.handleOpenDialog("Successfully create new user!")
            } else {
                alert("Something went wrong. Please try again.")
            }
          })
    }

    render() {
        return(
            <div className="adminContainer">
                <Toolbar variant="dense">
                    <Typography variant="h6" style={adminTabTitleStyle}>
                        ADD USER
                    </Typography>
                </Toolbar>
                <div className='newUserFormContainer'>
                    <CreateAccountForm onSubmit={(values) => this.handleAddNewUser(values)}/>
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

export default AddUser;