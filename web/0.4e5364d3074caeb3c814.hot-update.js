webpackHotUpdate(0,{

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _header = __webpack_require__(119);

var _header2 = _interopRequireDefault(_header);

var _footer = __webpack_require__(118);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main() {
        _classCallCheck(this, Main);

        return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
    }

    _createClass(Main, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'app' },
                _react2.default.createElement(
                    'div',
                    { className: 'header' },
                    _react2.default.createElement(_header2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'main container-fluid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'row-fluid' },
                        this.props.children
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'footer' },
                    _react2.default.createElement(_footer2.default, null)
                )
            );
        }
    }]);

    return Main;
}(_react2.default.Component);

exports.default = Main;

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _vehiclesStore = __webpack_require__(127);

var _vehiclesStore2 = _interopRequireDefault(_vehiclesStore);

var _appDispatcher = __webpack_require__(35);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(34);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

var _actionCreator = __webpack_require__(117);

var _actionCreator2 = _interopRequireDefault(_actionCreator);

var _newVehicleForm = __webpack_require__(123);

var _newVehicleForm2 = _interopRequireDefault(_newVehicleForm);

var _sidebar = __webpack_require__(124);

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
            isSideBarVisible: false
        };
        return _this;
    }

    // Add change listeners to stores


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
        value: function onClick() {
            this.setState({ isSideBarVisible: !this.state.isSideBarVisible });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var vehiclesHtml = void 0;
            vehiclesHtml = this.state.vehicles.map(function (vehicle) {
                return _react2.default.createElement(
                    'li',
                    { key: vehicle.id },
                    vehicle.model,
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
                );
            });

            return _react2.default.createElement(
                'div',
                { 'class': 'col-xs-12 col-md-12 main', id: 'dashboard-main' },
                _react2.default.createElement(
                    'div',
                    { 'class': 'page-header' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        'Dashboard'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { 'class': 'col-xs-12 col-md-7' },
                    _react2.default.createElement(
                        'div',
                        { 'class': 'row' },
                        _react2.default.createElement(
                            'div',
                            { 'class': 'panel panel-info' },
                            _react2.default.createElement(
                                'div',
                                { 'class': 'panel-heading' },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    'Plans'
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { 'class': 'panel-body' },
                                _react2.default.createElement(
                                    'ul',
                                    null,
                                    vehiclesHtml
                                ),
                                _react2.default.createElement(_newVehicleForm2.default, null)
                            )
                        )
                    )
                ),
                this.state.isSideBarVisible ? _react2.default.createElement(_sidebar2.default, null) : null
            );
        }
    }]);

    return VehiclesList;
}(_react2.default.Component);

exports.default = VehiclesList;

/***/ })

})