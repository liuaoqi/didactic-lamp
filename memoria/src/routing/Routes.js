import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Profile from '../react-components/ProfilePage/Profile'
import UserContext from '../react-components/Contexts/UserContext';
import {withAuth} from './Auth';
import HomePage from '../react-components/HomePage';
import MapPage from '../react-components/MapPage';
import TablePage from '../react-components/TablePage';
import ResourcesPage from '../react-components/ResourcesPage';
import Survey from '../react-components/Survey';

class Routes extends React.Component {
    render() {
      const {state} = this.props
        return(        
              <UserContext.Consumer>
                {context => (
                  <Switch>
                    <Route exact path='/'>
                        <Redirect to={{pathname: "/home"}}/>
                    </Route>
                    <Route path='/profile' component={withAuth(Profile, state, context.handleUpdate)}/>
                    <Route path='/home' component={withAuth(HomePage, state, context.handleUpdate)}/>
                    <Route path='/map' component={withAuth(MapPage, state, context.handleUpdate)}/>
                    <Route path='/table' component={withAuth(TablePage, state, context.handleUpdate)}/>
                    <Route path='/resources' component={withAuth(ResourcesPage, state, context.handleUpdate)}/>
                    <Route path='/survey' component={withAuth(Survey, state, context.handleUpdate)}/>
                </Switch>
                )}
                
              </UserContext.Consumer>
            )
        }
}

export default Routes