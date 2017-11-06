/**
 * Toggling Rows
 *
 * Required props
 *
 * selectedItem: current selected item
 * columnValues: array values for each column/s
 * defaultBackground: optional
 * togglingBackground: optional
 * addViewBtn: true or false (optional)
 * handleViewPanel: required when addViewBtn is set to true
 * addEditBtn: true or false (optional)
 * handleEditPanel: required when addRemoveBtn is set to true
 * addRemoveBtn: true or false (optional)
 * handleRemove: required when addRemoveBtn is set to true
 */

import React from 'react';

class TogglingRows extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			actions: [],
			hoverFlag: false
		}
	}

	// Mounting component
	componentWillMount() {
		let viewAction = this.props.addViewBtn !== null ?
			<button key="a" onClick={ this.props.handleViewPanel }><i className="fa fa-search" aria-hidden="true"/></button> : null;

		let editAction = this.props.addEditBtn !== null ?
			<button key="b" onClick={ this.props.handleEditPanel }><i className="fa fa-pencil" aria-hidden="true"/></button> : null;

		let removeAction = this.props.addRemoveBtn !== null ?
			<button key="c" onClick={ this.props.onRemove }><i className="fa fa-trash" aria-hidden="true"/></button> : null;

		this.setState({
			actions: [viewAction, editAction, removeAction]
		});
	}

	// Handle mouse enter, mouse leave hover
	onHandleHover() {
		this.setState({
			hoverFlag: !this.state.hoverFlag
		});
	}

	// Render
    render() {
		let columns = this.props.columnValues.map((column, cellIndex) => {
			return (<td key={ cellIndex }>{ column }</td>);
		});

		let rowCss = {};
		let buttonCss = {};

		if (this.props.selectedItem || this.state.hoverFlag) {
			rowCss['background'] = '#ececec';
			buttonCss['display'] = 'block';
		} else {
			rowCss['background'] = '#ffffff';
			buttonCss['display'] = 'none';
		}

		let actions = <td key={ columns.length + 1 }><div style={ buttonCss }>{ this.state.actions }</div></td>;

		return (
			<tr onMouseEnter={ this.onHandleHover.bind(this) } onMouseLeave={ this.onHandleHover.bind(this) } style={ rowCss }>
				{ [columns, actions] }
			</tr>
		);
    }
}

export default TogglingRows;