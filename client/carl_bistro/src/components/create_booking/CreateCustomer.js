import React, {Component} from "react";
import { NavLink, Redirect } from "react-router-dom";
// import AnimatedWrapper from "../AnimatedWrapper";

class CreateCustomer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customer: "",
      customer_id: "",
      phoneNumber: "",
      redirect: false
    };

    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleCustomerSubmit = this.handleCustomerSubmit.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
}

  handleCustomerSubmit(evt) {
    evt.preventDefault();
    // console.log(evt.target);
    let thingToSave = {
      name: evt.target.booker.value,
      phone: evt.target.number.value
    }    
    // console.log(thingToSave);
    this.props.onCustomerSubmit(thingToSave);
    
  }

  handleCustomerChange(event) {
    this.setState({
      customer: event.target.value
    });
  }

  handlePhoneNumberChange(event) {
    this.setState({
      phoneNumber: event.target.value
    });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/createbooking' />
    }
  }


  render() {
    return (
      <div className="page-container">
        <div className="booking-form"> 
          <h1>New Booking</h1>
          <form className="form-inputs" onSubmit={this.handleCustomerSubmit}>
            <input
              type = "text"
              placeholder = "Customer"
              value = {this.state.customer}
              onChange = {this.handleCustomerChange}
              name="booker"
            />
            <input
                type = "number"
                placeholder = "Phone number"
                value = {this.state.phoneNumber}
                onChange = {this.handlePhoneNumberChange}
                name="number"
              />
              <input
                id="submit-button"
                type = "submit"
                value = "Next >"
                onClick={this.setRedirect}
              />
            </form>
            <NavLink className="home-link" to="/">Home</NavLink>
          </div> 
          {this.renderRedirect()}
        </div> 
    )
  }
}

export default CreateCustomer;
