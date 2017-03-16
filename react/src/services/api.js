import request from 'superagent';
var Promise = require('es6-promise').Promise;

/**
 * Wrapper for calling a API
 */
var Api = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            request
                .get(url)
                .end(function (res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    },
    delete: function (url) {
        return new Promise(function (resolve, reject) {
            request
                .del(url)
                .end(function (res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(res.text);
                    }
                });
        });
    }
};

export default Api;