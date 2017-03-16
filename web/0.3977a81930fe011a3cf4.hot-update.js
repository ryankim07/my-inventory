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
        _Api2.default.get('http://mcs.dev/api/vehicles/mfgs').then(function (manufactures) {
            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.RECEIVE_MFGS,
                manufactures: manufactures
            });
        }).catch(function () {
            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.RECEIVE_ERROR,
                error: 'There was a problem getting the manufactures'
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

function setManufacturers(manufactures) {
    _manufacturers = manufactures;
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
            setManufacturers(action.mfgs);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    VehiclesStore.emitChange();

    return true;
});

exports.default = VehiclesStore;

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(83);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _vehiclesStore = __webpack_require__(126);

var _vehiclesStore2 = _interopRequireDefault(_vehiclesStore);

var _appDispatcher = __webpack_require__(35);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(34);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

var _actionCreator = __webpack_require__(118);

var _actionCreator2 = _interopRequireDefault(_actionCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VehicleForm = function (_React$Component) {
    _inherits(VehicleForm, _React$Component);

    function VehicleForm(props) {
        _classCallCheck(this, VehicleForm);

        var _this = _possibleConstructorReturn(this, (VehicleForm.__proto__ || Object.getPrototypeOf(VehicleForm)).call(this, props));

        _this.state = {
            mfg_vehicle: {
                mfg: '',
                model: '',
                year: '',
                color: '',
                vin: '',
                plate: ''
            },
            manufacturers: []
        };

        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(VehicleForm, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _vehiclesStore2.default.addChangeListener(this._onChange.bind(this));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _actionCreator2.default.getMfgs();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _vehiclesStore2.default.removeChangeListener(this._onChange.bind(this));
        }
    }, {
        key: '_onChange',
        value: function _onChange() {
            this.setState({ manufacturers: _vehiclesStore2.default.getManufacturers() });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(propertyName, event) {
            var vehicle = this.state.mfg_vehicle;

            if (propertyName == 'vin') {
                vehicle[propertyName] = event.target.value.toUpperCase();
            } else {
                vehicle[propertyName] = event.target.value;
            }

            this.setState({ vehicle: vehicle });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();

            // create ID
            var id = guid();

            // this gets the value from the input
            var mfg = _reactDom2.default.findDOMNode(this.refs.mfg).value.trim();
            var model = _reactDom2.default.findDOMNode(this.refs.model).value.trim();
            var year = _reactDom2.default.findDOMNode(this.refs.year).value.trim();
            var color = _reactDom2.default.findDOMNode(this.refs.color).value.trim();
            var vin = _reactDom2.default.findDOMNode(this.refs.vin).value.trim();
            var plate = _reactDom2.default.findDOMNode(this.refs.plate).value.trim();

            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.ADD_VEHICLE,
                new_vehicle: {
                    id: id,
                    mfg: mfg,
                    model: model,
                    year: year,
                    color: color,
                    vin: vin,
                    plate: plate
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var mfgsHtml = void 0;
            var yearsHtml = [];

            mfgsHtml = this.state.manufacturers.map(function (mfg) {
                return _react2.default.createElement(
                    'option',
                    { key: mfg.id },
                    mfg.id
                );
            });

            // Years options
            for (var i = 2014; i <= 2020; i++) {
                yearsHtml.push(_react2.default.createElement(
                    'option',
                    { value: i },
                    i
                ));
            }

            return _react2.default.createElement(
                'form',
                { onSubmit: this.handleSubmit },
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-12 col-md-8' },
                        _react2.default.createElement(
                            'label',
                            { className: '' },
                            'Manufacturer'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement(
                                'select',
                                { name: 'manufactures', onChange: this.handleChange.bind(this, 'mfg'), className: 'form-control input-sm required' },
                                mfgsHtml
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-12 col-md-8' },
                        _react2.default.createElement(
                            'label',
                            { className: '' },
                            'Model'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement('input', { type: 'text', onChange: this.handleChange.bind(this, 'model'), value: this.state.mfg_vehicle.model, className: 'form-control input-sm required' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-12 col-md-8' },
                        _react2.default.createElement(
                            'label',
                            { className: '' },
                            'Year'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement(
                                'select',
                                { name: 'years' },
                                yearsHtml
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-12 col-md-8' },
                        _react2.default.createElement(
                            'label',
                            { className: '' },
                            'Color'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement('input', { type: 'text', onChange: this.handleChange.bind(this, 'color'), value: this.state.mfg_vehicle.color, className: 'form-control input-sm required' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-12 col-md-8' },
                        _react2.default.createElement(
                            'label',
                            { className: '' },
                            'VIN'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement('input', { type: 'text', onChange: this.handleChange.bind(this, 'vin'), value: this.state.mfg_vehicle.vin, className: 'form-control input-sm required' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-12 col-md-8' },
                        _react2.default.createElement(
                            'label',
                            { className: '' },
                            'Plate'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement('input', { type: 'text', onChange: this.handleChange.bind(this, 'plate'), value: this.state.mfg_vehicle.plate, className: 'form-control input-sm required' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-xs-12 col-md-12' },
                        _react2.default.createElement(
                            'div',
                            { className: 'clearfix' },
                            _react2.default.createElement('input', { type: 'submit', value: 'Submit', className: 'btn' })
                        )
                    )
                )
            );
        }
    }]);

    return VehicleForm;
}(_react2.default.Component);

exports.default = VehicleForm;

/***/ })

})