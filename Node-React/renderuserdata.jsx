import React, { Component } from 'react';
export default class RenderUserData extends Component {

    constructor(props) {
        super(props);
        this.handleClear = this.handleClear.bind(this);
        // this.state = {
        //     value: this.props.userSubmittedData
        // }
    }

    handleClear(event){
        
        this.props.userSubmittedData = "";
        this.setState({});
    }

    render() {

        console.log(this.props.userSubmittedData);
        if (this.props.userSubmittedData)
            return (
                <div class="form-group row">
                    <div class="col-sm-1 col-sm-offset-4">
                        <hr />{JSON.stringify(this.props.userSubmittedData)}
                    </div>
                    <div class="col-sm-8 col-sm-offset-8" >
                        <button type="button" style={{marginTop:"5px"}} class="btn btn-primary" onClick={this.handleClear}>CLEAR</button>
                    </div>
                </div>
         )
        else
            return <div></div>
    }
}