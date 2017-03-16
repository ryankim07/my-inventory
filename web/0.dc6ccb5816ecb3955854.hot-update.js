webpackHotUpdate(0,{

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(82);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(111);

var _main = __webpack_require__(121);

var _main2 = _interopRequireDefault(_main);

var _home = __webpack_require__(120);

var _home2 = _interopRequireDefault(_home);

var _vehicleForm = __webpack_require__(123);

var _vehicleForm2 = _interopRequireDefault(_vehicleForm);

var _vehiclesList = __webpack_require__(124);

var _vehiclesList2 = _interopRequireDefault(_vehiclesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.hashHistory },
    _react2.default.createElement(
        _reactRouter.Route,
        { component: _main2.default },
        _react2.default.createElement(_reactRouter.Route, { path: '/', component: _home2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/vehicle/add', component: _vehicleForm2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/vehicles', component: _vehiclesList2.default })
    )
), document.querySelector('#root'));

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(82);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _appDispatcher = __webpack_require__(35);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(34);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VehicleForm = function (_React$Component) {
    _inherits(VehicleForm, _React$Component);

    function VehicleForm(props) {
        _classCallCheck(this, VehicleForm);

        var _this = _possibleConstructorReturn(this, (VehicleForm.__proto__ || Object.getPrototypeOf(VehicleForm)).call(this, props));

        _this.state = { value: '' };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(VehicleForm, [{
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ value: event.target.value.toUpperCase() });
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

            // this removes the value from the input
            _reactDom2.default.findDOMNode(this.refs.color).value = '';
            _reactDom2.default.findDOMNode(this.refs.vin).value = '';
            _reactDom2.default.findDOMNode(this.refs.plate).value = '';

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
                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange, ref: 'mfg', className: 'form-control input-sm required', classID: 'mfg' })
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
                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange, ref: 'model', className: 'form-control input-sm required', classID: 'model' })
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
                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange, ref: 'year', className: 'form-control input-sm required', classID: 'year' })
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
                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange, ref: 'color', className: 'form-control input-sm required', classID: 'color' })
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
                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange, ref: 'vin', className: 'form-control input-sm required', classID: 'vin' })
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
                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange, ref: 'plate', className: 'form-control input-sm required', classID: 'plate' })
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

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

exports.default = VehicleForm;

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(129);

var _objectAssign = __webpack_require__(81);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _lodash = __webpack_require__(154);

var _lodash2 = _interopRequireDefault(_lodash);

var _appDispatcher = __webpack_require__(35);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(34);

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
    removeVehicle: function removeVehicle(id) {
        var vehicles = _vehicles;

        _lodash2.default.remove(vehicles, function (vehicle) {
            return vehicle_id == id;
        });

        _vehicles = vehicles;
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