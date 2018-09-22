import React, { Component } from 'react'
export default class RadioControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.controls.default
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {

        var { value } = this.state;
        var html = this.props.controls.value.map(option => {
            return <div class="radio" style={{ marginTop: '0', marginBottom: '1px', backgroundcolor:'green' }}><input type="radio" value={option} name={this.props.controls.label}
                checked={(value && value === option) ? 'checked' : ''} onChange={this.handleChange} />
                <span>{option}</span></div>
        })
        return (
            <div class="form-group row" style={{ display: this.props.controls.isHidden ? 'none' : '' }} >
                <div class="col-sm-3 col-sm-offset-3">
                    <label class="col-form-label">{this.props.controls.label}
                    </label><span class="error-required">{!this.props.controls.isOptional ? '*' : ''} </span> </div>
                <div class="col-sm-5"> {html} </div>
            </div>
        )

    }
}

