webpackHotUpdate(0,{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(83);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(112);

var _main = __webpack_require__(123);

var _main2 = _interopRequireDefault(_main);

var _home = __webpack_require__(122);

var _home2 = _interopRequireDefault(_home);

var _addVehicle = __webpack_require__(119);

var _addVehicle2 = _interopRequireDefault(_addVehicle);

var _vehiclesList = __webpack_require__(125);

var _vehiclesList2 = _interopRequireDefault(_vehiclesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.hashHistory },
    _react2.default.createElement(
        _reactRouter.Route,
        { component: _main2.default },
        _react2.default.createElement(_reactRouter.Route, { path: '/', component: _home2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/vehicle/add', component: _addVehicle2.default }),
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

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _header = __webpack_require__(121);

var _header2 = _interopRequireDefault(_header);

var _footer = __webpack_require__(120);

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main(props) {
        _classCallCheck(this, Main);

        var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

        _this.state = { isSidebarVisible: 'hidden' };
        return _this;
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
                    { className: 'main' },
                    this.props.children
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

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _vehiclesStore = __webpack_require__(127);

var _vehiclesStore2 = _interopRequireDefault(_vehiclesStore);

var _appDispatcher = __webpack_require__(37);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(36);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

var _actionCreator = __webpack_require__(118);

var _actionCreator2 = _interopRequireDefault(_actionCreator);

var _newVehicleForm = __webpack_require__(124);

var _newVehicleForm2 = _interopRequireDefault(_newVehicleForm);

var _sidebar = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./src/components/sidebar\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

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
            isSideBarVisible: 'hidden'
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

            var styleClass = this.state.isSidebarVisible ? 'hidden' : 'visible';
            console.log(styleClass);

            var vehiclesHtml = void 0;
            vehiclesHtml = this.state.vehicles.map(function (vehicle) {
                console.log(vehicle);
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
                        { onClick: _this2.onClick, 'data-id': vehicle.id },
                        'edit'
                    )
                );
            });

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

    return VehiclesList;
}(_react2.default.Component);

exports.default = VehiclesList;

/***/ }),

/***/ 263:
false,

/***/ 264:
false

})