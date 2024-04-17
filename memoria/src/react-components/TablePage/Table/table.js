import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { tableContainerStyle, tableBlockStyle, tableHeaderStyle, tableRowStyle } from "./styles.js";
import "./styles.css";

class ResultTable extends React.Component {

    state = {
        ratings: {}
    }

    // Get the actual ratings from the backend
    getRatings = () => {
        const url = '/api/homepage-ratings'
        fetch (url).then((res) => {
            if (res.status === 200) {
                return res.json()
            }
            else {
                alert('Could not get ratings')
            }
        }).then((json) => {
            this.setState({
                ratings: json.ratings
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getRatings();
    }

    render() {

        return(
            <div style={ tableBlockStyle } className="tableContainer">
                <div className="TableBlock">
                        <TableContainer component={Paper} style={tableContainerStyle}>
                            <Table stickyHeader responsive="sm">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={tableHeaderStyle}>Regions in GTA</TableCell>
                                        <TableCell style={tableHeaderStyle} align="right">Average Mood Ratings  (1-10)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.values(this.state.ratings).map((rating) => (
                                        <TableRow key={rating.location}>
                                            <TableCell style={tableRowStyle} component="th" scope="row">
                                                {rating.location}
                                            </TableCell>
                                            <TableCell style={tableRowStyle} align="right">{rating.ratings}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                </div>

            </div>
        );
    }
}

export default ResultTable;