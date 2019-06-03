import React, {Component} from "react";
import Request from '../helpers/Request';

// not implemented yet - KEEP
class MasterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      name:  '',
      phone: '',
      booker: '', 
      partySize: '',
      date: '',
      time: '',
      table: '',
      bookingNote: ''
    }
  }

  // retrieve avaiable tables - rerenders on setstate
  componentDidMount(){};

  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
  }
   
  // require Spring query for find booker ID by booker phone
  handleSubmit = event => {
    event.preventDefault()
    const request = new Request();
    const bookerObj = {"name": this.state.name, "phone": this.state.phone}
    request.post('http://localhost:8080/bookers', bookerObj)
    .then(()=>{
      request.get(`http://localhost:8080/bookers/${this.state.phone}`)
    })
    .then((result)=>{
      this.setState({booker: `http://localhost:8080/bookers/${result.id}`})
    })
    .then(()=>{
      const bookingObj = {
        "date": this.state.date,
        "time": this.state.time,
        "partySize": this.state.partySize,
        "booker": this.state.booker,
        "seatingTable": this.state.table,
        "bookingNote": this.state.bookingNote
      }
      request.post(`http://localhost:8080/bookerings`, bookingObj);
    })


    const { email, username, password } = this.state
    alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`)
  }
  
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

/*
* the functions for our button
*/
previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <button 
        className="btn btn-secondary" 
        type="button" onClick={this._prev}>
      Previous
      </button>
    )
  }
  return null;
}

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <3){
    return (
      <button 
        className="btn btn-primary float-right" 
        type="button" onClick={this._next}>
      Next
      </button>        
    )
  }
  return null;
}
  
  render() {    
    return (
      <React.Fragment>
      <h1>React Wizard Form 🧙‍♂️</h1>
      <p>Step {this.state.currentStep} </p> 

      <form onSubmit={this.handleSubmit}>
      {/* 
        render the form steps and pass required props in
      */}
        <Step1 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          name={this.state.name}
          phone={this.state.phone}
        />
        <Step2 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          date={this.state.date}
          time={this.state.time}
          partySize={this.state.partySize}
          partySize={this.state.partySize}
        />
        <Step3 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          password={this.state.password}
        />
        {this.previousButton()}
        {this.nextButton()}

      </form>
      </React.Fragment>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <div className="form-group">
      <label htmlFor="name">Customer Name:</label>
      <input
        className="form-control"
        id="name"
        name="name"
        type="text"
        placeholder="Enter Name"
        value={props.name}
        onChange={props.handleChange}
        required
        />
      <label htmlFor="phone">Phone Number:</label>
      <input
        className="form-control"
        id="phone"
        name="phone"
        type="number"
        placeholder="0000 000 0000"
        value={props.phone}
        onChange={props.handleChange}
        required
        />
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return(
    <div className="form-group">
      <label htmlFor="date">Date:</label>
      <input
        className="form-control"
        id="date"
        name="date"
        type="date"
        
        value={props.date}
        onChange={props.handleChange}
        />
      <label htmlFor="time">Time:</label>
      <input
        className="form-control"
        id="time"
        name="time"
        type="time"
        value={props.time}
        onChange={props.handleChange}
        />
      <label htmlFor="partySize">Party Size:</label>
      <input
        className="form-control"
        id="partySize"
        name="partySize"
        type="number"
        value={props.partySize}
        onChange={props.handleChange}
        />
      <label htmlFor="bookingNote">Booking Note:</label>
      <input
        className="form-control"
        id="bookingNote"
        name="bookingNote"
        type="text"
        value={props.bookingNote}
        onChange={props.handleChange}
        />
        
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  } 
  return(
    // render radio buttons  based on tables request
    <React.Fragment>
    <div className="form-group">
      <label htmlFor="table">Table:</label>
      <input
        className="form-control"
        id="table-1"
        name="table"
        type="table"
        value={props.table}
        onChange={props.handleChange}
        />      
    </div>
    <button className="btn btn-success btn-block">Create Booking</button>
    </React.Fragment>
  );
}
