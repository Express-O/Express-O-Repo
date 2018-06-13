import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { auth } from '../store'
import AdminHome from './AdminHome'

class AddAdmin extends Component {
  constructor() {
    super()
    this.state = {
      formName: 'signup',
      firstName: '',
      lastName: '',
      email: '',
      streetName: 'company street',
      city: 'New York',
      state: 'New York',
      zip: '1004',
      country: 'USA',
      isAdmin: '',
      password: ''
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  changeHandler(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  submitHandler(evt) {
    evt.preventDefault()
    this.props.auth(this.state)
  }
  render() {
    return (
      <div>
        <AdminHome />
        <form onSubmit={this.submitHandler}>
          <label htmlFor="firstName"><small>First Name:</small></label>
          <input name="firstName" type="text" value={this.state.firstName} onChange={this.changeHandler} />
          <label htmlFor="lastName"><small>Last Name:</small></label>
          <input name="lastName" type="text" value={this.state.lastName} onChange={this.changeHandler} />
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" value={this.state.email} onChange={this.changeHandler} />
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="text" value={this.state.password} onChange={this.changeHandler} />
          <label>Admin Status</label>
          <select name="isAdmin" onChange={this.changeHandler}>
            <option value="true" onChange={this.changeHandler}>True</option>
            <option value="false" onChange={this.changeHandler}>False</option>
          </select>
          <button type="submit">Create Admin</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return ({
    auth: (adminInfo) => dispatch(auth(adminInfo))
  })
}

export default withRouter(connect(null, mapDispatch)(AddAdmin))
