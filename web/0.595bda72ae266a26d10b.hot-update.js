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
), hashHistorydocument.querySelector('#root'));

/***/ })

})