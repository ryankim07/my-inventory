import React from 'react';
import PropertyPaintsStore from '../../../stores/properties/paints-store';
import PropertiesPaintsAction from "../../../actions/properties-paints-action";

class PropertyPaintsDropdown extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			allPaints: []
		};

		this._onChange 		  = this._onChange.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
	}

	componentWillMount() {
		PropertyPaintsStore.addChangeListener(this._onChange);
	}

	componentDidMount() {
		PropertiesPaintsAction.getPropertyPaints();
	}

	componentWillUnmount() {
		PropertyPaintsStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		this.setState({
			allPaints: PropertyPaintsStore.getPropertyPaints()
		});
	}

	// Handle input changes
	handleFormChange(propertyName, event) {
		this.props.onChange(propertyName, event);
	}

    render() {
		let refName 	  = 'paint_' + this.props.index;
		let paintsOptions = this.state.allPaints.map((paint, paintIndex) => {
			return (
                <option key={paintIndex} value={paint.id}>{ paint.name }</option>
			);
		});

        return (
			<div className="input-group">
				<select ref={refName}
						onChange={this.handleFormChange.bind(this, refName)}
						value=""
						className="form-control input-sm">
					<option value="">Select One</option>
					{ paintsOptions }
				</select>
			</div>
        );
    }
}

export default PropertyPaintsDropdown;