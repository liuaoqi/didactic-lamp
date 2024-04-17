import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import "../User/styles.css";
import ResourcesRow from "./ResourcesRow";
import NewResource from "./AddResource"
import  {v4 as uuidv4} from 'uuid'

class ResourcesTable extends React.Component {

    state = {
        editMode: false
    }

    handleEditResource = (value) => {
        let i, resource
        const resources = this.props.resources
        for (i = 0; i < resources.length; i++) {
            resource = resources[i]
            if (resource._id.match(value.selectedResource._id)) {
                resource.name = value.name
                resource.url = value.url
                resource.phoneNumber = value.phoneNumber
            }
        }
        // Update the DOM
        this.setState({ resources: resources })
        // Call handleEditResource to remove the user from database
        this.props.handleEditResource(value)
    }

    handleDeleteResource = (value) => {
        let i, resource, trgtIndex;
        const resources = this.props.resources
        for (i = 0; i < resources.length; i++) {
            resource = resources[i]
            if (resource._id.match(value._id)) {
                trgtIndex = i
            }
        }
        // Update the DOM
        resources.splice(trgtIndex, 1)
        this.setState({ resources: resources })
        // Call handleDeleteResource to remove the user from database
        this.props.handleDeleteResource(value)
    }

    handleAddResource = (value) => {
        let resources = this.props.resources
        resources.push({ name: value.name, url: value.url, phoneNumber: value.phoneNumber })
        this.setState({ resources: resources })
        this.props.handleAddResource(value)
    }

    render() {
        const { handleEditResource, handleAddResource } = this.props
        const { resources } = this.props
        return(
            <div className="tableContainer">
                <TableContainer component={Paper}>
                    <Table stickyHeader responsive="sm">
                        <TableHead>
                            <TableRow>
                                <TableCell>Resource Name</TableCell>
                                <TableCell>URL</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {resources.map((value)=>(  
                         <ResourcesRow
                            key={uuidv4(
                                value
                            )}
                            rowKey = {uuidv4(
                                value
                            )}  
                            value = {value}
                            handleDeleteResource={() => this.handleDeleteResource(value)}
                            handleEditResource={(value) => this.handleEditResource(value) }
                             />
                          ))}
                          <NewResource
                              handleAddResource={(value) => this.handleAddResource(value)}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default ResourcesTable;