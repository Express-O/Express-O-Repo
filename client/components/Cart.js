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

  handleSubmit (evt, cartWithQtyArr) {                // ?????????????????
    evt.preventDefault()
    let order = cartWithQtyArr.map( product => {
      return {quantity: product.quantity,
              price: product.price,
              productId: product.id}
    })
    this.props.submitOrder(order)
  }

  render() {
    const { cart, allProducts } = this.props;

    // console.log('allProducts in Cart state', allProducts)  // [{}..]
    // console.log('cart from Cart State', cart) // {}
    let cartKeys = Object.keys(cart)
    // console.log('cartKeys...', cartKeys)

    let cartWithQtyArr = allProducts.filter(product => {
      let productId = product.id
      // console.log('productId', productId)
      if (cartKeys.indexOf(productId.toString()) !== -1) {
        product.quantity = cart[productId]

        // console.log('product.quantity', product.quantity)
        // console.log('cart.producId', cart.productId)
        return product
      }
    })
    // console.log('cartWithQtyArr -------', cartWithQtyArr)
    // console.log('Object.keys(cart).length', Object.keys(cart).length)

    if (Object.keys(cart).length !== 0) {
        return (
          <div>
            <h2 style={{marginBottom: "0.5em", marginTop: "0.5em"}}>Shopping Cart</h2>
            {
            cartWithQtyArr.map(product => {
              // let cartId = Math.random()
              console.log('made it to the map')
              return (
              <ProductCard
                key={product.id}
                product={product}
                cartProductCount={cart.length}
              />
              )
            })
          }
          <button type="button" onClick={(evt) => this.handleSubmit(evt, cartWithQtyArr)}>Submit Your Order</button>
          <button type='button' onClick={() => this.props.emptyCart()}>Empty your cart</button>
          {/* <span className="badge">{cart.length}</span> */}
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
