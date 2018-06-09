import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { editProduct } from '../store';

class EditProduct extends Component {

  constructor(props) {
    super(props)
    this.state = props.product
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.editProduct(this.state)
    this.props.history.push(`/products/${this.state.id}`)
  }


  render () {
    return (
      <div>
        <h1>Edit Product Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Product Name:
          </label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>

          <label>
            Product Description:
          </label>
          <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/>

          <label>
            Product Price:
          </label>
          <input type="text" name="price" value={this.state.price} onChange={this.handleChange}/>

          <label>
            Inventory Quantity:
          </label>
          <input type="text" name="inventory" value={this.state.inventory} onChange={this.handleChange}/>

          <label>
            Product Image:
          </label>
          <input type="text" name="photo" value={this.state.photo} onChange={this.handleChange}/>

          <label>
            Product Category:
          </label>
          <input type="text" name="category" value={this.state.category} onChange={this.handleChange}/>

          <button type="submit">SAVE</button>
        </form>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  const productId = +ownProps.match.params.productId
  return {
    product: state.allProducts.find(product => productId === product.id)
  }
}

const mapDispatch = dispatch => {
  return {
    editProduct: product => dispatch(editProduct(product))
  }
}

export default withRouter(connect(mapState, mapDispatch)(EditProduct))
