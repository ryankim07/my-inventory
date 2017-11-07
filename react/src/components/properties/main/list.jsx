import React from 'react';
import PropertyAddressList from './../address/list';

class PropertiesList extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			searchResults: []
		};

		this.onHandleSearch = this.onHandleSearch.bind(this);
	}

	// Handle search
	onHandleSearch(results) {
		this.setState({ searchResults: results });
	}

	render() {
		return (
			<PropertyAddressList
				inputProps ={
					{
						loader: this.props.loader,
						properties: this.props.properties,
						property: this.props.property,
						onMainPanel: this.props.onHandleMainPanel,
						onRightPanel: this.props.onHandleRightPanel,
						onRemove: this.props.onRemove,
						onChange: this.onHandleSearch
					}
				}
			/>
        )
    }
}

export default PropertiesList;