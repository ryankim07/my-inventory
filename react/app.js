import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import AuthStore from './src/stores/auth/store';
import Main from './src/components/main';
import Home from './src/components/home';
import Login from './src/components/auth/login';
import Logout from './src/components/auth/logout';
import Signup from './src/components/auth/signup';
import VehicleDashboard from './src/components/vehicles/dashboard';
import VehicleAdd from './src/components/vehicles/add';
import VehiclesList from './src/components/vehicles/list';
import PropertyDashboard from './src/components/properties/dashboard';
import PropertyAdd from './src/components/properties/add';
import PropertiesList from './src/components/properties/list';
import PropertyAddressDashboard from './src/components/properties/address/dashboard';
import PropertyAddressAdd from './src/components/properties/address/add';
import PropertiesAddressList from './src/components/properties/address/list';

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
        <Route component={Main} onEnter={requireAuth}>
            <IndexRoute component={Home} />
            <Route path="/" component={Home} />
			<Route path="/auth/signup" component={Signup}/>
            <Route path="/vehicle/add" component={VehicleAdd} />
            <Route path="/vehicles/dashboard" component={VehicleDashboard} >
                <Route path="/vehicle/add" component={VehicleAdd} />
                <Route path="/vehicles" component={VehiclesList} />
            </Route>
			<Route path="/property/add" component={PropertyAdd} />
			<Route path="/properties/dashboard" component={PropertyDashboard} >
				<Route path="/property/add" component={PropertyAdd} />
				<Route path="/properties" component={PropertiesList} />
			</Route>
			<Route path="/property/address-add" component={PropertyAddressAdd} />
			<Route path="/properties/address-dashboard" component={PropertyAddressDashboard} >
				<Route path="/property/address-add" component={PropertyAddressAdd} />
				<Route path="/properties/addresses" component={PropertiesAddressList} />
			</Route>
        </Route>
    </Router>,

    document.querySelector('#root')
);