import React from 'react';
import VehicleForm from './vehicle-form';

class RightPanel extends React.Component
{
    render() {
        return (
            <div className="col-xs-4 col-md-4" id="vehicle-form">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Vehicle Edit</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
                                    <button onClick={this.props.closeRightPanel} className="close close-viewer" value="Close"><span>&times;</span></button>
                                </div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <VehicleForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RightPanel;