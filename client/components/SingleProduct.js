import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { fetchSingleProduct, fetchAllReviews, addCart } from '../store/index';

class SingleProduct extends Component {
    componentDidMount() {
        const { selectedProduct } = this.props;
        this.props.fetchSingleProduct(selectedProduct);
        this.props.fetchAllReviews(selectedProduct);
    }

    render() {
        const { product, selectedProduct, singleProductReviews, userId, isLoggedIn } = this.props;
        const selected = selectedProduct || {};
        const loading = <h1>Loading...</h1>
        const content = (
            <div>
              <div className="individualProduct">
                <h1>{product.title}</h1>
                <hr />
                <div className="indproductimg">
                  <img  src={product.photo} />
                </div>
                <div className="indivproductdesc" >
                  <p>Details: {product.description}</p>
                  <p>Price: ${product.price}</p>
                  <button type="button" onClick={() => this.props.addCart(product)}>ADD TO CART</button>
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

        return (
            <div>
                {
                    selected ? content : loading
                }
            </div>
        )
    }
}

const authDummyUser =
    {
        id: 1,
        firstName: 'Jenny',
        email: 'jenny@email.com'
    };

const mapState = (state, ownProps) => {
    const productId = +ownProps.match.params.productId;
    const userId = authDummyUser.id
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

export default withRouter(connect(mapState, mapDispatch)(SingleProduct))

