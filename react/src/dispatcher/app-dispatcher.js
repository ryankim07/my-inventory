import {Dispatcher} from 'flux';
import assign from 'object-assign';

var AppDispatcher = assign(new Dispatcher(), {

    handleViewAction: function (action) {
        var payload = {
            action: action
        };
        this.dispatch(payload);
    }
});

export default AppDispatcher;