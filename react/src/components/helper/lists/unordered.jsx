/**
 * Unordered list component
 *
 * Required props:
 *
 * obj: the object containing keys and values
 * exclude: the regex of keys to exclude when iterating the obj
 *
 */

import React from 'react';
import _ from 'lodash';
import { upperFirstLetter } from '../utils';

class UnorderedList extends React.Component
{
    render() {
        let obj   = this.props.obj;
		let regex = this.props.exclude !== undefined ? this.props.exclude : 'id';
		let list  = [];

		_.forOwn(obj, function(value, key) {
			if (!key.match(new RegExp(regex, 'gi'))) {
				let label = upperFirstLetter(key.replace(/_/g, " "));

				list.push(
                    <li key={ key }><label>{ label }:</label><span>{ obj[key].toString() }</span></li>
				);
			}
		});

		return (
		    <ul>{ list }</ul>
        );
    }
}

export default UnorderedList;