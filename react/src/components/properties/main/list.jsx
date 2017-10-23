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

	render() {
		return (
			<PropertyAddressList
				loader={ this.props.loader }
				properties={ this.state.properties }
				property={ this.props.property }
				onHandleRightPanel={ this.props.onHandleRightPanel }
				onHandleMainPanel={ this.props.onHandleMainPanel }
				onHandleRemove={ this.props.onHandleRemove }
				searchText={ this.state.searchText }
				onHandleFormChange={ this.onHandleFormChange }
			/>
        )
    }
}

export default PropertiesList;