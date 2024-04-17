import React from "react"
import { Snackbar } from "@material-ui/core"

class MessageSnackBar extends React.Component {

    render() {
        const {message, openSnackBar, handleClose} = this.props
        return (
            <Snackbar
                autoHideDuration={3000}
                open={openSnackBar}
                onClose={handleClose}
                message={message}/>
        )
    }
}

export default MessageSnackBar