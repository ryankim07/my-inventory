import React from 'react';
import Dropzone from 'react-dropzone';
import ActionCreator from '../../actions/action-creator';

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
		if (this.props.setAssets) {
			this.setState({assets: this.props.assets});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.assets.path !== nextProps.assets.path) {
			this.state.assets = nextProps.assets;
		}
	}

	// When dragging and dropping
	onDrop(acceptedFiles) {
		if (this.props.setAssets) {
			this.props.setAssets(acceptedFiles[0]);
		} else {
			ActionCreator.setAssets(acceptedFiles[0]);
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