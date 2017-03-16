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

var _sidebar = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./src/components/sidebar\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

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
        { component: Right },
        _react2.default.createElement(_reactRouter.Route, { path: '/', component: _sidebar2.default })
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

    function Main() {
        _classCallCheck(this, Main);

        return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
    }

    _createClass(Main, [{
        key: 'render',
        value: function render() {
            var styleClass = this.state.isVisible ? 'hidden' : 'visible';
            console.log(styleClass);
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
                    { className: 'right', style: { visibility: styleClass } },
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

/***/ })

})