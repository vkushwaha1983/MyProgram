

import React, { Component } from 'react'
export default class TelephoneControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

render(){

    return(
     <div class="form-group row" style={{ display: this.props.controls.isHidden ? 'none' : '' }}>
    <div class="col-sm-3 col-sm-offset-3">
        <label class="col-form-label" >{this.props.controls.label}
        </label><span class="error-required">{!this.props.controls.isOptional ? '*' : ''} </span> </div>
    <div class="col-sm-3"><input type="text" class="form-control"
        name={this.props.controls.label} onChange={this.handleChange} placeholder="Enter contact details" /></div>
</div>
)
}

}