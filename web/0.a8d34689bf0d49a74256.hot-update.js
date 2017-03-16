webpackHotUpdate(0,{

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

var _appDispatcher = __webpack_require__(35);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(34);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

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
            vehicle: {
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
        key: 'handleChange',
        value: function handleChange(propertyName, event) {
            var vehicle = this.state.vehicle;
            vehicle[propertyName] = event.target.value;
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
                            _react2.default.createElement('input', { type: 'text', onChange: this.handleChange.bind(this, 'mfg'), value: this.state.vehicle.mfg, className: 'form-control input-sm required' })
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
                            _react2.default.createElement('input', { type: 'text', onChange: this.handleChange.bind(this, ''), value: this.state.vehicle.model, className: 'form-control input-sm required' })
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
                            _react2.default.createElement('input', { type: 'text', onChange: this.handleChange.bind(this, ''), value: this.state.vehicle.year, className: 'form-control input-sm required' })
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
                            _react2.default.createElement('input', { type: 'text', onChange: this.handleChange.bind(this, ''), value: this.state.vehicle.color, className: 'form-control input-sm required' })
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
                            _react2.default.createElement('input', { type: 'text', onChange: this.handleChange.bind(this, ''), value: this.state.vehicle.vin, className: 'form-control input-sm required' })
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
                            _react2.default.createElement('input', { type: 'text', onChange: this.handleChange.bind(this, ''), value: this.state.vehicle.plate, className: 'form-control input-sm required' })
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

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

exports.default = VehicleForm;

/***/ })

})