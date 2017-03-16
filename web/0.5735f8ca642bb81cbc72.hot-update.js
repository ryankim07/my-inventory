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

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _flux = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"flux\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));

var _ListStore = __webpack_require__(21);

var _ListStore2 = _interopRequireDefault(_ListStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppDispatcher = new _flux.Dispatcher();

// Register callback with AppDispatcher
AppDispatcher.register(function (payload) {

    var action = payload.action;
    var new_item = payload.new_item;
    var id = payload.id;

    switch (action) {

        // Respond to add-item action
        case 'add-item':
            _ListStore2.default.addItem(new_item);
            break;

        // Respond to remove-item action
        case 'remove-item':
            _ListStore2.default.removeItem(id);
            break;

        default:
            return true;
    }

    // If action was responded to, emit change event
    _ListStore2.default.emitChange();

    return true;
});

exports.default = AppDispatcher;

/***/ }),

/***/ 21:
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

/***/ })

})