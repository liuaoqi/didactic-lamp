import React from "react";
import { Toolbar, AppBar, IconButton, Tooltip } from "@material-ui/core";
import { withRouter } from "react-router-dom"
import {  MenuRounded } from "@material-ui/icons";
import "./styles.css"
import { navBarStyle, iconStyle } from "./styles"
import UserContext from "../Contexts/UserContext";
import Memoria from "../../assets/Memoria.png"
import NavMenu from "./Menu"

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        const {userInfo, loggedIn} = props
        this.state = {
            openMenu: false,
            anchorEl: null,
            loggedIn: loggedIn,
            userInfo: userInfo,
        }
    }

    handleProfileClicked() {
        if (this.props.location.pathname !== "/profile") {
            this.props.history.push("/profile"); 
        }
    }

    handleHomeClicked() {
        if (this.props.location.pathname !== "/home") {
            this.props.history.push("/home")
        }   
    }

    handleAdminEditClicked() {
        if (this.props.location.pathname !== '/admin/edit' && this.state.userInfo.admin) {
            this.props.history.push("/admin/edit")
        }  
    }

    handleopenMenu = (e) => {
        this.setState({openMenu: true, anchorEl: e.currentTarget})
    }

    handleCloseProfileMenu() {
        this.setState({openMenu: false})
    }

    handleMyProfileTapped() {
        this.setState({openMenu: false}, this.handleProfileClicked())
    }

    handleAdminResourcesTapped = () => {
        this.setState({openMenu: false}, this.handleAdminEditClicked())
    }

    handleLogOut = (logOutState) => {
        logOutState()
        this.props.history.push('/login')
    }

    handleMapTapped = () => {
        this.setState({openMenu: false}, this.props.history.push('/map'))
    }

    handleTableTapped = () => {
        this.setState({openMenu: false}, this.props.history.push('/table'))
    }

    handleResourcesTapped = () => {
        this.setState({openMenu: false}, this.props.history.push('/resources'))
    }

    handleSurveyTapped = () => {
        this.setState({openMenu: false}, this.props.history.push('/survey'))
    }

    render() {
        return(
            <UserContext.Consumer>
                {context => (
                    <AppBar style={navBarStyle}> 
                        <Toolbar>
                            <div>
                                <Tooltip title='Home'>
                                    <IconButton onClick={() => this.handleHomeClicked()}>
                                        <img alt="Memoria logo" className='logo' src={Memoria}></img>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className="rightIconsContainer">
                                <div>
                                    <Tooltip title="Menu">
                                        <IconButton style={iconStyle} onClick={(e) => this.handleopenMenu(e)}>
                                            <MenuRounded/>
                                        </IconButton>
                                    </Tooltip>
                                    <NavMenu 
                                            openMenu={this.state.openMenu}
                                            handleCloseProfileMenu={() => this.handleCloseProfileMenu()}
                                            handleProfileTapped={() => this.handleMyProfileTapped()}
                                            handleSurveyTapped={() => this.handleSurveyTapped()}
                                            handleMapTapped={() => this.handleMapTapped()}
                                            handleTableTapped={() => this.handleTableTapped()}
                                            handleResourcesTapped={() => this.handleResourcesTapped()}
                                            anchorEl={this.state.anchorEl}
                                            admin={this.state.userInfo.admin}
                                            handleAdminResourcesTapped={() => this.handleAdminResourcesTapped()}
                                            handleLogOut={() => this.handleLogOut(context.handleLogOut)}
                                            elevation={0}
                                            getContentAnchorEl={null}
                                            anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                            }}
                                            />
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                )}
            </UserContext.Consumer>
        );
    }
}

export default  withRouter(NavigationBar);