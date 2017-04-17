import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AuthStore from './src/stores/auth-store';
import Main from './src/components/main';
import Home from './src/components/home';
import VehicleDashboard from './src/components/vehicles/vehicle-dashboard';
import VehicleAdd from './src/components/vehicles/vehicle-add';
import VehiclesList from './src/components/vehicles/vehicles-list';
import Login from './src/components/auth/login';
import Logout from './src/components/auth/logout';
import Signup from './src/components/auth/signup';

function requireAuth(nextState, replace)
{
	if (!AuthStore.isAuthenticated()) {
		replace({
			pathname: '/auth/login',
			state: {nextPathname: nextState.location.pathname}
		})
	}
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/auth/login" component={Login}/>
		<Route path="/auth/logout" component={Logout}/>
        <Route path="/auth/signup" component={Signup}/>
        <Route component={Main} onEnter={requireAuth}>
            <IndexRoute component={Home} />
            <Route path="/" component={Home} />
            <Route path="/vehicle/add" component={VehicleAdd} />
            <Route path="/vehicles/dashboard" component={VehicleDashboard} >
                <Route path="/vehicle/add" component={VehicleAdd} />
                <Route path="/vehicles" component={VehiclesList} />
            </Route>
        </Route>
    </Router>,

    document.querySelector('#root')
);