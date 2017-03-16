webpackHotUpdate(0,{

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _appDispatcher = __webpack_require__(35);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(34);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

var _Api = __webpack_require__(125);

var _Api2 = _interopRequireDefault(_Api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionCreator = {
    getVehicles: function getVehicles() {
        _Api2.default.get('http://mcs.dev/api/vehicles').then(function (vehicles) {
            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.RECEIVE_VEHICLES,
                vehicles: vehicles
            });
        }).catch(function () {
            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.RECEIVE_ERROR,
                error: 'There was a problem getting the vehicles'
            });
        });
    },

    getManufacturers: function getManufacturers() {
        _Api2.default.get('http://mcs.dev/api/vehicles/mfgs').then(function (manufacturers) {
            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.RECEIVE_MFGS,
                manufacturers: manufacturers
            });
        }).catch(function () {
            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.RECEIVE_ERROR,
                error: 'There was a problem getting the manufacturers'
            });
        });
    },

    removeVehicles: function removeVehicles(id) {
        _Api2.default.delete('http://mcs.dev/api/vehicles/' + id).then(function (vehicles) {
            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.RECEIVE_VEHICLES,
                vehicles: vehicles
            });
        }).catch(function () {
            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.RECEIVE_ERROR,
                error: 'There was a problem removing the vehicle'
            });
        });
    }
};

exports.default = ActionCreator;

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(129);

var _objectAssign = __webpack_require__(82);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _appDispatcher = __webpack_require__(35);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(34);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

var _lodash = __webpack_require__(154);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _vehicles = [];
var _manufacturers = [];

function setVehicles(vehicles) {
    _vehicles = vehicles;
}

function setManufacturers(manufacturers) {
    _manufacturers = manufacturers;
}

var VehiclesStore = (0, _objectAssign2.default)({}, _events.EventEmitter.prototype, {
    getVehicles: function getVehicles() {
        return _vehicles;
    },

    addVehicle: function addVehicle(new_vehicle) {
        _vehicles.push(new_vehicle);
    },

    removeVehicle: function removeVehicle(vehicle_id) {
        var vehicles = _vehicles;

        _lodash2.default.remove(vehicles, function (vehicle) {
            return vehicle_id == vehicle.id;
        });

        _vehicles = vehicles;
    },

    getManufacturers: function getManufacturers() {
        return _manufacturers;
    },

    // Emit Change event
    emitChange: function emitChange() {
        this.emit('change');
    },

    /**
     *
     * @param callback
     */
    addChangeListener: function addChangeListener(callback) {
        this.on('change', callback);
    },

    /**
     *
     * @param callback
     */
    removeChangeListener: function removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
});

// Register callback with AppDispatcher
VehiclesStore.dispatchToken = _appDispatcher2.default.register(function (payload) {

    var action = payload.action;
    var new_vehicle = payload.new_vehicle;
    var id = action.id;

    switch (action.actionType) {
        case _actionConstants2.default.RECEIVE_VEHICLES:
            setVehicles(action.vehicles);
            break;

        case _actionConstants2.default.ADD_VEHICLE:
            VehiclesStore.addVehicle(new_vehicle);
            break;

        case _actionConstants2.default.REMOVE_VEHICLE:
            VehiclesStore.removeVehicle(id);
            break;

        case _actionConstants2.default.RECEIVE_MFGS:
            setManufacturers(action.manufacturers);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    VehiclesStore.emitChange();

    return true;
});

exports.default = VehiclesStore;

/***/ })

})