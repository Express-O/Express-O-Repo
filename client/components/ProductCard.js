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
    const { product } = this.props;
    console.log('product in handle submit', product)
    let productIdAndQty = {
      id: product.id,
      quantity: this.state.productQty
    }
    this.props.updateCart(productIdAndQty);

    // this.setState({                               // need to set state????????
    //   productQty: this.state.productQty
    // })
  }

  render () {
    const { product, removeProduct } = this.props

    return (
      <div>
        <NavLink
            to={`/products/${product.id}`}>
              <span>{product.title}</span>
        </NavLink>

        <form onSubmit={this.handleSubmit}>
          <label>Quantity</label>
          <input type="number" min="1" name="productQty" defaultValue={+product.quantity} onChange={this.handleChange} />
          <button type="submit">Update</button>
        </form>

        <label>Price</label>
        <p>{product.price}</p>
        <button type="button" onClick={() => removeProduct(product.id)}>Remove Item</button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateCart: (newCart) => dispatch(updateCart(newCart)),
    removeProduct: (productId) => dispatch(removeProduct(productId))
  }
}

export default withRouter(connect(null, mapDispatch)(ProductCard));
