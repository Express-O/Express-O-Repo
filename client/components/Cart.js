import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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
          cart[0] 
          ? 
          <div>
          <ul>
            {
            cart.map(product => {
              console.log("JENNY LOOK HERE===============================>", cart)
              return (
              <ProductCard
                key={product.id}
                product={product}
                removeProduct={this.props.removeProduct}
                cartProductCount={cart.length}
              />
              )
            })
            }
          </ul>
          <span className="badge">{cart.length}</span>
          </div>
        : <p>No Items in Cart!</p>
        }
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

export default withRouter(connect(mapState, mapDispatch)(Cart));
