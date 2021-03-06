import request from 'superagent';
let Promise = require('es6-promise').Promise;
import AuthStore from '../stores/auth/store';

/**
 * Wrapper for calling a API
 */
let Api = {
    get: function (url) {
        return new Promise(function (resolve, reject) {
			request
				.get(url)
				.set('Authorization', 'Bearer ' + AuthStore.getJwt())
				.end(function(err, res){
					if (err || res.status !== 200) {
						let errBody = JSON.parse(res.text);

						reject({
							status: res.status,
							msg: errBody.msg
						});
					} else {
						resolve(JSON.parse(res.text));
					}
				});
        });
    },

    post: function (url, data, asset) {
        return new Promise(function (resolve, reject) {
            	request
					.post(url)
					.set('Authorization', 'Bearer ' + AuthStore.getJwt())
					.field('data', JSON.stringify(data))
					.attach('file', asset)
					.end(function(err, res){
						if (err || res.status !== 200) {
							let errBody = JSON.parse(res.text);

							reject({
								status: res.status,
								msg: errBody.msg
							});
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
				.set('Authorization', 'Bearer ' + AuthStore.getJwt())
				.end(function(err, res){
					if (err || res.status !== 200) {
						let errBody = JSON.parse(res.text);

						reject({
							status: res.status,
							msg: errBody.msg
						});
					} else {
						resolve(JSON.parse(res.text));
					}
				});
        });
    }
};

export default Api;