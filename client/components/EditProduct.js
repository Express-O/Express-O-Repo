import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { editProduct, fetchSingleProduct } from '../store';

class EditProduct extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { selectedProduct } = this.props;
    this.props.fetchSingleProduct(selectedProduct);
    this.setState(this.props.product)
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


  render() {
    const { product } = this.props
    console.log(this.props.product)
    if (!product) {
      return (<div>Loading...</div>)
    }
    return (
      <div>
        <div>
          <h1>{product.title}</h1>
          <hr />
          <img src={product.photo} />
          <p>Details: {product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
        <h1>Edit Product Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Product Name:
          </label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />

          <label>
            Product Description:
          </label>
          <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />

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

          <button type="submit">SAVE CHANGES</button>
        </form>
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  const productId = +ownProps.match.params.productId
  return {
    product: state.product,
    selectedProduct: productId,
  }
}

const mapDispatch = dispatch => {
  return {
    editProduct: product => dispatch(editProduct(product)),
    fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(EditProduct))
