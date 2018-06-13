import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { fetchOrders } from '../store'

class AllOrders extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    const { allOrders, completedOrders, cartOrders, processingOrders, cancelledOrders, location } = this.props

    let orders;
    if (location.pathname === '/admin/processingorders') orders = processingOrders
    else if (location.pathname === '/admin/completedorders') orders = completedOrders
    else if (location.pathname === '/admin/cartorders') orders = cartOrders
    else if (location.pathname === '/admin/cancelledorders') orders = cancelledOrders
    else orders = allOrders

    if (!allOrders) {
      return (<div>Loading ... </div>)
    }
    return (
      <div>
        <NavLink to="/admin/completedorders" className="productlink">Complete</NavLink>
        <NavLink to="/admin/cartorders" className="productlink">In Cart</NavLink>
        <NavLink to="/admin/processingorders" className="productlink">Processing</NavLink>
        <NavLink to="/admin/cancelledorders" className="productlink">Cancelled</NavLink>
        <table>
          <tbody>
            <tr>
              <th>Order Id</th>
              <th>User Id</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </tbody>
          {
            orders.map(order => {
              return (
                <tbody key={order.id}>
                  <tr>
                    <td>{order.id}</td>
                    <td>{order.userId}</td>
                    <td>{order.status}</td>
                    <td>{order.total}</td>
                    <td><Link to={`/admin/editorder/${order.id}`}>Edit/Details</Link></td>
                  </tr>
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
  const allOrders = state.allOrders
  return ({
    allOrders: allOrders,
    cartOrders: allOrders.filter(order => order.status === 'cart'),
    processingOrders: allOrders.filter(order => order.status === 'processing'),
    completedOrders: allOrders.filter(order => order.status === 'complete'),
    cancelledOrders: allOrders.filter(order => order.status === 'cancelled')
  })
}
const mapDispatchToProps = dispatch => ({ fetchOrders: () => dispatch(fetchOrders()) })
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllOrders))
