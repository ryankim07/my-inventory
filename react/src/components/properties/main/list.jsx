import React from 'react';
import SearchField from '../../helper/search_field';
import PropertyAddressList from './../address/list';
import Loader from '../../helper/loader';

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
		let propertiesHtml = '';

		// If loading is complete
        if (!this.props.loader) {
			let properties = this.state.properties;

			propertiesHtml = !properties || properties.length === 0 ?
				<div><span>Empty list.</span></div> :
				<PropertyAddressList
					properties={ properties }
					property={ this.props.property }
					handleRightPanel={ this.handleRightPanel }
					onHandleMainPanel={ this.props.onHandleMainPanel }
					onHandleRemove={ this.props.onHandleRemove }
				/>
        } else {
            propertiesHtml = <div><Loader/></div>;
        }

        return (
			<div className="row" id="properties-main">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>Properties List</span>
							</div>
							<div className="col-xs-2 col-md-2">
								<button onClick={ this.handleRightPanel.bind(this, false) }><i className="fa fa-plus" aria-hidden="true"/> <i className="fa fa-home" aria-hidden="true"/></button>
							</div>
						</div>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<div className="col-xs-12 col-lg-12">
								<SearchField
									objs={ this.state.properties }
									objKey="street"
									searchType="properties"
									searchText={ this.state.searchText }
									onHandleFormChange={ this.onHandleFormChange }
								/>
							</div>
						</div>
						{ propertiesHtml }
					</div>
				</div>
			</div>
        )
    }
}

export default PropertiesList;