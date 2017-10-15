/**
 * Image upload component
 */

import React from 'react';
import Dropzone from 'react-dropzone';

class Uploader extends React.Component
{
	// Dragging and dropping.  Need to pass array to create reject object in backend
	handleDrop(propertyName, e) {
		this.props.onHandleFormChange(propertyName, e);
	}

	render() {
		// Set preview
		let assetPreview = '';
		let assets		 = this.props.assets;

		if (this.props.isEditingMode) {
			let isArray = Array.isArray(assets);

			if (isArray) {
				assetPreview = assets.map((image, index) => {
					return (
						<img key={index} src={ image.path }/>
					);
				});
			} else {
				assetPreview = <img src={ assets.preview }/>;
			}
		} else {
			assetPreview = <img src={ assets.preview }/>;
		}

		return (
			<div>
				<Dropzone onDrop={ this.handleDrop.bind(this, 'assets') }>
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