import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { editOrder, getSingleOrder, fetchOrders } from '../store';

class EditOrder extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchOrders()
    this.props.getSingleOrder(this.props.match.params.orderId);
    this.setState(this.props.order)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.editOrder(this.state)
    this.props.history.push(`/admin/allorders`)
  }


  render() {
    const { order } = this.props
    if (!order) {
      return (<div>Loading...</div>)
    }
    return (
      <div>
        <h1>Edit Order</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Order No.
          </label>
          <input type="text" name="id" value={this.state.id} onChange={this.handleChange} />

          <label>
            Purchased by
          </label>
          <input type="text" name="userId" value={this.state.userId} onChange={this.handleChange} />

          <label>
            Status
          </label>
          <select name="status" form="statusform">
            <option value="cart">Cart</option>
            <option value="processing">Processing</option>
            <option value="complete">Complete</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <label>
            Gross Price
          </label>
          <input type="text" name="total" value={this.state.total} onChange={this.handleChange} />

          <button type="submit">SAVE CHANGES</button>
        </form>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  const orderId = +ownProps.match.params.orderId
  const allOrders = state.allOrders
  return {
    order: allOrders.filter(order => order.id === orderId)[0]

  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
    editOrder: order => dispatch(editOrder(order)),
    getSingleOrder: (orderId) => dispatch(getSingleOrder(orderId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(EditOrder))
