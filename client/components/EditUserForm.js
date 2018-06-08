import React, { Component } from 'react'
import { connect } from 'react-redux';

//we're not sure yet if this is a useful form...we'll let you know.

export default class EditUserForm extends Component{
  constructor(){
    super()
    this.state = {
      firstName: '',
      lastName: '',
      telephone: '',
      email: '',
      streetName: '',
      apt: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  clickHandler(evt){
    this.setState({[evt.target.name]: evt.target.value})
  }

  submitHandler(evt){
    evt.preventDefault()
    //
    this.setState({
      firstName: '',
      lastName: '',
      telephone: '',
      email: '',
      streetName: '',
      apt: '',
      city: '',
      state: '',
      zip: '',
      country: ''})
  }
  render(){
    return (
      <form>
        <label htmlFor="firstName"><small>First Name:</small></label>
        <input name="firstName" type="text" />
        <label htmlFor="lastName"><small>Last Name:</small></label>
        <input name="lastName" type="text" />
        <label htmlFor="telephone"><small>Telephone:</small></label>
        <input name="telephone" type="text" />
        <label htmlFor="email"><small>Email</small></label>
        <input name="email" type="text" />
        <label htmlFor="streetName"><small>Street Adress:</small></label>
        <input name="streetName" type="text" />
        <label htmlFor="apt"><small>Apt:</small></label>
        <input name="apt" type="text" />
        <label htmlFor="city"><small>City:</small></label>
        <input name="city" type="text" />
        <label htmlFor="state"><small>State:</small></label>
        <input name="state" type="text" />
        <label htmlFor="zip"><small>Zip:</small></label>
        <input name="zip" type="text" />
        <label htmlFor="country"><small>Country:</small></label>
        <input name="country" type="text" />
      </form>
    )
  }
}

