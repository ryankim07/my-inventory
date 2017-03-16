import React from 'react';
import VehicleForm from './vehicle-form';

class Sidebar extends React.Component
{
    render() {
        return (
            <div className="col-xs-12 col-md-5">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading"><span>Vehicle Edit</span></div>
                        <div className="panel-body">
                            <VehicleForm/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;