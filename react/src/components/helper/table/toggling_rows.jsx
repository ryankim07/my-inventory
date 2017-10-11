/**
 * Required props
 *
 * key: unique identifier for each row
 * selectedItem: current selected item
 * columnValues: array values for each column/s
 * defaultBackground: optional
 * togglingBackground: optional
 * addViewBtn: true or false (optional)
 * addEditBtn: true or false (optional)
 * addRemoveBtn: true or false (optional)
 * handleViewPanel: required when addViewBtn is set to true
 * handleEditPanel: required when addRemoveBtn is set to true
 * handleRemove: required when addRemoveBtn is set to true
 */

import React from 'react';

class TogglingRows extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			defaultBackground: this.props.defaultBackground !== undefined ? this.props.defaultBackground : '#ffffff',
			togglingBackground: this.props.togglingBackground !== undefined ? this.props.togglingBackground : '#ececec',
			hoverFlag: false
		}
	}

	// Handle mouse enter, mouse leave hover
	onHandleHover() {
		this.setState({
			hoverFlag: !this.state.hoverFlag
		});
	}

	// Render
    render() {
		let rowCss = {
			background: this.state.defaultBackground
		};

		let viewBtn, editBtn, removeBtn = null;

		if (this.props.selectedItem || this.state.hoverFlag) {
			rowCss['background'] = this.state.togglingBackground;

			viewBtn = this.props.addViewBtn ?
				<button onClick={ this.props.handleViewPanel }><i className="fa fa-search" aria-hidden="true" /> View</button> : null;

			editBtn = this.props.addEditBtn ?
				<button onClick={ this.props.handleEditPanel }><i className="fa fa-pencil" aria-hidden="true" /> Edit</button> : null;

			removeBtn = this.props.addRemoveBtn ?
				<button onClick={ this.props.handleRemove }><i className="fa fa-trash" aria-hidden="true" /> Remove</button> : null;
		}

		let columns = this.props.columnValues.map((column, cellIndex) => {
			return (<td key={ cellIndex }>{ column }</td>);
		});

		return (
			<tr key={ this.props.key } onMouseEnter={ this.onHandleHover.bind(this) } onMouseLeave={ this.onHandleHover.bind(this) } style={ rowCss }>
				{ columns }
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