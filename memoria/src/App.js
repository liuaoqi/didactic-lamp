import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routing/Routes';
import AdminRoutes from './routing/AdminRoutes';
import UserContext from './react-components/Contexts/UserContext'
import NavigationBar from './react-components/NavigationBar';


class App extends React.Component {
  state = {
    rating: "",
    userInfo: "",
    loggedIn: false,
    admin: false
  }

  handleUpdateUserContext = (userInfo, loggedIn) => {
    let admin = this.state.admin
    let rating = this.state.rating
    if (userInfo) {
      admin = userInfo.admin
      rating = userInfo.rating
    }
    this.setState({userInfo, loggedIn, admin, rating})
  }

  handleLogOut = () => {
    fetch('/api/logout').then((res) => {
      if (res.status === 200) {
        this.setState({openSurvey: false, rating: "", userInfo: "", loggedIn: false, admin: false})
      } else {
        alert("There was an error loggin out, please try again.")
      }
    })
  }

  render() {
    return (
      <div className="App">
        <UserContext.Provider value={{userInfo: this.state.userInfo, handleUpdate: this.handleUpdateUserContext, handleLogOut: this.handleLogOut}}>
          <BrowserRouter>
            {this.state.loggedIn ? (<NavigationBar loggedIn={this.state.loggedIn} userInfo={this.state.userInfo} handleOpenSurvey={this.handleClickedSurvey}/>) : null}
            <AdminRoutes state={this.state}></AdminRoutes>
            <Routes state={this.state}></Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
