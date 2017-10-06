/**
 * Required props
 *
 * selectedItem: current selected item
 * defaultBackground: optional
 * togglingBackground: optional
 * addViewBtn: true or false (optional)
 * addEditBtn: true or false (optional)
 * addRemoveBtn: true or false (optional)
 * columnValues: array values for each column/s
 * onHandleMainPanel: required when addViewBtn is set to true
 * onHandleRightPanel: required when addEditBtn is set to true
 * onHandleRemove: required when addRemoveBtn is set to true
 */

import React from 'react';

class TogglingRows extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			defaultBackground: this.props.defaultBackground !== null ? this.props.defaultBackground : '#ffffff',
			togglingBackground: this.props.togglingBackground !== null ? this.props.togglingBackground : '#ececec',
			hoverFlag: false
		}
	}

	// Handle mouse enter, mouse leave hover
	onHandleHover() {
		this.setState({
			hoverFlag: !this.state.hoverFlag
		});
	}

    render() {
		let rowCss = {
			background: this.state.defaultBackground
		};

		let viewBtn, editBtn, removeBtn = null;

		if (this.props.selectedItem || this.state.hoverFlag) {
			rowCss['background'] = this.state.togglingBackground;

			viewBtn = this.props.addViewBtn ?
				<button onClick={ this.props.onHandleMainPanel }><i className="fa fa-search" aria-hidden="true" /> View</button> : null;

			editBtn = this.props.addEditBtn ?
				<button onClick={ this.props.onHandleRightPanel }><i className="fa fa-pencil" aria-hidden="true" /> Edit</button> : null;

			removeBtn = this.props.addRemoveBtn ?
				<button onClick={ this.props.onHandleRemove }><i className="fa fa-trash" aria-hidden="true" /> Remove</button> : null;
		}

		let columns = this.props.columnValues.map((column) => {
			return (column);
		});

		return (
			<tr onMouseEnter={ this.onHandleHover.bind(this) } onMouseLeave={ this.onHandleHover.bind(this) } style={ rowCss }>
				<td>{ columns }</td>
				<td>
					{ viewBtn }
					{ editBtn }
					{ removeBtn }
				</td>
			</tr>
		);
    }
}

export default TogglingRows;