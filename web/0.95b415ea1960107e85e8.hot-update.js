webpackHotUpdate(0,{

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _flux = __webpack_require__(60);

var _objectAssign = __webpack_require__(61);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppDispatcher = (0, _objectAssign2.default)(new _flux.Dispatcher(), {

    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the view.
     */
    handleViewAction: function handleViewAction(action) {
        var payload = {
            action: action
        };
        this.dispatch(payload);
    }

});

exports.default = AppDispatcher;

/***/ })

})