import request from 'superagent';
var Promise = require('es6-promise').Promise;

/**
 * Wrapper for calling a API
 */
var Api = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
            fetch(url)
                .then(
                    function(response) {
                        if (response.status !== 200) {
                            console.log('Looks like there was a problem. Status Code: ' + response.status);
                            reject();
                        }

                        // Examine the text in the response
                        response.json().then(function(data) {
                            resolve(data);
                        });
                    }
                )
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                });
        });
    },

    post: function (url, data) {
        return new Promise(function (resolve, reject) {
            request
                .post(url)
                .send({ my_new_vehicle: data })
                .set('Accept', 'application/json')
                .end(function (res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
            /*fetch(url, {
                method: 'POST',
                body: data
                })
                .then(json)
                .then(function (msg) {
                    console.log('Request succeeded with JSON response', msg);
                })
                .catch(function(err) {
                    console.log('Fetch Error :-S', err);
                });*/
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