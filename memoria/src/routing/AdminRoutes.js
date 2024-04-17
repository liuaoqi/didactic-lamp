import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LogIn from '../react-components/LogIn';
import UserContext from '../react-components/Contexts/UserContext';
import AdminPage from "../react-components/AdminPage"
import {withAdminAuth} from './Auth';

class AdminRoutes extends React.Component {
    render() {
      const {state} = this.props
        return(        
              <UserContext.Consumer>
                {context => (
                  <Switch>
                    <Route exact path='/'>
                        <Redirect to={{pathname: "/home"}}/>
                    </Route>
                    <Route exact path='/login' component={withAdminAuth(LogIn, state, context.handleUpdate)} loggedIn={context.loggedIn} state={state}/>
                    <Route path='/admin/edit' state={state} component={withAdminAuth(AdminPage, state, context.handleUpdate)} />
                </Switch>
                )}
                
              </UserContext.Consumer>
            )
        }
}

export default AdminRoutes