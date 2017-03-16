webpackHotUpdate(0,{

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(52);

var _react2 = _interopRequireDefault(_react);

var _appDispatcher = __webpack_require__(53);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewItemForm = function (_React$Component) {
    _inherits(NewItemForm, _React$Component);

    function NewItemForm() {
        _classCallCheck(this, NewItemForm);

        return _possibleConstructorReturn(this, (NewItemForm.__proto__ || Object.getPrototypeOf(NewItemForm)).apply(this, arguments));
    }

    _createClass(NewItemForm, [{
        key: 'createItem',
        value: function createItem(e) {

            // so we don't reload the page
            e.preventDefault();

            // create ID
            var id = guid();

            // this gets the value from the input
            var item_title = ReactDOM.findDOMNode(this.refs.item_title).value.trim();

            // this removes the value from the input
            ReactDOM.findDOMNode(this.refs.item_title).value = '';

            // This is where the magic happens,
            // no need to shoot this action all the way to the root of your application to edit state.
            // AppDispatcher does this for you.
            _appDispatcher2.default.dispatch({
                action: 'add-item',
                new_item: {
                    id: id,
                    name: item_title
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                'form',
                { onSubmit: this.createItem.bind(this) },
                _react2.default.createElement('input', { type: 'text', ref: 'item_title' }),
                _react2.default.createElement(
                    'button',
                    null,
                    'Add new item'
                )
            );
        }
    }]);

    return NewItemForm;
}(_react2.default.Component);

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

exports.default = NewItemForm;

/***/ })

})