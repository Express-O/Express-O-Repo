import React, {Component} from 'react'
import {connect} from 'react-redux'

class UserSignUp extends Component {
  constructor(){
    super()
  }

  render() {
    return (
      <div>
        <h1> Sign Up for express coffee delivery!</h1>
        <form>
          <div>
            <label htmlFor="firstName"><small>First Name</small></label>
          </div>
          <div>
            <label htmlFor="lastName"><small>Last Name</small></label>
          </div>
          <div className="deliveryAddress">
            <span>Delivery Address:</span>
            <label htmlFor="streetName"><small>Street Address:</small></label>
            <label htmlFor="apt"><small>Apt No.</small></label>
            <label htmlFor="city"><small>City</small></label>
            <label htmlFor="state"><small>State</small></label>
          </div>
          <div>
            <label htmlFor="zip"><small>Zip Code</small></label>
          </div>
          <div>
            <label htmlFor="country"><small>Country</small></label>
          </div>
          <div>
            <label htmmlFor="email"><small>Email</small></label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password"><small>Password</small></label>
          </div>
          <button type="submit">Sign Up!</button>
        </form>
      </div>
    )
  }
}
