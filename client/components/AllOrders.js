import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchOrders } from '../store'

class AllOrders extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    const { allOrders } = this.props
    if (!allOrders) {
      return (<div>Loading ... </div>)
    }
    return (
      <div>
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
            allOrders.map(order => {
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

const mapStateToProps = state => ({ allOrders: state.allOrders })
const mapDispatchToProps = dispatch => ({ fetchOrders: () => dispatch(fetchOrders()) })
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllOrders))
