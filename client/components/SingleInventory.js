import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchSingleProduct } from '../store/index'

const SingleInventory = (props) => {
  const { product } = props
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

const mapState = (state, ownProps) => {
  const productId = +ownProps.match.params.productId;
  return {
    product: state.product,
    selectedProduct: productId,
    singleProductReviews: state.singleProductReviews,
    userId,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProduct: (productId) => dispatch(fetchSingleProduct(productId)),
    fetchAllReviews: (productId) => dispatch(fetchAllReviews(productId)),
    addCart: (product) => dispatch(addCart(product))
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleInventory))
