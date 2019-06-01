import React, {Component} from "react";

class BookingForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customer: "",
      numberOfPeople: "",
      date: "",
      time: "",
      table: "",
    };

    this.handleCustomerChange = this.handleCustomerChange.bind(this);
    this.handleNumberOfPeopleChange = this.handleNumberOfPeopleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleBookingSubmit = this.handleBookingSubmit.bind(this);
  }

  handleBookingSubmit(event) {
    event.preventDefault();
    const customer = this.state.customer;
    const numberOfPeople = this.state.numberOfPeople;
    const date = this.state.date;
    const time = this.state.time;
    const table = this.state.table;

    this.props.onBookingSubmit({
      customer: customer,
      numberOfPeople : numberOfPeople,
      date: date,
      time: time,
      table: table,
    });

    this.setState({
      customer: '',
      numberOfPeople: '',
      date: "",
      time: "",
      table: "",
    });
  }

  handleCustomerChange(event) {
    this.setState({
      customer: event.target.value
    });
  }

  handleNumberOfPeopleChange(event) {
    this.setState({
      numberOfPeople: event.target.value
    });
  }

  handleDateChange(event) {
    this.setState({
      date: event.target.value
    });
  }

  handleTimeChange(event) {
      this.setState({
       time: event.target.value
      });
    }

    handleTableChange(event) {
        this.setState({
         table: event.target.value
        });
      }


  render() {
    return (
      <form className = "booking-form" onSubmit = {this.handleBookingSubmit}>
        <input
          type = "text"
          placeholder = "Customer"
          value = {this.state.customer}
          onChange = {this.handleCustomerChange}
        />

        <input
            type = "number"
            placeholder = "NameOfPeople"
            value = {this.state.numberOfPeople}
            onChange = {this.handleNumberOfPeopleChange}
          />
          <input
            type = "date"
            placeholder = "date"
            value = {this.state.date}
            onChange = {this.handleDateChange}
          />
          <input
            type = "time"
            placeholder = "time"
            value = {this.state.time}
            onChange = {this.handleTimeChange}
          />
          <input
            type = "number"
            placeholder = "table"
            value = {this.state.table}
            onChange = {this.handleTableChange}
          />

        <input
          id="submit-button"
          type = "submit"
          value = "Post"
        />
      </form>
    )
  }
}


export default BookingForm;