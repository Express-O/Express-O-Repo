import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchUsers, deleteAcct } from '../store/index'
import AdminHome from './AdminHome'

//need to add a ternary in return for if it is admin show add button
class AllUsers extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { customers, deleteUser } = this.props;
    return (
      <div>
        <hr />
        <AdminHome />
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
                  <td><Link to="/admin/editprofile">Edit/Details</Link></td>
                  <td>
                    <button type="button" onClick={() => deleteUser(user.id)}>DELETE ACCOUNT</button>
                  </td>
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
    fetchUsers: () => dispatch(fetchUsers()),
    deleteUser: (id) => dispatch(deleteAcct(id))
  })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUsers))
