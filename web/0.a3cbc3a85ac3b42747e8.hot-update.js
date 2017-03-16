webpackHotUpdate(0,{

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _appDispatcher = __webpack_require__(26);

var _appDispatcher2 = _interopRequireDefault(_appDispatcher);

var _actionConstants = __webpack_require__(25);

var _actionConstants2 = _interopRequireDefault(_actionConstants);

var _Api = __webpack_require__(91);

var _Api2 = _interopRequireDefault(_Api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionCreator = {
    getVehicles: function getVehicles() {
        _Api2.default.get('http://mcs.dev/api/vehicles').then(function (vehicles) {
            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.RECEIVE_VEHICLES,
                vehicles: vehicles
            });
        }).catch(function () {
            _appDispatcher2.default.handleViewAction({
                actionType: _actionConstants2.default.RECEIVE_ERROR,
                error: 'There was a problem getting the vehicles'
            });
        });
    }
};

exports.default = ActionCreator;

/***/ })

})