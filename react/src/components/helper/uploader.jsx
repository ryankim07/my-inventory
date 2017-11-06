/**
 * Image upload component
 *
 * Required props
 *
 * className: class name of parent container
 * assets: assets object
 * onChange: handle assets to parent object
 */

import React from 'react';
import Dropzone from 'react-dropzone';
import { getNestedModifiedState } from '../helper/utils';

class Uploader extends React.Component
{
	// Dragging and dropping.  Need to pass array to create reject object in backend
	onHandleDrop(asset) {
		const assets = getNestedModifiedState(this.props.inputProps.assets, this.props.inputProps.assets);

		asset.map(asset => {
			let index = assets.indexOf(assets.find(obj => obj.name === asset.name));

			// Remove
			if (index >= 0) {
				assets.splice(index, 1);
			}

			// Add back new value
			assets.push(asset);
		});

		this.props.inputProps.onChange(assets);
	}

	// Remove asset
	onHandleRemove(index, event) {
		event.preventDefault();

		const assets = getNestedModifiedState(this.props.inputProps.assets, this.props.inputProps.assets);
		assets.splice(index, 1);

		this.props.inputProps.onChange(assets);
	}

	// Render
	render() {
		// Set preview
		let assetField =
			this.props.inputProps.assets.map((asset, assetIndex) => {
				let path = asset.path ? asset.path : asset.preview;

				return (
					<div key={ assetIndex }>
						<button onClick={ this.onHandleRemove.bind(this, assetIndex) }><i className="fa fa-trash" aria-hidden="true"/></button>
						<img src={ path }/>
					</div>
				);
			})

		return (
			<div className={ this.props.inputProps.className }>
				<Dropzone
					name="file"
					onDrop={ this.onHandleDrop.bind(this) }
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