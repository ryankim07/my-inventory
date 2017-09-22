import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let PaintsAction = {

	getPaints: function() {
		Api
			.get('http://mcs.dev/api/paints')
			.then(function(results) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_PAINTS,
					results: results
				});
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.RECEIVE_ERROR,
					status: resp.status,
					msg: resp.msg
				});
			});
	},
};

export default PaintsAction;