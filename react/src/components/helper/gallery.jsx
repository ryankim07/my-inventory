/**
 * Gallery component
 *
 * Required props
 *
 * assets: the assets to be shown
 */

import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

class Gallery extends React.Component
{
    // Render
    render() {
		const noImage = [{
			original: "/images/non-image.png"
		}] ;

		let assets = this.props.assets;
		let gallery = assets.map(asset => {
			asset['original']  = asset.path;
			asset['thumbnail'] = '';

			return(asset);
		});

		return (
            <ImageGallery
                items={ gallery.length > 0 ? gallery : noImage }
                slideInterval={ 2000 }
            />
        );
    }
}

export default Gallery;