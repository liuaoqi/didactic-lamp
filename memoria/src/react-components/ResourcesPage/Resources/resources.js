import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Button } from "@material-ui/core";
import { resourcesContainerStyle, tablePageTitleCellStyle } from "./styles.js";
import "./styles.css";

class Resources extends React.Component {
    state = {
        resources: []
    }

    componentDidMount() {
        // server call to get list of resources
        fetch('/api/getresources').then((res) => {
            if (res.status === 200) {
                return res.text()
                
            } else {
                alert("Could not load resources, try again later.")
            }
        }).then((resources) => {
            this.setState({resources: JSON.parse(resources)})
        }).catch((error) => {
            console.log(error)
            alert("Could not load resources, try again later.")
        })
    }

    handleResourceClicked = (url) => {
        if (!url) {
            return
        } else {
            window.open(url)
        }
    }
    render() {

        function createRow(name, link, number) {
            return {name, link, number};
        }
        const resources = this.state.resources
        const rows = (resources === undefined) ? [] : resources.map((resource) => {
            return createRow(resource.name, resource.url, resource.phoneNumber)
        })
        return (
            <div className="resourcesContainer">
                <div className="resourcesBlock">
                    <div>
                        <TableContainer style={resourcesContainerStyle}>
                            <Table responsive="sm">
                                <TableBody>
                                    {rows.length === 0 ? null : rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell style={tablePageTitleCellStyle} component="th" scope="row">
                                                <Tooltip title={row.link}>
                                                    <Button onClick={() => this.handleResourceClicked(row.link)}>{row.name}</Button>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell style={tablePageTitleCellStyle} component="th" scope="row">
                                                {row.number}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>

            </div>
        );
    }

}

export default Resources;