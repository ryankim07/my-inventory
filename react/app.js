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
import VehicleForm from './src/components/vehicles/forms/vehicle';
import VehiclesList from './src/components/vehicles/list';
import PropertiesDashboard from './src/components/properties/dashboard';
import PropertyForm from './src/components/properties/forms/property';
import PropertiesList from './src/components/properties/list';
import PropertyInfoView from './src/components/properties/info/view';
import PropertyFeaturesForm from './src/components/properties/info/forms/features';
import PropertyExteriorFeaturesForm from './src/components/properties/info/forms/exterior_features';
import PropertyInteriorFeaturesForm from './src/components/properties/info/forms/interior_features';
import PropertyRoomForm from "./src/components/properties/rooms/forms/room";
import PropertyRoomsList from './src/components/properties/rooms/list';

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
                <Route path="/vehicle/vehicle" component={ VehicleForm } />
                <Route path="/vehicles" component={ VehiclesList } />
            </Route>

			<Route path="/properties/dashboard" component={ PropertiesDashboard } >
				<Route path="/properties" component={ PropertiesList } />
				<Route path="/properties/forms/property" component={ PropertyForm } />
				<Route path="/properties/info/view" component={ PropertyInfoView } />
				<Route path="/property/info/forms/features" component={ PropertyFeaturesForm } />
				<Route path="/property/info/forms/exterior_features" component={ PropertyExteriorFeaturesForm } />
				<Route path="/property/info/forms/interior_features" component={ PropertyInteriorFeaturesForm } />
				<Route path="/property/rooms/forms/room" component={ PropertyRoomForm } />
				<Route path="/properties/rooms" component={ PropertyRoomsList } />
			</Route>

			<Route path="/property/info/add_features" component={ PropertyAddFeatures } />
        </Route>
    </Router>,

    document.querySelector('#root')
);