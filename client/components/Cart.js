import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addCart, fetchCart } from '../store/index';


class Cart extends Component {

  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const { cart } = this.props;
    return (
      <div>
        <h1>Shopping Cart</h1>
        {
          cart[0] ? null : <p>No Items in Cart!</p>
        }
        <ul>
          {
            cart.map(product => <li key={product.id}>{product.title}</li>)  // this needs to be a product component
          }
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    addCart: (product) => dispatch(addCart(product)),
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapState, mapDispatch)(Cart);
