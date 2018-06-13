import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { getSingleProduct, fetchAllReviews, updateCart, fetchProducts, fetchCart } from '../store/index';

class SingleProduct extends Component {
  componentDidMount() {
    const { selectedProduct } = this.props;
    this.props.fetchAllReviews(selectedProduct);
    this.props.fetchProducts();
    this.props.getSingleProduct(this.props.match.params.productId);
    this.props.fetchCart();
  }

    render() {
      const { cart, product, selectedProduct, singleProductReviews, userId, isLoggedIn } = this.props;

      let qty = 1;
      let productId = this.props.match.params.productId;
      if (productId in cart) {
        qty = cart[productId] + 1;
      }
      const productIdAndQty = {
        id: productId,
        quantity: qty
      }
      console.log(productIdAndQty)

      if (!product) {
        return (<div> Loading...</div>)
      }
      return (
          <div>
            <div className="individualProduct">
              <h1>{product.title}</h1>
              <hr />
              <div className="indprodcontainer">
                <div className="indproductimg">
                  <img className="indivimg" src={product.photo} />
                </div>
                <div className="indivproductdesc" >
                  <p>Details: {product.description}</p>
                  <p>Price: ${product.price}</p>
                  <button type="button" onClick={() => this.props.updateCart(productIdAndQty)}>ADD TO CART</button>
                </div>
              </div>
            </div>
              <hr />
              <h2>Customer Reviews</h2>
              <div>
                  <ul>
                      {
                          singleProductReviews.map(review => {
                              return (
                                  <div key={review.id} >
                                      <h2>{review.title}</h2>
                                      <p>By {review.user ?review.user.firstName : "Deleted User"} on {review.date.slice(0, 10)}</p>
                                      <p>Rating: {review.rating}</p>
                                      <p>{review.body}</p>
                                      <hr />
                                  </div>
                              )
                          })
                      }
                  </ul>
              </div>
              {
                isLoggedIn ?
                  <Link to={`/products/${selectedProduct}/${userId}/review`}>
                      <button type="button">WRITE A REVIEW</button>
                  </Link> :
                  <Link to="/login">
                      <button type="button">LOGIN TO WRITE A REVIEW</button>
                  </Link>
              }
          </div>
        )
    }
}


const mapState = (state, ownProps) => {
    const productId = +ownProps.match.params.productId;
    const allProducts = state.allProducts

    return {
        selectedProduct: productId,
        singleProductReviews: state.singleProductReviews,
        isLoggedIn: !!state.user.id,
        product: allProducts.filter(item => item.id === productId)[0],
        cart: state.cart
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchProducts: () => dispatch(fetchProducts()),
        getSingleProduct: (id) => dispatch(getSingleProduct(id)),
        fetchAllReviews: (productId) => dispatch(fetchAllReviews(productId)),
        updateCart: (product) => dispatch(updateCart(product)),
        fetchCart: () => dispatch(fetchCart())
    }
}

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))

