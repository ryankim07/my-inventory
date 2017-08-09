import React from 'react';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import Loader from '../loader';
import PropertiesStore from '../../stores/properties/store';
import PropertiesAction from '../../actions/properties-action';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let mainClassName = 'main-column';

class PropertiesList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
			properties: [],
            property: {},
            loader: true
        };

        this._onChange 			= this._onChange.bind(this);
        this.editProperty 		= this.editProperty.bind(this);
        this.removeProperty 	= this.removeProperty.bind(this);
        this.handleOtherActions = this.handleOtherActions.bind(this);
    }

    componentWillMount() {
        PropertiesStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
        PropertiesAction.getProperties();
    }

    componentWillUnmount() {
        PropertiesStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
			properties: PropertiesStore.getProperties(),
			property: {},
            loader: false
        });
    }

    editProperty(e) {
        // Set panel width
        let data = e.target.dataset;

		AppDispatcher.handleViewAction({
			actionType: ActionConstants.EDIT_PROPERTY,
			property: {
				id: data.id,
				built: data.built,
				style: data.style,
				floors: data.floors,
				beds: data.beds,
				baths: data.baths,
				finished_area: data.finished_area,
				unfinished_area: data.unfinished_area,
				total_area: data.total_area,
				parcel_number: data.parcel_number,
				assets: {
					name: data.imageName,
					path: data.imagePath
				}
			},
			openRightPanel: true
		});
    }

    removeProperty(e) {
        let id = e.target.dataset.id;
        PropertiesAction.removeProperty(id);
    }

	handleOtherActions(e) {
		let id     = e.target.dataset.id;
		let action = e.target.dataset.action;

		switch (action) {
			case 'add-address':
				this.context.router.push({
					pathname: "/property/address/add",
					state: {property_id: id}
				});
			break;

			case 'add-rooms':
				this.context.router.push({
					pathname: "/property/rooms/add",
					state: {property_id: id}
				});
			break;
		}
	}

    render() {
        let propertiesHtml = '';

		// If loading is complete
        if (!this.state.loader) {
			let properties = this.state.properties;

			if (!properties) {
				propertiesHtml = <tr><td>There are no saved property.</td></tr>;
			} else {
				propertiesHtml = properties.map((property) => {
					let imageName = property.assets[0] === undefined ? property.assets.name : property.assets[0].name;
					let imagePath = property.assets[0] === undefined ? property.assets.path : property.assets[0].path;
					let addressBtn = property.address === undefined ?
						<button onClick={this.handleOtherActions} data-id={property.id} data-action="add-address">Add
							Address</button> : null;

					return (
						<tr key={property.id}>
							<td>{property.built}</td>
							<td>{property.style}</td>
							<td>{property.floors}</td>
							<td>{property.beds}</td>
							<td>{property.baths}</td>
							<td>{property.finished_area}</td>
							<td>{property.unfinished_area}</td>
							<td>{property.total_area}</td>
							<td>{property.parcel_number}</td>
							<td>
								<button onClick={this.removeProperty} data-id={property.id}>×</button>
								<button onClick={this.editProperty}
										data-id={property.id}
										data-built={property.built}
										data-style={property.style}
										data-floors={property.floors}
										data-beds={property.beds}
										data-baths={property.baths}
										data-finished-area={property.finished_area}
										data-unfinished-area={property.unfinished_area}
										data-total-area={property.total_area}
										data-parcel-number={property.parcel_number}
										data-image-name={imageName}
										data-image-path={imagePath}>edit
								</button>
								{addressBtn}
								<button onClick={this.handleOtherActions} data-id={property.id}
										data-action="add-property-features">Add Property Features
								</button>
								<button onClick={this.handleOtherActions} data-id={property.id}
										data-action="add-exterior-features">Add Exterior Features
								</button>
								<button onClick={this.handleOtherActions} data-id={property.id}
										data-action="add-interior-features">Add Interior Features
								</button>
								<button onClick={this.handleOtherActions} data-id={property.id} data-action="add-rooms">
									Add Rooms
								</button>
							</td>
						</tr>
					);
				});
			}
        } else {
            propertiesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
            <div className={[this.props.mobileWidth, this.props.desktopWidth, this.props.className].join(' ')} id="properties-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Properties List</span>
                                </div>
                                <div className="col-xs-2 col-md-2"></div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Built</th>
                                    <th>Style</th>
									<th>Floors</th>
                                    <th>Beds</th>
                                    <th>Baths</th>
                                    <th>Finished Area</th>
									<th>Unfinished Area</th>
									<th>Total Area</th>
									<th>Parcel Number</th>
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