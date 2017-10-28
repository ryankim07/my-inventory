import React from 'react';
import PropertyAddressList from './../address/list';

class PropertiesList extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			properties: this.props.properties,
			clonedProperties: JSON.parse(JSON.stringify(this.props.properties))
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.properties !== this.state.properties) {
			this.setState({
				properties: nextProps.properties,
				clonedProperties: JSON.parse(JSON.stringify(nextProps.properties))
			});
		}
	}

	// Handle search
	onHandleSearch(results) {
		this.setState({
			properties: results
		});
	}

	render() {
		return (
			<PropertyAddressList
				inputProps ={
					{
						loader: this.props.loader,
						properties: this.state.properties,
						property: this.props.property,
						onMainPanel: this.props.onHandleMainPanel,
						onRightPanel: this.props.onHandleRightPanel,
						onRemove: this.props.onHandleRemove,
						onChange: this.onHandleSearch.bind(this)
					}
				}
			/>
        )
    }
}

export default PropertiesList;