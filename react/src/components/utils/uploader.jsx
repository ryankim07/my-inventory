import React from 'react';
import Dropzone from 'react-dropzone';
import ActionCreator from '../../actions/action-creator';

class Uploader extends React.Component
{
	constructor(props) {
		super(props);

		this.state = {
			imageFile: []
		}

		this.onDrop = this.onDrop.bind(this);
	}

	onDrop(acceptedFiles) {
		ActionCreator.addMedia(acceptedFiles[0]);

		this.setState({imageFile: acceptedFiles});
	}

	render() {
		let assetPreview = this.state.imageFile.map((file, id) => {
			return (
				<img key={id} src={file.preview}/>
			);
		});

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