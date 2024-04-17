import React from "react";
import "./styles.css";
import MapHomeLogo from "../../assets/MapHomeLogo.png"
import WelcomeBackLogo from "../../assets/WelcomeBackLogo.png"
import ResourcesHomeLogo from "../../assets/ResourcesHomeLogo.png"
import TableHomeLogo from "../../assets/TableHomeLogo.png"
import ProfileHomeLogo from "../../assets/ProfileHomeLogo.png"
import { Tooltip } from "@material-ui/core";

class HomePage extends React.Component {

    handleMapTapped = () => {
        this.props.history.push('/map')
    }

    handleTableTapped = () => {
        this.props.history.push('/table')
    }

    handleResourcesTapped = () => {
        this.props.history.push('/resources')
    }

    handleProfileTapped() {
        this.props.history.push('/profile')
    }

    render () {
        return (
            <div className="homeContainer">
                <div>
                    <img src={WelcomeBackLogo} alt="welcome back" className="welcomeBack"/>
                </div>
                <div className="optionsContainer">
                    <div className="imageContainer1">
                        <Tooltip title="Click to see map">
                            <img
                            alt="go to map" 
                            className="image" 
                            src={MapHomeLogo} 
                            onClick={() => this.handleMapTapped()}/>
                        </Tooltip>
                    </div>
                    <div className="imageContainer2">
                        <Tooltip title="Click to see profile">
                            <img 
                            alt="go to profile" 
                            className="image" 
                            src={ProfileHomeLogo} 
                            onClick={() => this.handleProfileTapped()}/>
                        </Tooltip>
                    </div>
                    <div className="imageContainer3">
                        <Tooltip title="Click to see table">
                            <img
                            alt="go to table"
                            className="image"
                            src={TableHomeLogo}
                            onClick={() => this.handleTableTapped()}/>
                        </Tooltip>
                    </div>
                    <div className="imageContainer4">
                        <Tooltip title="Click to see resources">
                            <img 
                            alt="go to mental health resources" 
                            className="image" 
                            src={ResourcesHomeLogo}
                            onClick={() => this.handleResourcesTapped()}/>
                        </Tooltip>
                    </div>
                </div>
            </div>
        );
    }
}


export default HomePage;