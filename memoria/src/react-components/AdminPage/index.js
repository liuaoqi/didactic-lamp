import React from "react"
import { Tab, Tabs } from "@material-ui/core"
import { TabPanel, TabContext } from '@material-ui/lab';
import './styles.css'
import {lightPurpleTab, purpleTab, darkPurpleTab} from './styles'
import EditUser from './User/EditUser.js';
import AddUser from './User/AddUser.js';
import EditHealthResources from './MentalHealthResources/EditHealthResources.js'
import ExportData from "./ExportDataPage";


class AdminPage extends React.Component {
    state = {
        tab: '0'
    }

    handleChangeTab = (e, value) => {
        e.preventDefault()
        this.setState({tab: value})
    }

    render() {
        return (
            <div>
                <div className='mainContainer'>
                    <TabContext value={this.state.tab} onChange={this.handleChangeTab}>
                        <div className='tabMenuContainer'>
                            <Tabs className='tabs' onChange={this.handleChangeTab} value={this.state.tab} orientation='vertical'>
                                <Tab style={lightPurpleTab} label="Manage Users" value='0'></Tab>
                                <Tab style={purpleTab} label="Add User" value='1'></Tab>
                                <Tab style={darkPurpleTab} label="Export Region Data" value='2'></Tab>
                                <Tab style={darkPurpleTab} label="Mental Health Resources" value='3'></Tab>
                            </Tabs>
                        </div>
                        <div className='tabPagesContainer'>
                            <TabPanel value='0'>
                                <EditUser/>
                            </TabPanel>
                            <TabPanel value='1'>
                                <AddUser/>
                            </TabPanel>
                            <TabPanel value='2'>
                                <ExportData/>
                            </TabPanel>
                            <TabPanel value='3'>
                                <EditHealthResources/>
                            </TabPanel>
                        </div>
                    </TabContext>
                </div>
            </div>
        )
    }
}



export default AdminPage