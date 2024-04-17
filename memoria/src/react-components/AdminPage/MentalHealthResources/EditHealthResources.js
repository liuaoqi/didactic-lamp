import React from "react";
import { Toolbar, Typography, Dialog, DialogContent, DialogActions, Button } from "@material-ui/core";
import ResourcesTable from './ResourcesTable';
import { adminTabTitleStyle } from "../styles"

class EditHealthResources extends React.Component {

    state = {
        resources: [],
        selectedResource: null,
        openDialog: false,
        message: ""
    }

    handleOpenDialog = (message) => {
        this.setState({openDialog: true, message: message})
    }

    handleCloseDialog = () => {
        this.setState({openDialog: false})
    }

    handleEditResource = (resource) => {
        const url = '/api/admin/edit-resource'
        fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(resource),
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            if (res.status === 200) {
                this.handleOpenDialog("Changes successfully saved!")
            } else {
                alert('Something went wrong. Please try again.')
            }
        })
    }

    handleDeleteResource = (resource) => {
        // server call to delete resource
        const url = '/api/admin/delete-resource'
        fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(resource),
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            if (res.status === 200) {
                this.handleOpenDialog('Resource deleted!')
            } else {
                alert('Something went wrong. Please try again.')
            }
        })
    }

    handleAddResource = (resource) => {
        const newResource = {
            name: resource.name,
            url: resource.url,
            phoneNumber: resource.phoneNumber,
        }
        const url = '/api/admin/add-resource'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(newResource),
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            if (res.status === 200) {
                this.handleOpenDialog('Resource added!')
            } else {
                alert('Something went wrong. Please try again.')
            }
        })
    }

    componentDidMount = () => {
        fetch ('/api/getresources').then((res) => {
            if(res.status === 200){
                return res.text()
            } else{
                alert('Could not get resources.')
            }
        })
        .then((resources)=>{
            this.setState({ resources: JSON.parse(resources) })
        }).catch((error) => {
            console.log(error)
        })
     }

    render() {
        const { resources } = this.state
        if ( resources.length === 0 ){
            return null;
        }
        return(
            <div className="adminContainer">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" style={adminTabTitleStyle}>
                        Manage Mental Health Resources
                    </Typography>
                </Toolbar>
                <div className="tableOfUsers">
                    <ResourcesTable
                        resources={ this.state.resources }
                        handleEditResource = { this.handleEditResource }
                        handleDeleteResource = { this.handleDeleteResource }
                        handleAddResource = { this.handleAddResource }
                        />
                </div>
                <Dialog onClose={() => this.handleCloseDialog()} open={this.state.openDialog}>
                    <DialogContent>
                        <Typography>{ this.state.message }</Typography>
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

export default EditHealthResources;