import React from 'react';
import Dropzone from 'react-dropzone';
import ActionCreator from '../../actions/action-creator';

class Uploader extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			asset: []
		}

		this.onDrop = this.onDrop.bind(this);
	}

	componentWillMount() {
		if (this.props.setAsset) {
			this.setState({asset: this.props.assets});
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log('received props');
	}

	onDrop(acceptedFiles) {
		if (this.props.setAsset) {
			this.props.setAsset(acceptedFiles[0]);
		} else {
			ActionCreator.setAssets(acceptedFiles[0]);
		}

		this.setState({asset: acceptedFiles});
	}

	render() {
		// Set preview
		let assetPreview = '';

		if (this.props.isEditingMode) {
			assetPreview = <img src={this.state.asset.path} />;
		} else {
			assetPreview = this.state.asset.map((file, id) => {
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