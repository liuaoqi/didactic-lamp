import React from "react";
import SurveyForm from './SurveyForm'
import "./styles.css"
import MessageSnackBar from "../MessageSnackBar";
import { Dialog, DialogContent, Typography, DialogActions, Button } from "@material-ui/core";

class Survey extends React.Component {
    constructor(props) {
        super(props);
        const {state} = props
        this.state = {
            rating: state.userInfo.rating,
            region: state.userInfo.region,
            username: state.userInfo.username,
            openAlert: false,
            message: "",
            openDialog: false,
        }
    }

    handleOpenSnackBar = (message) => {
        this.setState({openAlert: true, message: message})
    }

    handleOpenDialog = (message) => {
        this.setState({openDialog: true, message: message})
    }

    handleDialogExited = () => {
        window.location.reload(true)
    }

    handleDialogClose = () => {
        this.setState({openDialog: false})
    }

    handleSubmit = (values) => {
        // call to server to add rating value of the user
        // Prompt snack bar for warnings if the survey is not completed
        const arrOfValues = Object.values(values)
        if (arrOfValues.includes('')) {
          let i, currValue;
          let msg = '';
          let numOfBlanks = 0;
          for (i = 0; i < arrOfValues.length; i++) {
            currValue = arrOfValues[i]
            if (currValue === '') {
              if (numOfBlanks > 0) {
                msg = msg + ', '
              }
              msg = msg + (parseInt(i) + 1) + ' '
              numOfBlanks++
            }
          }
          if (numOfBlanks === 1) {
            this.handleOpenSnackBar('Please complete question #' + msg + '.')
          } else {
            this.handleOpenSnackBar('Please complete the following questions before submission: ' + msg)
          }
        }
        // Proceed if the survey is completed
        else {
          // Set state for mood rating and survey pop-up
          this.setState({rating: values.q6})
    
          // return the new mood rating for specific region
          const result = {
            q1: values.q1,
            q2: values.q2,
            q3: values.q3,
            q4: values.q4,
            q5: values.q5,
            q6: values.q6,
            region: this.state.region }
          fetch('/api/surveysubmit', {
              method: 'POST',
              body: JSON.stringify(result),
              headers: { 'Content-Type': 'application/json' }
          }).then((res) => {
            // Display survey submission snack bar
            if (res.status === 200) {
              fetch('/api/updateRatings', {
                method: 'POST',
                body: JSON.stringify({region: this.state.region, q6: values.q6}),
                headers: { 'Content-Type': 'application/json' }
              }).then((res) => {
                  if (res.status === 200) {
                      fetch('/api/updateUserRating', {
                        method: 'POST',
                        body: JSON.stringify({username: this.state.username, rating: values.q6}),
                        headers: { 'Content-Type': 'application/json' }
                      }).then((user) => {
                          if (!user) {
                            throw new Error("Something went wrong with the survey.")
                        }
                          else {
                              this.handleOpenDialog('Survey Successfully Submitted!')
                          }
                      }).catch((error) => {
                          console.log(error)
                          throw error
                      })
                  } else {
                      throw new Error("Something went wrong with the survey.")
                  }
              }).catch((error) => {
                console.log(error)
                throw error
              })
            } else {
                throw new Error("Something went wrong with the survey.")
            }
          }).catch((error) => {
              console.log(error)
              this.handleOpenSnackBar('Something went wrong sending out the survey. Please try again.')
          })
        }
    
      }

    handleAlertClose = () => {
        this.setState({openAlert: false})
    }

    render() {
        return (
            <div className="mainSurveyContainer">
                <SurveyForm onSubmit={(values) => this.handleSubmit(values)}></SurveyForm>
                <div>
                    <MessageSnackBar message={this.state.message} openSnackBar={this.state.openAlert} handleClose={() => this.handleAlertClose()}/>
                </div>
                <div>
                    <Dialog onClose={() => this.handleDialogClose()} onExited={() => this.handleDialogExited()} open={this.state.openDialog}>
                        <DialogContent>
                            <Typography>{this.state.message}</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.handleDialogClose()}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }
}
export default Survey