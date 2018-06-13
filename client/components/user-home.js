import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteAcct, fetchUsers } from '../store'

/**
 * COMPONENT
 */
class UserHome extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }
  render() {
    const { email, firstName, lastName, streetName, apt, city, state, zip, country, id } = this.props
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
          <Link to="/editprofile">
            <button type="button">EDIT PROFILE</button>
          </Link>
        </div>
        <div>
          <button type="button" onClick={() => props.deleteAcct(id)}>DELETE ACCOUNT</button>
        </div>
        <div>
          <h4>Past Purchases:</h4>
          {/* component with line item goes here? */}
        </div>
        <div className="userhomepageimg">
          <img src="https://www.healthline.com/hlcmsresource/images/AN_images/espresso-ground-coffee-beans-1296x728.jpg" />
        </div>
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapProfile = (state) => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    email: state.user.email,
    streetName: state.user.streetName,
    apt: state.user.apt,
    city: state.user.city,
    state: state.user.state,
    zip: state.user.zip,
    country: state.user.country,
    id: state.user.id
  }
}

const mapDetails = (state, ownProps) => {
  const userId = +ownProps.match.params.profileId;
  const detail = state.allUsers.filter(user => user.id === userId)[0]
  return ({
    firstName: detail.firstName,
    lastName: detail.lastName,
    email: detail.email,
    streetName: detail.streetName,
    apt: detail.apt,
    city: detail.city,
    state: detail.state,
    zip: detail.zip,
    country: detail.country,
    id: detail.id
  })
}

const mapDispatch = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    deleteAcct: (id) => dispatch(deleteAcct(id))
  }
}

export const UserProfile = connect(mapProfile, mapDispatch)(UserHome) //user
export const UserDetail = connect(mapDetails, mapDispatch)(UserHome) //admin

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
