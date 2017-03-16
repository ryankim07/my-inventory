webpackHotUpdate(0,[
/* 0 */
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

var _sidebar = __webpack_require__(263);

var _sidebar2 = _interopRequireDefault(_sidebar);

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
    ),
    _react2.default.createElement(
        _reactRouter.Route,
        { component: _sidebar2.default },
        _react2.default.createElement(_reactRouter.Route, { path: '/', component: SidebarSample })
    )
), document.querySelector('#root'));

/***/ })
])