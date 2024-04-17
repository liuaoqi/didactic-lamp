import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import "./styles.css";
import UserRow from "./UserRow";
import  {v4 as uuidv4} from 'uuid'

class UserTable extends React.Component {

    state = {
        editMode: false
    }

    handleUserType = (user) => {
        if (user.admin) {
            return('Admin')
        } else {
            return('Regular User')
        }
    }

    handleEditUser = (value) => {
        let i, user
        const users = this.props.userList
        for (i = 0; i < users.length; i++) {
            user = users[i]
            if (user._id.match(value.selectedUser._id)) {
                user.username = value.username
                user.admin = value.admin
                user.name = value.name
                user.email = value.email
                user.region = value.region
            }
        }
        // Update state with the new user info
        this.setState({ users: users })
        // Call handleEditUser to edit the user in the database
        this.props.handleEditUser(value)
    }

    handleDeleteUserRow = (value) => {
        let i, user, trgtIndex;
        const users = this.props.userList
        for (i = 0; i < users.length; i++) {
            user = users[i]
            if (user._id.match(value._id)) {
                trgtIndex = i
            }
        }
        // Update the DOM
        users.splice(trgtIndex, 1)
        this.setState({ users: users })
        // Call handleDeleteUser to remove the user from database
        this.props.handleDeleteUser(value)
    }

    render() {
        const { handleEditUser} = this.props
        const {userList} = this.props
        return(
            <div className="tableContainer">
                <TableContainer component={Paper}>
                    <Table stickyHeader responsive="sm">
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>User Type</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Region</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {userList.map((value)=>(  
                         <UserRow
                            key={uuidv4(
                                value
                            )}
                            rowKey = {uuidv4(
                                value
                            )}  
                            value = {value}
                            handleDeleteUser={() => this.handleDeleteUserRow(value)} 
                            handleUserType={this.handleUserType(value)}
                            handleEditUser={(value) => this.handleEditUser(value)}
                             />
                          ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default UserTable;