webpackHotUpdate(0,{

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(137);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(105);

var _main = __webpack_require__(239);

var _main2 = _interopRequireDefault(_main);

var _home = __webpack_require__(112);

var _home2 = _interopRequireDefault(_home);

var _allVehicles = __webpack_require__(240);

var _allVehicles2 = _interopRequireDefault(_allVehicles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.hashHistory },
    _react2.default.createElement(
        _reactRouter.Route,
        { component: _main2.default },
        _react2.default.createElement(_reactRouter.Route, { path: '/', component: _home2.default }),
        _react2.default.createElement(_reactRouter.Route, { path: '/vehicles', component: _allVehicles2.default })
    )
), document.querySelector('#root'));

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(105);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header() {
        _classCallCheck(this, Header);

        return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'nav',
                { className: 'navbar navbar-inverse navbar-fixed-top' },
                _react2.default.createElement(
                    'div',
                    { className: 'container-fluid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'navbar-header' },
                        _react2.default.createElement(
                            'button',
                            { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar', 'aria-expanded': 'false', 'aria-controls': 'navbar' },
                            _react2.default.createElement(
                                'span',
                                { className: 'sr-only' },
                                'Toggle navigation'
                            ),
                            _react2.default.createElement('span', { className: 'icon-bar' }),
                            _react2.default.createElement('span', { className: 'icon-bar' }),
                            _react2.default.createElement('span', { className: 'icon-bar' })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { id: 'navbar', className: 'navbar-collapse collapse' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'nav navbar-nav navbar-left' },
                            _react2.default.createElement(
                                'li',
                                { className: 'dropdown' },
                                _react2.default.createElement(
                                    'a',
                                    { href: '', className: 'dropdown-toggle', 'data-toggle': 'dropdown', role: 'button', 'aria-expanded': 'false' },
                                    'House ',
                                    _react2.default.createElement('span', { className: 'caret' })
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'dropdown-menu', role: 'menu' },
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            'a',
                                            { href: '', className: 'menu-link' },
                                            _react2.default.createElement('i', { className: 'fa fa-home menu-link-icon' }),
                                            'Add new'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            'a',
                                            { href: '', className: 'menu-link' },
                                            _react2.default.createElement('i', { className: 'fa fa-list-alt menu-link-icon' }),
                                            'List'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'dropdown' },
                                _react2.default.createElement(
                                    'a',
                                    { href: '', className: 'dropdown-toggle', 'data-toggle': 'dropdown', role: 'button', 'aria-expanded': 'false' },
                                    'Auto ',
                                    _react2.default.createElement('span', { className: 'caret' })
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'dropdown-menu', role: 'menu' },
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            'a',
                                            { href: '', className: 'menu-link' },
                                            _react2.default.createElement('i', { className: 'fa fa-car menu-link-icon' }),
                                            'Add new'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            _reactRouter.Link,
                                            { to: '/vehicles' },
                                            'All'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'dropdown' },
                                _react2.default.createElement(
                                    'a',
                                    { href: '', className: 'dropdown-toggle', 'data-toggle': 'dropdown', role: 'button', 'aria-expanded': 'false' },
                                    'Logs ',
                                    _react2.default.createElement('span', { className: 'caret' })
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'dropdown-menu', role: 'menu' },
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            'a',
                                            { href: '', className: 'menu-link' },
                                            _react2.default.createElement('i', { className: 'fa fa-tasks menu-link-icon' }),
                                            'View'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'dropdown' },
                                _react2.default.createElement(
                                    'a',
                                    { href: '', className: 'dropdown-toggle', 'data-toggle': 'dropdown', role: 'button', 'aria-expanded': 'false' },
                                    'Accounts ',
                                    _react2.default.createElement('span', { className: 'caret' })
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'dropdown-menu', role: 'menu' },
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            'a',
                                            { href: '', className: 'menu-link' },
                                            _react2.default.createElement('i', { className: 'fa fa-users menu-link-icon' }),
                                            'Users'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                { className: 'dropdown' },
                                _react2.default.createElement(
                                    'a',
                                    { href: '', className: 'dropdown-toggle', 'data-toggle': 'dropdown', role: 'button', 'aria-expanded': 'false' },
                                    'System ',
                                    _react2.default.createElement('span', { className: 'caret' })
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'dropdown-menu', role: 'menu' },
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            'a',
                                            { href: '', className: 'menu-link' },
                                            _react2.default.createElement('i', { className: 'fa fa-cogs menu-link-icon' }),
                                            'Settings'
                                        )
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'ul',
                            { className: 'nav navbar-nav navbar-right' },
                            _react2.default.createElement(
                                'li',
                                { className: 'dropdown' },
                                _react2.default.createElement(
                                    'a',
                                    { href: '', className: 'dropdown-toggle', 'data-toggle': 'dropdown', role: 'button', 'aria-expanded': 'false' },
                                    'Ryan',
                                    _react2.default.createElement('span', { className: 'caret' })
                                ),
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'dropdown-menu', role: 'menu' },
                                    _react2.default.createElement(
                                        'li',
                                        null,
                                        _react2.default.createElement(
                                            'a',
                                            { href: '', className: 'menu-link' },
                                            _react2.default.createElement('i', { className: 'fa fa-power-off menu-link-icon' }),
                                            'Logout'
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Header;
}(_react2.default.Component);

exports.default = Header;

/***/ }),

/***/ 113:
false,

/***/ 238:
false,

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _header = __webpack_require__(111);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainLayout = function (_React$Component) {
    _inherits(MainLayout, _React$Component);

    function MainLayout() {
        _classCallCheck(this, MainLayout);

        return _possibleConstructorReturn(this, (MainLayout.__proto__ || Object.getPrototypeOf(MainLayout)).apply(this, arguments));
    }

    _createClass(MainLayout, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'app' },
                _react2.default.createElement(_header2.default, null),
                _react2.default.createElement(
                    'main',
                    null,
                    this.props.children
                )
            );
        }
    }]);

    return MainLayout;
}(_react2.default.Component);

exports.default = MainLayout;

/***/ }),

/***/ 240:
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