import React from 'react';
//import Uploader from '../../../helper/uploader';
import { upperFirstLetter } from "../../../../helper/utils"

class ConfigurationPaint extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
			paint: this.props.paint,
			value: ''
		}

		this.onHandleFormChange = this.onHandleFormChange.bind(this);
		this.handleFormSubmit   = this.handleFormSubmit.bind(this);
    }

	componentWillReceiveProps(nextProps) {
		if (nextProps.paint !== this.props.paint) {
			this.setState({
				paint: nextProps.paint
			});
		}
	}

    // Handle input changes
    onHandleFormChange(propertyName, event) {
    	let paint 	    = this.state.paint;
        let chosenValue = event.target.value;

        switch (propertyName) {
            case 'name':
			case 'brand':
				paint[propertyName] = upperFirstLetter(chosenValue);
            break;

			case 'rgb':
				paint[propertyName] = chosenValue; //@TODO separate strings
			break;

			case 'hex':
				paint[propertyName] = chosenValue;
			break;

			default:
				paint[propertyName] = chosenValue;
        }

        this.setState({paint: paint});
    }

    // Submit
    handleFormSubmit(event) {
		event.preventDefault();

		this.props.onHandleFormSubmit(this.state.paint);
	}

    render() {
		let paint = this.state.paint;

		let paintForm =
			<form onSubmit={ this.handleFormSubmit }>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Vendor</label>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Brand</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'brand') }
								value={ paint.brand }
								className="form-control input-sm"
								required="required"
							/>
						</div>
					</div>
				</div>
				<div className="form-group required">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Name</label>
						<div className="input-group">
							<input
								type="text"
								onChange={ this.onHandleFormChange.bind(this, 'name') }
								value={ paint.name }
								className="form-control input-sm"
								required="required"
							/>
						</div>
					</div>
				</div>
				<div>
					<div className="form-group required">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Number</label>
							<div className="input-group">
								<input
									type="text"
									onChange={ this.onHandleFormChange.bind(this, 'number') }
									value={ paint.number }
									className="form-control input-sm"
									required="required"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="form-group">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Color</label>
							<div className="input-group">
								<input
									type="text"
									onChange={ this.onHandleFormChange.bind(this, 'color') }
									value={ paint.color }
									className="form-control input-sm"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="form-group">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">Hex</label>
							<div className="input-group">
								<input
									type="text"
									onChange={ this.onHandleFormChange.bind(this, 'hex') }
									value={ paint.hex }
									className="form-control input-sm"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="form-group">
						<div className="col-xs-12 col-md-8">
							<label className="control-label">RGB</label>
							<div className="input-group">
								<input
									type="text"
									onChange={ this.onHandleFormChange.bind(this, 'rgb') }
									value={ paint.rgb }
									className="form-control input-sm"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<label className="control-label">Notes</label>
						<div className="input-group">
								<textarea
									rows="5"
									className="form-control"
									onChange={ this.onHandleFormChange.bind(this, 'notes') }
									value={ paint.notes }
								/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-8">
						<div className="input-group">
							<input type="hidden" value={ paint.id }/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="col-xs-12 col-md-12">
						<div className="clearfix">
							<input type="submit" value="Submit" className="btn"/>
						</div>
					</div>
				</div>
			</form>

        return (
			<div className="row" id="paint-form">
				<div className="panel panel-info">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-10 col-md-10">
								<span>Paint</span>
							</div>
							<div className="col-xs-2 col-md-2">
								<button onClick={ this.props.closeRightPanel }><i className="fa fa-window-close" aria-hidden="true" /></button>
							</div>
						</div>
					</div>
					<div className="panel-body">
						{ paintForm }
					</div>
				</div>
			</div>
        );
    }
}

export default ConfigurationPaint;