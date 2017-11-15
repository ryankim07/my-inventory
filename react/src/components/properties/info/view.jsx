import React from 'react';
import Gallery from '../../helper/gallery';
import UnorderedList from '../../helper/lists/unordered';
import { FEATURES_PANEL, EXTERIOR_FEATURES_PANEL, INTERIOR_FEATURES_PANEL,
		 INFO_PANEL, ROOMS_LIST_PANEL } from '../../helper/constants';

class PropertyInfoView extends React.Component
{
	// Handle right panel
	handleRightPanel(obj, panelType) {
		let isEditingMode = !!obj;
		let features 	  = null;

		switch (panelType) {
			case FEATURES_PANEL:
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

			case EXTERIOR_FEATURES_PANEL:
				features = isEditingMode ? obj : {
					id: '',
					property_id: this.props.property.id,
					exterior: '',
					foundation: '',
					others: ''
				};
			break;

			case INTERIOR_FEATURES_PANEL:
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

		this.props.onHandlePanel(property.id, INFO_PANEL, '', panelType);
	}

	// Render
	render() {
		let property 		 = this.props.property;
		let address  		 = !property.address || Object.keys(property.address).length === 0 ? null : property.address;
		let features		 = !property.features || property.features.id === "" ? null : property.features;
		let exteriorFeatures = !property.exterior_features || property.exterior_features.id === "" ? null : property.exterior_features;
		let interiorFeatures = !property.interior_features || property.interior_features.id === "" ? null : property.interior_features;

		let propertyFeaturesBtn = features === null ?
			<button onClick={ this.handleRightPanel.bind(this, false, FEATURES_PANEL) }><i className="fa fa-plus" aria-hidden="true"/> Add Property Features</button> : null;

		let exteriorFeaturesBtn = exteriorFeatures === null ?
			<button onClick={ this.handleRightPanel.bind(this, false, EXTERIOR_FEATURES_PANEL) }><i className="fa fa-plus" aria-hidden="true"/> Add Exterior Features</button> : null;

		let interiorFeaturesBtn = interiorFeatures === null ?
			<button onClick={ this.handleRightPanel.bind(this, false, INTERIOR_FEATURES_PANEL) }><i className="fa fa-plus" aria-hidden="true"/> Add Interior Features</button> : null;

		let addressHtml = address !== null ?
			<div>
				<h4>Address</h4>
				<UnorderedList obj={ address }/>
			</div> : null;

		let detailsHtml = property !== null ?
			<div>
				<h4>Property Details</h4>
				<div>
					<button onClick={ this.props.onHandlePanel.bind(this, property.id, INFO_PANEL, ROOMS_LIST_PANEL, '') }><i className="fa fa-search" aria-hidden="true"/> View rooms</button>
				</div>
				<UnorderedList obj={ property } exclude={ 'id|assets|address|rooms|non_added_rooms' }/>
			</div> : null;

		let featuresHtml = features !== null ?
			<div>
				<h4>Property Features</h4>
				<div>
					<button onClick={ this.handleRightPanel.bind(this, features, FEATURES_PANEL) }><i className="fa fa-pencil" aria-hidden="true"/> Edit</button>
				</div>
				<UnorderedList obj={ features }/>
			</div> : null;

		let exteriorFeaturesHtml = exteriorFeatures !== null ?
			<div>
				<h4>Exterior Features</h4>
				<div>
					<button onClick={ this.handleRightPanel.bind(this, exteriorFeatures, EXTERIOR_FEATURES_PANEL) }><i className="fa fa-pencil" aria-hidden="true"/> Edit</button>
				</div>
				<UnorderedList obj={ exteriorFeatures }/>
			</div> : null;

		let interiorFeaturesHtml = interiorFeatures !== null ?
			<div>
				<h4>Interior Features</h4>
				<div>
					<button onClick={ this.handleRightPanel.bind(this, interiorFeatures, INTERIOR_FEATURES_PANEL) }><i className="fa fa-pencil" aria-hidden="true"/> Edit</button>
				</div>
				<UnorderedList obj={ interiorFeatures }/>
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