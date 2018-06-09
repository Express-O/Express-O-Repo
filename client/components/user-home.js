import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email, firstName, lastName, streetName, apt, city, state, zip, country} = props

  return (
    <div>
      <h3>Welcome, {firstName} {lastName}</h3>
      <h4> Account Details:</h4>
      <div>
        <p>Full Name: {firstName} {lastName}</p>
        <p>Email: {email}</p>
        <div>
          Address:{streetName} {apt} {city} {state} {zip} {country}
        </div>
      </div>
      <div>
        <Link to = "/editprofile">
          <button type="button">EDIT PROFILE</button>
        </Link>
      </div>
      <div>
        <h4>Past Purchases:</h4>
        {/* component with line item goes here? */}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    streetName: state.user.streetName,
    apt: state.user.apt,
    city: state.user.city,
    state: state.user.state,
    zip: state.user.zip,
    country: state.user.country
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
