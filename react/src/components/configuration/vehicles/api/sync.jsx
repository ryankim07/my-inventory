import React from 'react';
import ApiVehiclesAction from '../../../../actions/api-vehicles-action';

class ConfigurationVehiclesApiSync extends React.Component
{
	// Sync API
	onHandleSync(e) {
		e.preventDefault();
		ApiVehiclesAction.sync();
	}

	render() {
        return (
			<div className="row" id="api-vehicles-sync">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>API Vehicle List</span>
							</div>
							<div className="col-xs-2 col-md-2" />
						</div>
					</div>
					<div className="panel-body">
						<div className="form-group">
							<div className="col-xs-12 col-lg-12">
								<div className="clearfix">
									<button onClick={ this.onHandleSync.bind(this) }><i className="fa fa-cloud-download" aria-hidden="true" /> Sync</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        )
    }
}

export default ConfigurationVehiclesApiSync;