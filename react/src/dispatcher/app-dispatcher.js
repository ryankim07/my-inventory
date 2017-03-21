import {Dispatcher} from 'flux';
import assign from 'object-assign';

let AppDispatcher = assign(new Dispatcher(), {

    handleViewAction: function (action) {
        let payload = {
            action: action
        };

        this.dispatch(payload);
    }

});

export default AppDispatcher;