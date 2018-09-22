import React, { Component } from 'react';

export default class Dropdown extends Component {
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

        var options = this.props.controls.value.map(item => {
            return <option key={item} value={item}>
                {item}
            </option>
        })
        return (
            <div class="form-group row" style={{ display: this.props.controls.isHidden ? 'none' : ''}}>
                <div class="col-sm-3 col-sm-offset-3" style={{borderColor:'coral'}}>
                    <label class="col-form-label"> {this.props.controls.label} </label>
                    <span class="error-required">{!this.props.controls.isOptional ? '*' : ''} </span>
                </div>
                <div class="col-sm-3">
                    <select name={this.props.controls.label}
                        className='form-control'
                        onChange={this.handleChange} value={this.state.value}>
                        <option key='--SELECT--' value='--SELECT--'>
                            <span>--SELECT--</span>
                        </option>
                        {options}
                    </select>
                </div>
            </div>
        )
    }
}