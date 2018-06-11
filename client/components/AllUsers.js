import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchUsers } from '../store/index'

//need to add a ternary in return for if it is admin show add button
class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { customers } = this.props;
    return (
      <div>
        <hr />
        <Link to="/admin/home">
          <button type="button">DASHBOARD</button>
        </Link>
        <Link to="/admin/useraccounts">
          <button type="button">USER ACCOUNTS</button>
        </Link>
        <Link to="/admin/addproduct">
          <button type="button">ADD NEW PRODUCT</button>
        </Link>
        <table>
          <tr>
            <th>User Id</th>
            <th>User Name</th>
            <th>User Email</th>
            <th>Address</th>
          </tr>
          {
            customers.map(user => {
              return (
                <tbody key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.fullAddress}</td>
                  <td><Link to="/orderhistory">Order History </Link></td>
                  <td><Link to="/editprofile">Edit/Details</Link></td>
                </tbody>
              )
            })
          }
        </table>
      </div>
    )
  }
}
const mapStateToProps = state => {
  const allUsers = state.allUsers
  return {
    customers: allUsers.filter(customer => customer.isAdmin === false)
  }
}
const mapDispatchToProps = dispatch => {
  return ({
    fetchUsers: () => dispatch(fetchUsers())
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUsers))
