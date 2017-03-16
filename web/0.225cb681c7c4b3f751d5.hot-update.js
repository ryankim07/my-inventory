webpackHotUpdate(0,{

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(18);

var _react2 = _interopRequireDefault(_react);

var _liststore = __webpack_require__(186);

var _liststore2 = _interopRequireDefault(_liststore);

var _AppDispatcher = __webpack_require__(187);

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var _NewItemForm = __webpack_require__(188);

var _NewItemForm2 = _interopRequireDefault(_NewItemForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Method to retrieve state from Stores
var getListState = function getListState() {
    return {
        items: _liststore2.default.getItems()
    };
};

var AppRoot = function (_React$Component) {
    _inherits(AppRoot, _React$Component);

    _createClass(AppRoot, [{
        key: '_onChange',
        value: function _onChange() {
            this.setState(getListState());
        }
    }]);

    function AppRoot() {
        _classCallCheck(this, AppRoot);

        var _this2 = _possibleConstructorReturn(this, (AppRoot.__proto__ || Object.getPrototypeOf(AppRoot)).call(this));

        _this2.state = getListState();
        return _this2;
    }

    // Add change listeners to stores


    _createClass(AppRoot, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _liststore2.default.addChangeListener(this._onChange.bind(this));
        }

        // Remove change listeners from stores

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _liststore2.default.removeChangeListener(this._onChange.bind(this));
        }
    }, {
        key: 'removeItem',
        value: function removeItem(e) {

            var id = e.target.dataset.id;

            _AppDispatcher2.default.dispatch({
                action: 'remove-item',
                id: id
            });
        }
    }, {
        key: 'render',
        value: function render() {

            var _this = this;
            var items = _liststore2.default.getItems();
            var itemHtml = items.map(function (listItem) {
                return _react2.default.createElement(
                    'li',
                    { key: listItem.id },
                    listItem.name,
                    ' ',
                    _react2.default.createElement(
                        'button',
                        { onClick: _this.removeItem, 'data-id': listItem.id },
                        '\xD7'
                    )
                );
            });

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'ul',
                    null,
                    itemHtml
                ),
                _react2.default.createElement(_NewItemForm2.default, null)
            );
        }
    }]);

    return AppRoot;
}(_react2.default.Component);

exports.default = AppRoot;

/***/ })

})