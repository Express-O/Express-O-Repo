import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import AllProducts from './AllProducts';
import { isContext } from 'vm';


const Navbar = ({ handleClick, isLoggedIn }) => (
    <div className="navbar">
      <div className="logo">Express-O</div>
        {isLoggedIn ? (
          <div className="navlink">
            {/* The navbar will show these links after you log in */}
            <Link to="/home" className="navlink">MY ACCOUNT</Link>
            <a href="#" className="navlink" onClick={handleClick}>
              LOGOUT
            </a>
          </div>
        ) : (
          <div className="navlink">
            {/* The navbar will show these links before you log in */}
            <Link to="/login" className="acctlink" >LOGIN</Link>
            <Link to="/signup" className="acctlink">SIGN UP</Link>
            <NavLink to="/cart" className="acctlink">Cart</NavLink>
          </div>
        )}
        <div className="navlink">
          <NavLink to = "/product/coffee" className="productlink">Coffee</NavLink>
          <NavLink to = "/product/swag" className="productlink">Swag</NavLink>
          <NavLink to = "/product/all"className="productlink">All</NavLink>
          <NavLink to ="/aboutUs"className="productlink" >About Us</NavLink>
          <input />
        </div>
    </div>
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
