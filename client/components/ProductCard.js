import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { updateCart, removeProduct } from '../store/index';


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
    console.log('event target value', event.target.value)
    this.setState({
      productQty: event.target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault();
    const { product } = this.props
    console.log('product in handle submit', product)
    let productIdAndQty = {
      id: product.id,
      quantity: this.state.productQty
    }
    this.props.updateCart(productIdAndQty);
  }

  render () {
    const { product, removeProduct } = this.props
    console.log("Product passed from cart.js", product) //return product with Qty and all attributes
    return (
      <div>
        <NavLink
            to={`/products/${product.id}`}>
              <span>{product.title}</span>
        </NavLink>

        <form onSubmit={this.handleSubmit}>
          <label>Quantity:</label>
          <input type="number" min="1" name="productQty" defaultValue={+product.quantity} onChange={this.handleChange} />
          <button type="submit">Update</button>
        </form>

        <label>Price:</label>
        <p>${product.price}</p>
        <div>
          <button type="button" onClick={() => removeProduct(product.id)}>Remove Item</button>
        </div>
      <br />
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateCart: (productIdAndQty) => dispatch(updateCart(productIdAndQty)),
    removeProduct: (productId) => dispatch(removeProduct(productId))
  }
}

export default withRouter(connect(null, mapDispatch)(ProductCard));
