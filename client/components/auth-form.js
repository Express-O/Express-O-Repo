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
    }
    if (userInfo.formName === 'login') {
      userInfo = {
        formName: evt.target.name,
        email: evt.target.email.value,
        password: evt.target.password.value
      }
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
        password: evt.target.password.value,
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
        email: evt.target.email.value,
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
                  <label htmlFor="firstName" className="pt-label .modifier"><small>First Name:</small></label>
                  <input
                    name="firstName"
                    type="text"
                    defaultValue={this.state.firstName}
                    className="pt-input"
                    style={{ width: '180px', margin: '0 auto' }}
                    placeholder="input text here"
                    dir="auto"
                  />

                  <label htmlFor="lastName" className="pt-label .modifier"><small>Last Name:</small></label>
                  <input
                    name="lastName"
                    type="text"
                    defaultValue={this.state.lastName}
                    className="pt-input"
                    style={{ width: '180px', margin: '0 auto' }}
                    placeholder="input text here"
                    dir="auto"
                  />

                  <label htmlFor="streetName" className="pt-label .modifier"><small>Street Adress:</small></label>
                  <input name="streetName" type="text" defaultValue={this.state.streetName} />

                  <label htmlFor="apt" className="pt-label .modifier"><small>Apt:</small></label>
                  <input name="apt" type="text" defaultValue={this.state.apt} />

                  <label htmlFor="city" className="pt-label .modifier"><small>City:</small></label>
                  <input name="city" type="text" defaultValue={this.state.city} />

                  <label htmlFor="state" className="pt-label .modifier"><small>State:</small></label>
                  <input name="state" type="text" defaultValue={this.state.state} />

                  <label htmlFor="zip" className="pt-label .modifier"><small>Zip:</small></label>
                  <input name="zip" type="text" defaultValue={this.state.zip} />

                  <label htmlFor="country" className="pt-label .modifier"><small>Country:</small></label>
                  <input name="country" type="text" defaultValue={this.state.country} />
                </div> : null
            }
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="text" defaultValue={this.state.email} />
          </div>
          {
            name !== 'editProfile' &&
            <div>
              <label htmlFor="password"><small>Password</small></label>
              <input name="password" type="password" />
            </div>
          }
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
    error: state.user.error,
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
