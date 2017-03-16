import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Main from './src/components/main';
import Home from './src/components/home';
import VehicleForm from './src/components/vehicles/vehicle-form';
import VehiclesList from './src/components/vehicles/vehicles-list';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route component={Main}>
            <Route path="/" component={Home} />
            <Route path="/vehicle/add" component={VehicleForm} />
            <Route path="/vehicles" component={VehiclesList} />
        </Route>
    </Router>,
    document.querySelector('#root')
);