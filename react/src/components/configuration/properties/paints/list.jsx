import React from 'react';
import Loader from '../../../helper/loader';

class PropertiesPaintList extends React.Component
{
	render() {
        let paintsHtml = '';

		// If loading is complete
        if (!this.props.loader) {
        	let paints  = this.props.paints;

        	if (!paints || paints.length === 0) {
				paintsHtml = <tr><td><span>There are no saved API vehicles.</span></td></tr>;
			} else {
				paintsHtml = paints.map((paint, paintIndex) => {
					return (
						<tr key={ paintIndex }>
							<td>{ paint.name }</td>
							<td>{ paint.number }</td>
							<td>{ paint.color }</td>
							<td>{ paint.hex }</td>
							<td>{ paint.rgb }</td>
							<td>{ paint.notes }</td>

						</tr>
					);
				});
			}
        } else {
			paintsHtml = <tr><td><Loader /></td></tr>;
        }

        return (
			<div className="row" id="paints-list">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>Paints List</span>
							</div>
							<div className="col-xs-2 col-md-2" />
						</div>
					</div>
					<div className="panel-body">
						<table className="table">
							<thead>
							<tr>
								<th>Name</th>
								<th>Number</th>
								<th>Color</th>
								<th>HEX</th>
								<th>RGB</th>
								<th>Actions</th>
								<th>Notes</th>
							</tr>
							</thead>
							<tbody>
							{ paintsHtml }
							</tbody>
						</table>
					</div>
				</div>
			</div>
        )
    }
}

export default PropertiesPaintList;