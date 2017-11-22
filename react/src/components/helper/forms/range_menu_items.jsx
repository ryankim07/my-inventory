/**
 * Material-ui table
 *
 * Required props
 *
 * from: beginning of sequence
 * to: end of sequence
 * step: steps (optional)
 */

import React from 'react';
import _ from 'lodash';
import MenuItem from 'material-ui/MenuItem';

class RangeMenuItems extends React.Component
{
	// Render
	render() {
		let range = _.range(this.props.from, this.props.to, this.props.step);

		let options = _.map(range, function (value) {
			return <MenuItem key={ value } value={ value } primaryText={ value }/>
		});

		return (
			[options]
		);
	}
}

export default MaterialUiMenuItems;