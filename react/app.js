import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AuthStore from './src/stores/auth/store';
import Body from './src/components/body';
import Home from './src/components/home';
import AuthLogin from './src/components/auth/forms/login';
import AuthLogout from './src/components/auth/forms/logout';
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
import SettingsUsersDashboard from './src/components/settings/users/dashboard';
import SettingsUsersList from './src/components/settings/users/list';
import SettingsVehiclesDashboard from './src/components/settings/vehicles/dashboard';
import SettingsManufacturersList from './src/components/settings/vehicles/api/manufacturers';
import SettingsPropertiesDashboard from './src/components/settings/properties/dashboard';
import SettingsPaintsList from './src/components/settings/properties/paints/list';
import SettingsVendorsDashboard from './src/components/settings/vendors/dashboard';
import SettingsVendorsList from './src/components/settings/vendors/list';

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
            <Route exact path="/vehicles/dashboard/:section" component={ VehicleDashboard }/>
			<Route exact path="/properties/dashboard/:section" component={ PropertiesDashboard }/>
			<Route exact path="/settings/users/dashboard/:section" component={ SettingsUsersDashboard }/>
			<Route exact path="/settings/vehicles/dashboard/:section" component={ SettingsVehiclesDashboard }/>
			<Route exact path="/settings/properties/dashboard/:section" component={ SettingsPropertiesDashboard }/>
			<Route exact path="/settings/vendors/dashboard/:section" component={ SettingsVendorsDashboard }/>
        </Route>
    </Router>,

    document.querySelector('#root')
);