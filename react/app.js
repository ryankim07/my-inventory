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
import PropertiesDashboard from './src/components/properties/dashboard';
import PropertyAdd from './src/components/properties/add';
import PropertiesList from './src/components/properties/list';
import PropertyView from './src/components/properties/view';
import PropertyRoomsDashboard from './src/components/properties/rooms/dashboard';
import PropertyRoomAdd from "./src/components/properties/rooms/add";
import PropertyRoomsList from './src/components/properties/rooms/list';
import PropertyExteriorFeaturesAdd from './src/components/properties/exterior_features/add';

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
        <Route path="/auth/login" component={ Login } />
		<Route path="/auth/logout" component={ Logout } />
        <Route component={ Main} onEnter={ requireAuth }>
            <IndexRoute component={ Home } />
            <Route path="/" component={ Home } />
			<Route path="/auth/signup" component={ Signup } />

            <Route path="/vehicles/dashboard" component={ VehicleDashboard } >
                <Route path="/vehicle/add" component={ VehicleAdd } />
                <Route path="/vehicles" component={ VehiclesList } />
            </Route>

			<Route path="/properties/dashboard" component={ PropertiesDashboard } >
				<Route path="/properties" component={ PropertiesList } />
				<Route path="/properties/add" component={ PropertyAdd } />
				<Route path="/properties/view" component={ PropertyView } />
				<Route path="/property/exterior-features/add" component={ PropertyExteriorFeaturesAdd } />
			</Route>

			<Route path="/properties/rooms/dashboard" component={ PropertyRoomsDashboard } >
				<Route path="/property/rooms/add" component={ PropertyRoomAdd } />
				<Route path="/properties/rooms" component={ PropertyRoomsList } />
			</Route>
        </Route>
    </Router>,

    document.querySelector('#root')
);