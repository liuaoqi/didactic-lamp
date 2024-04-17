import React from 'react'
import { Menu, MenuItem } from "@material-ui/core"
import {  AccountCircle, RoomRounded, TableChartRounded, HealingRounded, EditRounded, ExitToAppRounded, Assignment } from "@material-ui/icons";
import "./styles.css"
import { menuStyle } from "./styles"

const NavMenu = (props) => {
    const {
        openMenu,
        anchorEl,
        handleProfileTapped,
        handleCloseProfileMenu,
        handleAdminResourcesTapped,
        handleMapTapped,
        handleTableTapped,
        handleResourcesTapped,
        admin,
        handleLogOut,
        handleSurveyTapped
    } = props
    return (
        <div>
            <Menu
                style={menuStyle}
                className="navMenu"
                keepMounted
                open={openMenu}
                onClose={handleCloseProfileMenu}
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                    }}
            >
                {admin ? 
                <MenuItem onClick={handleAdminResourcesTapped}>
                    <EditRounded className="icon"/>
                    Admin Resources
                </MenuItem> : null}
                <MenuItem style={menuStyle} className="navMenuItem" onClick={handleProfileTapped}>
                    <AccountCircle className="icon"/>
                     My Profile
                </MenuItem>
                <MenuItem onClick={handleSurveyTapped}>
                    <Assignment className="icon"/>
                    Survey
                </MenuItem>
                <MenuItem onClick={handleMapTapped}>
                    <RoomRounded className="icon"/>
                    Map
                </MenuItem>
                <MenuItem onClick={handleTableTapped}>
                    <TableChartRounded className="icon"/>
                    Table
                </MenuItem>
                <MenuItem onClick={handleResourcesTapped}>
                    <HealingRounded className="icon"/>
                    Mental Health Resources
                </MenuItem>
                <MenuItem onClick={handleLogOut}>
                    <ExitToAppRounded className="icon"/>
                    Log Out
                </MenuItem>
            </Menu>
        </div>
    )
}



export default NavMenu 