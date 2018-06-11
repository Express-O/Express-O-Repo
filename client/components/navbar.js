import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import AllProducts from './AllProducts';
import { isContext } from 'vm';
import { Colors } from '@blueprintjs/core';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <nav className="pt-navbar" style={{ color: Colors.WHITE, background: Colors.BLACK }} >
    <div className="pt-navbar-group pt-align-left">
      <div className="pt-navbar-heading">Express-O</div>
    </div>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">My Account</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className="pt-navbar-group pt-align-right">
            {/* The navbar will show these links before you log in */}
            <Link to="/login" style={{ color: Colors.COBALT4}}>Login</Link>
            <Link to="/signup" style={{ color: Colors.COBALT4}}>Sign Up</Link>
            <span className="pt-navbar-divider"></span>
            <NavLink className="pt-button pt-minimal pt-icon-shopping-cart" to="/cart">Cart</NavLink>
          </div>
        )}
        <div>
          <NavLink to = "/product/coffee" style={{ color: Colors.COBALT4}}>Coffee</NavLink>
          <NavLink to = "/product/swag" style={{ color: Colors.COBALT4}}>Swag</NavLink>
          <NavLink to = "/product/all" style={{ color: Colors.COBALT4}}>All</NavLink>
          <NavLink to ="/aboutUs" style={{ color: Colors.COBALT4}}>About Us</NavLink>
          <input className="pt-input" placeholder="Search..." type="text" />
        </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
