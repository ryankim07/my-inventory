import React from 'react';
import Gallery from '../../helper/gallery';
import { FEATURES_PANEL_NAME,
		 EXTERIOR_FEATURES_PANEL_NAME,
		 INTERIOR_FEATURES_PANEL_NAME,
		 ROOMS_LIST } from '../../helper/constants';

class PropertyInfoView extends React.Component
{
	// Handle right panel
	handleRightPanel(obj, panelType) {
		let isEditingMode = !!obj;
		let features 	  = null;

		switch (panelType) {
			case FEATURES_PANEL_NAME:
				features = isEditingMode ? obj : {
					id: '',
					property_id: this.props.property.id,
					parking: '',
					multi_unit: '',
					hoa: '',
					utilities: '',
					lot: '',
					common_walls: '',
					facing_direction: '',
					others: ''
				};
			break;

			case EXTERIOR_FEATURES_PANEL_NAME:
				features = isEditingMode ? obj : {
					id: '',
					property_id: this.props.property.id,
					exterior: '',
					foundation: '',
					others: ''
				};
			break;

			case INTERIOR_FEATURES_PANEL_NAME:
				features = isEditingMode ? obj : {
					id: '',
					property_id: this.props.property.id,
					laundry: '',
					kitchen: '',
					bathroom: '',
					cooling: '',
					heating: '',
					fireplace: '',
					flooring: '',
					others: ''
				};
			break;
		}

		let property		= this.props.property;
		property[panelType] = features;

		this.props.onHandleRightPanel(property.id, panelType);
	}

	// Render
	render() {
		let property 		 = this.props.property;
		let address  		 = !property.address || Object.keys(property.address).length === 0 ? null : property.address;
		let features		 = !property.features || property.features.id === "" ? null : property.features;
		let exteriorFeatures = !property.exterior_features || property.exterior_features.id === "" ? null : property.exterior_features;
		let interiorFeatures = !property.interior_features || property.interior_features.id === "" ? null : property.interior_features;

		let propertyFeaturesBtn = features === null ?
			<button onClick={ this.handleRightPanel.bind(this, false, FEATURES_PANEL_NAME) }><i className="fa fa-plus" aria-hidden="true"/> Add Property Features</button> : null;

		let exteriorFeaturesBtn = exteriorFeatures === null ?
			<button onClick={ this.handleRightPanel.bind(this, false, EXTERIOR_FEATURES_PANEL_NAME) }><i className="fa fa-plus" aria-hidden="true"/> Add Exterior Features</button> : null;

		let interiorFeaturesBtn = interiorFeatures === null ?
			<button onClick={ this.handleRightPanel.bind(this, false, INTERIOR_FEATURES_PANEL_NAME) }><i className="fa fa-plus" aria-hidden="true"/> Add Interior Features</button> : null;

		let addressHtml = address !== null ?
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

		let detailsHtml = property !== null ?
			<div>
				<h4>Property Details</h4>
				<div>
					<button onClick={ this.props.onHandleMainPanel.bind(this, property.id, ROOMS_LIST) }><i className="fa fa-search" aria-hidden="true"/> View</button>
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

		let featuresHtml = features !== null ?
			<div>
				<h4>Property Features</h4>
				<div>
					<button onClick={ this.handleRightPanel.bind(this, features, FEATURES_PANEL_NAME) }><i className="fa fa-pencil" aria-hidden="true"/> Edit</button>
				</div>
				<ul>
					<li>
						<label>Parking:</label>
						<span>{ features.parking }</span>
					</li>
					<li>
						<label>Multi Unit:</label>
						<span>{ features.multi_unit }</span>
					</li>
					<li>
						<label>Hoa:</label>
						<span>{ features.hoa }</span>
					</li>
					<li>
						<label>Utilities:</label>
						<span>{ features.utilities }</span>
					</li>
					<li>
						<label>Lot:</label>
						<span>{ features.lot }</span>
					</li>
					<li>
						<label>Common Walls:</label>
						<span>{ features.common_walls }</span>
					</li>
					<li>
						<label>Facing Direction:</label>
						<span>{ features.facing_direction }</span>
					</li>
					<li>
						<label>Others:</label>
						<span>{ features.others }</span>
					</li>
				</ul>
			</div> : null;

		let exteriorFeaturesHtml = exteriorFeatures !== null ?
			<div>
				<h4>Exterior Features</h4>
				<div>
					<button onClick={ this.handleRightPanel.bind(this, exteriorFeatures, EXTERIOR_FEATURES_PANEL_NAME) }><i className="fa fa-pencil" aria-hidden="true"/> Edit</button>
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

		let interiorFeaturesHtml = interiorFeatures !== null ?
			<div>
				<h4>Interior Features</h4>
				<div>
					<button onClick={ this.handleRightPanel.bind(this, interiorFeatures, INTERIOR_FEATURES_PANEL_NAME) }><i className="fa fa-pencil" aria-hidden="true"/> Edit</button>
				</div>
				<ul>
					<li>
						<label>Kitchen:</label>
						<span>{ interiorFeatures.kitchen }</span>
					</li>
					<li>
						<label>Bathroom:</label>
						<span>{ interiorFeatures.bathroom }</span>
					</li>
					<li>
						<label>Laundry:</label>
						<span>{ interiorFeatures.laundry }</span>
					</li>
					<li>
						<label>Cooling:</label>
						<span>{ interiorFeatures.cooling }</span>
					</li>
					<li>
						<label>Heating:</label>
						<span>{ interiorFeatures.heating }</span>
					</li>
					<li>
						<label>Fireplace:</label>
						<span>{ interiorFeatures.fireplace }</span>
					</li>
					<li>
						<label>Flooring:</label>
						<span>{ interiorFeatures.flooring }</span>
					</li>
					<li>
						<label>Others:</label>
						<span>{ interiorFeatures.others }</span>
					</li>
				</ul>
			</div> : null;

		return (
			<div>
				<Gallery assets={ property.assets }/>
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
		);
	}
}

export default PropertyInfoView;