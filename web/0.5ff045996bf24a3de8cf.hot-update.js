webpackHotUpdate(0,{

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(86);

var _lodash = __webpack_require__(103);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListStore = _lodash2.default.extend({}, _events.EventEmitter.prototype, {

    // Mock default data
    /*items: [
        {
            name: 'Item 1',
            id: 0
        },
        {
            name: 'Item 2',
            id: 1
        }
    ],*/
    items: null,
    getItems: function getItems() {
        var _this = this;

        fetch('http://mcs.dev/api/vehicles').then(function (result) {
            return result.json();
        }).then(function (vehicles) {
            return _this.items.push({ vehicles: vehicles });
        });
        return this.items;
    },
    // Add item
    addItem: function addItem(new_item) {
        this.items.push(new_item);
    },

    // Remove item
    removeItem: function removeItem(item_id) {

        var items = this.items;

        _lodash2.default.remove(items, function (item) {
            return item_id == item.id;
        });

        this.items = items;
    },

    // Emit Change event
    emitChange: function emitChange() {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function addChangeListener(callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
});

exports.default = ListStore;

/***/ })

})