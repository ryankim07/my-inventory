webpackHotUpdate(0,{

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _flux = __webpack_require__(60);

var _events = __webpack_require__(95);

var _objectAssign = __webpack_require__(61);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _actionConstants = __webpack_require__(25);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _vehicles = null;

function setVehicles(vehicles) {
    _vehicles = vehicles;
}

var VehiclesStore = (0, _objectAssign2.default)({}, _events.EventEmitter.prototype, {

    getVehicles: function getVehicles() {
        return _vehicles;
    },
    // Add item
    addVehicle: function addVehicle(new_vehicle) {
        _vehicles.push(new_vehicle);
    },

    // Remove item
    removeVehicle: function removeVehicle(vehicle_id) {

        var vehicles = _vehicles;

        _.remove(vehicles, function (vehicle) {
            return vehicle_id == vehicle.id;
        });

        _vehicles = vehicles;
    },

    // Emit Change event
    emitChange: function emitChange() {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function addChangeListener(callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
});

// Register callback with AppDispatcher
VehiclesStore.dispatchToken = _flux.Dispatcher.register(function (payload) {

    var action = payload.action;
    var new_vehicle = payload.new_vehicle;
    var id = payload.id;

    switch (action.actionType) {
        case _actionConstants2.default.RECEIVE_VEHICLES:
            setVehicles(action.vehicles);
            break;

        // Respond to add-vehicle action
        case _actionConstants2.default.ADD_VEHICLE:
            VehiclesStore.addVehicle(new_vehicle);
            break;

        // Respond to remove-vehicle action
        case _actionConstants2.default.REMOVE_VEHICLE:
            VehiclesStore.removeVehicle(id);
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