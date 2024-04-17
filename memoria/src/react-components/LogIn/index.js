import React, { Component } from 'react'
import "./styles.css"
import { Button, Typography, Collapse} from "@material-ui/core"
import UserContext from '../Contexts/UserContext'
import MessageSnackBar from '../MessageSnackBar'
import LoginForm from './LoginForm'
import CreateAccountForm from './CreateAccountForm'
import { containedLightPurpleButton, containedDarkPurpleButton } from "./styles"
import MemoriaInfo from "../../assets/MemoriaInfo.png"
import MemoriaCreateAccountLogo from "../../assets/MemoriaCreateAccountLogo.png"
import LoginSideImage from "../../assets/LoginSideImage.png"
import WelcomeLogo from "../../assets/WelcomeLogo.png"

class LogIn extends Component {
    state = {
        // whether the registration dialog should be open
        showCreatePage: false,
        // login username + password
        username: "",
        password: "",
        // fields below are for registration
        newEmail: "",
        newUsername: "",
        newPassword: "",
        newName: "",
        newRegion: "",
        message: "",
        openSnackBar: false
    }
    
    handleCreateAccount = values => {
        const user = {
            username: values.newUsername,
            password: values.newPassword,
            name: values.newName, 
            region: values.newRegion, 
            email: values.newEmail
        };
        let response = ""
        fetch('/api/createaccount', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            response = res
            return res.text()
          }).then((body) => {
            if (response.status !== 200) {
                if (response.status === 401) {
                    const message = body
                    this.handleOpenSnackBar(message)
                } else {
                    const message = "There was an error! Please try again."
                    this.handleOpenSnackBar(message)
                }
            } else {
                const message = "You've successfully created an account! Please log in."
                this.setState({showCreatePage: false}, this.handleOpenSnackBar(message))
            }
          }).catch((error) => {
              console.log(error)
              const message = "There was an error! Please try again."
              this.handleOpenSnackBar(message)
          })
    }

    handleOpenSnackBar = (message) => {
        this.setState({message: message, openSnackBar: true})
    }

    handleCloseSnackBar = () => {
        this.setState({openSnackBar: false})
    }

    handleLogin = (handleUpdate, values) => {
        const user = {username: values.username, password: values.password}
        let response = ""
        fetch('api/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((res) => {
            response = res
            return res.text()
        }).then((body) => {
            if (response.status !== 200) {
                if (response.status === 401) {                    
                    const message = body
                    this.handleOpenSnackBar(message)
                } else {
                    const message = "There was an error! Please try again."
                    this.handleOpenSnackBar(message)
                }
            }
            else {
                const parsed = JSON.parse(body)
                const userInfo = parsed
                const loggedIn = true
                handleUpdate(userInfo, loggedIn)
                this.props.history.push("/home")
            }
        }).catch((error) => {
            console.log(error)
            const message = "There was an error! Please try again."
            this.handleOpenSnackBar(message)
        });
    }

    render() {
        return (
            <UserContext.Consumer>
                {context => (
                    <div className="main">
                        <Collapse in={!this.state.showCreatePage}>
                            <div className='loginContainer'>
                                <div className='loginFormContainer'>
                                    <div className='titleContainer'>
                                        <img alt="logo" src={WelcomeLogo} className='loginLogoContainer'/>
                                    </div>
                                    <LoginForm className='loginForm' onSubmit={(values) => this.handleLogin(context.handleUpdate, values)}/>
                                </div>
                                <div className='createInfoContainer'>
                                    <img alt="Welcome back logo" className='loginSideImage' src={LoginSideImage} />
                                    <Typography variant="body2">
                                            Don't have an account? Create one
                                        </Typography>
                                    <Button style={containedDarkPurpleButton} onClick={() => this.setState({showCreatePage: true})}>Create an Account</Button>
                                </div>
                            </div>
                        </Collapse>
                        <Collapse in={this.state.showCreatePage}>
                            <div className='createAccountContainer'>
                                <div className='createAccountFormContainer'>
                                    <div className='createTitle'>
                                        <img alt="Memoria create account logo" className="memoriaCreateAccountLogo" src={MemoriaCreateAccountLogo}/>
                                    </div>
                                    <CreateAccountForm onSubmit={(values) => this.handleCreateAccount(values)}/>
                                </div>
                                <div className='signInInfoContainer'>
                                    <div className='imageContainer'>
                                        <img alt="Memoria information" className='createSideImage' src={MemoriaInfo}/>  
                                    </div>
                                    <div className="goToSignInButton">
                                        <Button onClick={() => this.setState({showCreatePage: false})} style={containedLightPurpleButton}>Sign In</Button>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                        <MessageSnackBar message={this.state.message} openSnackBar={this.state.openSnackBar} handleClose={this.handleCloseSnackBar}></MessageSnackBar>
                    </div>
                )}
            </UserContext.Consumer>
        )
    }
}

LogIn.defaultProps = {
    router: {}
  };


export default LogIn