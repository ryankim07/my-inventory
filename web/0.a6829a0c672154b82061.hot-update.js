webpackHotUpdate(0,{

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(55);

var _react2 = _interopRequireDefault(_react);

var _vehiclesStore = __webpack_require__(92);

var _vehiclesStore2 = _interopRequireDefault(_vehiclesStore);

var _appDispatcher = __webpack_require__(33);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(25);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

var _actionCreator = __webpack_require__(88);

var _actionCreator2 = _interopRequireDefault(_actionCreator);

var _newVehicleForm = __webpack_require__(90);

var _newVehicleForm2 = _interopRequireDefault(_newVehicleForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppRoot = function (_React$Component) {
    _inherits(AppRoot, _React$Component);

    _createClass(AppRoot, [{
        key: '_onChange',
        value: function _onChange() {
            this.setState({
                vehicles: _vehiclesStore2.default.getVehicles()
            });
        }
    }]);

    function AppRoot() {
        _classCallCheck(this, AppRoot);

        var _this2 = _possibleConstructorReturn(this, (AppRoot.__proto__ || Object.getPrototypeOf(AppRoot)).call(this));

        _this2.state = { vehicles: [] };
        return _this2;
    }

    // Add change listeners to stores


    _createClass(AppRoot, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _actionCreator2.default.getVehicles();
        }

        // Remove change listeners from stores

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _vehiclesStore2.default.addChangeListener(this._onChange);
        }
    }, {
        key: 'removeItem',
        value: function removeItem(e) {

            var id = e.target.dataset.id;

            _appDispatcher2.default.dispatch({
                action: _actionConstants2.default.REMOVE_VEHICLE,
                id: id
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;
            var vehiclesHtml;

            if (this.state.vehicles) {
                vehiclesHtml = this.state.vehicles.map(function (vehicle) {
                    return _react2.default.createElement(
                        'li',
                        { key: vehicle.id },
                        vehicle.mfg,
                        _react2.default.createElement(
                            'button',
                            { onClick: _this.removeItem, 'data-id': vehicle.id },
                            '\xD7'
                        )
                    );
                });
            }

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'ul',
                    null,
                    vehiclesHtml
                ),
                _react2.default.createElement(_newVehicleForm2.default, null)
            );
        }
    }]);

    return AppRoot;
}(_react2.default.Component);

exports.default = AppRoot;

/***/ }),

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

var AppDispatcher = new _flux.Dispatcher();

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
VehiclesStore.dispatchToken = AppDispatcher.register(function (payload) {

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