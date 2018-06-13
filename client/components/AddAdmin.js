import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { auth } from '../store'

class AddAdmin extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      streetName: 'company street',
      city: 'New York',
      state: 'New York',
      zip: '1004',
      country: 'USA',
      isAdmin: false,
      password: ''
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  clickHandler(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  submitHandler(evt) {
    evt.preventDefault()
    this.props.auth(this.state)
  }
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <label htmlFor="firstName"><small>First Name:</small></label>
        <input name="firstName" type="text" />
        <label htmlFor="lastName"><small>Last Name:</small></label>
        <input name="lastName" type="text" />
        <label htmlFor="email"><small>Email</small></label>
        <input name="email" type="text" />
        <label htmlFor="password"><small>Password</small></label>
        <input name="password" type="text" />
        <label>Admin Status</label>
        <select name="isAdmin">
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
        <button type="submit">Create Admin</button>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return ({
    auth: (adminInfo) => dispatch(auth(adminInfo))
  })
}

export default withRouter(connect(null, mapDispatch)(AddAdmin))
