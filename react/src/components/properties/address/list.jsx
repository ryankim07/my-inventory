import React from 'react';
import SearchField from '../../helper/search_field';
import TogglingRows from '../../helper/table/toggling_rows';
import Loader from '../../helper/loader';

class PropertiesAddressList extends React.Component
{
	// Render
	render() {
		let addressesHtml = null;

		// If loading is complete
		if (!this.props.inputProps.loader) {
			let properties = this.props.inputProps.properties;

			if (!properties || properties.length === 0) {
				addressesHtml = <tr><td><span>Empty list.</span></td></tr>;
			} else {
				addressesHtml = properties.map((property, propertyIndex) => {
					return (
						<TogglingRows
							key={propertyIndex}
							selectedItem={this.props.inputProps.property.address.id === property.address.id}
							columnValues={[
								property.address.street,
								property.address.city,
								property.address.state,
								property.address.zip,
								property.address.county,
								property.address.country,
								property.address.subdivision
							]}
							addViewBtn={true}
							onView={this.props.inputProps.onMainPanel.bind(this, property.address.property_id, 'info')}
							addEditBtn={true}
							onEdit={this.props.inputProps.onRightPanel.bind(this, property.address.property_id, 'property-form')}
							addRemoveBtn={true}
							onRemove={this.props.inputProps.onRemove.bind(this, property.address.property_id)}
						/>
					);
				});
			}
		} else {
			addressesHtml = <tr><td><Loader/></td></tr>;
		}

        return (
			<div>
				<div className="form-group">
					<div className="col-xs-12 col-lg-12">
						<SearchField
							inputProps={
								{
									objs: this.props.inputProps.properties,
									searchType: "street",
									onChange: this.props.inputProps.onChange.bind(this)
								}
							}
						/>
					</div>
				</div>
				<table className="table">
					<thead>
					<tr>
						<th>Street</th>
						<th>City</th>
						<th>State</th>
						<th>Zip</th>
						<th>County</th>
						<th>Country</th>
						<th>Subdivision</th>
					</tr>
					</thead>
					<tbody>
						{ addressesHtml }
					</tbody>
				</table>
			</div>
		)
    }
}

export default PropertiesAddressList;