import React from 'react';
import PropertyAddressList from './../address/list';

class PropertiesList extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			properties: this.props.properties,
			clonedProperties: JSON.parse(JSON.stringify(this.props.properties)),
			searchText: '',
			isSearch: false,
		};

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.handleRightPanel 	= this.handleRightPanel.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.properties !== this.state.properties) {
			this.setState({
				properties: nextProps.properties,
				clonedProperties: JSON.parse(JSON.stringify(nextProps.properties)),
				searchText: '',
				isSearch: false
			});
		}
	}

	// Handle input changes
	onHandleFormChange(event) {
		let searchText = event.target.value;
		let properties = this.state.clonedProperties;
		let results = properties.filter(function (list) {
			return list.address.street.match(new RegExp(searchText, 'gi'));
		});

		this.setState({
			properties: searchText.replace(/\s/g, '').length ? results : properties,
			searchText: searchText,
			isSearch: true
		});
	}

	// Toggle panel for add or edit
	handleRightPanel(id) {
		let isEditingMode = !!id;
		let property = isEditingMode ?
			this.state.clonedProperties.find(obj => obj.id === id) :
			{
				id: '',
				style: '',
				beds: '',
				baths: '',
				finished_area: '',
				unfinished_area: '',
				total_area: '',
				floors: '',
				built: '',
				parcel_number: '',
				address: {
					id: '',
					property_id: '',
					street: '',
					city: '',
					state: '',
					zip: '',
					county: '',
					country: '',
					subdivision: ''
				},
				features: {},
				exteriorFeatures: {},
				interiorFeatures: {},
				rooms: [],
				assets: []
			}

		this.props.onHandleRightPanel(property, isEditingMode, 'property-form');
	}

	render() {
		return (
			<PropertyAddressList
				loader={ this.props.loader }
				properties={ this.state.properties }
				property={ this.props.property }
				handleRightPanel={ this.handleRightPanel }
				onHandleMainPanel={ this.props.onHandleMainPanel }
				onHandleRemove={ this.props.onHandleRemove }
				searchText={ this.state.searchText }
				onHandleFormChange={ this.onHandleFormChange }
			/>
        )
    }
}

export default PropertiesList;