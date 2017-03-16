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

var _sidebar = __webpack_require__(263);

var _sidebar2 = _interopRequireDefault(_sidebar);

var _sidebarSample = __webpack_require__(264);

var _sidebarSample2 = _interopRequireDefault(_sidebarSample);

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
        _react2.default.createElement(_reactRouter.Route, { path: '/', component: _sidebarSample2.default })
    )
), document.querySelector('#root'));

/***/ }),

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SidebarSample = function (_React$Component) {
    _inherits(SidebarSample, _React$Component);

    function SidebarSample() {
        _classCallCheck(this, SidebarSample);

        return _possibleConstructorReturn(this, (SidebarSample.__proto__ || Object.getPrototypeOf(SidebarSample)).apply(this, arguments));
    }

    _createClass(SidebarSample, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { id: "sidebar-sample" },
                "This this sidebar"
            );
        }
    }]);

    return SidebarSample;
}(_react2.default.Component);

exports.default = SidebarSample;

/***/ })

})