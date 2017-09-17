import React from 'react';
import PropertyAddressList from './address/list';
import Loader from '../helper/loader';

class PropertiesList extends React.Component
{
	constructor(props) {
		super(props);

		this.handleView = this.handleView.bind(this);
	}

	// Toggle panel for add or edit
	handleRightPanel(editingProperty, isEditingMode) {
		let property = !isEditingMode ?
			{
				id: '',
				style: '',
				beds: '',
				baths: '',
				finished_area: '',
				unfinished_area: '',
				total_area: '',
				floors: '',
				built: '',
				parcel_number: '',
				assets: [],
				address: {
					id: '',
					property_id: '',
					street: '',
					city: '',
					state: '',
					zip: '',
					county: '',
					country: '',
					subdivision: ''
				}
			} : editingProperty;

		this.props.onHandleRightPanel(property, isEditingMode);
	}

	// Handle view
	handleView(property) {
		this.props.onHandleView(property);
	}

	render() {
		let columnCss = this.props.state.columnCss;
        let propertiesHtml = '';

		// If loading is complete
        if (!this.props.state.loader) {
			let properties = this.props.state.properties;

			if (!properties  || properties.length === 0) {
				propertiesHtml = <div><h3>There are no saved property.</h3></div>;
			} else {
				/*propertiesHtml =
					<PropertyAddressList
						properties={ properties }
						handleRightPanel={ this.handleRightPanel }
						handleView={ this.handleView }
						onHandleRemove={ this.props.onHandleRemove }
					/>;*/
			}
        } else {
            propertiesHtml = <div><Loader /></div>;
        }

        return (
            <div className={ [columnCss.mobileWidth, columnCss.desktopWidth, this.props.className].join(' ') } id="properties-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Properties List</span>
                                </div>
                                <div className="col-xs-2 col-md-2">
									<button onClick={ this.handleRightPanel(null, false) }><i className="fa fa-plus" aria-hidden="true" /></button>
								</div>
                            </div>
                        </div>
                        <div className="panel-body">
							{ propertiesHtml }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertiesList;