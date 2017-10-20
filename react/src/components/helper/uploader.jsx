/**
 * Image upload component
 *
 * Required props
 *
 * assets: assets object
 * isEditingMode: determine if new or update
 * setAssets: set assets to parent object
 */

import React from 'react';
import Dropzone from 'react-dropzone';

class Uploader extends React.Component
{
	// Dragging and dropping.  Need to pass array to create reject object in backend
	onHandleDrop(propertyName, chosenAssets) {
		let assets = this.props.assets;

		chosenAssets.map(chosenAsset => {
			let chosenAssetName = chosenAsset.name;
			let foundAssetIndex = assets.indexOf(assets.find(obj => obj.name === chosenAssetName));

			// Remove
			if (foundAssetIndex >= 0) {
				assets.splice(foundAssetIndex, 1);
			}

			// Add back new value
			assets.push(chosenAsset);
		});

		this.props.setAssets(assets);
	}

	// Remove asset
	onHandleRemove(index, event) {
		event.preventDefault();

		let assets = this.props.assets;
		assets.splice(index, 1);

		this.props.setAssets(assets);
	}

	// Render
	render() {
		// Set preview
		let assets	   = this.props.assets;
		let assetField =
			assets.map((asset, assetIndex) => {
				let path = asset.path ? asset.path : asset.preview;

				return (
					<div key={ assetIndex }>
						<button onClick={ this.onHandleRemove.bind(this, assetIndex) }><i className="fa fa-trash" aria-hidden="true"/></button>
						<img src={ path }/>
					</div>
				);
			})

		return (
			<div>
				<Dropzone
					name="file"
					onDrop={ this.onHandleDrop.bind(this, 'assets') }
					multiple={ true }>
					<div>Try dropping some files here, or click to select files to upload.</div>
				</Dropzone>
				<div>
					<p><span>Preview: </span></p>
					{ assetField }
				</div>
			</div>
		);
	}
}

export default Uploader;