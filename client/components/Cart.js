import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addCart, fetchCart, removeProduct, emptyCart } from '../store/index';
import ProductCard from './ProductCard'

class Cart extends Component {
  constructor() {
    super()
  }

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
          <button type='button' onClick={() => this.props.emptyCart()}>Empty your cart</button>
          </ul>
          <span className="badge">{cart.length}</span>
          </div>
        : <p>Your shopping cart is empty!</p>
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
    removeProduct: (productId) => dispatch(removeProduct(productId)),
    emptyCart: () => dispatch(emptyCart())
  }
}

export default withRouter(connect(mapState, mapDispatch)(Cart));
