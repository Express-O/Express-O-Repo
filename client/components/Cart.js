import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addCart, fetchCart, removeProduct } from '../store/index';
import ProductCard from './ProductCard'

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
            cart.map(product => (<ProductCard key={product.id} product={product} removeProduct={this.props.removeProduct} cartProductCount={cart.length} />))
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
    fetchCart: () => dispatch(fetchCart()),
    removeProduct: (productId) => dispatch(removeProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(Cart);
