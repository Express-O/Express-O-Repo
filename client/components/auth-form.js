import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth, editProfile } from '../store'

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor(props) {
    super(props)
    if (this.props.user) {
      this.state = this.props.user
    } else {
      this.state = {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let userInfo = {
      formName: evt.target.name,
      email: evt.target.email.value,
      password: evt.target.password.value
    }
    if (userInfo.formName === 'signup') {
      userInfo = {
        formName: evt.target.name,
        firstName: evt.target.firstName.value,
        lastName: evt.target.lastName.value,
        streetName: evt.target.streetName.value,
        apt: evt.target.apt.value,
        city: evt.target.city.value,
        state: evt.target.state.value,
        zip: evt.target.zip.value,
        country: evt.target.country.value,
        email: evt.target.email.value,
        password: evt.target.password.value
      }
    }
    if (userInfo.formName === 'editProfile') {
      userInfo = {
        firstName: evt.target.firstName.value,
        lastName: evt.target.lastName.value,
        streetName: evt.target.streetName.value,
        apt: evt.target.apt.value,
        city: evt.target.city.value,
        state: evt.target.state.value,
        zip: evt.target.zip.value,
        country: evt.target.country.value,
        id: this.props.id
      }
      this.props.editProfile(userInfo)
    }
    else { this.props.auth(userInfo) }
  }

  render() {
    const { name, displayName, error } = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit} name={name}>
          <div>
            {
              name === 'signup' || name === 'editProfile' ?
                <div>
                  <label htmlFor="firstName" ><small>First Name:</small></label>
                  <input name="firstName" type="text" defaultValue={this.state.firstName} />
                  <label htmlFor="lastName"><small>Last Name:</small></label>
                  <input name="lastName" type="text" defaultValue={this.state.lastName} />
                  <label htmlFor="streetName"><small>Street Adress:</small></label>
                  <input name="streetName" type="text" defaultValue={this.state.streetName} />
                  <label htmlFor="apt"><small>Apt:</small></label>
                  <input name="apt" type="text" defaultValue={this.state.apt} />
                  <label htmlFor="city"><small>City:</small></label>
                  <input name="city" type="text" defaultValue={this.state.city} />
                  <label htmlFor="state"><small>State:</small></label>
                  <input name="state" type="text" defaultValue={this.state.state} />
                  <label htmlFor="zip"><small>Zip:</small></label>
                  <input name="zip" type="text" defaultValue={this.state.zip} />
                  <label htmlFor="country"><small>Country:</small></label>
                  <input name="country" type="text" defaultValue={this.state.country} />
                </div> : null
            }
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="text" defaultValue={this.state.email} />
          </div>
          <div>
            <label htmlFor="password"><small>Password</small></label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  }
}
/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapEditProfile = state => {
  return {
    name: 'editProfile',
    displayName: 'Edit Profile',
    error: state.user.error,
    id: state.user.id,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    editProfile: (userInfo) => dispatch(editProfile(userInfo)),
    auth: (userInfo) => dispatch(auth(userInfo))
  }

}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
export const EditProfile = connect(mapEditProfile, mapDispatch)(AuthForm)
/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  // handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
