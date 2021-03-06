import React from 'react';
import Previous from '../../helper/previous';

class PropertyInfoView extends React.Component
{
	// Toggle panel for add or edit
	handleRightPanel(panel, isEditingMode) {
		let features = null;
		let sidePanelFeaturesName 	 	  = this.props.sidePanelFeaturesName;
		let sidePanelExteriorFeaturesName = this.props.sidePanelExteriorFeaturesName;
		let sidePanelInteriorFeaturesName = this.props.sidePanelInteriorFeaturesName;

		switch (panel) {
			case sidePanelFeaturesName:
				features = {
					id: '',
					property_id: this.props.state.property.id,
					parking: '',
					multi_unit: '',
					hoa: '',
					utilities: '',
					lot: '',
					common_walls: '',
					facing_direction: '',
					others: ''
				}
			break;

			case sidePanelExteriorFeaturesName:
				features = {
					id: '',
					property_id: this.props.state.property.id,
					exterior: '',
					foundation: '',
					others: ''
				}
			break;

			case sidePanelInteriorFeaturesName:
				features = {
					id: '',
					property_id: this.props.state.property.id,
					laundry: '',
					kitchen: '',
					bathroom: '',
					cooling: '',
					heating: '',
					fireplace: '',
					flooring: '',
					others: ''
				}
			break;
		}

		this.props.onHandleRightPanel(panel, features, isEditingMode);
	}

	// Handle view
	handleRoomsDashboard(panel) {
		this.props.onHandleRoomsDashboard(panel);
	}

	render() {
		let columnCss 		 = this.props.state.columnCss;
		let property 		 = this.props.state.property;
		let address  		 = property.address;
		let features		 = property.features;
		let exteriorFeatures = property.exterior_features;
		let interiorFeatures = property.interior_features;

		let propertyFeaturesBtn = features === undefined ?
			<button onClick={ this.handleRightPanel.bind(this, this.props.sidePanelFeaturesName, false) }><i className="fa fa-plus" aria-hidden="true" /> Add Property Features</button> : null;

		let exteriorFeaturesBtn = exteriorFeatures === undefined ?
			<button onClick={ this.handleRightPanel.bind(this, this.props.sidePanelExteriorFeaturesName, false) }><i className="fa fa-plus" aria-hidden="true" /> Add Exterior Features</button> : null;

		let interiorFeaturesBtn = interiorFeatures === undefined ?
			<button onClick={ this.handleRightPanel.bind(this, this.props.sidePanelInteriorFeaturesName, false) }><i className="fa fa-plus" aria-hidden="true" /> Add Interior Features</button> : null;

		let addressHtml = address !== undefined ?
			<div>
				<h4>Address</h4>
				<ul>
					<li>
						<label>Street:</label>
						<span>{ address.street }</span>
					</li>
					<li>
						<label>City:</label>
						<span>{ address.city }</span>
					</li>
					<li>
						<label>State:</label>
						<span>{ address.state }</span>
					</li>
					<li>
						<label>Zip:</label>
						<span>{ address.zip }</span>
					</li>
					<li>
						<label>County:</label>
						<span>{ address.county }</span>
					</li>
					<li>
						<label>Country:</label>
						<span>{ address.country }</span>
					</li>
					<li>
						<label>Subdivision:</label>
						<span>{ address.subdivision }</span>
					</li>
				</ul>
			</div> : null;

		let detailsHtml = property !== undefined ?
			<div>
				<h4>Property Details</h4>
				<div>
					<button onClick={ this.handleRoomsDashboard.bind(this, this.props.mainPanelRoomsDashboardName) }>View Rooms</button>
				</div>
				<ul>
					<li>
						<label>Built:</label>
						<span>{ property.built }</span>
					</li>
					<li>
						<label>Style:</label>
						<span>{ property.style }</span>
					</li>
					<li>
						<label>Floors:</label>
						<span>{ property.floors }</span>
					</li>
					<li>
						<label>Beds:</label>
						<span>{ property.beds }</span>
					</li>
					<li>
						<label>Baths:</label>
						<span>{ property.baths }</span>
					</li>
					<li>
						<label>Finished Area:</label>
						<span>{ property.finished_area }</span>
					</li>
					<li>
						<label>Unfinished Area:</label>
						<span>{ property.unfinished_area }</span>
					</li>
					<li>
						<label>Total Area:</label>
						<span>{ property.total_area }</span>
					</li>
					<li>
						<label>Parcel Number:</label>
						<span>{ property.parcel_number }</span>
					</li>
				</ul>
			</div> : null;

		let featuresHtml = features !== undefined ?
			<div>
				<h4>Property Features</h4>
				<div>
					<button onClick={ this.handleRightPanel.bind(this, this.props.sidePanelFeaturesName, true) }><i className="fa fa-pencil" aria-hidden="true"/> Edit exterior features</button>
				</div>
				<ul>
					<li>
						<label>Exterior:</label>
						<span>{ features.exterior }</span>
					</li>
					<li>
						<label>Foundation:</label>
						<span>{ features.foundation }</span>
					</li>
					<li>
						<label>Others:</label>
						<span>{ features.others }</span>
					</li>
				</ul>
			</div> : null;

		let exteriorFeaturesHtml = exteriorFeatures !== undefined ?
			<div>
				<h4>Exterior Features</h4>
				<div>
					<button onClick={ this.handleRightPanel.bind(this, this.props.sidePanelExteriorFeaturesName, true) }><i className="fa fa-pencil" aria-hidden="true"/> Edit exterior features</button>
				</div>
				<ul>
					<li>
						<label>Exterior:</label>
						<span>{ exteriorFeatures.exterior }</span>
					</li>
					<li>
						<label>Foundation:</label>
						<span>{ exteriorFeatures.foundation }</span>
					</li>
					<li>
						<label>Others:</label>
						<span>{ exteriorFeatures.others }</span>
					</li>
				</ul>
			</div> : null;

		let interiorFeaturesHtml = interiorFeatures !== undefined ?
			<div>
				<h4>Interior Features</h4>
				<div>
					<button onClick={ this.handleRightPanel.bind(this, this.props.sidePanelInteriorFeaturesName, true) }><i className="fa fa-pencil" aria-hidden="true"/> Edit exterior features</button>
				</div>
				<ul>
					<li>
						<label>Exterior:</label>
						<span>{ interiorFeatures.exterior }</span>
					</li>
					<li>
						<label>Foundation:</label>
						<span>{ interiorFeatures.foundation }</span>
					</li>
					<li>
						<label>Others:</label>
						<span>{ interiorFeatures.others }</span>
					</li>
				</ul>
			</div> : null;

		return (
            <div className={ [columnCss.mobileWidth, columnCss.desktopWidth, this.props.className].join(' ') } id="property-view">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Property Information</span>
                                </div>
								<div className="col-xs-2 col-md-2">
									<Previous route="/properties"/>
								</div>
                            </div>
                        </div>
                        <div className="panel-body">
							<div>
								<div>
									{ propertyFeaturesBtn }
									{ exteriorFeaturesBtn }
									{ interiorFeaturesBtn }
								</div>

								{ addressHtml }
								{ detailsHtml }
								{ featuresHtml }
								{ exteriorFeaturesHtml }
								{ interiorFeaturesHtml }
							</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyInfoView;