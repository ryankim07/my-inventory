webpackHotUpdate(0,{

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _vehiclesStore = __webpack_require__(126);

var _vehiclesStore2 = _interopRequireDefault(_vehiclesStore);

var _appDispatcher = __webpack_require__(35);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(34);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

var _actionCreator = __webpack_require__(118);

var _actionCreator2 = _interopRequireDefault(_actionCreator);

var _sidebar = __webpack_require__(123);

var _sidebar2 = _interopRequireDefault(_sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VehiclesList = function (_React$Component) {
    _inherits(VehiclesList, _React$Component);

    function VehiclesList(props) {
        _classCallCheck(this, VehiclesList);

        var _this = _possibleConstructorReturn(this, (VehiclesList.__proto__ || Object.getPrototypeOf(VehiclesList)).call(this, props));

        _this.state = {
            vehicles: [],
            vehicle: {},
            isSideBarVisible: false
        };
        return _this;
    }

    _createClass(VehiclesList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            _vehiclesStore2.default.addChangeListener(this._onChange.bind(this));
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            _actionCreator2.default.getVehicles();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _vehiclesStore2.default.removeChangeListener(this._onChange.bind(this));
        }
    }, {
        key: 'removeVehicle',
        value: function removeVehicle(e) {
            var id = e.target.dataset.id;

            _actionCreator2.default.removeVehicles(id);

            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.REMOVE_VEHICLE,
                id: id
            });
        }
    }, {
        key: '_onChange',
        value: function _onChange() {
            this.setState({ vehicles: _vehiclesStore2.default.getVehicles() });
        }
    }, {
        key: 'onClick',
        value: function onClick(selectedVehicle) {
            this.setState({
                isSideBarVisible: !this.state.isSideBarVisible,
                vehicle: selectedVehicle
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var vehiclesHtml = this.state.vehicles.map(function (vehicle) {
                return _react2.default.createElement(
                    'tr',
                    { key: vehicle.id },
                    _react2.default.createElement(
                        'td',
                        null,
                        vehicle.mfg
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        vehicle.model
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        vehicle.year
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        vehicle.color
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        vehicle.vin
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        vehicle.plate
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            'button',
                            { onClick: _this2.removeVehicle, 'data-id': vehicle.id },
                            '\xD7'
                        ),
                        _react2.default.createElement(
                            'button',
                            { onClick: _this2.onClick.bind(_this2), 'data-id': vehicle.id },
                            'edit'
                        )
                    )
                );
            });

            return _react2.default.createElement(
                'div',
                { className: 'col-xs-12 col-md-12 main', id: 'vehicles-main' },
                _react2.default.createElement(
                    'div',
                    { className: 'page-header' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        'My Vehicles'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-xs-12 col-md-7' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'panel panel-info' },
                            _react2.default.createElement(
                                'div',
                                { className: 'panel-heading' },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Vehicles'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'panel-body' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'table-responsive vehicles-table' },
                                    _react2.default.createElement(
                                        'table',
                                        { className: 'table' },
                                        _react2.default.createElement(
                                            'thead',
                                            null,
                                            _react2.default.createElement(
                                                'tr',
                                                null,
                                                _react2.default.createElement(
                                                    'th',
                                                    null,
                                                    'Manufacturer'
                                                ),
                                                _react2.default.createElement(
                                                    'th',
                                                    null,
                                                    'Model'
                                                ),
                                                _react2.default.createElement(
                                                    'th',
                                                    null,
                                                    'Year'
                                                ),
                                                _react2.default.createElement(
                                                    'th',
                                                    null,
                                                    'Color'
                                                ),
                                                _react2.default.createElement(
                                                    'th',
                                                    null,
                                                    'Vin'
                                                ),
                                                _react2.default.createElement(
                                                    'th',
                                                    null,
                                                    'Plate'
                                                ),
                                                _react2.default.createElement(
                                                    'th',
                                                    null,
                                                    'Actions'
                                                )
                                            )
                                        ),
                                        _react2.default.createElement(
                                            'tbody',
                                            null,
                                            vehiclesHtml
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                this.state.isSideBarVisible ? _react2.default.createElement(_sidebar2.default, { data: this.state.vehicle }) : null
            );
        }
    }]);

    return VehiclesList;
}(_react2.default.Component);

exports.default = VehiclesList;

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

var _mfgOptions = __webpack_require__(263);

var _mfgOptions2 = _interopRequireDefault(_mfgOptions);

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
            manufacturers: [],
            mfg_vehicle: {
                mfg: '',
                model: '',
                year: '',
                color: '',
                vin: '',
                plate: ''
            }
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
            _actionCreator2.default.getManufacturers();
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
            var yearsHtml = [];

            // Manufacturers options
            var mfgOptions = this.state.manufacturers.map(function (mfg) {
                return _react2.default.createElement(_mfgOptions2.default, { key: mfg.id, result: mfg });
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