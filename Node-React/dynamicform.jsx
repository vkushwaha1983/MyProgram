import React, { Component } from 'react';
import 'whatwg-fetch';
import EmailControl from './emailcontrol.jsx';
import RadioControl from './radiocontrol.jsx';
import Dropdown from './dropdown.jsx';
import RenderUserData from './renderuserdata.jsx';
import TelephoneControl from './telephonecontrol.jsx';

export default class DynamicForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderForm = this.renderForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRestPost = this.handleRestPost.bind(this);
    }

    handleRestPost(){
        fetch("http://localhost:45546/ACPFrontEndDataServices.svc/SaveACPFrontEndData",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(this.state.userSubmittedData)
            })
            .then(svcRes => {
                console.log("Data Save Status.." + JSON.stringify(svcRes));
            })
            .catch(ex => {
                console.log("Exception.." + ex);
            })
    }
// to validate the input string into text box and provide isvalid property to output json.
    isValidEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true;
        }
        return false;
    }
// to validate the input string into text box and provide isvalid property to output json.
    isValidPhone(phone) {
        return (!isNaN(phone) && phone.length === 10);
    }

    isValid(event, element) {

        if (!element.isOptional && (event.target.elements[element.label].value.trim() === '' || event.target.elements[element.label].value.trim() === '--SELECT--'))
            return false;
        if (element.type === "email" && !this.isValidEmail(event.target.elements[element.label].value))
            return false;
        if (element.type === "telephone" && !this.isValidPhone(event.target.elements[element.label].value))
            return false;
        return true
    }
// Adding event to handle on click Submit Button
    handleSubmit(event) {
        event.preventDefault();
        var userSubmittedData = [];
        this.state.data.forEach(element => {
            if (element.type === "hidden" || element.isHidden) {
                return;
            }
            var valid = this.isValid(event, element);
            if (valid) {
                userSubmittedData.push({ "label": element.label, "value": event.target.elements[element.label].value, "isValid": true });
            } else {
                userSubmittedData.push({ "label": element.label, "value": event.target.elements[element.label].value, "isValid": false });
            }
        });
     if (confirm("Output would be JSON in UI !"))
     {
         
               this.setState({ "isError": this.state.isError, "data": this.state.data, "userSubmittedData": userSubmittedData });
     }

       
       
    }


    renderForm(controlsList) {
        var html = [];
        if (!controlsList) {
            return "Waiting for API response...."
        }

        else {
            controlsList.forEach(control => {
                switch (control.type) {
                   
                    case "email":
                        html.push(<EmailControl controls={control} />);
                       
                            break;   
                       
                    case "radio":
                        html.push(<RadioControl controls={control} />);
                        break;
                   
                    case "select":
                        html.push(<Dropdown controls={control} />);
                        break;

                    case "telephone":
                        html.push(<TelephoneControl controls={control}/ >);
                        break;

                    case "hidden":
                        var hiddenControl = <div style={{ display: control.isHidden ? 'none' : '' }}> {control.label}
                            <input type="hidden" name={control.label} value={control.value} /> </div>
                        html.push(hiddenControl);
                        break;

                    default:
                        html.push(<div> error </div>);
                        break;
                }
            });
        }
        
        var button = <div class="form-group row">
            <div class="col-sm-7 col-sm-offset-7">
            <button type="submit" class="btn btn-primary">Submit</button>
           
            </div>
            <div class="col-sm-3"></div>
        </div>
        html.push(button);
        return html;
    }
// Reading data from the API in Json
    componentDidMount() {

        // To access customer api with CORS proxy
        //{"label":"Personal Email address","type":"email","isOptional":false,"isHidden":false},
        /*
          {"label":"Gender","type":"radio","value":["M (Male)","F (Female)","X (Indeterminate/Intersex/Unspecified)"],"isOptional":true},
            {"label":"State","type":"select","value":["UP","MP","AP","CG","ARP"],"default":"UP"},
            {"label":"Contact number","type":"telephone"},
           
            {"type":"hidden","value":1234567890,"isHidden":true}
        */

        const data =[
            {"label":"Personal Email address","type":"email","isOptional":false,"isHidden":false},
            {"label":"Contact number","type":"telephone"},
            {"label":"Gender","type":"radio","value":["M (Male)","F (Female)","X (Indeterminate/Intersex/Unspecified)"],"isOptional":true},
            {"label":"State","type":"select","value":["UP","MP","AP","CG","ARP"],"default":"UP"},
            {"label":"Contact number","type":"telephone"},
            {"type":"hidden","value":1234567890,"isHidden":true},
            {"label":"Office Email address","type":"email","isOptional":false,"isHidden":false},
            {"label":"Primary Email address","type":"email","isOptional":false,"isHidden":false},
            {"label":"Secondary Email address","type":"email","isOptional":false,"isHidden":false},
            {"label":"Optional Email address","type":"email","isOptional":false,"isHidden":false}

          
            
            ];

        this.setState({ "isError": false, "data": data })
        /* Prosmise Concept
        fetch("URL", {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data && data.statusCode) {
                    this.setState({ "isError": true, "data": data })
                } else {
                    this.setState({ "isError": false, "data": data })
                }
            })
            .catch(err => {
                console.log("error while retrieving data through API.." + err);
                this.setState({ "isError": true, "data": {} })
            })
            */
    }
// actual render component to UI
    render() {
        if (this.state.isError) {
            return <div>
                <div class="row"> <div class="col-sm-3 col-sm-offset-3"> statuscode:</div>
                    <div class="col-sm-3 error-required">{this.state.data.statusCode} </div> </div>
                <div class="row"> <div class="col-sm-3 col-sm-offset-3"> error:</div>
                    <div class="col-sm-3 error-required"> {this.state.data.error}  </div> </div>
                <div class="row"> <div class="col-sm-3 col-sm-offset-3"> mesage: </div>
                    <div class="col-sm-3 error-required"> {this.state.data.message} </div></div>
            </div>
        } else {
            var html = this.renderForm(this.state.data);
            return <div>
                <form onSubmit={this.handleSubmit}> {html} </form>

                <div class="row"> <div class="col-sm-3 col-sm-offset-3">

                </div>
                    <div class="col-sm-1 col-sm-offset-1"><RenderUserData userSubmittedData={this.state.userSubmittedData} /></div>
                </div>

            </div>

        }
    }
}

