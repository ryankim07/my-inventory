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
import FontIcon from 'material-ui/FontIcon';
import { TableRow, TableRowColumn } from 'material-ui/Table';

class MaterialUiTogglingRows extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			hoverFlag: false
		}

		this.onHandleHover = this.onHandleHover.bind(this);
	}

	// Handle mouse enter, mouse leave hover
	onHandleHover() {
		this.setState({
			hoverFlag: !this.state.hoverFlag
		});
	}

	// Render
    render() {
		let columns = this.props.inputProps.columnValues.map((column, cellIndex) => {
			return (<TableRowColumn key={ cellIndex }>{ column }</TableRowColumn>);
		});

		let buttonCss = {};
		buttonCss['display'] = this.props.inputProps.selectedItem || this.state.hoverFlag ? 'block' : 'none';
		let iconStyles = {
			fontSize: '16px'
		};

		let viewAction = this.props.inputProps.addViewBtn ?
			<button key="a" onClick={ this.props.inputProps.onView }><FontIcon className="material-icons" style={ iconStyles }>description</FontIcon></button> : null;

		let editAction = this.props.inputProps.addEditBtn ?
			<button key="b" onClick={ this.props.inputProps.onEdit }><FontIcon className="material-icons" style={ iconStyles }>mode_edit</FontIcon></button> : null;

		let removeAction = this.props.inputProps.addRemoveBtn ?
			<button key="c" onClick={ this.props.inputProps.onRemove }><FontIcon className="material-icons" style={ iconStyles }>delete_forever</FontIcon></button> : null;

		let actions = <TableRowColumn key={ columns.length + 1 }><div style={ buttonCss }>{ [viewAction, editAction, removeAction] }</div></TableRowColumn>;

		return (
			<TableRow onMouseEnter={ this.onHandleHover } onMouseLeave={ this.onHandleHover } hoverable={ true }>
				{ [columns, actions] }
			</TableRow>
		);
    }
}

export default MaterialUiTogglingRows;