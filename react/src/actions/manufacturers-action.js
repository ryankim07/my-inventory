import AppDispatcher from '../dispatcher/app-dispatcher';
import ActionConstants from '../constants/action-constants';
import Api from '../services/Api';

let ManufacturersAction = {
    getManufacturers: function() {
        Api
            .get('http://mcs.dev/api/manufacturers')
            .then(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.RECEIVE_MANUFACTURERS,
                    results: resp
                });
            })
            .catch(function(resp) {
                AppDispatcher.handleViewAction({
                    actionType: ActionConstants.MANUFACTURERS_ERROR,
					results: resp.status + ' : ' + resp.msg
                });
            });
    },

	sync: function() {
		Api
			.get('http://mcs.dev/api/manufacturers/sync')
			.then(function(resp) {
				/*AppDispatcher.handleViewAction({
					actionType: ActionConstants.SYNC_API_VEHICLES,
					results: resp
				});*/
			})
			.catch(function(resp) {
				AppDispatcher.handleViewAction({
					actionType: ActionConstants.MANUFACTURERS_ERROR,
					results: resp.status + ' : ' + resp.msg
				});
			});
	}
};

export default ManufacturersAction;