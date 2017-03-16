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
    items: {},
    getItems: function getItems() {
        fetch('http://mcs.dev/api/vehicles').then(function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                this.items = data;
            });
        });
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