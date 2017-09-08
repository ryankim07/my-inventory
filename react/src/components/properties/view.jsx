import React from 'react';
import Loader from '../loader';

class PropertyView extends React.Component
{
    constructor(props) {
        super(props);

        this.handleActions = this.handleActions.bind(this);
    }

    // Handle other actions
	handleActions(e) {
    	let action 	   = e.target.dataset.action;
    	let propertyId = this.props.property.id;
    	let pathName   = null;

		switch (action) {
			case 'view-rooms':
				pathName = "/properties/rooms/dashboard";
			break;

			case 'add-exterior-features':
				pathName = "/properties/exterior-features/add";
			break;
		}

		this.context.router.push({
			pathname: pathName,
			state: {
				property_id: propertyId
			}
		});
	}

	render() {
		let propertyHtml = '';

		// If loading is complete
		if (!this.props.loader) {
			let property = this.props.property;
			let address  = property.address;

			let propertyFeaturesBtn = property.property_features === undefined ?
				<button onClick={this.handleActions} data-action="add-property-features">
					Add Property Features
				</button> : null;

			let exteriorFeaturesBtn = property.exterior_features === undefined ?
				<button onClick={this.handleActions} data-action="add-exterior-features">
					Add Exterior Features
				</button> : null;

			let interiorFeaturesBtn = property.interior_features === undefined ?
				<button onClick={this.handleActions} data-action="add-interior-features">
					Add Interior Features
				</button> : null;

			propertyHtml =
				<div>
					<div>
						{ propertyFeaturesBtn }
						{ exteriorFeaturesBtn }
						{ interiorFeaturesBtn }
					</div>
					<div>
						<h4>Address</h4>
						<ul>
							<li>
								<label>Street:</label>
								<span>{address.street}</span>
							</li>
							<li>
								<label>City:</label>
								<span>{address.city}</span>
							</li>
							<li>
								<label>State:</label>
								<span>{address.state}</span>
							</li>
							<li>
								<label>Zip:</label>
								<span>{address.zip}</span>
							</li>
							<li>
								<label>County:</label>
								<span>{address.county}</span>
							</li>
							<li>
								<label>Country:</label>
								<span>{address.country}</span>
							</li>
							<li>
								<label>Subdivision:</label>
								<span>{address.subdivision}</span>
							</li>
						</ul>
					</div>
					<div>
						<h4>Property Details</h4>
						<div>
							<button onClick={this.handleActions} data-action="view-rooms">View Rooms</button>
						</div>
						<ul>
							<li>
								<label>Built:</label>
								<span>{property.built}</span>
							</li>
							<li>
								<label>Style:</label>
								<span>{property.style}</span>
							</li>
							<li>
								<label>Floors:</label>
								<span>{property.floors}</span>
							</li>
							<li>
								<label>Beds:</label>
								<span>{property.beds}</span>
							</li>
							<li>
								<label>Baths:</label>
								<span>{property.baths}</span>
							</li>
							<li>
								<label>Finished Area:</label>
								<span>{property.finished_area}</span>
							</li>
							<li>
								<label>Unfinished Area:</label>
								<span>{property.unfinished_area}</span>
							</li>
							<li>
								<label>Total Area:</label>
								<span>{property.total_area}</span>
							</li>
							<li>
								<label>Parcel Number:</label>
								<span>{property.parcel_number}</span>
							</li>
						</ul>
					</div>
				</div>
		} else {
			propertyHtml = <div><Loader /></div>;
		}

        return (
            <div className={[this.props.mobileWidth, this.props.desktopWidth, this.props.className].join(' ')} id="property-view">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-12 col-md-12">
                                    <span>Property Information</span>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            { propertyHtml }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PropertyView.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default PropertyView;