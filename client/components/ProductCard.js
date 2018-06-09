import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Link, withRouter } from 'react-router-dom'
import Cart from './Cart'
import { updateCart } from '../store/index';


class ProductCard extends Component {
  constructor(props) {
    super(props)
      this.state = {
        productQty: props.quantity
      }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState({
      productQty: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log("SUBMITTTTT")

    const { cartWithQty, product, helperFunc } = this.props;
    let productTitle = product.title;
    console.log('Product title====>', productTitle)
    cartWithQty[productTitle].quantity = this.state.productQty;
    let newCart = helperFunc(cartWithQty);
    console.log("NEW CART=====>", newCart)
    // const filterProduct = newCart.filter(product => {
      //   return product.title === productTitle;
      // })
      
      //console.log('UPDATED QUANTITY',  newCart[productTitle].quantity)
      this.props.updateCart(newCart);  //?????

    this.setState({
      productQty: newCart[productTitle].quantity
    })
  }

  render () {
    const { product, removeProduct } = this.props
    
    console.log('Local State product qty', this.state.productQty)
  
    return (
      <div>
        <NavLink
            to={`/products/${product.id}`}>
              <span>{product.title}</span>
        </NavLink>
  
        <form onSubmit={this.handleSubmit}>
          <label>Quantity</label>
          <input type="number" min="1" name="quantity" value={this.state.productQty} onChange={this.handleChange} />  
          <button type="submit">Update</button>
        </form>

        <label>Price</label>
        <p>{product.price}</p>
        <button type='button' onClick={() => removeProduct(product.id)}>Remove Item</button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateCart: (newCart) => dispatch(updateCart(newCart))
  }
}

export default withRouter(connect(null, mapDispatch)(ProductCard));
