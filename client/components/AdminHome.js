import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminHome = (props) => {

  return (
    <div>
      <h3>Welcome, {props.user.firstName} {props.user.lastName}</h3>
<<<<<<< HEAD
      <div className="admin-home-container">
        <div className="home-desc" >
          <Link to="/admin/inventory">
            <button type="button">VIEW PRODUCT INVENTORY</button>
          </Link>
          <Link to="/admin/addproduct">
            <button type="button">ADD NEW PRODUCT</button>
          </Link>
          <Link to="/admin/useraccounts">
            <button type="button">VIEW USER ACCOUNTS</button>
          </Link>
          <Link to="/signup">
            <button type="button">ADD NEW USER ACCOUNT</button>
          </Link>
          <Link to="/admin/allorders">
            <button type="button">VIEW ALL ORDERS</button>
          </Link>
        </div>
      <div className="userhomepageimg">
        <img src="https://www.healthline.com/hlcmsresource/images/AN_images/espresso-ground-coffee-beans-1296x728.jpg" />
      </div>
      </div>
=======
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
>>>>>>> b4f4d5d1003a79dd4ab639194241e7444eb71e01
    </div >
  )
}

const mapState = state => ({ user: state.user })
export default connect(mapState)(AdminHome)
