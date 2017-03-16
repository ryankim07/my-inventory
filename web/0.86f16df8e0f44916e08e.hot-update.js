webpackHotUpdate(0,{

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

var NewVehicleForm = function (_React$Component) {
    _inherits(NewVehicleForm, _React$Component);

    function NewVehicleForm() {
        _classCallCheck(this, NewVehicleForm);

        return _possibleConstructorReturn(this, (NewVehicleForm.__proto__ || Object.getPrototypeOf(NewVehicleForm)).apply(this, arguments));
    }

    _createClass(NewVehicleForm, [{
        key: 'createItem',
        value: function createItem(e) {

            // so we don't reload the page
            e.preventDefault();

            // create ID
            var id = guid();

            // this gets the value from the input
            var vehicle_name = _reactDom2.default.findDOMNode(this.refs.vehicle_name).value.trim();

            // this removes the value from the input
            _reactDom2.default.findDOMNode(this.refs.vehicle_name).value = '';

            // This is where the magic happens,
            // no need to shoot this action all the way to the root of your application to edit state.
            // AppDispatcher does this for you.
            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.ADD_VEHICLE,
                new_vehicle: {
                    id: id,
                    name: vehicle_name
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.props.data);
            return _react2.default.createElement(
                'form',
                { onSubmit: this.createItem.bind(this) },
                _react2.default.createElement('input', { type: 'text', ref: 'vehicle_name' }),
                _react2.default.createElement(
                    'button',
                    null,
                    'Add new item'
                )
            );
        }
    }]);

    return NewVehicleForm;
}(_react2.default.Component);

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

exports.default = NewVehicleForm;

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _newVehicleForm = __webpack_require__(123);

var _newVehicleForm2 = _interopRequireDefault(_newVehicleForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sidebar = function (_React$Component) {
    _inherits(Sidebar, _React$Component);

    function Sidebar() {
        _classCallCheck(this, Sidebar);

        return _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).apply(this, arguments));
    }

    _createClass(Sidebar, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'col-xs-12 col-md-5' },
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
                                'Vehicle Edit'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'panel-body' },
                            _react2.default.createElement(_newVehicleForm2.default, { data: this.props.data })
                        )
                    )
                )
            );
        }
    }]);

    return Sidebar;
}(_react2.default.Component);

exports.default = Sidebar;

/***/ })

})