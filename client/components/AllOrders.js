import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchOrders } from '../store'

class AllOrders extends Component {
  componentDidMount() {
    fetchOrders()
  }

  render() {
    const { allOrders } = this.props
    return (
      <div>
        <table>
          <tr>
            <th>Order Id</th>
            <th>User Id</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
          {
            allOrders.map(order => {
              return (
                <tbody key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>
                  <td>{order.status}</td>
                  <td>{order.total}</td>
                  <td><Link to="/editorder">Edit/Details</Link></td>
                </tbody>
              )
            })
          }
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({ allOrders: state.allOrders })
const mapDispatchToProps = dispatch => ({ fetchOrders: () => dispatch(fetchOrders()) })
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllOrders))
