import React from 'react';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import PropertiesAction from '../../actions/properties-action';
import PropertyAddressList from './address/list';
import Loader from '../loader';

class PropertiesList extends React.Component
{
    constructor(props) {
        super(props);

        this.handleEdit   = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
		this.handleView   = this.handleView.bind(this);
    }

    editProperty(data) {

    }

	handleAdd() {
		AppDispatcher.handleViewAction({
			actionType: ActionConstants.SHOW_PROPERTY_PANEL
		});
	}

	handleEdit(data) {
		AppDispatcher.handleViewAction({
			actionType: ActionConstants.EDIT_PROPERTY,
			property: data
		});
	}

	handleRemove(id) {
		PropertiesAction.removeAddress(id);
	}

	handleView(propertyId) {
		this.context.router.push({
			pathname: "/properties/dashboard",
			state: {property_id: propertyId}
		});
	}

    render() {
        let propertiesHtml = '';

		// If loading is complete
        if (!this.props.state.loader) {
			let properties = this.props.state.properties;

			if (!properties) {
				propertiesHtml = <tr><td>There are no saved property.</td></tr>;
			} else {
				propertiesHtml += properties.map((property) => {
					let address = property.address;

					return (
						<PropertyAddressList
							address={ address }
							handleEdit={ this.handleEdit }
							handleRemove={ this.handleRemove }
							handleView={ this.handleView }
						/>
					);
				});
			}
        } else {
            propertiesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
            <div className={ [this.props.mobileWidth, this.props.desktopWidth, this.props.className].join(' ') } id="properties-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Properties List</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
									<button onClick={ this.handleAdd.bind(this) }><i className="fa fa-plus">Add Property</i></button>
								</div>
                            </div>
                        </div>
                        <div className="panel-body">
							<table className="table">
								<thead>
								<tr>
									<th>Street</th>
									<th>City</th>
									<th>State</th>
									<th>Zip</th>
									<th>County</th>
									<th>Country</th>
									<th>Subdivision</th>
								</tr>
								</thead>
								<tbody>
									{ propertiesHtml }
								</tbody>
							</table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PropertiesList.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertiesList;