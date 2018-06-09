import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Cart from './Cart'


class ProductCard extends Component {
  constructor(props) {
    super(props)
      this.state = {
        productQty: props.quantity
      }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState ({
      productQty: event.target.value
    })
  }

  render () {
    const { product, removeProduct, quantity } = this.props

    console.log('Product Card Props', this.props)
    console.log('Product', product)

    return (
      <div>
        <NavLink
            to={`/products/${product.id}`}>
              <span>{product.title}</span>
        </NavLink>

        <form>
          <label>Quantity</label>
          <input type="number" min="1" name="quantity" value={this.state.productQty} onChange={this.handleChange} />
          <button type='button'>Update</button>
        </form>

        <label>Price</label>
        <p>{product.price}</p>
        <button type='button' onClick={() => removeProduct(product.id)}>Remove Item</button>
      </div>
    )
  }

  }

export default ProductCard
