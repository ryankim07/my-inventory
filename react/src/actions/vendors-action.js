import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let VendorsAction = {
	getVendorsAndCategories: function() {
		Api
			.getMultiple('http://mcs.dev/api/vendors', 'http://mcs.dev/api/vendor/categories')
			.then(function ([vendors, categories])  {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_VENDORS_AND_CATEGORIES,
					vendors: vendors,
					categories: categories
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.VENDORS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

	getVendors: function() {
		Api
			.get('http://mcs.dev/api/vendors')
			.then(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_VENDORS,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.VENDORS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

	addVendor: function(data) {
		Api
			.post('http://mcs.dev/api/vendor', data)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.ADD_VENDOR,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.VENDORS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

	updateVendor: function(data) {
		Api
			.post('http://mcs.dev/api/vendor', data)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.UPDATE_VENDOR,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.VENDORS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

	removeVendor: function(id) {
		Api
			.delete('http://mcs.dev/api/vendors/' + id)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.REMOVE_VENDOR,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.VENDORS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	}
};

export default VendorsAction;