import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addCart, fetchProducts, fetchCart, emptyCart, submitOrder } from '../store/index';
import ProductCard from './ProductCard'

class Cart extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart();
    this.props.fetchProducts();
  }

  handleSubmit (evt, cartWithQtyArr) {
    evt.preventDefault()
    let order = cartWithQtyArr.map( product => {
      return {
        quantity: product.quantity,
        price: product.price,
        productId: product.id
      }
    })
    this.props.submitOrder(order)
  }

  render() {
    const { cart, allProducts } = this.props;
    let cartKeys = Object.keys(cart)
    let cartWithQtyArr = allProducts.filter(product => {
      let productId = product.id
      if (cartKeys.indexOf(productId.toString()) !== -1) {
        product.quantity = cart[productId]
        return product
      }
    })

    let subTotal;
    if (cartWithQtyArr.length) {
      subTotal = cartWithQtyArr.reduce((sum, product) => {
        return sum += Number(product.price * product.quantity)
      }, 0)
    }

    if (Object.keys(cart).length !== 0) {
      return (
        <div>
          <h2 style={{marginBottom: '0.5em', marginTop: '0.5em'}}>Shopping Cart</h2>
          {

          cartWithQtyArr.map(product => {
            return (
            <ProductCard
              key={product.id}
              product={product}
              cartProductCount={cart.length}
            />
            )
          })
        }
        <hr />
        {
        <div>
          <h3>Order SubTotal: ${`${subTotal}`}</h3>
        </div>
        }
        <div>
          <button type="button" onClick={(evt) => this.handleSubmit(evt, cartWithQtyArr)}>Submit Your Order</button>
          <button type="button" onClick={() => this.props.emptyCart()}>Empty your cart</button>
        </div>
        </div>
      )
    } else {
      return (
        <p>Your shopping cart is empty!</p>
      )
    }
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    allProducts: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addCart: (product) => dispatch(addCart(product)),
    fetchCart: () => dispatch(fetchCart()),
    emptyCart: () => dispatch(emptyCart()),
    submitOrder: (order) => dispatch(submitOrder(order))
  }
}

export default withRouter(connect(mapState, mapDispatch)(Cart));
