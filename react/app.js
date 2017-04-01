import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Main from './src/components/main';
import Home from './src/components/home';
import VehicleDashboard from './src/components/vehicles/vehicle-dashboard';
import VehicleAdd from './src/components/vehicles/vehicle-add';
import VehiclesList from './src/components/vehicles/vehicles-list';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={Main}>
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