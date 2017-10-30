/**
 * Image upload component
 *
 * Required props
 *
 * className: class name of parent container
 * assets: assets object
 * isEditingMode: determine if new or update
 * onChange: set assets to parent object
 */

import React from 'react';
import _ from 'lodash';
import Dropzone from 'react-dropzone';

class Uploader extends React.Component
{
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			assets: [],
		};

		this.onHandleDrop = this.onHandleDrop.bind(this);
	}

	componentWillMount() {
		this.setState({ assets: this.props.inputProps.assets});
	}

	// Dragging and dropping.  Need to pass array to create reject object in backend
	onHandleDrop(asset) {
		let assets = this.state.assets;


		asset.map(asset => {
			let index = assets.indexOf(assets.find(obj => obj.name === asset.name));

			// Remove
			if (index >= 0) {
				assets.splice(index, 1);
			}

			// Add back new value
			assets.push(asset);
		});

		this.setState({ assets: assets });
	}

	// Remove asset
	onHandleRemove(index, event) {
		let assets = this.state.assets;
		assets.splice(index, 1);

		this.setState({ assets: assets });
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