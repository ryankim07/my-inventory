import React from 'react';
import PropertyAddressList from './../address/list';
import Loader from '../../helper/loader';

class PropertiesList extends React.Component
{
	constructor(props) {
		super(props);

		this.handleRightPanel = this.handleRightPanel.bind(this);
	}

	// Toggle panel for add or edit
	handleRightPanel(id) {
		let isEditingMode = !!id;
		let property = isEditingMode ?
			this.props.state.properties.find(obj => obj.id === id) :
			{
				id: null,
				style: null,
				beds: null,
				baths: null,
				finished_area: null,
				unfinished_area: null,
				total_area: null,
				floors: null,
				built: null,
				parcel_number: null,
				address: {
					id: null,
					property_id: null,
					street: null,
					city: null,
					state: null,
					zip: null,
					county: null,
					country: null,
					subdivision: null
				},
				features: {},
				exteriorFeatures: {},
				interiorFeatures: {},
				rooms: [],
				assets: []
			}

		this.props.onHandleRightPanel(property, isEditingMode, 'property-add');
	}

	render() {
		let columnCss = this.props.state.columnCss;
        let propertiesHtml = '';

		// If loading is complete
        if (!this.props.state.loader) {
			let properties = this.props.state.properties;

			propertiesHtml = !properties  || properties.length === 0 ?
				<div><span>There are no saved properties.</span></div> :
				properties.map((property) => {
					return (
						<PropertyAddressList
							key={ property.id }
							address={ property.address }
							handleRightPanel={ this.handleRightPanel }
							onHandleMainPanel={ this.props.onHandleMainPanel }
							onHandleRemove={ this.props.onHandleRemove }
						/>
					);
				});
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
									<button onClick={ this.handleRightPanel.bind(this, false) }><i className="fa fa-plus" aria-hidden="true" /></button>
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