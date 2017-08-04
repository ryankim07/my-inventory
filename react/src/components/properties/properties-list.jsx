import React from 'react';
import AppDispatcher from '../../dispatcher/app-dispatcher';
import ActionConstants from '../../constants/action-constants';
import Loader from '../loader';
import PropertiesStore from '../../stores/properties-store';
import PropertiesAction from '../../actions/properties-action';

let mainDefaultMobileColumnWidth = 'col-xs-12';
let mainDefaultDesktopColumnWidth = 'col-md-12';
let mainShrinkedMobileColumnWidth = 'col-xs-8';
let mainShrinkedDesktopColumnWidth = 'col-md-8';
let mainClassName = 'main-column';

class PropertiesList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
			properties: [],
            property: {},
            loader: true
        };

        this._onChange = this._onChange.bind(this);
        this.editProperty = this.editProperty.bind(this);
        this.removeProperty = this.removeProperty.bind(this);
    }

    componentWillMount() {
        PropertiesStore.addChangeListener(this._onChange);
    }

    componentDidMount() {
        PropertiesAction.getProperties();
    }

    componentWillUnmount() {
        PropertiesStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
			properties: PropertiesStore.getProperties(),
			property: {},
            loader: false
        });
    }

    editProperty(e) {
        // Set panel width
        let data = e.target.dataset;

		AppDispatcher.handleViewAction({
			actionType: ActionConstants.EDIT_PROPERTY,
			property: {
				id: data.id,
				built: data.built,
				style: data.style,
				beds: data.beds,
				baths: data.baths,
				finished_area: data.finished_area,
				unfinished_area: data.unfinished_area,
				total_area: data.total_area,
				parcel_number: data.parcel_number,
				assets: {
					name: data.imageName,
					path: data.imagePath
				}
			},
			openRightPanel: true
		});
    }

    removeProperty(e) {
        let id = e.target.dataset.id;
        PropertiesAction.removeProperty(id);
    }

    render() {
        let propertiesHtml = '';

		// If loading is complete
        if (!this.state.loader) {
			propertiesHtml = this.state.properties.map((property) => {
				//let imageName = property.assets[0] === undefined ? property.assets.name : property.assets[0].name;
				//let imagePath = property.assets[0] === undefined ? property.assets.path : property.assets[0].path;

				return (
					<h1>Test</h1>
				);
			});
        } else {
            propertiesHtml = <tr><td><Loader /></td></tr>;
        }

        return (
            <div className={[this.props.mobileWidth, this.props.desktopWidth, this.props.className].join(' ')} id="properties-main">
                <div className="row">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-10 col-md-10">
                                    <span>Vehicle Edit</span>
                                </div>
                                <div className="col-xs-2 col-md-2"></div>
                            </div>
                        </div>
                        <div className="panel-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Built</th>
                                    <th>Style</th>
                                    <th>Beds</th>
                                    <th>Baths</th>
                                    <th>Floors</th>
                                    <th>Finished Area</th>
									<th>Unfinished Area</th>
									<th>Total Area</th>
									<th>Parcel Number</th>
                                </tr>
                                </thead>
                                <tbody>
                                { propertiesHtml }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertiesList;