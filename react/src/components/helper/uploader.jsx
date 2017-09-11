import React from 'react';
import Dropzone from 'react-dropzone';
import VehiclesAction from '../../actions/vehicles-action';

class Uploader extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			assets: [],
			reUpload: false
		}

		this.onDrop = this.onDrop.bind(this);
	}

	componentWillMount() {
		if (this.props.handleAssets) {
			this.setState({
				assets: this.props.assets,
				reUpload: false
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.assets.path !== nextProps.assets.path) {
			this.state.assets = nextProps.assets;
		}
	}

	// When dragging and dropping
	onDrop(acceptedFiles) {
		if (this.props.handleAssets) {
			this.props.handleAssets(acceptedFiles[0]);
		} else {
			VehiclesAction.setAssets(acceptedFiles[0]);
		}

		this.setState({
			assets: acceptedFiles,
			reUpload: true
		});
	}

	render() {
		// Set preview
		let assetPreview = '';

		if (this.props.isEditingMode && !this.state.reUpload) {
			assetPreview = <img src={this.state.assets.path} />;
		} else {
			assetPreview = this.state.assets.map((file, id) => {
				return (
					<img key={id} src={file.preview} />
				);
			});
		}

		return (
			<div>
				<Dropzone onDrop={this.onDrop}>
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