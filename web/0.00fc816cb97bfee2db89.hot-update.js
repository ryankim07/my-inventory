webpackHotUpdate(0,{

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _superagent = __webpack_require__(258);

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Promise = __webpack_require__(129).Promise;

/**
 * Wrapper for calling a API
 */
var Api = {
    get: function get(url) {
        return new Promise(function (resolve, reject) {
            _superagent2.default.get(url).end(function (res) {
                if (res.status === 404) {
                    reject();
                } else {
                    resolve(JSON.parse(res.text));
                }
            });
        });
    },
    delete: function _delete(url) {
        return new Promise(function (resolve, reject) {
            _superagent2.default.del(url).end(function (res) {
                if (res.status === 404) {
                    reject();
                } else {
                    resolve(res.text);
                }
            });
        });
    }
};

exports.default = Api;

/***/ })

})