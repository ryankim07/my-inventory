/**
 * Material-ui table
 *
 * Required props
 *
 * list: the list to iterate
 * exclude: the columns to ignore
 * addViewBtn: true or false (optional)
 * handleViewPanel: required when addViewBtn is set to true
 * addEditBtn: true or false (optional)
 * handleEditPanel: required when addRemoveBtn is set to true
 * addRemoveBtn: true or false (optional)
 * handleRemove: required when addRemoveBtn is set to true
 */

import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import MaterialUiTogglingRows from '../table/material_ui_toggling_rows';
import { upperFirstLetter } from '../utils';

class MaterialUiTable extends React.Component
{
	// Render
	render() {
		let regex 	     = this.props.inputProps.exclude !== undefined ? this.props.inputProps.exclude : 'id';
		let tableHeaders = [];

		let tableRows = this.props.inputProps.list.map((obj, objIndex) => {
			let rowValues = [];
			_.forOwn(obj, function (value, key) {
				if (!key.match(new RegExp(regex, 'gi'))) {
					let label = upperFirstLetter(key.replace(/_/g, " "));

					// Get all the headers, just need to push once
					if (objIndex === 0) {
						tableHeaders.push(<TableHeaderColumn key={ key }>{ label }</TableHeaderColumn>);
					}

					// Get all the columns
					rowValues.push(obj[key].toString());
				}
			});

			return (
				<MaterialUiTogglingRows
					key={ objIndex }
					inputProps = {
						{
							selectedItem: this.props.inputProps.selectedItem === obj.id,
							columnValues: rowValues,
							addViewBtn: true,
							onView: this.props.inputProps.onView.bind(this, obj.id),
							addEditBtn: true,
							onEdit: this.props.inputProps.onEdit.bind(this, obj.id),
							addRemoveBtn: true,
							onRemove: this.props.inputProps.onRemove.bind(this, obj.id)
						}
					}

				/>
			);
		});

		return (
			<Table>
				<TableHeader adjustForCheckbox={ false } displaySelectAll={ false }>
					<TableRow>
						{ tableHeaders }
						<TableHeaderColumn>Actions</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={ false } showRowHover={ true }>
					{ tableRows }
				</TableBody>
			</Table>
		);
	}
}

export default MaterialUiTable;