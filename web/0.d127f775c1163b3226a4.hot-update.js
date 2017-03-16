webpackHotUpdate(0,{

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _appDispatcher = __webpack_require__(26);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(25);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

var _Api = __webpack_require__(91);

var _Api2 = _interopRequireDefault(_Api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Promise = __webpack_require__(56).Promise;

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
    }
};

exports.default = ActionCreator;

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(55);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(61);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _appDispatcher = __webpack_require__(26);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(25);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewVehicleForm = function (_React$Component) {
    _inherits(NewVehicleForm, _React$Component);

    function NewVehicleForm() {
        _classCallCheck(this, NewVehicleForm);

        return _possibleConstructorReturn(this, (NewVehicleForm.__proto__ || Object.getPrototypeOf(NewVehicleForm)).apply(this, arguments));
    }

    _createClass(NewVehicleForm, [{
        key: 'createItem',
        value: function createItem(e) {

            // so we don't reload the page
            e.preventDefault();

            // create ID
            var id = guid();

            // this gets the value from the input
            var vehicle_name = _reactDom2.default.findDOMNode(this.refs.vehicle_name).value.trim();

            // this removes the value from the input
            _reactDom2.default.findDOMNode(this.refs.vehicle_name).value = '';

            // This is where the magic happens,
            // no need to shoot this action all the way to the root of your application to edit state.
            // AppDispatcher does this for you.
            _appDispatcher2.default.dispatch({
                actionType: _actionConstants2.default.ADD_VEHICLE,
                new_vehicle: {
                    id: id,
                    name: vehicle_name
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'form',
                { onSubmit: this.createItem.bind(this) },
                _react2.default.createElement('input', { type: 'text', ref: 'vehicle_name' }),
                _react2.default.createElement(
                    'button',
                    null,
                    'Add new item'
                )
            );
        }
    }]);

    return NewVehicleForm;
}(_react2.default.Component);

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

exports.default = NewVehicleForm;

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(94);

var _objectAssign = __webpack_require__(60);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _appDispatcher = __webpack_require__(26);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(25);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _vehicles = [];

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
VehiclesStore.dispatchToken = _appDispatcher2.default.register(function (payload) {

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