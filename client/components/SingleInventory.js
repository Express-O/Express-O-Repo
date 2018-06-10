import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchSingleProduct } from '../store/index'

class SingleInventory extends Component {
  componentDidMount() {
    const { selectedProduct } = this.props;
    this.props.fetchSingleProduct(selectedProduct);
  }
  render() {
    const { product } = this.props
    return (
      <div>
        <Link to={`/products/edit/${product.id}`}>
          <button type="button">EDIT PRODUCT</button>
        </Link>
        <Link to={`/products/edit/${product.id}`}>
          <button type="button">DELETE PRODUCT</button>
        </Link>
      </div>

    )
  }
}

const mapState = (state, ownProps) => {
  const productId = +ownProps.match.params.productId;
  return {
    product: state.product,
    selectedProduct: productId
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleInventory))
