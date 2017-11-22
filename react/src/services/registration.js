import request from 'superagent';
let Promise = require('es6-promise').Promise;

/**
 * Wrapper for calling a API
 */
let Registration = {
	post: function (url, data) {
		return new Promise(function (resolve, reject) {
			request
				.post(url)
				.field('data', JSON.stringify(data))
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

export default Registration;