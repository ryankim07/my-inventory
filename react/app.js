import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AuthStore from './src/stores/auth/store';
import Body from './src/components/body';
import Home from './src/components/home';
import AuthLogin from './src/components/auth/forms/login';
import AuthLogout from './src/components/auth/forms/logout';
import UsersDashboard from './src/components/users/dashboard';
import UserForm from './src/components/users/forms/user';
import UsersList from './src/components/users/list';
import VehicleDashboard from './src/components/vehicles/dashboard';
import VehicleForm from './src/components/vehicles/forms/vehicle';
import VehiclesList from './src/components/vehicles/list';
import PropertiesDashboard from './src/components/properties/dashboard';
import PropertyForm from './src/components/properties/main/forms/property';
import PropertiesList from './src/components/properties/main/list';
import PropertyInfoView from './src/components/properties/info/view';
import PropertyFeaturesForm from './src/components/properties/info/forms/features';
import PropertyExteriorFeaturesForm from './src/components/properties/info/forms/exterior_features';
import PropertyInteriorFeaturesForm from './src/components/properties/info/forms/interior_features';
import PropertyRoomForm from "./src/components/properties/rooms/forms/room";
import PropertyRoomsList from './src/components/properties/rooms/list';
import ConfigurationVehiclesDashboard from './src/components/configuration/vehicles/dashboard';
import ConfigurationManufacturersList from './src/components/configuration/vehicles/api/manufacturers';
import ConfigurationPropertiesDashboard from './src/components/configuration/properties/dashboard';
import ConfigurationPaintsList from './src/components/configuration/properties/paints/list';
import ConfigurationVendorsDashboard from './src/components/configuration/vendors/dashboard';
import ConfigurationVendorsList from './src/components/configuration/vendors/list';

function requireAuth(nextState, replace)
{
	if (!AuthStore.isAuthenticated()) {
		replace({
			pathname: '/auth/forms/login',
			state: {nextPathname: nextState.location.pathname}
		})
	}
}

ReactDOM.render(
    <Router history={ browserHistory }>
		<Route path="/auth/forms/login" component={ AuthLogin }/>
		<Route path="/auth/forms/logout" component={ AuthLogout }/>
        <Route component={ Body } onEnter={ requireAuth }>
            <IndexRoute component={ Home }/>
            <Route path="/" component={ Home }/>

			<Route path="/users/dashboard" component={ UsersDashboard }>
				<Route path="/users/forms/user" component={ UserForm }/>
				<Route path="/users" component={ UsersList }/>
			</Route>

            <Route path="/vehicles/dashboard" component={ VehicleDashboard }>
                <Route path="/vehicle/forms/vehicle" component={ VehicleForm }/>
                <Route path="/vehicles" component={ VehiclesList }/>
            </Route>

			<Route path="/properties/dashboard" component={ PropertiesDashboard }>
				<Route path="/properties/main/forms/property" component={ PropertyForm }/>
				<Route path="/properties/info/view" component={ PropertyInfoView }/>
				<Route path="/property/info/forms/features" component={ PropertyFeaturesForm }/>
				<Route path="/property/info/forms/exterior_features" component={ PropertyExteriorFeaturesForm }/>
				<Route path="/property/info/forms/interior_features" component={ PropertyInteriorFeaturesForm }/>
				<Route path="/property/rooms/forms/room" component={ PropertyRoomForm }/>
				<Route path="/properties/rooms" component={ PropertyRoomsList }/>
				<Route path="/properties" component={ PropertiesList }/>
			</Route>

			<Route exact path="/configuration/vehicles/dashboard/:section" component={ ConfigurationVehiclesDashboard }>
				<Route path="/configuration/vehicles/api/manufacturers" component={ ConfigurationManufacturersList }/>
			</Route>

			<Route exact path="/configuration/properties/dashboard/:section" component={ ConfigurationPropertiesDashboard }>
				<Route path="/configuration/properties/paints/list" component={ ConfigurationPaintsList }/>
			</Route>

			<Route exact path="/configuration/vendors/dashboard/:section" component={ ConfigurationVendorsDashboard }>
				<Route path="/configuration/vendors/list" component={ ConfigurationVendorsList }/>
			</Route>
        </Route>
    </Router>,

    document.querySelector('#root')
);