import React from 'react';
import MapElement from "./MapElement/index.js";
import "./styles.css"
import { Typography, IconButton, Dialog, Tooltip, DialogContent } from '@material-ui/core';
import {titleStyle, dialogStyle, iconStyle} from './styles'
import {InfoRounded, HelpRounded} from "@material-ui/icons"
import AverageRatingInfo from "../../assets/AverageRatingInfo.png"
import MapPageTutorial from "../../assets/MapPageTutorial.png"

class MapPage extends React.Component {
    state = {
        infoOpen: false,
        helpOpen: false
    }
    handleInfoClicked = () => {
        this.setState({infoOpen: true})
    }
    handleHelpClicked = () => {
        this.setState({helpOpen: true})
    }
    handleCloseInfo = () => {
        this.setState({infoOpen: false})
    }
    handleCloseHelp = () => {
        this.setState({helpOpen: false})
    }

    render() {
        const {infoOpen, helpOpen} = this.state
        return (
            <div>
                <Typography variant="h4" style={titleStyle}>Memoria Map</Typography>
                <div className="mapPageButtonContainer">
                    <Tooltip title="About Map">
                        <IconButton onClick={() => this.handleInfoClicked()}>
                            <InfoRounded style={iconStyle}/>
                        </IconButton>
                    </Tooltip>
                    <Dialog open={infoOpen} onClose={() => this.handleCloseInfo()}>
                        <DialogContent style={dialogStyle}>
                            <img className="mapPageInfo" src={AverageRatingInfo} alt="average rating info"/>
                        </DialogContent>
                    </Dialog>
                    <Tooltip title="How to use">
                        <IconButton onClick={() => this.handleHelpClicked()}>
                            <HelpRounded style={iconStyle}/>
                        </IconButton>
                    </Tooltip>
                    <Dialog open={helpOpen} onClose={() => this.handleCloseHelp()}>
                        <DialogContent style={dialogStyle}>
                            <img className="mapPageHelp" src={MapPageTutorial} alt="map tutorial"/>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="mainMapPageContainer">
                    <MapElement/>
                </div>
            </div>
            
        )
    }
}

export default MapPage