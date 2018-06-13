import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminHome = (props) => {

  return (
    <div>
      <h3>Welcome, {props.user.firstName} {props.user.lastName}</h3>
      <Link to="/admin/profile">
        <button type="button">ADMIN PROFILE</button>
      </Link>
      <Link to="/admin/inventory">
        <button type="button">VIEW PRODUCT INVENTORY</button>
      </Link>
      <Link to="/admin/addproduct">
        <button type="button">ADD NEW PRODUCT</button>
      </Link>
      <Link to="/admin/useraccounts">
        <button type="button">VIEW USER ACCOUNTS</button>
      </Link>
      <Link to="/admin/createadmin">
        <button type="button">ADD NEW ADMIN ACCOUNT</button>
      </Link>
      <Link to="/admin/allorders">
        <button type="button">VIEW ALL ORDERS</button>
      </Link>
      <Link to="/admin/home">
        <button type="button">DASHBOARD</button>
      </Link>
    </div >
  )
}

const mapState = state => ({ user: state.user })
export default connect(mapState)(AdminHome)
