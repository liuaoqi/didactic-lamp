import React from 'react';
import "./styles.css"
import ResultTable from './Table/table';
import {tablePageTitleStyle, iconStyle, dialogStyle} from './styles';
import { Typography, Tooltip, IconButton, Dialog, DialogContent } from '@material-ui/core';
import { InfoRounded } from '@material-ui/icons';
import AverageRatingTableInfo from "../../assets/AverageRatingTableInfo.png";

class TablePage extends React.Component {
    state = {infoOpen: false}

    handleInfoClicked = () => {
        this.setState({infoOpen: true})
    }
    handleCloseInfo = () => {
        this.setState({infoOpen: false})
    }

    render() {
        const {infoOpen} = this.state
        return (
            <div>
                <div>
                    <Typography variant="h4" style={tablePageTitleStyle}>Memoria Table</Typography>
                    <Tooltip title="About Table">
                            <IconButton onClick={() => this.handleInfoClicked()}>
                                <InfoRounded style={iconStyle}/>
                            </IconButton>
                        </Tooltip>
                    <Dialog open={infoOpen} onClose={() => this.handleCloseInfo()}>
                        <DialogContent style={dialogStyle}>
                            <img className="tablePageInfo" src={AverageRatingTableInfo} alt="average rating info"/>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="tablePageMainContainer">
                    <div className="tablePageTableContainer">
                        <ResultTable/>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default TablePage