import React, { Component } from 'react'
import {  Button, FormControl, InputLabel, NativeSelect, Dialog, DialogContent, DialogActions, Typography } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {TextField}  from '@material-ui/core'
import './UserInfo.css'
import Info from './Info'
import EditInfo from './EditInfo'
import bcrypt from 'bcryptjs';



class UserInfo extends Component {
    constructor(props) {
        super(props)
        const { userInfo } = props
        this.state = {
            name: userInfo.name,
            password: userInfo.password,
            username: userInfo.username,
            email:  userInfo.email,
            region: userInfo.region,
            inEditMode: false,
            editButtonIndex: null,
            openDialog: false,
            messagee: ""
        }

    }

    handleOpenDialog = (message) => {
        this.setState({openDialog: true, message: message})
    }

    handleCloseDialog = () => {
        this.setState({openDialog: false})
    }
   
    changeToEditMode = event =>{
        this.setState({
            inEditMode:!this.state.inEditMode,
         }) 
    }
        
    submitForm = event =>{
   
        if(this.state.inEditMode){
            //Server call 

            //Hash new password 
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(this.state.password,salt)
           
            this.setState({
                password:hashPassword
             }) 
             this.setState({password: this.state.password}, function () {
                console.log(hashPassword)
                fetch('/api/edit-user', {
                    method: 'PATCH',
                    body: JSON.stringify(this.state),
                    headers: { 'Content-Type': 'application/json' }
                }).then((res) => { 
                  this.handleOpenDialog("Your profile was successfully edited!")
                })
                .catch((error) => {
                    console.log(error)
                    alert("There was an error editing your profile, please try again.")
                })
            });
            
         }
            this.setState({
           inEditMode:!this.state.inEditMode,
        }) 
       
    } 

    handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

        this.setState({
            [name]: value, 
            });
         
    }

    handleDropDown = event => {
        this.setState({
            region: event.target.value
        });
      }


    render() {
        return ( 
        //If Edit is Selected 
        this.state.inEditMode ?  
        <div className='editForm'>
            <form className='editForm'>
                <h3 className = 'profileText'>Profile Info</h3>
            <EditInfo
                    name = 'name'
                    defaultValue = {this.state.name}
                    label = 'Name:'
                    onChange = {this.handleChange}
                />
            <EditInfo
                    name = 'username'
                    defaultValue = {this.state.username}
                    label = 'Username:'
                    onChange = {this.handleChange}
                />
                {/* //CHANGING THE PASSWORD  */}
                <TextField
                    name = 'password'
                    type = 'password'
                    className = 'inputBox'
                    defaultValue = {this.state.password}
                    label = 'Password:'
                    onChange = {this.handleChange} 
                />
                 
                <EditInfo
                    name = 'email'
                    defaultValue = {this.state.email}
                    label = 'Email:'
                    onChange = {this.handleChange}
                />

                <FormControl className = 'inputBox'>
                    <InputLabel shrink htmlFor="age-native-label-placeholder">
                        Region:
                    </InputLabel> 
                    <NativeSelect
                        defaultValue={this.state.region} 
                        onChange = {this.handleDropDown}
                    >
                        <option value="Ajax">Ajax</option>
                        <option value="Aurora">Aurora</option>
                        <option value="Brampton">Brampton</option>
                        <option value="Brock">Brock</option>
                        <option value="Burlington">Burlington</option>
                        <option value="Caledon">Caledon</option>
                        <option value="Clarington">Clarington</option>
                        <option value="EastGwillimbury">East Gwillimbury</option>
                        <option value="Georgina">Georgina</option>
                        <option value="HaltonHills">Halton Hills</option>
                        <option value="King">King</option>
                        <option value="Markham">Markham</option>
                        <option value="Milton">Milton</option>
                        <option value="Mississauga">Mississauga</option>
                        <option value="Newmarket">Newmarket</option>
                        <option value="Oakville">Oakville</option>
                        <option value="Oshawa">Oshawa</option>
                        <option value="Pickering">Pickering</option>
                        <option value="RichmondHill">Richmond Hill</option>
                        <option value="Scugog">Scugog</option>
                        <option value="Toronto">Toronto</option>
                        <option value="Uxbridge">Uxbridge</option>
                        <option value="Vaughan">Vaughan</option>
                        <option value="Whitby">Whitby</option>
                        <option value="Whitchurch-Stouffville">Whitchurch-Stouffville</option>
                    </NativeSelect>
                </FormControl>
            </form>  

                <Button size = 'small' className = 'buttonStyle' variant="outlined" onClick={this.submitForm}> 
                Save
                </Button>    
            </div>
            
                :
            
            <div className='editForm'> 
                <form className='editForm'>   
                    <h3 className = 'profileText'>Profile Info</h3>
                        <Info
                            name = 'name'
                            defaultValue = {this.state.name}
                            label = 'Name:'
                            InputProps={{
                            readOnly: true  
                                }}
                            />
                        <Info
                            name = 'username'
                            defaultValue = {this.state.username}
                            label = 'Username:'
                            InputProps={{
                                readOnly: true  
                                }}       
                        />   

                        <TextField
                        name = 'password'
                        type = "password"
                        defaultValue = {this.state.password}
                        label = 'Password:'
                        className = 'inputBox'
                        InputProps={{
                            readOnly: true  
                            }}
                      />  
                        <Info
                            name = 'email'
                            defaultValue = {this.state.email}
                            label = 'Email:'
                            InputProps={{
                                readOnly: true  
                                }}
                        />
                        <Info 
                            name='region' 
                            defaultValue={this.state.region} 
                            label='Region' 
                            InputProps={{
                                readOnly: true
                                }}
                        />
                </form>

                <MuiThemeProvider theme={theme}>
                    <Button className = 'buttonStyle' onClick={this.changeToEditMode} color="primary"> 
                    Edit 
                    </Button>  
                </MuiThemeProvider>
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

const theme = createMuiTheme({
    palette: {
      primary: {main: "#367BBB"}
    },
  });

export default UserInfo
