import React from 'react'
import ResultTable from '../TablePage/Table/table'
import './ExportDataPageStyles.css'
import { CSVLink } from 'react-csv'
import { Typography, Dialog, DialogContent, DialogActions, Button } from '@material-ui/core'
import {adminTabTitleStyle} from "./styles"


class ExportData extends React.Component {

    state = {
        data: [],
        showLink: false,
        message: "",
        openDialog: false
    }

    handleOpenDialog = (message) => {
        this.setState({openDialog: true, message: message})
    }

    handleCloseDialog = () => {
        this.setState({openDialog: false})
    }

    handleExport = () => {
        const url = '/api/getRatings'
        fetch (url) 
        .then((res)=>{
            if(res.status === 200){
                return res.text()
            }
            else{
                alert('Could not get ratings')
            }
        })
        .then((ratings)=>{
            const ratingList = JSON.parse(ratings)
            this.setState({
                data: ratingList.rating,
                showLink: true
            }, () => this.handleOpenDialog("Data export successful, please click on link to download."))
        }).catch((error) => {
            console.log(error)
            alert("Could not get ratings")
        })
    }   
    
    render(){
        return (
            <div className='exportContainer'>
                <Typography variant='h6' style={adminTabTitleStyle}>EXPORT REGION DATA</Typography>
                <div className='resultTableContainer'>
                   <ResultTable/> 
                </div>
                <div className='subContainer'>
                    <Button className='exportButton' onClick={() => this.handleExport()}>Export as CSV File</Button>
                    <div className='linkContainer'>
                    {this.state.showLink ? <CSVLink data={this.state.data}>Download for CSV file</CSVLink> : null}
                    </div>
                </div>
                <Dialog onClose={() => this.handleCloseDialog()} open={this.state.openDialog}>
                    <DialogContent>
                        <Typography>{this.state.message}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleCloseDialog()}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ExportData