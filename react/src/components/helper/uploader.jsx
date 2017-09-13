import React from 'react';
import Dropzone from 'react-dropzone';
import VehiclesAction from '../../actions/vehicles-action';

class Uploader extends React.Component
{
	constructor(props) {
		super(props);
	}

	/*componentWillReceiveProps(nextProps) {
		if (this.state.assets.path !== nextProps.assets.path) {
			this.state.assets = nextProps.assets;
		}
	}*/

	// When dragging and dropping
	onDrop(acceptedFiles) {
		//VehiclesAction.setAssets(acceptedFiles[0]);
		this.props.setAssets(acceptedFiles[0]);
	}

	render() {
		// Set preview
		let assetPreview = '';
		let assets = this.props.assets;

		if (this.props.isEditingMode) {
			assetPreview = <img src={ assets.path } />;
		} else {
			assetPreview = <img src={ assets.preview } />;
		}

		return (
			<div>
				<Dropzone onDrop={ this.onDrop.bind(this) }>
					<div>Try dropping some files here, or click to select files to upload.</div>
				</Dropzone>
				<div>
					<span>Preview: </span>
					{ assetPreview }
				</div>
			</div>
		);
	}
}

export default Uploader;