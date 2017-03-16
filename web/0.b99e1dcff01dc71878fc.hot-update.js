webpackHotUpdate(0,{

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(137);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(105);

var _mainLayout = __webpack_require__(113);

var _mainLayout2 = _interopRequireDefault(_mainLayout);

var _home = __webpack_require__(112);

var _home2 = _interopRequireDefault(_home);

var _vehicles = __webpack_require__(238);

var _vehicles2 = _interopRequireDefault(_vehicles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.hashHistory },
    _react2.default.createElement(
        _reactRouter.Route,
        { component: _mainLayout2.default },
        _react2.default.createElement(_reactRouter.Route, { path: '/', component: _home2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/vehicles', component: _vehicles2.default })
    )
), document.querySelector('#root'));

/***/ }),

/***/ 114:
false,

/***/ 238:
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

var VehiclesList = function (_React$Component) {
    _inherits(VehiclesList, _React$Component);

    function VehiclesList(props) {
        _classCallCheck(this, VehiclesList);

        var _this = _possibleConstructorReturn(this, (VehiclesList.__proto__ || Object.getPrototypeOf(VehiclesList)).call(this, props));

        _this.state = { vehicles: [] };
        return _this;
    }

    _createClass(VehiclesList, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch("http://mcs.dev/api/vehicles").then(function (result) {
                return result.json();
            }).then(function (vehicles) {
                return _this2.setState({ vehicles: vehicles });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "vehicles" },
                _react2.default.createElement(
                    "h1",
                    null,
                    "Vehicles"
                ),
                this.state.vehicles.map(function (vehicle) {
                    return _react2.default.createElement(
                        "div",
                        { key: vehicle.id, className: "" },
                        _react2.default.createElement(
                            "ul",
                            null,
                            _react2.default.createElement(
                                "li",
                                null,
                                vehicle.mfg
                            )
                        )
                    );
                })
            );
        }
    }]);

    return VehiclesList;
}(_react2.default.Component);

;

exports.default = VehiclesList;

/***/ })

})