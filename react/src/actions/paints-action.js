import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let PaintsAction = {
	getPaints: function() {
		Api
			.get('http://mcs.dev/api/paints')
			.then(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_PAINTS,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.PAINTS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

	addPaint: function(data) {
		Api
			.post('http://mcs.dev/api/paint', data, data.assets)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.ADD_PAINT,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.PAINTS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

	updatePaint: function(data) {
		Api
			.post('http://mcs.dev/api/paint', data, data.assets)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.UPDATE_PAINT,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.PAINTS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	},

	removePaint: function(id) {
		Api
			.delete('http://mcs.dev/api/paints/' + id)
			.then(function (resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.REMOVE_PAINT,
					results: resp
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.PAINTS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	}
};

export default PaintsAction;