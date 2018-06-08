import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          {
            (name === 'signup') ?
            <div>
            <label
            htmlFor="firstName"><small>First Name:</small></label>
           <input name="firstName" type="text" />
            <label
            htmlFor="lastName"><small>Last Name:</small></label>
            <input name="lastName" type="text" />
            <label
            htmlFor="streetName"><small>Street Adress:</small></label>
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
            </div> :
            <div />
         }
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
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

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
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
      dispatch(auth(userInfo))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
