import React, { Component } from 'react'
import { connect } from 'react-redux';
import { postProduct } from '../store';
import { withRouter } from 'react-router-dom'

class ProductForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      price: '',
      inventory: '',
      photo: '',
      category: ''
  }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    let newProduct = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price,
      inventory: this.state.inventory,
      photo: this.state.photo,
      category: this.state.category
    }
    let posted = await this.props.postProduct(newProduct)
    this.props.history.push(`/products/${posted.id}`)
  }

  render() {
    return (
      <div>
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
          <input type="text" name="price" value={this.state.price} onChange={this.handleChange} />

          <label>
            Inventory Quantity:
          </label>
          <input type="text" name="inventory" value={this.state.inventory} onChange={this.handleChange} />

          <label>
            Product Image:
          </label>
          <input type="text" name="photo" value={this.state.photo} onChange={this.handleChange} />

          <label>
            Product Category:
          </label>
          <input type="text" name="category" value={this.state.category} onChange={this.handleChange} />

          <button type="submit">Add Product</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    postProduct: product => dispatch(postProduct(product))
  }
}

export default withRouter(connect(null, mapDispatch)(ProductForm))
