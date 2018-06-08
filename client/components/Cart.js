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
    
    let cartWithQty = cart.reduce((cartHashTbl, product) => {
      // console.log('product from hashtbl', product)
      let title = product.title
      if (!cartHashTbl[title]) {
        product.quantity = 1
        cartHashTbl[title]= product
        // console.log('inside if block')
        // console.log('cartHashTbl', cartHashTbl)
      } else {
        // console.log('made it to else block - cartHashTbl', cartHashTbl)
        cartHashTbl[title].quantity++
      }
      return cartHashTbl
    }, {})

      console.log('CART W QTY', cartWithQty)


      let helperFunc = (obj) => {
        let cartWithQtyArr = []
        for (var title in cartWithQty) {
          let product = cartWithQty[title]
          console.log('product', product)
          cartWithQtyArr.push(product)
        }
        return cartWithQtyArr
      }
      let cartWithQtyArr = helperFunc(cartWithQty)





    return (
      <div>
        <h1>Shopping Cart</h1>
        {
          cart[0] 
          ? 
          <div>
          <ul>
            {
            cartWithQtyArr.map(product => {
              // console.log("JENNY LOOK HERE===============================>", cart)
              let cartId = Math.random()
              return (
              <ProductCard
                key={cartId}
                product={product}
                removeProduct={this.props.removeProduct}
                cartProductCount={cart.length}
                quantity={product.quantity}
              />
              )
            })


          }
          <button type='button' onClick={() => this.props.emptyCart()}>Empty your cart</button>
          </ul>
          {/* <span className="badge">{cart.length}</span> */}
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
