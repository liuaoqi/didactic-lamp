import React from 'react';
import { Redirect } from 'react-router-dom';

export function withAuth(AuthComponent, state, updateAppState) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        loggedIn: false
      };
    }

    componentDidMount = () => {
        let response = ""
        if (state.userInfo !== "") {
            this.setState({loading: false, loggedIn: true})
        } else {
            fetch('/api/sessionChecker').then((res) => {
                response = res
                return res.text()
            }).then((text) => {
                if (response.status === 200) {
                    this.setState({loading: false, loggedIn: true}, updateAppState(JSON.parse(text), true))
                } else {
                    throw new Error(text)
                }
            }).catch((error) => {
                console.log(error);
                this.setState({ loading: false, loggedIn: false });
            })
        }
    }


    render() {
      const { loading, loggedIn } = this.state;
      if (loading) {
        return null;
      }
      if (loggedIn) {
        if (this.props.location.pathname === "/login") {
          return <Redirect to="/home" />;
        } else {
            return <AuthComponent updateAppState={updateAppState} state={state} {...this.props}/>;
          }
    } else if (this.props.location.pathname === "/login") {
            return <AuthComponent state={state} {...this.props}/>;
    }
    return <Redirect to="/login" />;
    }
  }
}

export function withAdminAuth(AuthComponent, state, updateAppState) {
    return class extends React.Component {
      constructor() {
        super();
        this.state = {
          loading: true,
          loggedIn: false,
          admin: false
        };
      }
  
      componentDidMount = () => {
          let response = ""
          if (state.userInfo !== "") {
              this.setState({loading: false, loggedIn: true, admin: state.userInfo.admin})
          } else {
              fetch('/api/sessionChecker').then((res) => {
                  response = res
                  return res.text()
              }).then((text) => {
                  if (response.status === 200) {
                      const parsed = JSON.parse(text)
                      const admin = parsed.admin
                      this.setState({loading: false, loggedIn: true, admin: admin}, updateAppState(JSON.parse(text), true))
                  } else {
                      throw new Error(text)
                  }
              }).catch((error) => {
                  console.log(error);
                  this.setState({ loading: false, loggedIn: false, admin: false });
              })
          }
      }
  
  
      render() {
        const { loading, loggedIn, admin } = this.state;
        if (loading) {
          return null;
        }
        if (loggedIn && admin) {
            if (this.props.location.pathname === "/login") {
              return <Redirect to="/home" />;
            } else {
                return <AuthComponent state={state} {...this.props} />;
              }
        }
        else if (loggedIn) {
          if (this.props.location.pathname === "/login") {
            return <Redirect to="/home" />;
          } 
        }
        if (this.props.location.pathname === "/login") {
            return <AuthComponent state={state} {...this.props}/>;
        }
        return <Redirect to="/login" />;
      }
    }
  }