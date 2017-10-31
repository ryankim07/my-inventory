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

	getMultiple: function(url1, url2) {
		return Promise.all([this.get(url1), this.get(url2)]);
	},

    post: function (url, data) {
    	const assets = data.assets ? data.assets : false;

        return new Promise(function (resolve, reject) {
			const req = request
					.post(url)
					.set('Authorization', 'Bearer ' + AuthStore.getJwt())
					.field('data', JSON.stringify(data));

			if (assets) {
				assets.forEach((asset) => {
					req.attach(asset.name, asset);
				});
			}

			req.end(function(err, res){
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