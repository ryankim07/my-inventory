import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthStore from '../stores/auth/store';
import AuthLogin from './auth/forms/login';
import AuthLogout from './auth/forms/logout';
import Home from './home';
import VehicleDashboard from './vehicles/dashboard';
import SettingsVehiclesDashboard from './settings/vehicles/dashboard';
import SettingsPaintsDashboard from './settings/paints/dashboard';
import SettingsVendorsDashboard from './settings/vendors/dashboard';
import SettingsUsersDashboard from './settings/users/dashboard';
import TestComponent from './test/component';

const Main = () => (
	<Switch>
		<Route exact path='/' render={() => (
			!AuthStore.isAuthenticated() ? (
				<Redirect to='/auth/forms/login'/>
			) : (
				<Home />
			)
		)}/>
		<Route exact path="/auth/forms/login" component={ AuthLogin }/>
		<Route exact path="/auth/forms/logout" component={ AuthLogout }/>
		<Route path="/vehicles/dashboard/:section" component={ VehicleDashboard }/>
		<Route path="/settings/vehicles/dashboard/:section" component={ SettingsVehiclesDashboard }/>
		<Route path="/settings/paints/dashboard/:section" component={ SettingsPaintsDashboard }/>
		<Route path="/settings/vendors/dashboard/:section" component={ SettingsVendorsDashboard }/>
		<Route path="/settings/users/dashboard/:section" component={ SettingsUsersDashboard }/>
		<Route path="/test/component" component={ TestComponent }/>
	</Switch>
);

export default Main