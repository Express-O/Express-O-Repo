import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addCart, fetchCart, removeProduct, emptyCart, submitOrder } from '../store/index';
import ProductCard from './ProductCard'

const cartListStyles = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
}

const cartCardStyles = {
  maxWidth: "30%",
  minWidth: "150px",
  flex: "1",
  margin: "5px",
}

class Cart extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCart()
  }

  handleSubmit (evt, cartWithQtyArr) {
    evt.preventDefault()
    let order = cartWithQtyArr.map( product => {
      return {quantity: product.quantity,
              price: product.price,
              productId: product.id}
    })
    this.props.submitOrder(order)
  }

  render() {
    const { cart } = this.props;
    if (cart.length > 0) {                                  // INITIAL APPROACH with Helper Func
    //   let cartWithQty = cart.reduce((cartHashTbl, product) => {
    //     // console.log('product from hashtbl', product)
    //     let title = product.title
    //     if (!cartHashTbl[title]) {
    //       product.quantity = 1
    //       cartHashTbl[title]= product
    //       // console.log('inside if block')
    //     } else {
    //       // console.log('made it to else block - cartHashTbl', cartHashTbl)
    //       cartHashTbl[title].quantity++
    //     }
    //     console.log('cartHashTbl', cartHashTbl)
    //     return cartHashTbl
    //   }, {})
  
    //     // console.log('CART W QTY', cartWithQty)
  
  
    //     let helperFunc = (obj) => {
    //       let cartWithQtyArr = []
    //       for (var title in cartWithQty) {
    //         let product = cartWithQty[title]
    //         console.log('product', product)
    //         cartWithQtyArr.push(product)
    //       }
    //       // console.log('cartWithQtyArr', cartWithQtyArr)
    //       return cartWithQtyArr
    //     }
    //     let cartWithQtyArr = helperFunc(cartWithQty)
    // console.log('CART', cart)

    let cartWithQty = cart.reduce((cartHashTbl, product) => {
      // console.log('product from hashtbl', product)
      let title = product.title
      if (!cartHashTbl[title] || !cartHashTbl[title].quantity) {
        product.quantity = 1
        cartHashTbl[title] = product
        // console.log('inside if block')
      } else if (cartHashTbl[title] && product.quantity) {
        cartHashTbl[title] = product
      } else {
        cartHashTbl[title].quantity++
      }
      console.log('cartHashTbl', cartHashTbl)
      return cartHashTbl
    }, {})
    let cartWithQtyArr = Object.values(cartWithQty)

      console.log('CART W QTY', cartWithQty)

    console.log('CART QTY ARRAY', cartWithQtyArr)


        return (
          <div>
            <h2 style={{marginBottom: "0.5em", marginTop: "0.5em"}}>Shopping Cart</h2>
            {
          cartWithQtyArr.map(product => {
              let cartId = Math.random()
              return (
              <ProductCard style={cartCardStyles}
                key={cartId}
                product={product}
                cartWithQty={cartWithQty}
                //helperFunc={helperFunc}
                removeProduct={this.props.removeProduct}
                cartProductCount={cart.length}
                quantity={product.quantity}
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
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    addCart: (product) => dispatch(addCart(product)),
    fetchCart: () => dispatch(fetchCart()),
    removeProduct: (productId) => dispatch(removeProduct(productId)),
    emptyCart: () => dispatch(emptyCart()),
    submitOrder: (order) => dispatch(submitOrder(order))
  }
}

export default withRouter(connect(mapState, mapDispatch)(Cart));
