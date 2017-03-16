webpackHotUpdate(0,{

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddVehicle = function (_React$Component) {
    _inherits(AddVehicle, _React$Component);

    function AddVehicle(props) {
        _classCallCheck(this, AddVehicle);

        var _this = _possibleConstructorReturn(this, (AddVehicle.__proto__ || Object.getPrototypeOf(AddVehicle)).call(this, props));

        _this.state = { value: '' };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(AddVehicle, [{
        key: 'handleChange',
        value: function handleChange(event) {
            this.setState({ value: event.target.value.toUpperCase() });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            alert('A name was submitted: ' + this.state.value);
            event.preventDefault();
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
                            { name: '' },
                            'Manufacturer'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange, name: 'mfg', className: 'form-control input-sm required', classID: 'mfg' })
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
                            { name: '' },
                            'Model'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange, name: 'model', className: 'form-control input-sm required', classID: 'model' })
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
                            { name: '' },
                            'Year'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange, name: 'year', className: 'form-control input-sm required', classID: 'year' })
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
                            { name: '' },
                            'Color'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange, name: 'color', className: 'form-control input-sm required', classID: 'color' })
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
                            { name: '' },
                            'VIN'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange, name: 'vin', className: 'form-control input-sm required', classID: 'vin' })
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
                            { name: '' },
                            'Plate'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'input-group' },
                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange, name: 'plate', className: 'form-control input-sm required', classID: 'plate' })
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

    return AddVehicle;
}(_react2.default.Component);

;

exports.default = AddVehicle;

/***/ })

})