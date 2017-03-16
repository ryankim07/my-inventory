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

    function AppRoot() {
        _classCallCheck(this, AppRoot);

        var _this = _possibleConstructorReturn(this, (AppRoot.__proto__ || Object.getPrototypeOf(AppRoot)).call(this));

        _this.state = getListState();
        return _this;
    }

    _createClass(AppRoot, [{
        key: 'render',
        value: function render() {
            var items = _liststore2.default.getItems();
            var itemHtml = items.map(function (listItem) {
                return _react2.default.createElement(
                    'li',
                    { key: listItem.id },
                    listItem.name
                );
            });
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'ul',
                    null,
                    itemHtml
                )
            );
        }
    }]);

    return AppRoot;
}(_react2.default.Component);

exports.default = AppRoot;

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(22);

var _lodash = __webpack_require__(23);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListStore = _lodash2.default.extend({}, _events.EventEmitter.prototype, {

    // Mock default data
    items: [{
        name: 'Item 1',
        id: 0
    }, {
        name: 'Item 2',
        id: 1
    }],

    getItems: function getItems() {
        return this.items;
    }

});

exports.default = ListStore;

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(18);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(113);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _approot = __webpack_require__(185);

var _approot2 = _interopRequireDefault(_approot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_approot2.default, null), document.querySelector('#root'));

/***/ }),

/***/ 20:
false,

/***/ 21:
false

})